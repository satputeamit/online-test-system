import { ApolloServer, gql } from "apollo-server";
import { buildSubgraphSchema } from "@apollo/federation";
import {applyMiddleware} from "graphql-middleware";
import userTypeDefs from "./schemas/User.typedefs";
import userResolvers from "./resolvers/User.resolvers";
import profileTypeDefs from "./schemas/UserProfile.typeDefs";
import profileResolvers from "./resolvers/UserProfile.resolvers";

import mongoose from "mongoose";
import { permissions } from "./helper/permissions";



async function connectDb() {
  await mongoose.connect("mongodb://127.0.0.1:27017/authservice");
}

const server = new ApolloServer({
  schema:applyMiddleware(
    buildSubgraphSchema([
    { typeDefs: userTypeDefs, resolvers: userResolvers },
    { typeDefs: profileTypeDefs, resolvers: profileResolvers },
  ]),
  permissions
  ),
  context: async ({ req }) => {   
    if (req.headers.user) {
      const user = JSON.parse(req.headers.user as string);   
      console.log( user)   
      return { user };
    }
    return {};
  },
});

server.listen(4001).then(({ url }) => {
  connectDb();
  console.log(`🚀 Auth service ready at ${url}`);
});

// const app = express();

// app.get('/', function(req, res){
//   res.send("Hello world!");
// });
// const server = new ApolloServer({
//   schema: buildSubgraphSchema([{ typeDefs, resolvers }]),
// });

// server.start()
// .then(()=>{
//   server.applyMiddleware({app:app});
//  connectDb()
//   app.listen(4001, () => console.log('Server started'));
// })
