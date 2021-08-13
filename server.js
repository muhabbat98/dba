const express = require("express")
const {  ApolloServer} = require("apollo-server-express")
const multer  = require('multer')
const path = require('path')
var cors = require('cors')

const {PORT } = require("./settings")

const user = require("./modules/users")
const journal = require("./modules/journal")
const foriegn = require("./modules/foriegn")
const science = require("./modules/science")


const bookController = require('./modules/files/bookController.js')
const coverController = require('./modules/files/coverController.js')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '/files'))
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now()
    cb(null, uniqueSuffix + file.originalname)
  }
})

const upload = multer({ storage: storage })

const modules = [
  user,
  foriegn,
  science,
  journal
]
const app = express();
app.use(cors())
app.use('/static', express.static('files'));
app.post('/book', upload.single('book'),bookController);
app.post('/cover',upload.single('cover'), coverController);

const server = new ApolloServer({modules,  context: ({ req }) => ({ token : req.headers.token || ''})});
server.applyMiddleware({ app });

app.listen({ port: PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:5000${server.graphqlPath}`)
)