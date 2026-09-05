# CodeClash

CodeClash is a 1v1 online competitive DSA platform.

## Requirements
- Node.js (v18+)
- MongoDB
- **Docker Desktop** (Required for code execution sandboxing)

## Setup & Run

1. Clone the repository and configure `.env` (use `.env.example` as a template).
2. Install all dependencies:
   ```bash
   npm run install:all
   ```
3. **IMPORTANT**: Seed the DSA problems (this will overwrite existing problems):
   ```bash
   npm run seed:problems --prefix backend
   ```
4. Start the application stack:
   ```bash
   npm run dev:wait
   ```

## Architecture & Security (Phase 5)

CodeClash executes user-submitted code in isolated Docker environments.
- **Isolation**: Each submission gets a temporary, single-use container (`--rm`).
- **Resource Limits**: CPU is limited to 1 core, memory to 256MB.
- **Network**: Containers use `--network none` and cannot access the internet or internal services.
- **Cleanup**: Ephemeral temp directories are securely scrubbed via `finally` execution blocks.
- **No Host Execution**: No code ever runs using raw `eval()` or `exec()` on the Node.js backend.

```text
Battle -> Execution Service -> Docker Sandbox -> Judge -> Battle Result
```

## Environment Setup
You need to configure your local `.env` files for both the frontend and backend.

### Backend Environment
Copy `backend/.env.example` to `backend/.env`:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/codeclash
```
Ensure that your `MONGODB_URI` points to a valid running MongoDB instance, otherwise the backend will fail to start.

### Frontend Environment
Copy `frontend/.env.example` to `frontend/.env`:
```env
VITE_API_URL=http://localhost:3000
```

## Development Environment
To start the complete development environment, run:
```bash
npm run dev:wait
```
This command orchestrates the startup sequence:
1. Starts the backend.
2. The backend connects to MongoDB.
3. The Express server starts and becomes healthy.
4. `wait-on` detects that the backend is healthy.
5. The frontend Vite server is started.

If MongoDB fails to connect, the frontend will be blocked from starting until the database issue is resolved.

## Individual Services
If you need to start the services individually for testing, you can use:
```bash
npm run dev:backend
npm run dev:frontend
```

## Health Check
When the backend is running, you can manually verify its health status (and database connection status) at:
```text
http://localhost:3000/api/health
```
