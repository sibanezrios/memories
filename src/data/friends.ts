import md5 from 'md5'

export interface Friend {
  id: string
  name: string
  quote: string
  passwordHint: string
  password: string
  images: string[]
  videos?: string[]
  note?: string
}

export const friends: Friend[] = [
  {
    id: 'sandra',
    name: 'Sandra',
    quote: 'algunas personas llegan justo cuando más las necesitas',
    passwordHint: '¿Qué me regaló de Navidad?',
    password: md5('billetera'),
    images: ['1.png', '2.png', '3.png', '4.png', '5.png', '6.png'],
    note: 'gracias por ser mi primera amistad, por las risas y por todos esos momentos inolvidables.',
  },
  {
    id: 'valeria',
    name: 'Valeria',
    quote: 'no sabía que te necesitaba hasta que te encontré',
    passwordHint: '¿Cuál es el deporte que nos unió y dónde?',
    password: md5('volley playa'),
    images: [
      '1.png',  '2.png',  '3.png',  '4.png',  '5.png',
      '6.png',  '7.png',  '8.png',  '9.png',  '10.png',
      '11.png', '12.png', '13.png', '14.png', '15.png',
      '16.png', '17.png', '18.png', '19.png', '20.png',
      '21.png', '22.png', '23.png', '24.png', '25.png',
      '26.png', '27.png', '28.png', '29.png', '30.png',
      '31.png', '32.png', '33.png', '34.png', '35.png',
      '36.png', '37.png', '38.png', '39.png', '40.png',
      '41.png', '42.png', '43.png',
    ],
    note: undefined,
  },
  {
    id: 'sharell',
    name: 'Sharell',
    quote: 'manche Freundschaften brauchen keine gemeinsame Sprache, nur ein gemeinsames Herz',
    passwordHint: '¿Cuál es el idioma que nos unió? (en ese idioma)',
    password: md5('deutsch'),
    images: ['01.jpeg'],
    videos: ['video1.mp4', 'video2.mp4'],
    note: 'gracias por darme contacto físico aun cuando no te gusta mucho darlo.\n\nte quiero mucho, y ni me tienes que responder porque ya sé que tú igual. duhh.',
  },
  {
    id: 'cata',
    name: 'Cata',
    quote: 'las mejores personas aparecen sin aviso y se quedan para siempre',
    passwordHint: '¿Cuál es nuestro lugar favorito juntas?',
    password: md5('cata'),
    images: ['1.jpeg', '2.jpeg', '3.jpeg'],
    note: undefined,
  },
  {
    id: 'javid',
    name: 'Javid',
    quote: 'los mejores recuerdos todavía están por vivirse',
    passwordHint: '¿Cuál es el idioma que nos unió? (en ese idioma)',
    password: md5('deutsch'),
    images: ['01.jpeg'],
    note: 'las fotos de nuestra aventura en Deutschland están por escribirse...\n\nmuy pronto, cuando crucemos juntas esas calles que tanto hemos esperado, este sobre se llenará de todo lo que aún no tiene nombre.',
  },
]
