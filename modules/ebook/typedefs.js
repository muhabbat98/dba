const { gql } = require("apollo-server-express");

const typeDefs = gql`

  extend type Query {
    departments:[Department]
    eBooks:[Ebook]
  }
  type Department{
    id:Int
    name: String
  }

  type Ebook{
    id: Int
    file: File
    cover:Cover
    department:String
    name:String,
    author:String
  }

  extend type Mutation {
    createDepartment(name:String): Department
    createEbook(fileId:Int, coverId:Int, departmentId:Int, name:String, author:String): Ebook
  }
`;
module.exports = {
  typeDefs,
};
