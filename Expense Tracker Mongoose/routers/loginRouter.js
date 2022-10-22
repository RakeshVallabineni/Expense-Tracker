const express=require('express');
const loginRouter=express.Router();

const loginController=require('../controllers/loginController');

const userAuthentication=require('../middleware/authenication');

loginRouter.post('/userLogin',loginController.postUserLogin);

loginRouter.post('/Expense-HomePage',userAuthentication.authenticate,loginController.userHomePage);

loginRouter.delete('/Expense/:delID',userAuthentication.authenticate,loginController.delExpense);

loginRouter.get('/ALLExpense',userAuthentication.authenticate,loginController.ALLExpense);

loginRouter.get('/Expense/Delete',userAuthentication.authenticate,loginController.deleteALLExpense);

// loginRouter.post('/forgotPassword',loginController.forgotPassword);


loginRouter.get('/Expenses',userAuthentication.authenticate,loginController.Expenses);

// loginRouter.post('/forgotPassword/newPassword',loginController.resetPassword);


loginRouter.get('/getPages',userAuthentication.authenticate,loginController.allPages);


 module.exports=loginRouter;