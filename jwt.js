const jwt = require('jsonwebtoken')
const SECRET_KEY = '!@#qweasd123'


const sign = (payload)=>jwt.sign(payload, SECRET_KEY)
const verify = (token)=>jwt.verify(token, SECRET_KEY)

module.exports = {
    sign,
    verify
}