import { gql } from "@apollo/client";

export const GET_USERS_DEF = gql`
  query {
    users {
      email      
      id
    }
  }
`;

export const GET_EXAMS = gql`
query{
  getExams {
    id
    total_question
    ques_ans_ids
    duration_in_minutes
    need_to_be_correct
    ques_ans_ids
    subjectid
    valid_till_hrs
    need_to_be_correct  
    subject{
      name
    }

  }
}
`;

export const GET_USER_PROFILE = gql`
query{
  getUserInfo {
    first_name
    last_name
    mobile_number
    profile_pic  
    user_id
  }
}
`;

export const GET_EXAM_QUESTIONS= gql`
query($examId: String!){
  getExamsQA(input:{examId:$examId}) {
    id
    question
  }
}
`;

export const GET_RESULT= gql`
query($exam_id: String, $candidate_id: String){
  getResult(input: {exam_id:$exam_id,candidate_id: $candidate_id}) {    
    subject
    result_status
  }
}
`;

export const GET_CANDIDATE_EXAM_STATUS= gql`
query($exam_id:String!, $candidate_id: String!){
  getCandidateExamStatus(input: {exam_id: $exam_id, candidate_id: $candidate_id}){
    id
    candidate_id
    exam_id
    exam_status
    question_ids

  }
}
`;

export const GET_CANDIDATES_EXAM= gql`
query( $candidate_id: String!){
  getExamsByCandidate(input: {candidate_id: $candidate_id}) {
    exam_id
    exam_status
  }
}

`;

export const GET_SUBJECTS = gql`
query{
  getSubjects {
    id
    name
  }
}
`;


export const GET_QUESTIONS = gql`
query($input: QuestionsBySubInput){
  getQuestionsBySubject(input: $input) {
    id
    question
  }
}
`;


