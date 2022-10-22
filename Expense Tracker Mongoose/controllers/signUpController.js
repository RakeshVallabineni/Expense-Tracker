const USERS=require('../models/signUpModel.js');

const bcrypt=require('bcrypt');
const { find } = require('../models/expense.js');
const saltRounds=10;

exports.postUserSignUp=async (req,res,next)=>{
    try{
    const requestBody=req.body;
    console.log(requestBody);

//     const findUser=USERS.find()
//     console.log(findUser)
//     if(findUser){
//         res.status(200).json({message:'User doesn"t Exist'})
//     }
//    else{
   bcrypt.hash(requestBody.UPassword,saltRounds,async(err,hash)=>{
    const  firstname=requestBody.UFirstName;
    const lastname=requestBody.ULastName;
    const emailid=requestBody.UEmail;
    const password=hash;

    const  signupResponse=new USERS({
    firstname:firstname,
    lastname:lastname,
    emailid:emailid,
    password:password
   })
   signupResponse.save();
    if(signupResponse){
        res.status(200).json({SIGNUP:signupResponse,message:'Signed-Up successfully'})
        console.log('signedup successfully')
    }
    
    })


}
catch(err){
    console.log(err);
}

   
}

