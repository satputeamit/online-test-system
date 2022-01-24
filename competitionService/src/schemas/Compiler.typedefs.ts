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

  type CodeExecType{
    stdout: String
    stderr: String
  }

  input FileDataInput{     
    content: String!
    language: String!
    user_id: String!
    exam_id: String!
    question_id: String!
  }

  extend type Mutation {    
    uploadFile(file :Upload!):File!
    codeExec(input:FileDataInput):CodeExecType!
  }

`;


export default typeDefs;