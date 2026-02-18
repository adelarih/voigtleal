import { EventDetails, GiftOption } from './types';

export const RELIGIOUS_CEREMONY: EventDetails = {
  title: "Cerimônia Religiosa",
  date: "16 de Abril de 2026",
  time: "19h00",
  locationName: "Igreja do Sagrado Coração de Jesus",
  address: "Rua Padre João Batista Reus, 1133 - Tristeza, Porto Alegre - RS, 91920-000",
  mapUrl: "https://www.google.com/maps/place/Igreja+do+Sagrado+Cora%C3%A7%C3%A3o+de+Jesus/@-30.1164978,-51.2534101,17z/data=!3m1!4b1!4m6!3m5!1s0x9519823a92384a8d:0xf53c6cadbe0cd40c!8m2!3d-30.1165025!4d-51.2508352!16s%2Fg%2F1ptwjqqff?entry=ttu&g_ep=EgoyMDI2MDIxMS4wIKXMDSoASAFQAw%3D%3D",
  description: [
    "Com alegria, convidamos você para a celebração do nosso casamento religioso, um momento íntimo e cheio de significado para nós.",
    "Após a celebração, receberemos os convidados para um breve brinde em nossa casa."
  ],
  attire: "Esporte Fino",
  image: "/src/assets/v-2.jpeg"
};

export const FESTIVE_CEREMONY: EventDetails = {
  title: "Cerimônia Festiva",
  date: "18 de Abril de 2026",
  time: "16h30",
  locationName: "Veleiros do Sul",
  address: "Av. Guaíba, 2941 - Vila Assunção, Porto Alegre - RS",
  mapUrl: "https://www.google.com/maps/place/Veleiros+do+Sul/@-30.0975023,-51.2589328,17z/data=!3m1!4b1!4m6!3m5!1s0x9519820471c941c5:0xe388c795d9812f07!8m2!3d-30.097507!4d-51.2563579!16s%2Fg%2F121k3mjw?entry=ttu&g_ep=EgoyMDI2MDIxMS4wIKXMDSoASAFQAw%3D%3D",
  description: [
    "Convidamos você para celebrar conosco o nosso casamento, em um dia pensado para ser vivido com presença, afeto e celebração.",
    "Será um momento especial, reunindo cerimônia e festa em um só lugar, para celebrarmos juntos esse novo capítulo."
  ],
  attire: "Social Completo / Passeio Completo",
  image: "/src/assets/v-3.jpeg"
};

export const GIFTS: GiftOption[] = [
  {
    id: 'custom',
    title: 'Presente Livre',
    image: '/src/assets/presentes/presente-livre.png',
    isCustom: true,
    link: 'https://nubank.com.br/pagar/custom'
  },
  {
    id: '1',
    title: 'Aula de culinária para o noivo aprender a cozinhar',
    price: 280.94,
    image: '/src/assets/presentes/presente-aula-culinaria.png',
    link: '#'
  },
  {
    id: '2',
    title: 'Coberto para a noiva que esta sempre comberta de razão',
    price: 526.08,
    image: '/src/assets/presentes/presente-cobertor-noiva.png',
    link: '#'
  },
  {
    id: '3',
    title: 'Cota bike para o noivo acompanhar a noiva nas corridas',
    price: 448.36,
    image: '/src/assets/presentes/presente-cota-bike.png',
    link: '#'
  },
  {
    id: '4',
    title: 'Cota de le creuset para noiva mobiliar a cozinha',
    price: 572.70,
    image: '/src/assets/presentes/presente-cota-le.png',
    link: '#'
  },
  {
    id: '5',
    title: 'Cota tenis de corrida para a noiva voar na sua primeira maratona',
    price: 396.56,
    image: '/src/assets/presentes/presente-cota-tenis.png',
    link: '#'
  },
  {
    id: '6',
    title: 'Garanta seu ingresso na renovação de votos',
    price: 1049.34,
    image: '/src/assets/presentes/presente-ingresso-renovacao.png',
    link: '#'
  },
  {
    id: '7',
    title: 'Se por acaso você se sentir tocado',
    price: 2624.31,
    image: '/src/assets/presentes/presente-se-por-acaso.png',
    link: '#'
  },
  {
    id: '8',
    title: 'Alvará para meter o louco na festa',
    price: 676.32,
    image: '/src/assets/presentes/presente-alvara-meter.png',
    link: '#'
  },
  {
    id: '9',
    title: 'Passe para furar a fila do bar',
    price: 914.64,
    image: '/src/assets/presentes/presente-passe-furar.png',
    link: '#'
  }
];