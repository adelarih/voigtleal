
export enum Section {
  Home = 'home',
  Religious = 'religious',
  Festive = 'festive',
  Gifts = 'gifts',
  Guestbook = 'guestbook'
}

export interface GiftItem {
  id: number;
  title: string;
  price: string;
  image?: string;
  description?: string;
}

export interface Message {
  id: string;
  author: string;
  text: string;
  date: string;
}
