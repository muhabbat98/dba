const {model} = require('../../connection/pool')

const ADD_USER = `INSERT INTO users(username, password, full_name) VALUES($1, crypt($2, gen_salt('bf')), $3) RETURNING username, is_admin, full_name;`
const ISUSER = `SELECT * FROM users WHERE username=$1 AND passoword = crypt($2, password)`

const addUser = (username, password, fullName)=>model(ADD_USER, username, password, fullName)
const isUser = (username, password)=>model(ISUSER, username, password)

  module.exports = {
      addUser,
      isUser
  }