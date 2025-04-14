require("dotenv").config();
import express, { Application } from "express";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import resolvers from "./graphql/resolvers";
import typeDefs from "./graphql/schemas";
import { Request, Response } from "express";

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Enable CORS with more permissive settings for Electron
app.use(
	cors({
		origin: process.env.FRONTEND_URL || [
			"http://localhost:5173",
			"app://.",
			"electron://altair",
		],
		credentials: true,
		allowedHeaders: ["Content-Type", "Authorization"],
	})
);

// Required middleware for Apollo
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
	res.send("GraphQL API is running");
});

// Create Apollo Server
async function startServer() {
	const server = new ApolloServer({
		typeDefs,
		resolvers,
		context: ({ req }) => {
			// Get the authorization header
			const token = req.headers.authorization || "";

			// Add token to context so resolvers can access it
			return { token };
		},
		formatError: (error) => {
			// Log server errors for debugging
			console.error("GraphQL Error:", error);

			// Return user-friendly error
			return {
				message: error.message,
				path: error.path,
				extensions: error.extensions,
			};
		},
	});

	await server.start(); // Ensure Apollo Server is started before applying middleware
	server.applyMiddleware({
		app: app as any,
		path: "/graphql",
		cors: false, // Important: let Express handle CORS
	});

	app.listen(PORT, () => {
		console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
	});
}

startServer();
