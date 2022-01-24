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

export const CODE_EXEC = gql`
mutation($code:String!, $language:String!, $user_id:String!, $exam_id: String!, $question_id: String!)
{
 codeExec(input: {content:$code, language:$language, user_id:$user_id, exam_id:$exam_id, question_id: $question_id}) {
   stdout
   stderr
 }
}
`

