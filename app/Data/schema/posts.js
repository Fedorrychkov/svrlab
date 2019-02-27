const { makeExecutableSchema } = require('graphql-tools');

const typePost = `
  type Post { title: String, author: String }
`;

// Some fake data

const posts = [
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
const postResolvers = {
  Query: { posts: () => posts },
};

module.exports = { typePost, postResolvers }
