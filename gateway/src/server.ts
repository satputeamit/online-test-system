import { ApolloGateway, RemoteGraphQLDataSource } from "@apollo/gateway";
import { ApolloServer } from "apollo-server-express";
import express, { Request, Response } from "express";
import expressJwt from "express-jwt";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const port = 4000;
const app = express();

app.use(cors())

app.use(
  expressJwt({
    secret: process.env.JWTSCRET || "agb",
    algorithms: ["HS256"],
    credentialsRequired: false,
  })
);

app.get("/", function (req, res) {
  res.send("Hello world!");
});

const gateway = new ApolloGateway({
  serviceList: [
    { name: "authService", url: "http://localhost:4001/graphql" },
    { name: "competitonService", url: "http://localhost:4002/graphql" },
  ],
  buildService({ name, url }) {
    return new RemoteGraphQLDataSource({
      url,
      willSendRequest({ request, context }: any) {
        request.http.headers.set(
          "user",
          context.user ? JSON.stringify(context.user) : null
        );
      },
    });
  },
});

const server = new ApolloServer({
  gateway,
  context: ({ req }) => {
    const user = req.user || null;
    return { user };
  },
});

server.start().then(() => {
  server.applyMiddleware({ app });

  app.listen({ port }, () =>
    console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`)
  );
});
