const express = require('express');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify',false);
let jwt = require('jsonwebtoken');
const config = require('./Security/config');
const middleware = require('./Security/middleware');
const bodyParser = require('body-parser');
const url = 'mongodb://localhost/Hospitals';
const app = express();
app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(bodyParser.json());
const router = express.Router();
const path = require('path');
class HandlerGenerator{
    login(req,res){
        let username = req.body.username;
        let password = req.body.password;
        let mockedUsername = 'admin';
        let mockedpassword = 'password';
        if(username && password){
            if(username===mockedUsername && password===mockedpassword){
                let token = jwt.sign({username:username},
                    config.secret,
                    {
                        expiresIn:'20h'
                    }
                    );
                    res.json({
                        success:true,
                        message : 'Authentication Successful',
                        token:token
                    });
            }else{
                res.json({
                    success:false,
                    message:'Incorrect Username or Password'
                });
            }
        }else{
            res.json({
                success:false,
                message:'Authentication Failed....Please Check the Request!'
            });
        }
    }
    index(req,res){
        res.json({
            success:true,
            message:'Token is Matched...... You can Continue..'
        });
    }

}
mongoose.connect(url,{useNewUrlParser:true});
const con = mongoose.connection;

con.on('open',function(){
    console.log('DataBase Sucessfully Connected....');
});
app.use(express.json());
const hroutes = require('./Routes/hospitals');
const vroutes = require('./Routes/ventilators');
let handlers = new HandlerGenerator();
app.use('/hospitals',hroutes);
app.use('/vents',vroutes);
app.post('/login',handlers.login);
app.get('/',middleware.checkToken,handlers.index);
app.get('/home',(req,res)=>{
    res.sendFile(path.join(__dirname+'/home.html'));
});
app.listen(9000,()=>{
    console.log("Server Started....");
});
