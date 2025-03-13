import { gql } from "apollo-server-express";

export const locationTypeDefs = gql`
  type Location {
    id: ID!
    name: String!
    description: String!
    pin: String!
  }

  type Query {
    getAllLocations: [Location]
  }

  type Mutation {
    addNewLocation(name: String!, description: String!, pin: String!): Boolean
    editLocation(
      id: ID!
      name: String!
      description: String!
      pin: String!
    ): Boolean
    deleteLocation(id: ID!): Boolean
  }
`;
