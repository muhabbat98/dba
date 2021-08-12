const { gql } = require("apollo-server-express");

const typeDefs = gql`

  extend type Query {
    foriegnBooks: [ForiegnBook]
  }

  type ForiegnBook {
    id: Int
    file: File
    cover:Cover
    name: String!
    keywords: String
    resourceType: Int
    language: String
    date: String
	author:String
	description:String
	resourseHolder:String
  }
  input BookInput {
    fileId: Int
    coverId:Int
    name: String!
    keywords: String
    resourceType: Int
    language: String
    date: String
	author:String
	description:String
	resourseHolder:String
  }
  extend type Mutation {
    createForiegnBook(input: BookInput): BookStatus
  }
`;
module.exports = {
  typeDefs,
};
