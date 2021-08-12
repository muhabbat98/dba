const { gql } = require("apollo-server-express");

const typeDefs = gql`

  extend type Query {
    siences: [Science]
  }
  type Cover{
	  coverId:Int
	  filename:String
	  mimetype:String
	  size:Int
  }
  type File{
	  fileId:Int
	  filename:String
	  mimetype:String
	  size:Int
  }
  type Science {
    id: Int
    file: File
    cover:Cover
    name: String!
    author:String
    degree:Int
    keywords: String
    resourceType: Int
    language: String
    description:String
    date: String
  }
  input ScienceInput {
    fileId: Int
    coverId:Int
    name: String!
    author:String
    degree:Int
    keywords: String
    resourceType: Int
    language: String
    description:String
    date: String
  }
  extend type Mutation {
    createScience(input: ScienceInput): BookStatus
    deleteScience(id:Int):String
  }
`;
module.exports = {
  typeDefs,
};
