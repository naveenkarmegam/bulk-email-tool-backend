const {sign} = require('jsonwebtoken');


const generateToken = (id) =>{
    return sign({id},process.env.JWT_SECRTE_KEY,{expiresIn:'1d'})
}

module.exports = generateToken;
