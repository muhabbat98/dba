const { gql } = require("apollo-server-express");

const typeDefs = gql`

  extend type Query {
    journals: [Journal]
  }


  type Journal {
    id: Int
    file: File
    cover:Cover
    name: String!
    keywords: String
    resourceType: Int
    language: String
    serialNumber: Int!
    year: Int!
    date: String
  }
  input JournalInput {
    fileId: Int
    coverId:Int
    name: String!
    keywords: String
    resourceType: Int
    language: String
    serialNumber: Int
    year: Int
    date: String
  }
  extend type Mutation {
    createJournal(input: JournalInput): BookStatus
  }
`;
module.exports = {
  typeDefs,
};
