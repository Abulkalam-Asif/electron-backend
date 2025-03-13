import { gql } from "apollo-server-express";

export const settingsTypeDefs = gql`
  type Settings {
    id: ID!
    ip: String!
    port: String!
    apiKey: String!
  }

  type MutationResponse {
    success: Boolean!
    message: String
  }

  type Query {
    getSettings: Settings
  }

  type Mutation {
    updateSettings(
      ip: String!
      port: String!
      apiKey: String!
    ): MutationResponse
  }
`;
