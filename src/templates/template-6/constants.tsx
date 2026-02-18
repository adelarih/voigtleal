
import { GiftItem } from './types';

// Import images
import img1 from '../../assets/presentes/presente-alvara-meter.png';
import img2 from '../../assets/presentes/presente-aula-culinaria.png';
import img3 from '../../assets/presentes/presente-cobertor-noiva.png';
import img4 from '../../assets/presentes/presente-cota-bike.png';
import img5 from '../../assets/presentes/presente-cota-le.png';
import img6 from '../../assets/presentes/presente-cota-tenis.png';
import img7 from '../../assets/presentes/presente-ingresso-renovacao.png';
import img8 from '../../assets/presentes/presente-se-por-acaso.png';
import img9 from '../../assets/presentes/presente-passe-furar.png';

export const COLORS = {
  white: '#FFFFFF',
  green: '#4A5D4E', // Foliage Green
  lightGreen: '#F0F4F1',
  waterGreen: '#78A083', // Verde Água
};

export const GIFT_LIST: GiftItem[] = [
  { id: 1, title: "Alvará para meter o louco na festa", price: 676.32, image: img1 },
  { id: 2, title: "Aula de culinária para o noivo aprender a cozinhar", price: 280.94, image: img2 },
  { id: 3, title: "Coberto para a noiva que está sempre coberta de razão", price: 526.08, image: img3 },
  { id: 4, title: "Cota bike para o noivo acompanhar a noiva nas corridas", price: 448.36, image: img4 },
  { id: 5, title: "Cota de le creuset para noiva mobiliar a cozinha", price: 572.70, image: img5 },
  { id: 6, title: "Cota tênis de corrida para a noiva voar na sua primeira maratona", price: 396.56, image: img6 },
  { id: 7, title: "Garanta seu ingresso na renovação de votos", price: 1049.34, image: img7 },
  { id: 8, title: "Se por acaso você se sentir tocado", price: 2624.31, image: img8 },
  { id: 9, title: "Passe para furar a fila do bar", price: 914.64, image: img9 },
];

export const FOOTER_LINKS = {
  topstack: "https://topstack.com.br?utm_source=celina_eduardo&utm_medium=software_branding&utm_campaign=dev_by_topstack"
};
