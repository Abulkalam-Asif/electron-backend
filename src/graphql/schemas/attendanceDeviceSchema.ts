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

  type MutationResponse {
    success: Boolean!
    message: String
    attendanceDevice: AttendanceDevice
  }

  type Query {
    getAllAttendanceDevices: [AttendanceDevice]
  }

  type Mutation {
    addNewAttendanceDevice(
      name: String!
      ip: String!
      port: String!
      serialNumber: String!
      locationId: ID!
    ): MutationResponse

    editAttendanceDevice(
      id: ID!
      name: String!
      ip: String!
      port: String!
      serialNumber: String!
      locationId: ID!
    ): MutationResponse

    deleteAttendanceDevice(id: ID!): MutationResponse
  }
`;
