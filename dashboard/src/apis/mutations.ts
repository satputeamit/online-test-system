import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation ($email: String!, $password: String!){
    login(input: {email: $email, password: $password})
  }
`;


export const SIGNUP = gql`
  mutation ($email: String!, $password: String!, $role:Roles!){
    createUser(input: {email: $email, password: $password, role:$role}) {
      email
      id
    }
  }
`;

