import path from 'node:path';
import fs from 'node:fs';
import { Logger as PinoInstance, pino, transport } from 'pino';
import { Logger } from './logger.interface.js';
import { getCurrentDirectoryPath } from '../../helpers/index.js';

export class PinoLogger implements Logger {
  private readonly logger: PinoInstance;

  constructor() {
    const directoryPath = getCurrentDirectoryPath();
    const logFilePath = 'logs/rest.log';
    const destinationPath = path.resolve(
      directoryPath,
      '../../../',
      logFilePath
    );

    const fileTransport = transport({
      target: 'pino/file',
      options: { destinationPath },
    });

    this.logger = pino({}, fileTransport);
  }

  info(message: string, ...args: unknown[]): void {
    this.logger.info(message, ...args);
  }

  warn(message: string, ...args: unknown[]): void {
    this.logger.warn(message, ...args);
  }

  error(message: string, error: Error, ...args: unknown[]): void {
    this.logger.error(error, message, ...args);
  }

  debug(message: string, ...args: unknown[]): void {
    this.logger.debug(message, ...args);
  }
}
