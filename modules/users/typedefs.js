const { gql } = require("apollo-server-express")

const typeDefs = gql`
    type User{
        user_id:Int!
        username:String!
        password:String!
    }
    type Query{
        users:[User!]!
    }
`;
module.exports={
    typeDefs
}