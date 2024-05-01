import type { User } from './user.type.js';

export type MockServerDataResponse = {
  caption: string[];
  description: string[];
  cities: string[];
  thumbnails: string[];
  gallery: string[];
  realStateTypes: string[];
  facilities: string[];
  users: User[];
}
