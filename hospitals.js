const express = require('express');
//const fs = require('fs');
const { Mongoose, mongo } = require('mongoose');
const router = express.Router();
const Hospital = require('../Models/hospital');
const middleware = require('../Security/middleware');
//const hos = Mongoose.model('Hospital',hospitalSchema);
/*router.get('/home',async(req,res)=>{
    res.sendFile()
    });*/
router.get('/get',middleware.checkToken,async(req,res)=>{
    try{
        const hosp =  await Hospital.find()
        res.json(hosp);
    }
    catch(err){
        res.send('Error......');
    }
})
router.post('/post',middleware.checkToken,async(req,res)=>{
    const hospitals = new Hospital({
        hid:req.body.hid,
        name:req.body.name,
        phone:req.body.phone,
        address:req.body.address
    })
    //required...;
    try{
        const h1 = await hospitals.save();
        res.json(h1);
    }catch(err){
        res.send('Error....'+err);
    }
})
router.get('/search/:name',middleware.checkToken,async(req,res)=>{
    //required...
    try{
        var id = req.params.name;
        Hospital.findOne({'name':new RegExp(id,'i')},(err,h)=>{
            if(err) {res.send('Error....')}
            if(h){
                console.log(h.hid);
                res.send(h)
            }
            else{
                res.send('No Hospital Found with name:'+ id);
            }
        })
    }
    catch(err){
        res.send('Error....'+err);
    }
})
router.get('/delete/:id',async(req,res)=>{
    try{
        var id = req.params.id;
        const hospital =  Hospital.deleteOne({'hid':id},(err,h)=>{
            if(err) return "error";
            //const h1 =  hospital.remove();
            res.send("Deleted SucessFully.....");
        });
        
        //res.json(h1);
        
    }catch(err){
        res.send('Error....'+err);    }
})

module.exports = router;