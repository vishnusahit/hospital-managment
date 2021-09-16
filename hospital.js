const mongoose = require('mongoose');
const hospitalSchema = new mongoose.Schema({
    hid:{
        type:String,
        //required:true
    },
    name:{
        type:String,
        //required:true,
    },
    phone:{
        type:String,
        //required:true
    },
    address:{
        type:String,
        //required:true
    }

})
//const hos = mongoose.model('Hospital',hospitalSchema);
module.exports = mongoose.model('Hospital',hospitalSchema);
//module.exports.hos=hos;
