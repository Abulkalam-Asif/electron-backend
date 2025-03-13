import { gql } from "apollo-server-express";

export const locationTypeDefs = gql`
  type Location {
    id: ID!
    name: String!
    description: String!
    pin: String!
  }

  type MutationResponse {
    success: Boolean!
    message: String
    location: Location
  }

  type Query {
    getAllLocations: [Location]
  }

  type Mutation {
    addNewLocation(
      name: String!
      description: String!
      pin: String!
    ): MutationResponse
    editLocation(
      id: ID!
      name: String!
      description: String!
      pin: String!
    ): MutationResponse
    deleteLocation(id: ID!): MutationResponse
  }
`;
