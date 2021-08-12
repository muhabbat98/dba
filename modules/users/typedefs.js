const { gql } = require("apollo-server-express")

const typeDefs = gql`
    scalar Object
    type Query{
        users:[User]
    }
    type User{
        userId:Int
        username:String!
        password:String!
        fullName:String
        isAdmin:Boolean
    }
    input InputUser{
        username:String!
        password:String!
        fullName:String
        isAdmin:Boolean
    }
  
    type Mutation{
        isUser(useInfo:InputUser):Object
        addUser(useInfo:InputUser):Object
        deleteUser(userId:Int):String
    }
`;
module.exports={
    typeDefs
}