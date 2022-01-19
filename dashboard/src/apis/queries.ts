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

