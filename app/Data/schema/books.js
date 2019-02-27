const { makeExecutableSchema } = require('graphql-tools');

const typeBook = `
  type Book { title: String, author: String }
`;

// Some fake data

const books = [
  {
    title: "Harry Potter and the Sorcerer's stone",
    author: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
];

// The resolvers
const bookResolvers = {
  Query: { books: () => books },
};

module.exports = { typeBook, bookResolvers }
