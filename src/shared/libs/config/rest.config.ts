import dotenv from 'dotenv';
import type { Config } from './config.interface.js';
import { Logger } from '../logger/index.js';
import { RestSchema, configRestSchema } from './rest.schema.js';

export class RestApplicationConfig implements Config<RestSchema> {
  private readonly config: RestSchema;
  constructor(
    private readonly logger: Logger,
  ) {
    const parsedOutput = dotenv.config();

    if (parsedOutput.error) {
      throw new Error('Can\'t read .env file. Perhaps the file doesn\'t exist or has syntax errors.');
    }

    configRestSchema.load({});
    configRestSchema.validate({
      allowed: 'strict',
      output: this.logger.info
    });

    this.config = configRestSchema.getProperties();
    this.logger.info('Configuration loaded successfully.');
  }

  public get<T extends keyof RestSchema>(key: T): RestSchema[T] {
    return this.config[key];
  }
}
