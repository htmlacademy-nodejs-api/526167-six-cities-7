import { appendFile } from 'node:fs/promises';
import { TSVOfferGenerator } from '../../shared/libs/offer-generator/tsv-offet-generator.js';
import { MockServerDataResponse } from '../../shared/types/mock-server-data.js';
import { Command } from './command.interface.js';
import got from 'got';

export class GenerateCommand implements Command {
  private initialData: MockServerDataResponse;

  public getName(): string {
    return '--generate';
  }

  private async load(url: string) {
    try {
      this.initialData = await got.get(url).json();
    } catch {
      throw new Error('Failed to load data');
    }
  }

  private async write(filePath: string, offerCount: number) {
    const tsvOfferGenerator = new TSVOfferGenerator(this.initialData);
    for (let i = 0; i < offerCount; i += 1) {
      await appendFile(
        filePath,
        `${tsvOfferGenerator.generate()}\n`,
        { encoding: 'utf-8'}
      );
    }
  }

  public async execute(...params: string[]): Promise<void> {
    const [ count, filePath, url ] = params;
    const offerCount = Number.parseInt(count, 10);

    try {
      await this.load(url);
      await this.write(filePath, offerCount);
      console.log(`Generated ${offerCount} offers in ${filePath}`);
    } catch (error: unknown) {
      console.log('Cant\'t generate data');
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }
}
