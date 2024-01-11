const {verify} = require('jsonwebtoken')


const verifyToken = (token) =>{
    return new Promise((reslove,reject)=>{
        verify(token,process.env.JWT_SECRTE_KEY,(err,decoded)=>{
            if(err){
                reject(err)
            }else{
                reslove(decoded);
            }
        })
    }) 
}


module.exports = verifyToken;