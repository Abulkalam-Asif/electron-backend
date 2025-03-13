require("dotenv").config();
import express, { Application } from "express";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import resolvers from "./graphql/resolvers";
import typeDefs from "./graphql/schemas";

const app: Application = express();
const PORT = 5000;

// Enable CORS for Electron
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

// Required middleware for Apollo
app.use(express.json());

// Create Apollo Server
async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();
  server.applyMiddleware({ app: app as any, path: "/graphql" });

  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
  });
}

startServer();
