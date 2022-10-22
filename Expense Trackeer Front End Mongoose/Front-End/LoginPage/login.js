const Form=document.querySelector('#Form');
const Email=document.querySelector('#Email');
const password=document.querySelector('#Password');

Form.addEventListener('submit',(event)=>{saveUserDetails(event)});

async function saveUserDetails(event){
    
    try{
    
    event.preventDefault();
    let user={
        UEmail:Email.value,
        UPassword:password.value
    }
    
    let response=await axios.post('http://localhost:9000/userLogin',user);
    if(response.data.success===true){
        alert(response.data.message);
        localStorage.setItem('token',response.data.token);
        window.location.href='../expensePage/expense.html';
    
    }
    else{
        alert(response.data.message);
        
    }
    }
    catch(err){
        console.log(err);
        alert('Please Register');
    }
        
    

}

