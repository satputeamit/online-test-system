import {gql} from 'apollo-server';

const typeDefs = gql`
  
  type User @key(fields: "id") {
    id: ID!
    email: String!
    password: String!
    role: Roles
    permissions: [String]
    
  }  

  enum Roles {
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
    role: Roles  
  }
 
  type loginType{
    accessToken: String
    email: String
    role: String
  }
  extend type Mutation {
    login(input: LoginCreds):loginType
    createUser(input :createUserInput):User
  }

`;


export default typeDefs;