import {gql} from 'apollo-server';

const typeDefs = gql`
type QuestionStatus{
  question_id: String
  status: Int
}

type Result{
    id: ID! 
    exam_id:String
    candidate_id: String
    question_status: [QuestionStatus]
    result:String
  }

 
 
  extend type Query {
    getResults: [Result]
  }  

  input QuestionStatusInput{
    question_id: String
    status: Int
  }

  input AddResultInput{     
    exam_id:String
    candidate_id: String
    question_status: [QuestionStatusInput]
    result: String
  }

  extend type Mutation {    
    addResult(input :AddResultInput):Result
  }

`;


export default typeDefs;