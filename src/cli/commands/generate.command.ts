import got from 'got';
import { Command } from './command.interface.js';
import { TSVOfferGenerator } from '../../shared/libs/offer-generator/tsv-offet-generator.js';
import { MockServerDataResponse } from '../../shared/types/mock-server-data.js';
import { getErrorMessage } from '../../shared/helpers/common.js';
import { TSVFileWriter } from '../../shared/libs/file-writer/index.js';

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
    const tsvFileWriter = new TSVFileWriter(filePath);

    for (let i = 0; i < offerCount; i += 1) {
      await tsvFileWriter.write(tsvOfferGenerator.generate());
    }
  }

  public async execute(...params: string[]): Promise<void> {
    const [ count, filePath, url ] = params;
    const offerCount = Number.parseInt(count, 10);

    try {
      await this.load(url);
      await this.write(filePath, offerCount);
      console.log(`Generated ${offerCount} offers in ${filePath}`);
    } catch (error) {
      console.log('Cant\'t generate data');
      getErrorMessage(error);
    }
  }
}
