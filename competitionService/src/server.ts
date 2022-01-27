import { ApolloServer } from "apollo-server";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { applyMiddleware } from "graphql-middleware";

import subTypeDefs from "./schemas/Subject.typedefs";
import subResolvers from "./resolvers/Subject.resolvers";
import qaTypeDefs from "./schemas/QuesAns.typedefs";
import qaResolvers from "./resolvers/QuesAns.resolvers";
import examTypeDefs from "./schemas/Exam.typedefs";
import examResolvers from "./resolvers/Exam.resolvers";
import participantsTypeDefs from "./schemas/Participant.typedefs";
import participantsResolvers from "./resolvers/Participant.resolvers";
import resultTypeDefs from "./schemas/Result.typedefs";
import resultResolvers from "./resolvers/Result.resolver";
import compilerTypeDefs from "./schemas/Compiler.typedefs";
import compilerResolvers from "./resolvers/Compiler.resolvers";
import candidateExamStatusTypeDefs from "./schemas/CandidateExamStatus.typedefs";
import candidateExamStatusResolvers from "./resolvers/CandidateExamStatus.resolvers";


import mongoose from "mongoose";
import { permissions } from "./helper/permissions";
import { GraphQLResolverMap } from "apollo-graphql";



async function connectDb() {
  await mongoose.connect("mongodb://127.0.0.1:27017/competitionService");
}

const server = new ApolloServer({
  schema: applyMiddleware(buildSubgraphSchema([
    { typeDefs: subTypeDefs, resolvers: subResolvers },
    { typeDefs: qaTypeDefs, resolvers: qaResolvers },
    { typeDefs: examTypeDefs, resolvers: examResolvers },
    { typeDefs: participantsTypeDefs, resolvers: participantsResolvers },
    { typeDefs: resultTypeDefs, resolvers: resultResolvers },
    { typeDefs: compilerTypeDefs, resolvers: compilerResolvers},
    { typeDefs: candidateExamStatusTypeDefs, resolvers: candidateExamStatusResolvers},

  ]),permissions),

  context: async ({ req }) => {
    if (req.headers.user) {
      const user = JSON.parse(req.headers.user as string);
      console.log("user :",user);
      return { user };
    }
    return {};
  },
});

server.listen(4002).then(({ url }) => {
  connectDb();
  console.log(`Competition service ready at ${url}`);
});
