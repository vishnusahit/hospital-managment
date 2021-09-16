const express = require('express');
const { Mongoose, mongo } = require('mongoose');
const hospital = require('../Models/hospital');
const ventilator = require('../Models/ventilator');
const router = express.Router();
const Ventilator = require('../Models/ventilator');
const middleware = require('../Security/middleware');
router.get('/get',middleware.checkToken,async(req,res)=>{
    try{
        const vent = await Ventilator.find();
        res.json(vent);
        console.log('Ok');
    }
    catch(err){
        res.send('Error....'+err);
    }
})
router.post('/post',middleware.checkToken,async(req,res)=>{
    //required..;
    const vent = new Ventilator({
        hid:req.body.hid,
        name:req.body.name,
        vent_id:req.body.vent_id,
        vent_status:req.body.vent_status
    })
    try{
        const v1 = await vent.save();
        res.json(v1);
    }
    catch(err){
        res.send('Error....'+err);
    }
})
router.post('/update',middleware.checkToken,async(req,res)=>{
    //required...;
    const hid = req.body.hid;
    const vid = req.body.vent_id;
    const status = req.body.vent_status;
    ventilator.findOneAndUpdate({'hid':hid,'vent_id':vid},{$set:{'vent_status':status}},{new:true},(err,v)=>{
        if(err){
            res.send('SOmething Went Wrong while Updating....');
        }
        if(v){
        v.save();
        res.send(v);}
        else{
            res.send('Could not find Ventilator...');
        }
    })
})
router.get('/delete/vid',middleware.checkToken,async(req,res)=>{
    //required....
    // send from query...
    const vid = req.query.vid;
    Ventilator.findOneAndRemove({'vent_id':vid},(err,v)=>{
        if(err){
            res.send('Error'+err);
        }
        if(v==null){res.send('There is not Ventilator with id: '+vid);}
        else{
        res.send('Ventilator with id '+vid+' Deleted Sucessfully...');}
    })
})
router.post('/search/status',middleware.checkToken,async(req,res)=>{
    const status = req.body.vent_status;
    //present;
    Ventilator.find({'vent_status':status},(err,v)=>{
        if(err){
            res.send('Error...'+err);
        }
        if(v.length>0){
        res.json(v);}
        else{
            res.send('No ventilator found with status: '+status);
        }
    })
})
router.post('/search/hname',middleware.checkToken,async(req,res)=>{
    const status = req.body.name;
    //present;
    Ventilator.find({'name':new RegExp(status,'i')},(err,v)=>{
        if(err){
            res.send('Error...'+err);
        }
        if(v.length>0){
        res.json(v);}
        else{
            res.send('No Ventilator Found in Hospital: '+status);
        }
    })
})
module.exports=router;