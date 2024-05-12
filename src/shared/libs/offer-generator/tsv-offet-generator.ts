import dayjs from 'dayjs';
import { generateRandomValue, getRandomBoolean, getRandomItem, getRandomItems } from '../../helpers/common.js';
import { MockServerDataResponse } from '../../types/mock-server-data.js';
import { OfferGenerator } from './offer-generator.interface.js';

const MIN_PRICE = 1000;
const MAX_PRICE = 10000;

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerDataResponse) {}

  public generate(): string {

    const caption = getRandomItem(this.mockData.caption);
    const description = getRandomItem(this.mockData.description);
    const city = getRandomItem(this.mockData.cities);
    const thumbnail = getRandomItem(this.mockData.thumbnails);
    const gallery = getRandomItems(this.mockData.gallery).join(';');
    const realStateType = getRandomItem(this.mockData.realStateTypes);
    const facilities = getRandomItems(this.mockData.facilities).join(';');
    const user = getRandomItem(this.mockData.users);
    const rent = generateRandomValue(MIN_PRICE, MAX_PRICE);

    const createdAt = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();

    const isPremium = getRandomBoolean();
    const isFeatured = getRandomBoolean();
    const rating = generateRandomValue(1, 5);
    const roomCount = generateRandomValue(1, 5);
    const guestCount = generateRandomValue(1, 10);
    const coordinates = `${generateRandomValue(1, 100, 5)};${generateRandomValue(1, 100, 5)}`;

    return [
      caption,
      description,
      createdAt,
      city,
      thumbnail,
      gallery,
      isPremium.toString(),
      isFeatured.toString(),
      rating.toString(),
      realStateType,
      roomCount.toString(),
      guestCount.toString(),
      rent.toString(),
      facilities,
      coordinates,
      user.name,
      user.email,
      user.avatar,
      user.type,
    ].join('\t');
  }
}
