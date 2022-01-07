import {gql} from 'apollo-server';

const typeDefs = gql`
  
type QuesAns{
    id: ID! 
    subjectid:String
    question: String
    answer: String
    organizerid:String
  }
 
  extend type Query {
    getQAData: [QuesAns]
  }  

  input createQuesAns{     
    subjectid:String
    question: String
    answer: String
    organizerid:String
  }

  extend type Mutation {    
    createQuesAns(input :createQuesAns):QuesAns
  }

`;


export default typeDefs;