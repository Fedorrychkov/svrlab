const { makeExecutableSchema } = require('graphql-tools');
const Amplifier = use('App/Models/Product');

const typeAmplifier = `
  type Amplifier {
    id: ID!
    name: String!,
    short: String,
    customFields: String,
    inventory: Int,
    isAvailable: Int,
    cost: Int,
    created_at: String,
    updated_at: String
  }
`;

// Some fake data

// const amplifiers = [
//   {
//     id: 1,
//     name: "Усилитель двухтактный",
//     short: "Усилитель для многокаланльного звука бла бла бла",
//     isAvailable: true,
//     cost: 90000,
//     customFields: '',
//     inventory: 0
//   }
// ];

// The resolvers
const amplifiertResolvers = {
  Query: { amplifiers: async () => {
    const amplifiers = await Amplifier.all();
    return amplifiers.toJSON()
  }},
};

module.exports = { typeAmplifier, amplifiertResolvers }
