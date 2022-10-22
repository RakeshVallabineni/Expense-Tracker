const jwt=require('jsonwebtoken');

const USERS=require('../models/signUpModel.js');

exports.authenticate= (req,res,next)=>{
    try{
        const token=req.header('Authorization');
        
        const user=jwt.verify(token,'d4b0f29b1877137109172a1ed62067fa9351a507f7e8e6ffbdde9252df37870137891da68fc8a215f95a91cda7bcd0d342b190487d51457073bb514ede01861b');
        console.log("USER>>>>>>>  "+user);
         USERS.findOne({_id:user}).then(user=>{
            
            req.user=user;

            next();
        })
    }
    catch(err){

        console.log(err);
        return res.status(401).json({success:false})
    }
}

