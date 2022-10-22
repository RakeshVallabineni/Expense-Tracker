const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const USER=new Schema({

    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    emailid:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }

});

//module.exports=mongoose.model('schema name',object name)
module.exports=mongoose.model('Users',USER)