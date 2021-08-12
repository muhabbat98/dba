const express = require("express")
const {  ApolloServer} = require("apollo-server-express")
const multer  = require('multer')

const {PORT } = require("./settings")

const user = require("./modules/users")
const journal = require("./modules/journal")
const bookController = require('./modules/files/bookController.js')
const coverController = require('./modules/files/coverController.js')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/tmp/my-uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage })

const modules = [
  user,
  journal
]
const app = express();

app.post('/book', upload.single('book'),bookController);
app.post('/cover',upload.single('cover'), coverController);

const server = new ApolloServer({modules});
server.applyMiddleware({ app });

app.listen({ port: PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:5000${server.graphqlPath}`)
)