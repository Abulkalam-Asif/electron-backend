import attendanceDeviceResolver from "./attendanceDeviceResolver";
import locationResolver from "./locationResolver";
import settingsResolver from "./settingsResolver";
import userResolver from "./userResolver";

const resolvers = {
  Query: {
    ...userResolver.Query,
    ...locationResolver.Query,
    ...attendanceDeviceResolver.Query,
    ...settingsResolver.Query,
  },
  Mutation: {
    ...userResolver.Mutation,
    ...locationResolver.Mutation,
    ...attendanceDeviceResolver.Mutation,
    ...settingsResolver.Mutation,
  },
};

export default resolvers;
