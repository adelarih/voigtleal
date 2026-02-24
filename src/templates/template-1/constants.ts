import { EventDetails, GiftOption } from './types';

export const RELIGIOUS_CEREMONY: EventDetails = {
  title: "Cerimônia Religiosa",
  date: "16 de Abril de 2026",
  time: "19h00",
  locationName: "Igreja do Sagrado Coração de Jesus",
  address: "Rua Padre João Batista Reus, 1133 - Tristeza, Porto Alegre - RS, 91920-000",
  mapUrl: "https://www.google.com/maps/place/Igreja+do+Sagrado+Cora%C3%A7%C3%A3o+de+Jesus/@-30.1164978,-51.2534101,17z/data=!3m1!4b1!4m6!3m5!1s0x9519823a92384a8d:0xf53c6cadbe0cd40c!8m2!3d-30.1165025!4d-51.2508352!16s%2Fg%2F1ptwjqqff?entry=ttu&g_ep=EgoyMDI2MDIxMS4wIKXMDSoASAFQAw%3D%3D",
  description: [
    "Com o coração cheio de alegria, queremos dividir com você um dos momentos mais importantes da nossa história.",
    "Convidamos você para celebrar conosco o nosso casamento religioso — uma cerimônia mais íntima, cheia de significado e amor.",
    "Depois, abriremos as portas da nossa casa para um brinde simples, preparado com carinho, para celebrar essa nova etapa ao lado de quem faz parte da nossa vida.",
    "Por se tratar de uma celebração reservada, a confirmação de presença será realizada conforme orientações abaixo."
  ],
  attire: "Esporte Fino",
  image: "/assets/v-2.jpeg"
};

export const FESTIVE_CEREMONY: EventDetails = {
  title: "Cerimônia Festiva",
  date: "18 de Abril de 2026",
  time: "16h30",
  locationName: "Veleiros do Sul",
  address: "Av. Guaíba, 2941 - Vila Assunção, Porto Alegre - RS",
  mapUrl: "https://www.google.com/maps/place/Veleiros+do+Sul/@-30.0975023,-51.2589328,17z/data=!3m1!4b1!4m6!3m5!1s0x9519820471c941c5:0xe388c795d9812f07!8m2!3d-30.097507!4d-51.2563579!16s%2Fg%2F121k3mjw?entry=ttu&g_ep=EgoyMDI2MDIxMS4wIKXMDSoASAFQAw%3D%3D",
  description: [
    "Queremos que você esteja conosco em um dos dias mais importantes de nossas vidas.",
    "Vamos nos casar ao ar livre, diante do Guaíba — um cenário especial para nós e para este momento que estamos vivendo. Escolhemos celebrar dessa forma, aberta e sincera, cercados por quem realmente faz parte da nossa história.",
    "Após a cerimônia, daremos continuidade à celebração com a festa, que será no salão do clube. A proposta é simples: estarmos juntos para brindar, conversar, rir, dançar e aproveitar cada instante ao lado das pessoas que caminharam conosco até aqui — e que desejamos que sigam ao nosso lado nos próximos capítulos.",
    "Contamos muito com a sua presença — ela tornará esse dia ainda mais especial e significativo para nós.",
    "A confirmação de presença será feita pelo cerimonial Ana Bonilla, que entrará em contato nos próximos dias. Pedimos, por gentileza, que respondam assim que possível. Em caso de dúvidas, estamos à disposição."
  ],
  attire: "Social Completo / Passeio Completo",
  image: "/assets/v-3.jpeg"
};

export const GIFTS: GiftOption[] = [
  {
    id: 'custom',
    title: 'Presente Livre',
    image: '/assets/presentes/presente-livre.png',
    isCustom: true,
    link: 'https://nubank.com.br/pagar/custom'
  },
  {
    id: '1',
    title: 'Aula de culinária para o noivo aprender a cozinhar',
    price: 280.94,
    image: '/assets/presentes/presente-aula-culinaria.jpeg',
    link: '#'
  },
  {
    id: '2',
    title: 'Coberto para a noiva que esta sempre comberta de razão',
    price: 526.08,
    image: '/assets/presentes/presente-cobertor-noiva.jpeg',
    link: '#'
  },
  {
    id: '3',
    title: 'Cota bike para o noivo acompanhar a noiva nas corridas',
    price: 448.36,
    image: '/assets/presentes/presente-cota-bike.jpeg',
    link: '#'
  },
  {
    id: '4',
    title: 'Cota de le creuset para noiva mobiliar a cozinha',
    price: 572.70,
    image: '/assets/presentes/presente-cota-le.jpeg',
    link: '#'
  },
  {
    id: '5',
    title: 'Cota tenis de corrida para a noiva voar na sua primeira maratona',
    price: 396.56,
    image: '/assets/presentes/presente-cota-tenis.jpeg',
    link: '#'
  },
  {
    id: '6',
    title: 'Garanta seu ingresso na renovação de votos',
    price: 1049.34,
    image: '/assets/presentes/presente-ingresso-renovacao.jpeg',
    link: '#'
  },
  {
    id: '7',
    title: 'Se por acaso você se sentir tocado',
    price: 2624.31,
    image: '/assets/presentes/presente-se-por-acaso.png',
    link: '#'
  },
  {
    id: '8',
    title: 'Alvará para meter o louco na festa',
    price: 676.32,
    image: '/assets/presentes/presente-alvara-meter.jpeg',
    link: '#'
  },
  {
    id: '9',
    title: 'Passe para furar a fila do bar',
    price: 914.64,
    image: '/assets/presentes/presente-passe-furar.jpeg',
    link: '#'
  }
];
