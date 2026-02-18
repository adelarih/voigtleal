export interface GiftOption {
  id: number;
  title: string;
  price?: number; // Optional because the first one is custom
  image: string;
  isCustomAmount?: boolean;
}

export interface GuestMessage {
  id: string;
  name: string;
  message: string;
  date: string;
}

export enum Slides {
  HOME = 0,
  RELIGIOUS = 1,
  PARTY = 2,
  GIFTS = 3,
  GUESTBOOK = 4,
  MOMENTS = 5,
}