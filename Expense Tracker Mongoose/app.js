const express=require('express');
const app=express();

const cors=require('cors');
app.use(cors());

const { json } = require('body-parser');
const bodyParsed=require('body-parser');
app.use(bodyParsed.json());


const mongoose=require('mongoose');


const loginRouter=require('./routers/loginRouter');

const signupRouter=require('./routers/signupRouter');

app.use(loginRouter);
app.use(signupRouter);



mongoose.connect('mongodb+srv://rocksr187:123@expensetracker.qnajila.mongodb.net/expensetracker?retryWrites=true&w=majority')
.then((result)=>{
    app.listen(9000); 
    console.log('connected')
})
.catch((err)=>{
    console.log(err);
})






