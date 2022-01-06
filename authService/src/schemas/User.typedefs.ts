import {gql} from 'apollo-server';

const typeDefs = gql`
  
  type User @key(fields: "id") {
    id: ID!
    email: String!
    password: String!
    role: Role
    permissions: [String]
    
  }  

  enum Role {
    ADMIN
    ORGANIZER
    CANDIDATE    
  }

  extend type Query {
    users: [User]
  }

  input LoginCreds{
    email: String!
    password: String!
  }

  input createUserInput{    
    email: String!
    password: String!
    role: Role    
  }

  extend type Mutation {
    login(input: LoginCreds): String
    createUser(input :createUserInput):User
  }

`;


export default typeDefs;