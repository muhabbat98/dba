const { modelSingle, modelAll} = require('../../connection/pool')

const USERS = `SELECT * FROM users`

const ADD_USER = `INSERT INTO users(username, password, full_name, is_admin) VALUES($1, crypt($2, gen_salt('bf')), $3, $4) RETURNING user_id username, is_admin, full_name;`

const ISUSER = `SELECT * FROM users WHERE username=$1 AND password = crypt($2, password) AND is_admin=$3`

const DELETEUSER = `DELETE FROM users WHERE user_id = $1 RETURNING username`



const addUser =     (username, password, fullName, isAdmin)    =>       modelSingle(ADD_USER, username, password, fullName, isAdmin)
const isUser =      (username, password, isAdmin)              =>       modelSingle(ISUSER, username, password, isAdmin)
const allUsers =    ()                                         =>       modelAll(USERS)
const deleteUser =  (userId)                                   =>       modelSingle(DELETEUSER, userId)


  module.exports = {
      addUser,
      isUser,
      allUsers,
      deleteUser
  }