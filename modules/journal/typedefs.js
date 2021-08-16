const { gql } = require("apollo-server-express");

const typeDefs = gql`

  extend type Query {
    journals: [GeneralJournal],
    exactJournals(id:Int):[Journal]
  }
  type GeneralJournal{
    id:Int
    cover:Cover
    name: String!
    keywords: String
    resourceType: Int                           
    language: String
  }
  type Journal{
    id: Int
    file: File
    serialNumber: Int!
    year: Int!
    date: String
  }
  input JournalInput {
    fileId: Int
    serialNumber: Int!
    year: Int!
    date: String
    generalId:Int!
  }
  input TypeInput{
    coverId:Int
    name: String!
    keywords: String
    resourceType: Int
    language: String
  }
  extend type Mutation {
    createJournalType(input: TypeInput): GeneralJournal
    createJournal(input: JournalInput): BookStatus
  }
`;
module.exports = {
  typeDefs,
};
