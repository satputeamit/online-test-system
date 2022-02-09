import {gql} from 'apollo-server';

const typeDefs = gql`
type QuestionStatus{
  question_id: String
  status: Int
}

type ExamResult{
  subject: String
  result_status: String
}

type ExamResultByOrg{
  exam_id:String
  subject: String
  status: String
  candidate_id:String  
}

type Result{
    id: ID! 
    exam_id:String
    candidate_id: String
    question_status: [QuestionStatus]
    result:String
  }

 
  input getResultInput{
    exam_id: String
    candidate_id: String
  }

  input getResultByOrdIdInput{    
    organizer_id: String
  }

  extend type Query {
    getResults: [Result]
    getResult(input:getResultInput): ExamResult
    getResultByOrgId(input:getResultByOrdIdInput):[ExamResultByOrg]
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