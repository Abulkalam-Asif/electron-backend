import locationResolver from "./locationResolver";
import userResolver from "./userResolver";

const resolvers = {
  Query: {
    ...userResolver.Query,
    ...locationResolver.Query,
  },
  Mutation: {
    ...userResolver.Mutation,
    ...locationResolver.Mutation,
  },
};

export default resolvers;
