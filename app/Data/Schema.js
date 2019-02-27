const { makeExecutableSchema } = require('graphql-tools');
const { bookResolvers, typeBook } = require('./schema/books');
const { postResolvers, typePost } = require('./schema/posts');


const typeDefs = `
  type Query { posts: [Post], books: [Book] }
  ${typePost}
  ${typeBook}
`;

const resolvers = {
  Query: {
    ...postResolvers.Query,
    ...bookResolvers.Query
  }
};

module.exports = makeExecutableSchema({ typeDefs, resolvers })
