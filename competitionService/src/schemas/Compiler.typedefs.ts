import {gql} from 'apollo-server';

const typeDefs = gql`
scalar Upload

type File{
    url:String
}
 
  extend type Query {
    hello: String
  }  

  input uploadInput{     
    file: Upload!
  }

  extend type Mutation {    
    uploadFile(file :Upload!):File!
  }

`;


export default typeDefs;