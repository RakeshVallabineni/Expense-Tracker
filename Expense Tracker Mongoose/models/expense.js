const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const EXPENSE=new Schema({
    date:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    description:{
        type:String
    },
    expensetype:{
        type:String
    },
    userId:{
     type:mongoose.Types.ObjectId,ref:'Users',
     required:true
    }
})

module.exports=mongoose.model('Expense',EXPENSE);