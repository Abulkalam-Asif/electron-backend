import { attendanceDeviceTypeDefs } from "./attendanceDeviceSchema";
import { locationTypeDefs } from "./locationSchema";
import { userTypeDefs } from "./userSchema";

const typeDefs = [userTypeDefs, locationTypeDefs, attendanceDeviceTypeDefs];

export default typeDefs;
