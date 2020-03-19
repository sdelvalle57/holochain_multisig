import gql from 'graphql-tag';

export const typeDefs = gql`
  directive @loadEntry on FIELD_DEFINITION

  type Course {
    id: ID!
    title: String!
    modules: [Module!]! @loadEntry
    teacher_address: ID!
    students: [ID!]!
  }

  type Module {
    id: ID!
    course_address: Course! @loadEntry
    title: String!
    contents: [Content!]! @loadEntry
  }

  type Content {
    id: ID!
    name: String!
    description: String!
    url: String!
  }



  input ContentInput {
    name: String!
    description: String!
    url: String!
  }

`;

/*
 */
