import { gql } from "apollo-server";

const typeDefs = gql`
  type Subject @key(fields: "id") {
    id: ID!
    name: String!
  }

  extend type Exam {   
    subject: Subject
  }

  extend type Query {
    getSubjects: [Subject]
  }

  input addSubjectInput {
    name: String!
  }

  extend type Mutation {
    addSubject(input: addSubjectInput): Subject
  }
`;

export default typeDefs;
