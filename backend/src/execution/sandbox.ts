import { execFile } from 'child_process';
import { promises as fs } from 'fs';
import os from 'os';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export interface SandboxExecutionResult {
  stdout: string;
  stderr: string;
  timeTakenMs: number;
  memoryUsed?: number;
  error?: 'TIME_LIMIT_EXCEEDED' | 'RUNTIME_ERROR' | 'MEMORY_LIMIT_EXCEEDED' | 'SYSTEM_ERROR';
  errorMessage?: string;
}

export class DockerSandbox {
  private tempDir: string | null = null;
  private containerId: string = uuidv4();
  
  constructor(
    private readonly image: string,
    private readonly sourceCode: string,
    private readonly sourceFileName: string,
    private readonly timeLimitMs: number = 2000,
    private readonly memoryLimitMb: number = 256
  ) {}

  public async prepare(): Promise<void> {
    try {
      this.tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'codeclash-'));
      await fs.writeFile(path.join(this.tempDir, this.sourceFileName), this.sourceCode);
    } catch (err: any) {
      throw new Error(`Failed to prepare sandbox: ${err.message}`);
    }
  }

  public async compile(compileCmd: string): Promise<SandboxExecutionResult> {
    return this.executeDockerCommand(compileCmd.split(' '), undefined, 20000);
  }

  public async run(runCmd: string, stdinData: string): Promise<SandboxExecutionResult> {
    return this.executeDockerCommand(runCmd.split(' '), stdinData);
  }

  private async executeDockerCommand(cmdArgs: string[], stdinData?: string, customTimeout?: number): Promise<SandboxExecutionResult> {
    if (!this.tempDir) {
      return { stdout: '', stderr: '', timeTakenMs: 0, error: 'SYSTEM_ERROR', errorMessage: 'Sandbox not prepared' };
    }

    const dockerArgs = [
      'run',
      '--name', `${this.containerId}-${Math.random().toString(36).substr(2, 5)}`,
      '--rm',
      '-i',
      '--network', 'none',
      '--cpus', '1',
      '--memory', `${this.memoryLimitMb}m`,
      '--pids-limit', '64',
      '-v', `${this.tempDir}:/app`,
      '-w', '/app',
      this.image
    ];

    if (stdinData !== undefined) {
      await fs.writeFile(path.join(this.tempDir, 'input.txt'), stdinData);
      dockerArgs.push('sh', '-c', `${cmdArgs.join(' ')} < input.txt`);
    } else {
      dockerArgs.push(...cmdArgs);
    }

    const startTime = Date.now();
    let isTimeout = false;
    let timer: NodeJS.Timeout;

    return new Promise((resolve) => {
      const child = execFile('docker', dockerArgs, (error: any, stdout, stderr) => {
        clearTimeout(timer);
        const timeTakenMs = Date.now() - startTime;

        if (isTimeout) {
          return resolve({
            stdout: stdout.toString(),
            stderr: stderr.toString(),
            timeTakenMs,
            error: 'TIME_LIMIT_EXCEEDED'
          });
        }

        if (error) {
          console.error("--- Docker Execution Error ---");
          console.error("Command:", ['docker', ...dockerArgs].join(" "));
          console.error("Exit Code:", error.code);
          console.error("Stdout:", stdout.toString());
          console.error("Stderr:", stderr.toString());
          console.error("------------------------------");

          // Determine memory limit issue vs runtime error
          const code = error.code;
          let errorType: 'RUNTIME_ERROR' | 'MEMORY_LIMIT_EXCEEDED' | 'SYSTEM_ERROR' = 'RUNTIME_ERROR';
          
          if (code === 137 || (stderr && stderr.includes('OOM'))) {
            errorType = 'MEMORY_LIMIT_EXCEEDED';
          }

          return resolve({
            stdout: stdout.toString(),
            stderr: stderr.toString(),
            timeTakenMs,
            error: errorType,
            errorMessage: error.message
          });
        }

        resolve({
          stdout: stdout.toString(),
          stderr: stderr.toString(),
          timeTakenMs
        });
      });

      // Hard timeout enforcement
      const timeoutLimit = customTimeout || this.timeLimitMs;
      timer = setTimeout(() => {
        isTimeout = true;
        // Kill by name since we randomized it slightly
        execFile('docker', ['rm', '-f', dockerArgs[2]], () => {});
      }, timeoutLimit);
    });
  }

  private killContainer(id: string) {
    execFile('docker', ['rm', '-f', id], () => {});
  }

  public async cleanup(): Promise<void> {
    // We append random string now, so this kill is mostly a fallback.
    // The individual docker run timeouts handle themselves.
    this.killContainer(this.containerId);
    if (this.tempDir) {
      try {
        await fs.rm(this.tempDir, { recursive: true, force: true });
      } catch (err) {
        console.error(`Failed to cleanup temp dir ${this.tempDir}`, err);
      }
    }
  }
}
