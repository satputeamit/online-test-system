import { ApolloGateway, RemoteGraphQLDataSource } from "@apollo/gateway";
import { ApolloServer } from "apollo-server-express";
import express, { Request, Response } from "express";
import expressJwt from "express-jwt";
import dotenv from "dotenv";
// import cors from "cors";
const cors = require('cors');

dotenv.config();
const port = 4000;
const app = express();

app.use(cors({
  origin:"*"
}))

// app.use((req, resp, next) => {
//   next()
// }, cors({ maxAge: 84600 }))

app.use(
  expressJwt({
    secret: process.env.JWTSCRET || "agb",
    algorithms: ["HS256"],
    credentialsRequired: false,
  })
);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/", function (req, res) {
  res.send("Hello world!");
});

let auth_service_url = ""
let competition_service_url = ""
if(process.env.AUTH_SERVICE_URL){
  auth_service_url = "http://"+process.env.AUTH_SERVICE_URL+"/graphql"
}
else{
  auth_service_url = "http://localhost:4001/graphql"
}

if(process.env.COMPETITION_SERVICE_URL){
  competition_service_url = "http://"+process.env.COMPETITION_SERVICE_URL+"/graphql"
}
else{
  competition_service_url = "http://localhost:4002/graphql"
}

console.log("AUTH URL :", auth_service_url)
console.log("COMP URL :",competition_service_url)

const gateway = new ApolloGateway({
  serviceList: [
    { name: "authService", url: auth_service_url },
    { name: "competitonService", url: competition_service_url},
  ],
  buildService({ name, url }) {
    return new RemoteGraphQLDataSource({
      url,
      willSendRequest({ request, context }: any) {
        console.log("us willsend :", context.user)
        request.http.headers.set(
          "user",
          context.user ? JSON.stringify(context.user) : null
        );
        // request.http.headers.set("Access-Control-Allow-Origin", "*");
        // request.http.headers.set("Access-Control-Allow-Methods", "GET, PUT, POST");
        // request.http.headers.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
        
      },
    });
  },
});

const server = new ApolloServer({
  gateway,
  context: ({ req }) => {
    console.log("inside context:")
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
