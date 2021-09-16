const mongoose = require('mongoose');
const ventilatorSchema = new mongoose.Schema({
    hid:{
        type:String
    },
    name:{
        type:String
    },
    vent_id:{
        type:String
    },
    vent_status:{
        type:String
    }
})
module.exports=mongoose.model('Ventilator',ventilatorSchema);