const { makeExecutableSchema } = require('graphql-tools');
const { bookResolvers, typeBook } = require('./schema/books');
const { postResolvers, typePost } = require('./schema/posts');
const { amplifiertResolvers, typeAmplifier } = require('./schema/amplifiers');


const typeDefs = `
  type Query { posts: [Post], books: [Book], amplifiers: [Amplifier] }
  ${typePost}
  ${typeBook}
  ${typeAmplifier}
`;

const resolvers = {
  Query: {
    ...postResolvers.Query,
    ...bookResolvers.Query,
    ...amplifiertResolvers.Query
  }
};

module.exports = makeExecutableSchema({ typeDefs, resolvers })
