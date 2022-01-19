import {gql} from 'apollo-server';

const typeDefs = gql`
  
type Exam @key(fields: "id"){
    id: ID! 
    subjectid:String!   
    organizerid:String!
    duration_in_minutes: Int!
    total_question: Int!
    need_to_be_correct:Int!
    valid_till_hrs:Int!
    ques_ans_ids:[String]! 
  }
 
  extend type Query {
    getExams: [Exam]
  }  

  input createExamInput{     
    subjectid:String   
    organizerid:String
    duration_in_minutes: Int
    total_question: Int
    need_to_be_correct:Int
    valid_till_hrs:Int
    ques_ans_ids:[String] 
  }

  extend type Mutation {    
    createExam(input :createExamInput):Exam
  }

`;


export default typeDefs;