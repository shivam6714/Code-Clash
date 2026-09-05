import axios from 'axios';
import * as cheerio from 'cheerio';
import {
  ProblemProvider,
  FetchOptions,
  ImportedProblemMetadata,
  ImportedProblemDetails,
  IExample,
} from './ProblemProvider';

export class CodeforcesProvider implements ProblemProvider {
  public readonly name = 'Codeforces';

  private mapRatingToDifficulty(rating?: number): 'Easy' | 'Medium' | 'Hard' {
    if (!rating) return 'Medium';
    if (rating <= 1200) return 'Easy';
    if (rating <= 1700) return 'Medium';
    return 'Hard';
  }

  private mapTagToTopic(tag: string): string {
    const mapping: Record<string, string> = {
      dp: 'Dynamic Programming',
      greedy: 'Greedy',
      math: 'Math',
      implementation: 'Implementation',
      'data structures': 'Data Structures',
      graphs: 'Graphs',
      trees: 'Trees',
      strings: 'Strings',
      geometry: 'Geometry',
      'two pointers': 'Two Pointers',
      'binary search': 'Binary Search',
      sortings: 'Sorting',
      'number theory': 'Number Theory',
      combinatorics: 'Combinatorics',
      bitmasks: 'Bit Manipulation',
      'constructive algorithms': 'Constructive Algorithms',
      'brute force': 'Brute Force',
    };
    return (
      mapping[tag.toLowerCase()] ||
      tag
        .split(' ')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ')
    );
  }

  public async fetchProblemIndex(options: FetchOptions): Promise<ImportedProblemMetadata[]> {
    const url = 'https://codeforces.com/api/problemset.problems';
    if (options.topic) {
      // Tags can be passed as a semicolon-separated list in Codeforces API
      // E.g. tags=dp;math
    }
    const response = await axios.get(url, {
      params: {
        tags: options.topic ? options.topic : undefined,
      },
    });

    if (response.data.status !== 'OK') {
      throw new Error(`Codeforces API error: ${response.data.comment}`);
    }

    const problems = response.data.result.problems;
    const metadataList: ImportedProblemMetadata[] = [];

    // Reverse to get oldest first or just take from start
    // We'll iterate through them
    for (const p of problems) {
      // If we are looking for specific IDs, don't break until we find them all
      if (!options.ids && metadataList.length >= (options.limit || 10)) {
        break;
      }
      if (options.ids && metadataList.length >= options.ids.length) {
        break;
      }
      
      // Filter out non-standard problems or interactive ones (we can't easily detect interactive from metadata sometimes, but tags might help)
      if (p.tags.includes('interactive')) {
        continue;
      }

      // External ID format: ContestId + Index (e.g. 4A)
      const externalId = `${p.contestId}${p.index}`;
      
      if (options.ids && options.ids.length > 0 && !options.ids.includes(externalId)) {
          continue;
      }

      let meetsDifficulty = true;
      if (options.difficulty) {
         if (this.mapRatingToDifficulty(p.rating) !== options.difficulty) {
             meetsDifficulty = false;
         }
      }

      if (meetsDifficulty) {
        metadataList.push({
          externalId,
          title: p.name,
          difficulty: this.mapRatingToDifficulty(p.rating),
          topics: p.tags.map((t: string) => this.mapTagToTopic(t)),
        });
      }
    }

    return metadataList;
  }

  public async fetchProblemDetails(externalId: string): Promise<ImportedProblemDetails> {
    // Parse external ID (e.g., "4A" -> contest 4, problem A)
    const match = externalId.match(/^(\d+)([A-Z]\d*)$/i);
    if (!match) {
      throw new Error(`Invalid Codeforces external ID format: ${externalId}`);
    }
    const contestId = match[1];
    const index = match[2];

    const url = `https://codeforces.com/contest/${contestId}/problem/${index}`;
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      },
    });

    const $ = cheerio.load(response.data);
    const problemStatement = $('.problem-statement');
    
    if (!problemStatement.length) {
      throw new Error('Problem statement not found on page');
    }

    // Extract Description
    // The second child div usually contains the main text
    let descriptionHtml = problemStatement.children('div').eq(1).html() || '';
    // Strip script tags and basic formatting to text
    descriptionHtml = descriptionHtml.replace(/<script[^>]*>([\S\s]*?)<\/script>/gim, "");
    descriptionHtml = descriptionHtml.replace(/<\/?(div|p|span)[^>]*>/g, '\n');
    descriptionHtml = descriptionHtml.replace(/<br\s*[\/]?>/gi, '\n');
    descriptionHtml = descriptionHtml.replace(/\$\$\$/g, '`'); // Codeforces uses $$$ for mathjax
    // Unescape HTML entities
    descriptionHtml = descriptionHtml.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&quot;/g, '"');
    const description = descriptionHtml.trim().replace(/\n{3,}/g, '\n\n');

    // Extract Constraints
    const constraints: string[] = [];
    problemStatement.children('div').eq(1).find('p').each((_, el) => {
        const text = $(el).text().trim();
        if (text.includes('$$$')) {
            // Very naive constraint extraction
            // A real parser would look at input specification block
        }
    });
    
    const inputSpec = problemStatement.find('.input-specification p').text().trim();
    if (inputSpec) constraints.push(inputSpec.replace(/\$\$\$/g, '`'));

    // Extract limits
    const timeLimitStr = problemStatement.find('.time-limit').text();
    let timeLimit = 2000;
    if (timeLimitStr) {
      const match = timeLimitStr.match(/(\d+(\.\d+)?)\s*second/i);
      if (match) timeLimit = parseFloat(match[1]) * 1000;
    }

    const memoryLimitStr = problemStatement.find('.memory-limit').text();
    let memoryLimit = 256;
    if (memoryLimitStr) {
      const match = memoryLimitStr.match(/(\d+)\s*megabyte/i);
      if (match) memoryLimit = parseInt(match[1]);
    }

    // Extract examples
    const examples: IExample[] = [];
    const testCases: any[] = [];
    
    $('.sample-test .input').each((i, el) => {
      const inputStr = $(el).find('pre').text().trim();
      const outputStr = $('.sample-test .output').eq(i).find('pre').text().trim();
      
      examples.push({
        input: inputStr,
        output: outputStr,
      });

      testCases.push({
        input: inputStr,
        expectedOutput: outputStr,
        isHidden: false, // Scraped tests are always visible
      });
    });

    return {
      description: description || 'No description found.',
      constraints: constraints,
      timeLimit,
      memoryLimit,
      examples,
      testCases,
    };
  }
}
