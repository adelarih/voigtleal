import { GiftItem, NavItem } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'Religioso', href: '#religioso' },
  { label: 'Festa', href: '#festa' },
  { label: 'Presentes', href: '#presentes' },
  { label: 'Recados', href: '#recados' },
];

export const GIFT_LIST: GiftItem[] = [
  { id: 1, title: 'Alvará para meter o louco na festa', price: 676.32, image: '/assets/presentes/presente-alvara-meter.png' },
  { id: 2, title: 'Aula de culinária para o noivo aprender a cozinhar', price: 280.94, image: '/assets/presentes/presente-aula-culinaria.png' },
  { id: 3, title: 'Cobertor para a noiva que está sempre coberta de razão', price: 526.08, image: '/assets/presentes/presente-cobertor-noiva.png' },
  { id: 4, title: 'Cota bike para o noivo acompanhar a noiva nas corridas', price: 448.36, image: '/assets/presentes/presente-cota-bike.png' },
  { id: 5, title: 'Cota de Le Creuset para noiva mobiliar a cozinha', price: 572.70, image: '/assets/presentes/presente-cota-le.png' },
  { id: 6, title: 'Cota tênis de corrida para a noiva voar na sua primeira maratona', price: 396.56, image: '/assets/presentes/presente-cota-tenis.png' },
  { id: 7, title: 'Garanta seu ingresso na renovação de votos', price: 1049.34, image: '/assets/presentes/presente-ingresso-renovacao.png' },
  { id: 8, title: 'Se por acaso você se sentir tocado', price: 2624.31, image: '/assets/presentes/presente-se-por-acaso.png' },
  { id: 9, title: 'Passe para furar a fila do bar', price: 914.64, image: '/assets/presentes/presente-passe-furar.png' },
];

export const LINKS = {
  churchMap: "https://www.google.com/maps/place/Igreja+do+Sagrado+Cora%C3%A7%C3%A3o+de+Jesus/@-30.1164978,-51.2534101,17z/data=!3m1!4b1!4m6!3m5!1s0x9519823a92384a8d:0xf53c6cadbe0cd40c!8m2!3d-30.1165025!4d-51.2508352!16s%2Fg%2F1ptwjqqff?entry=ttu&g_ep=EgoyMDI2MDIxMS4wIKXMDSoASAFQAw%3D%3D",
  partyMap: "https://www.google.com/maps/place/Veleiros+do+Sul/@-30.0975023,-51.2589328,17z/data=!3m1!4b1!4m6!3m5!1s0x9519820471c941c5:0xe388c795d9812f07!8m2!3d-30.097507!4d-51.2563579!16s%2Fg%2F121k3mjw?entry=ttu&g_ep=EgoyMDI2MDIxMS4wIKXMDSoASAFQAw%3D%3D"
};
