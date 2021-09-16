const { gql } = require("apollo-server-express")

const typeDefs = gql`
    
    extend type Query{
        countResources:[Item]
    }
    type Item {
        name:String,
        count:Int
    }
`;
module.exports={
    typeDefs
}