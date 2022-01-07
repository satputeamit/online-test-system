import { ApolloServer } from "apollo-server";
import { buildSubgraphSchema } from "@apollo/federation";
import { applyMiddleware } from "graphql-middleware";

import subTypeDefs from "./schemas/Subject.typedefs";
import subResolvers from "./resolvers/Subject.resolvers";
import qaTypeDefs from "./schemas/QuesAns.typedefs";
import qaResolvers from "./resolvers/QuesAns.resolvers";
import examTypeDefs from "./schemas/Exam.typedefs";
import examResolvers from "./resolvers/Exam.resolvers";

import mongoose from "mongoose";

async function connectDb() {
  await mongoose.connect("mongodb://127.0.0.1:27017/competitionService");
}

const server = new ApolloServer({
  schema: buildSubgraphSchema([
    { typeDefs: subTypeDefs, resolvers: subResolvers },
    { typeDefs: qaTypeDefs, resolvers: qaResolvers },
    { typeDefs: examTypeDefs, resolvers: examResolvers },
  ]),

  context: async ({ req }) => {
    if (req.headers.user) {
      const user = JSON.parse(req.headers.user as string);
      console.log(user);
      return { user };
    }
    return {};
  },
});

server.listen(4002).then(({ url }) => {
  connectDb();
  console.log(`Competition service ready at ${url}`);
});
