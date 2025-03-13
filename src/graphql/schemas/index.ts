import { attendanceDeviceTypeDefs } from "./attendanceDeviceSchema";
import { locationTypeDefs } from "./locationSchema";
import { settingsTypeDefs } from "./settingsSchema";
import { userTypeDefs } from "./userSchema";

const typeDefs = [
  userTypeDefs,
  locationTypeDefs,
  attendanceDeviceTypeDefs,
  settingsTypeDefs,
];

export default typeDefs;
