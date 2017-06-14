const jwt = require('jwt-simple');
const moment= require('moment');
const  config = require('../config.js');

exports.createToken= function(user) {
const payload={
    sub: user._id,
    iat: moment().unix(),
    exp:moment().add(1, 'year').unix(),
};

return jwt.encode(payload, config.SECRET_TOKEN)
};