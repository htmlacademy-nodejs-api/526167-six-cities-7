import fs from 'node:fs';
import { FileReader } from './file-reader.interface.js';
import { Offer } from '../types/offer.type.js';
import { Cities } from '../types/cities.enum.js';
import { RealState } from '../types/real-state.enum.js';
import { Facilities } from '../types/facilities.enum.js';
import { User } from '../types/user.type.js';
import { Coordinates } from '../types/coordinates.type.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(private readonly fileName: string) {}

  private validateRawData(): void {
    if (!this.rawData) {
      throw new Error('No data to parse');
    }
  }

  private parseUser(name: string, email: string, avatar: string, type: string): User {
    return { name, email, avatar, type: type as User['type'] };
  }

  private parseCoordinates(coordinatesString: string): Coordinates {
    const [ latitude, longitude ] = coordinatesString
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
      userType
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

  private parseRawDataToOffers(): Offer[] {
    return this.rawData
      .split('\n')
      .filter((line) => line.trim().length > 0)
      .map((line) => this.parseLineToOffer(line));
  }

  read(): void {
    this.rawData = fs.readFileSync(this.fileName, { encoding: 'utf-8' });
  }

  public toArray(): Offer[] {
    this.validateRawData();
    return this.parseRawDataToOffers();
  }
}
