import {gql} from 'apollo-server';

const typeDefs = gql`
  
type QuesAns{
    id: ID! 
    subjectid:String
    question: String
    answer: String
    inputs: [String]
    outputs: [String]
    organizerid:String
  }
 
  input examQAInput{     
    examId:String
  }

  input QuestionsBySubInput{
    subjectid:String!
  }
  extend type Query {
    getQAData: [QuesAns]
    getExamsQA(input:examQAInput):[QuesAns]
    getQuestionsBySubject(input:QuestionsBySubInput):[QuesAns]
  }  

  input createQuesAns{     
    subjectid:String
    question: String
    answer: String
    inputs: [String]
    outputs: [String]
    organizerid:String
  }

  extend type Mutation {    
    createQuesAns(input :createQuesAns):QuesAns
  }

`;


export default typeDefs;