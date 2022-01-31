import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation ($email: String!, $password: String!){
    login(input: {email: $email, password: $password}){
      accessToken
      email
      role
    }
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

export const CODE_SUBMIT = gql`
mutation($code:String!, $language:String!, $user_id:String!, $exam_id: String!, $question_id: String!)
{
 codeSubmit(input: {content:$code, language:$language, user_id:$user_id, exam_id:$exam_id, question_id: $question_id})
}
`

export const CANDIDATE_EXAM_STATUS = gql`
mutation($exam_id: String!, $candidate_id: String!, $question_id: String!){
  createCandidateExamStatus(input: {exam_id: $exam_id, candidate_id:$candidate_id, question_id: $question_id}) {
    id
    exam_id
    candidate_id
    question_ids    
    exam_status
  }
}
`

export const UPDATE_EXAM_STATUS = gql`
mutation($exam_id: String!, $candidate_id: String!, $exam_status: ExamStatus! ){
  updateCandidateExamStatus(input: {exam_id: $exam_id, candidate_id:$candidate_id, exam_status: $exam_status})
}
`


export const CREATE_QUAS_ANS = gql`
mutation($input: createQuesAns){
  createQuesAns(input: $input){
    id
    question
    subjectid
  }
}
`

export const CREATE_EXAM = gql`
mutation($input: createExamInput){
  createExam(input: $input) {
    id
    
  }
}
`



