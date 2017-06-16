const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('../config.js')

exports.isAuth = function(req,res, next){
if (!req.headers.authorization){
    return res.status(403).send({message: 'No tienes autorizacion'})
}
const token= req.headers.authorization.split(" ")[1]
const payload = jwt.decode(token, config.SECRET_TOKEN)
if (payload.exp <= moment.unix()){
    return res.status(401).send({message: 'El token ha expirado'})
}
req.user= payload.sub
console.log(req.user)
next()


}