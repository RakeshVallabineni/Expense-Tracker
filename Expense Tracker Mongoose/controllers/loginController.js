const { where } = require('sequelize');

const USERS=require('../models/signUpModel.js');
const bcrypt=require('bcrypt');
const EXPENSE=require('../models/expense.js')
const jswt=require('jsonwebtoken');
var nodemailer = require('nodemailer');
const FORGOT=require('../models/forgotPassword.js')

const uuid = require("uuid");

exports.postUserLogin=async (req,res,next)=>{
   try{
   const requestBody=req.body;

   let responseLogin=await  USERS.findOne({emailid:requestBody.UEmail})
  // console.log(responseLogin[0].password);
 

  if (responseLogin){
         const compared=await bcrypt.compare(requestBody.UPassword,responseLogin.password)

         if (compared){
            
            const token=jswt.sign(responseLogin.id,'d4b0f29b1877137109172a1ed62067fa9351a507f7e8e6ffbdde9252df37870137891da68fc8a215f95a91cda7bcd0d342b190487d51457073bb514ede01861b');
      
            res.status(200).json({success:true,token:token,message:'Successfully Loggedin'})
         }
         else{
            res.status(200).json({success:false,message:'Please check you credentials!'})
         }
      
      
      }

   else{
      res.status(400).json({success:false,message:'user not exist'})
   }

}
catch(err){
   console.log(err);
}
}

exports.userHomePage=async (req,res,next)=>{
   try{
      const requestBody=req.body;

     const amount=requestBody.amount;
     const description=requestBody.description;
     const expensetype =requestBody.expensetype;
     const date=requestBody.date;

   let expenseResponse=new EXPENSE({
      date:date,
      amount:amount,
      description:description,
      expensetype:expensetype,
      userId:req.user.id
   })
   expenseResponse.save();

   
   res.status(200).json({EXPENSE:expenseResponse});

}
catch(err){
   console.log(err);
}
}

exports.delExpense=async (req,res,next)=>{
   try{
      const requestBody=req.params.delID;


      let response =await EXPENSE.deleteOne({id:requestBody});

      res.status(200).json({succes:true,Message:"deleted Successfully"});

   }
   catch(err){
      console.log(err);
   }


  }

exports.deleteALLExpense=async (req,res,next)=>{
      try{
        let response=await EXPENSE.remove({userId:req.user.id});
         res.status(200);
      }
      catch(err){
         console.log(err);
      }
}



exports.ALLExpense=async (req,res,next)=>{
   try{
   
   let response = await EXPENSE.find({userId:req.user.id});

   console.log(req.user.id)
   res.status(200).json({EXPENSE:response});
   }
   catch(err){
      console.log(err);
   }


}

exports.allPages=async (req,res)=>{


   let buttonResponse=await EXPENSE.find({userId:req.user.id});
   
   const length=buttonResponse.length;
   console.log(length);

   const pagesButtons=Math.ceil(length/10);
  if(pagesButtons>1){
   res.status(200).json({button:pagesButtons});
   
  }
  
}

exports.Expenses=async (req,res)=>{
   const requestBody=req.query.page
   
   
  // let buttonResponse=await EXPENSE.find({where:{signupId:req.user.id}});
   

   let response=await EXPENSE.find({userId:req.user.id}).skip((requestBody-1)*10).limit(10);
   
      //,button:pagesButtons
   res.status(200).json({res:response});
   
}






