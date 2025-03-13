import attendanceDeviceResolver from "./attendanceDeviceResolver";
import locationResolver from "./locationResolver";
import userResolver from "./userResolver";

const resolvers = {
  Query: {
    ...userResolver.Query,
    ...locationResolver.Query,
    ...attendanceDeviceResolver.Query,
  },
  Mutation: {
    ...userResolver.Mutation,
    ...locationResolver.Mutation,
    ...attendanceDeviceResolver.Mutation,
  },
};

export default resolvers;
