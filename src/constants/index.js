const Songs = [
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
    id: 1,
    createdAt: '1 Hour ago',
    caption: 'Lorem ipsum dolar arigato gonsaimus, m dolar arigato gonsaimus',
    musicFile: 'google.com',

    user: {
      id: 999,
      name: 'Talal Abbas',
    },
  },

  {
    id: 1,
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

export {POSTS, Songs, COMMENTS};
