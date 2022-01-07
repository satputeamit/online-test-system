import {gql} from 'apollo-server';

const typeDefs = gql`
  
type Result{
    id: ID! 
    exam_id:String
    candidate_id: String
    result:String
  }
 
  extend type Query {
    getResults: [Result]
  }  

  input AddResultInput{     
    exam_id:String
    candidate_id: String
    result: String
  }

  extend type Mutation {    
    addResult(input :AddResultInput):Result
  }

`;


export default typeDefs;