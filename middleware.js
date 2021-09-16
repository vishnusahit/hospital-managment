let jwt = require('jsonwebtoken');
let config = require('./config');
let checkToken = (req,res,next)=>{
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    if(token.startsWith('Bearer')){
        token = token.slice(7,token.length);
    }
    if(token){
        jwt.verify(token,config.secret,(err,decoded)=>{
            if(err){
                return res.json({
                    success:false,
                    message:'Token is not valid'
                });
            }else {
                //console.log('Success...');
                req.decoded=decoded;
                next();
                /*res.json({
                    testing:true,
                    message:'Token is matched....'
                })*/
        
            }
        });
    }else{
        return res.json({
            success:false,
            message:'Authentication Token is not Supplied...'
        });
    }
};
module.exports = {
    checkToken:checkToken
}
