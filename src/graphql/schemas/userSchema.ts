import { gql } from "graphql-tag";

export const userTypeDefs = gql`
  type User {
    id: ID!
    name: String!
    username: String!
    password: String!
  }

  type Query {
    _empty: String
  }

  type Mutation {
    loginUser(username: String!, password: String!): String
    verifyToken(token: String!): Boolean
  }
`;
