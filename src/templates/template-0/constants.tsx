
import { Section, GiftItem } from './types';

export const COLORS = {
  primary: '#1a2e1a', // Dark foliage green
  accent: '#10b981', // Emerald green
  topstack: '#2dd4bf', // Teal/Verde Água for Topstack
  bgLight: '#f8fafc',
};

export const SECTIONS_DATA = [
  { id: Section.Home, label: 'Home' },
  { id: Section.Religious, label: 'Cerimônia Religiosa' },
  { id: Section.Festive, label: 'Cerimônia Festiva' },
  { id: Section.Gifts, label: 'Lista de Presentes' },
  { id: Section.Guestbook, label: 'Recados' },
];

export const GIFTS: GiftItem[] = [
  { id: 1, title: 'Alvará para meter o louco na festa', price: 'R$ 676,32', image: '/assets/presentes/presente-alvara-meter.png' },
  { id: 2, title: 'Aula de culinária para o noivo aprender a cozinhar', price: 'R$ 280,94', image: '/assets/presentes/presente-aula-culinaria.png' },
  { id: 3, title: 'Coberto para a noiva que está sempre coberta de razão', price: 'R$ 526,08', image: '/assets/presentes/presente-cobertor-noiva.png' },
  { id: 4, title: 'Cota bike para o noivo acompanhar a noiva nas corridas', price: 'R$ 448,36', image: '/assets/presentes/presente-cota-bike.png' },
  { id: 5, title: 'Cota de Le Creuset para noiva mobiliar a cozinha', price: 'R$ 572,70', image: '/assets/presentes/presente-cota-le.png' },
  { id: 6, title: 'Cota tênis de corrida para a noiva voar na sua primeira maratona', price: 'R$ 396,56', image: '/assets/presentes/presente-cota-tenis.png' },
  { id: 7, title: 'Garanta seu ingresso na renovação de votos', price: 'R$ 1.049,34', image: '/assets/presentes/presente-ingresso-renovacao.png' },
  { id: 8, title: 'Se por acaso você se sentir tocado', price: 'R$ 2.624,31', image: '/assets/presentes/presente-se-por-acaso.png' },
  { id: 9, title: 'Passe para furar a fila do bar', price: 'R$ 914,64', image: '/assets/presentes/presente-passe-furar.png' },
];
