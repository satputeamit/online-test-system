import {gql} from 'apollo-server';

const typeDefs = gql`
  type CandidateExamStatus{
    id: ID!
    exam_id:String!
    candidate_id:String!
    question_ids: [String]!
    exam_status: String
  }

  input GetCandidateExamStatusInput{
    exam_id:String!
    candidate_id:String!
  }
  extend type Query {
    getCandidateExamStatus(input:GetCandidateExamStatusInput): CandidateExamStatus
  }  

  input AddCandidateExamStatusInput{     
    exam_id:String!   
    candidate_id:String!
    question_id: String!
    exam_status: String
   
  }

  extend type Mutation {    
    createCandidateExamStatus(input :AddCandidateExamStatusInput):CandidateExamStatus
  }

`;


export default typeDefs;