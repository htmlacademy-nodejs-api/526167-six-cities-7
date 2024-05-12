import EventEmitter from 'node:events';
import { createReadStream } from 'node:fs';
import { FileReader } from './file-reader.interface.js';
import { Offer } from '../../types/offer.type.js';
import { Cities } from '../../types/cities.enum.js';
import { RealState } from '../../types/real-state.enum.js';
import { Facilities } from '../../types/facilities.enum.js';
import { User } from '../../types/user.type.js';
import { Coordinates } from '../../types/coordinates.type.js';

export class TSVFileReader extends EventEmitter implements FileReader {
  private CHUNK_SIZE = 16384; // 16KB

  constructor(private readonly fileName: string) {
    super();
  }

  private parseUser(
    name: string,
    email: string,
    avatar: string,
    type: string
  ): User {
    return { name, email, avatar, type: type as User['type'] };
  }

  private parseCoordinates(coordinatesString: string): Coordinates {
    const [latitude, longitude] = coordinatesString
      .split(';')
      .map((coord) => Number.parseInt(coord, 10));

    return { latitude, longitude };
  }

  private parseGallery(galleryString: string): string[] {
    return galleryString.split(';');
  }

  private parseRent(rentString: string): number {
    return Number.parseInt(rentString, 10);
  }

  private parseFlag(flag: string): boolean {
    return flag === 'true';
  }

  private parseFacilities(facilitiesString: string): Facilities[] {
    console.log(facilitiesString);
    return facilitiesString.split(';') as Facilities[];
  }

  private parseLineToOffer(line: string): Offer {
    const [
      caption,
      description,
      createdAt,
      city,
      thumbnail,
      gallery,
      isPremium,
      isFeatured,
      rating,
      realStateType,
      roomCount,
      guestCount,
      rent,
      facilities,
      coordinates,
      userName,
      userEmail,
      userAvatar,
      userType,
    ] = line.split('\t');

    return {
      caption,
      description,
      createdAt: new Date(createdAt),
      city: city as Cities,
      thumbnail: thumbnail.trim(),
      gallery: this.parseGallery(gallery),
      isPremium: this.parseFlag(isPremium),
      isFeatured: this.parseFlag(isFeatured),
      rating: Number(rating),
      realStateType: realStateType as RealState,
      roomCount: Number(roomCount),
      guestCount: Number(guestCount),
      rent: this.parseRent(rent),
      facilities: this.parseFacilities(facilities),
      coordinates: this.parseCoordinates(coordinates),
      user: this.parseUser(userName, userEmail, userAvatar, userType),
    };
  }

  public async read(): Promise<void> {
    const readStream = createReadStream(this.fileName, {
      highWaterMark: this.CHUNK_SIZE,
      encoding: 'utf-8',
    });


    let remainingData = '';
    let nextLinePosition = -1;
    let importedRowCount = 0;

    for await (const chunk of readStream) {
      remainingData += chunk.toString();

      while ((nextLinePosition = remainingData.indexOf('\n')) >= 0) {
        const completeRow = remainingData.slice(0, nextLinePosition + 1);
        remainingData = remainingData.slice(++nextLinePosition);
        importedRowCount++;

        const parsedOffer = this.parseLineToOffer(completeRow);
        this.emit('line', parsedOffer);
      }
    }

    this.emit('end', importedRowCount);
  }

}
