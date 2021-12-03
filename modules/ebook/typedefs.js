const { gql } = require("apollo-server-express");

const typeDefs = gql`

  extend type Query {
    departments(id:Int):[Department]
    eBooks(departmentId:Int):[Ebook]
    eBook(id:Int):Ebook
  }
  type Department{
    id:Int
    name: String
    eBooks(departmentId:Int):[Ebook]
  }

  type Ebook{
    id: Int
    file: File
    cover:Cover
    department:Department
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
