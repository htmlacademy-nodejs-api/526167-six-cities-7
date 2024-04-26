import fs from 'node:fs';
import path from 'node:path';
import { Command } from './command.interface.js';

type PackageJSONConfig = {
  version: string;
};

const isPackageJSONConfig = (config: unknown): config is PackageJSONConfig => (
  typeof config === 'object' &&
    config !== null &&
    !Array.isArray(config) &&
    Object.hasOwn(config, 'version')
);

export class VersionCommand implements Command {
  constructor(private readonly filePath: string = 'package.json') {}

  private readVersion(): string {
    const jsonContent = fs.readFileSync(path.resolve(this.filePath), { encoding: 'utf8' });
    const importedContent: unknown = JSON.parse(jsonContent);

    if (!isPackageJSONConfig(importedContent)) {
      throw new Error('Invalid package.json file');
    }

    return importedContent.version;
  }

  public getName(): string {
    return '--version';
  }

  public async execute(..._params: string[]): Promise<void> {
    try {
      const version = this.readVersion();
      console.info(version);
    } catch (error: unknown) {
      console.error(`Failed to read version from ${this.filePath}`);

      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }
}
