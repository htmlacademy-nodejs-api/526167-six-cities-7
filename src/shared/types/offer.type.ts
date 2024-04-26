import { Cities } from './cities.enum.js';
import { Coordinates } from './coordinates.type.js';
import { Facilities } from './facilities.enum.js';
import { RealState } from './real-state.enum.js';
import { User } from './user.type.js';

export type Offer = {
  caption: string;
  description: string;
  createdAt: Date;
  city: Cities;
  thumbnail: string;
  gallery: string[];
  isPremium: boolean;
  isFeatured: boolean;
  rating: number;
  realStateType: RealState;
  roomCount: number;
  guestCount: number;
  rent: number;
  facilities: Facilities[];
  coordinates: Coordinates;
  user: User;
};
