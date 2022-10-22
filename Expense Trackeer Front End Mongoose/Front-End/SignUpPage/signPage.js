
const Form=document.querySelector('#Form');
const firstName=document.querySelector('#FirstName');
const lastName=document.querySelector('#LastName');
const Email=document.querySelector('#Email');
const password=document.querySelector('#Password');
var rePassword = document.getElementById("Re-EnterPasssword");
const err=document.querySelector('#err');


Form.addEventListener('submit',(event)=>{saveLoginDetails(event)});

async function saveLoginDetails(event){
    event.preventDefault();
try{
    
    if(password.value!=rePassword.value){
        err.innerHTML='*Please Check The password';
        setTimeout(()=>{
         err.innerHTML=''
        },2000);
    }
    else{
   event.preventDefault();
   let userDetails={
    UFirstName:firstName.value,
    ULastName:lastName.value,
    UEmail:Email.value,
    UPassword:password.value
   }
   
   let response=await axios.post('http://localhost:9000/userSignUp',userDetails);
   
   
   alert(response.data.message)
   window.location.href='../LoginPage/login.html'

}
}
catch(error){
   
    console.log(error);
}
}



const checkbox=document.querySelector('#checkbox');

checkbox.addEventListener('click',checkPassword);
function checkPassword() {
   
    
    if (password.type === "password" && rePassword.type === "password") {
        password.type = "text";
        rePassword.type = "text";
    } else {
        password.type = "password";
        rePassword.type = "password";
    }
  }
