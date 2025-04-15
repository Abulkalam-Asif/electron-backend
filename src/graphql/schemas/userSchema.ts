import { gql } from "graphql-tag";

export const userTypeDefs = gql`
	type User {
		id: ID!
		name: String!
		email: String!
		username: String!
		password: String!
		isActive: Boolean!
	}

	type UserResponse {
		id: ID
		username: String
		success: Boolean
		message: String
	}

	type Query {
		getAllUsers: [User]
	}

	type Mutation {
		loginUser(username: String!, password: String!): String
		createUser(
			name: String!
			email: String!
			username: String!
			password: String!
		): UserResponse
		updateUser(
			username: String!
			name: String
			email: String
			password: String
		): UserResponse
		deactivateUser(id: ID!): UserResponse
		activateUser(id: ID!): UserResponse
		verifyToken(token: String!): Boolean
	}
`;
