const { GraphQLServer } = require("graphql-yoga");
const fetch = require("node-fetch");

const typeDefs = `
  type Query {
    pokemon(id: Int!): Pokemon
    pokemons: [Pokemon]
  }

  type Pokemon {
    id: Int
    name: PokemonName
    type: [String]
    base: PokemonBase
    species: String
    description: String
    sprite: String
    thumbnail: String
  }

  type PokemonBase {
    HP: String
    Attack: String
    Defense: String
    Speed: String
  }

  type PokemonName {
    english: String
    japanese: String
    chinese: String
    french: String
  }
`;

const resolvers = {
  Query: {
    pokemon: async (_, { id }) => {
      const response = await fetch(`https://app.pokemon-api.xyz/pokemon/${id}`);
      return response.json();
    },
    pokemons: async (_, __, { dataSources }) => {
      const response = await fetch("https://app.pokemon-api.xyz/pokemon/all");
      return response.json();
    },
  },
};

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(() => console.log("Server is running on localhost:4000"));
