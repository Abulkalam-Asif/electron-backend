import { gql } from "apollo-server-express";

export const attendanceDeviceTypeDefs = gql`
  type AttendanceDevice {
    id: ID!
    name: String!
    ip: String!
    port: String!
    serialNumber: String!
    locationRef: Location!
  }

  type Query {
    getAttendanceDevices: [AttendanceDevice]
  }

  type Mutation {
    addAttendanceDevice(
      name: String!
      ip: String!
      port: String!
      serialNumber: String!
      locationId: ID!
    ): AttendanceDevice
    editAttendanceDevice(
      id: ID!
      name: String!
      ip: String!
      port: String!
      serialNumber: String!
      locationId: ID!
    ): AttendanceDevice
    deleteAttendanceDevice(id: ID!): Boolean
  }
`;
