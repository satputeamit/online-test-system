import {gql} from 'apollo-server';

const typeDefs = gql`
  
type Participant{
    id: ID! 
    exam_id:String
    candidate_ids: [String]
  }
 
  extend type Query {
    getParticipants: [Participant]
  }  

  input AddParticipantInput{     
    exam_id:String
    candidate_ids: [String]
  }

  extend type Mutation {    
    addParticipants(input :AddParticipantInput):Participant
  }

`;


export default typeDefs;