import { gql } from "graphql-tag";

export const userTypeDefs = gql`
	type User {
		id: ID!
		name: String!
		username: String!
		password: String!
	}

	type UserResponse {
		id: ID
		username: String
		success: Boolean
		message: String
	}

	type Query {
		_empty: String
	}

	type Mutation {
		loginUser(username: String!, password: String!): String
		updateUser(username: String!, password: String!): UserResponse
		verifyToken(token: String!): Boolean
	}
`;
