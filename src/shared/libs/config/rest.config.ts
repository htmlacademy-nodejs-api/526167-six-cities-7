import dotenv, { DotenvParseOutput } from 'dotenv';
import type { Config } from './config.interface.js';
import { Logger } from '../logger/index.js';

export class RestApplicationConfig implements Config {
  private readonly config: NodeJS.ProcessEnv;
  constructor(
    private readonly logger: Logger,
  ) {
    const parsedOutput = dotenv.config();

    if (parsedOutput.error) {
      throw new Error('Can\'t read .env file. Perhaps the file doesn\'t exist or has syntax errors.');
    }

    this.config = <DotenvParseOutput>parsedOutput.parsed;
    this.logger.info('Configuration loaded successfully.');
  }

  public get(key: string): string | undefined {
    return this.config[key];
  }
}
