export interface GiftItem {
  id: number;
  title: string;
  price: number;
  image?: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface Message {
  id: string;
  name: string;
  content: string;
}
