export interface GiftOption {
  id: string;
  title: string;
  price?: number;
  image: string;
  isCustom?: boolean;
  link?: string;
}

export interface GuestMessage {
  id: string;
  name: string;
  message: string;
  date: string;
}

export interface EventDetails {
  title: string;
  date: string;
  time: string;
  locationName: string;
  address?: string;
  mapUrl: string;
  description: string[];
  attire: string;
  image: string;
}