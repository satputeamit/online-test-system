import {gql} from 'apollo-server';

const typeDefs = gql`
  
type UserProfile{
    id: ID!
    user_id: String!
    first_name: String!
    last_name: String!
    mobile_number: Int
    profile_pic:String
  }
 

  extend type User {   
    userprofile: UserProfile
  }

  extend type Query {
    usersProfile: [UserProfile]
  }  

  input createUserProfileInput{     
    first_name: String!
    last_name: String!
    mobile_number: Int
    profile_pic:String    
  }

  extend type Mutation {    
    createUserProfile(input :createUserProfileInput):UserProfile
  }

`;


export default typeDefs;