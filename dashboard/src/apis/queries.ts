import { gql } from "@apollo/client";

export const GET_USERS_DEF = gql`
  query {
    users {
      email      
      id
    }
  }
`;

