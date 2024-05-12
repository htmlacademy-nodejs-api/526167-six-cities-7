import { getErrorMessage } from '../../shared/helpers/common.js';
import { TSVFileReader } from '../../shared/libs/tsv-file-reader.js';
import { Offer } from '../../shared/types/offer.type.js';
import { Command } from './command.interface.js';

export class ImportCommand implements Command {
  public getName(): string {
    return '--import';
  }

  private onImportedOffer(offer: Offer): void {
    console.info('Offer imported:', offer);
  }

  private onCompleteImport(count: number): void {
    console.info(`${count} rows imported.`);
  }

  public async execute(...params: string[]): Promise<void> {
    const [fileName] = params;
    const fileReader = new TSVFileReader(fileName.trim());

    fileReader.on('line', this.onImportedOffer);
    fileReader.on('end', this.onCompleteImport);
    try {
      fileReader.read();
    } catch (error) {
      console.error(`Cant't import data from file: ${fileName}`);
      console.error(getErrorMessage(error));
    }
  }
}
