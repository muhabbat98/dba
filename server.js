const express = require("express")
const bodyParser = require ("body-parser")
const {  ApolloServer} = require("apollo-server-express")

const {PORT } = require("./settings")

const user = require("./modules/users")

const modules = [
  user
]
const app = express();

const server = new ApolloServer({modules});
server.applyMiddleware({ app });

app.listen({ port: PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:3000${server.graphqlPath}`)
)