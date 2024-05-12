import type { Logger } from '../shared/libs/logger/index.js';
import { Config } from '../shared/libs/config/index.js';

export class RestApplication {
  constructor(
    private readonly logger: Logger,
    private readonly config: Config,
  ) {}

  public async init() {
    this.logger.info('RestApplication initialized');
    this.logger.info(`Config value for PORT: ${this.config.get('PORT')}`);
  }
}
