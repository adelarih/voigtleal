
export enum SectionId {
  Home = 'home',
  Religious = 'religious',
  Festive = 'festive',
  Moments = 'moments',
  Gifts = 'gifts',
  Messages = 'messages'
}

export interface GiftItem {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
}

export interface Message {
  id: string;
  author: string;
  content: string;
  date: string;
}
