const SONGS = [
  {
    id: 1,
    title: 'Take on Me',
    author: 'Aha - Rick Roll',
  },
  {
    id: 2,
    title: 'Hurt',
    author: "Kevin O' Reily",
  },
  {
    id: 3,
    title: 'I Want to Break Free',
    author: 'Queen',
  },
  {
    id: 4,
    title: 'Before You Go',
    author: 'Lewis Capaldi',
  },
  {
    id: 5,
    title: 'Half A Man',
    author: 'Dean Lewis',
  },
];

const POSTS = [
  {
    id: 1,
    createdAt: '30 minutes ago',
    musicFile: 'google.com',
    caption: 'Lorem ipsum dolar arigato gonsaimus, m dolar arigato gonsaimus',

    user: {
      id: 999,
      name: 'Talal Abbas',
    },
  },

  {
    id: 2,
    createdAt: '1 Hour ago',
    caption: 'Lorem ipsum dolar arigato gonsaimus, m dolar arigato gonsaimus',
    musicFile: 'google.com',

    user: {
      id: 999,
      name: 'Talal Abbas',
    },
  },

  {
    id: 3,
    caption: 'Lorem ipsum dolar arigato gonsaimus, m dolar arigato gonsaimus',
    createdAt: '3 Days Ago',
    musicFile: 'google.com',

    user: {
      id: 999,
      name: 'Umer Nasir',
    },
  },
];

const COMMENTS = [
  {
    id: 20,
    text: 'Hello this is the only comment',
    liked: false,
    createdAt: '3 Months Ago',
    likes: 7,

    user: {
      id: 9999,
      name: 'Umer',
    },
  },
  {
    id: 12,
    text: 'This is the second comment',
    liked: true,
    likes: 12,
    createdAt: '6 Days Ago',

    user: {
      id: 9999,
      name: 'Talal Abbas',
    },
  },
  {
    id: 33,
    text: 'Potato Man sucks',
    liked: false,
    likes: 96,
    createdAt: '2 Days Ago',

    user: {
      id: 9999,
      name: 'Umer',
    },
  },
];

const FRIENDS = [
  {
    id: 1,
    name: 'Talal Abbas',
  },
  {
    id: 2,
    name: 'Umer Nasir',
  },
  {
    id: 3,
    name: 'Adeela Meer',
  },
  {
    id: 4,
    name: 'Asbah Jaffri',
  },
  {
    id: 5,
    name: 'Eliza John',
  },
];

const PENDING = [
  {
    id: 6,
    name: 'Zahara Quresh',
  },
  {
    id: 7,
    name: 'Hassan Mujtaba',
  },
  {
    id: 8,
    name: 'Hamza Sheryar',
  },
];

export {POSTS, SONGS, COMMENTS, FRIENDS, PENDING};
