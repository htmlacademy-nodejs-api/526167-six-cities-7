import { Cities } from "./cities.enum.js";
import { Coordinates } from "./coordinates.type.js";
import { Facilities } from "./facilities.enum.js";
import { RealState } from "./real-state.enum.js";

export type Offer = {
  caption: string;
  description: string;
  createdAt: string;
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
};
