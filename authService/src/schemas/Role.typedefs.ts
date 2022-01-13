import {gql} from 'apollo-server';

const typeDefs = gql`
  
  type Role {
    id: ID!   
    role: String!    
    
  } 

  extend type Query {
    getRoles: [Role]
  }
  

  input addRoleInput{    
    role: String!     
  }

  extend type Mutation {   
    addRole(input :addRoleInput):Role
  }

`;


export default typeDefs;