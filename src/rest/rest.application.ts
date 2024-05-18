import { inject, injectable } from 'inversify';
import type { Logger } from '../shared/libs/logger/index.js';
import { Config } from '../shared/libs/config/index.js';
import { RestSchema } from '../shared/libs/config/index.js';
import { Component } from '../shared/types/index.js';

@injectable()
export class RestApplication {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<RestSchema>,
  ) {}

  public async init() {
    this.logger.info('RestApplication initialized');
    this.logger.info(`Config value for PORT: ${this.config.get('PORT')}`);
  }
}
