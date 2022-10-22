const Form=document.querySelector('#Form');
const expenseAmount=document.querySelector('#expenseAmount');
const chooseDescription=document.querySelector('#chooseDescription');
const expenseType=document.querySelector('#expenseType');
const expenseList=document.querySelector('#expenseList');

const day = new Date();

let  date= day.getDate();
let month=day.getMonth();
let year=day.getFullYear();

date=date+'-'+month+'-'+year;
Form.addEventListener('submit',(event)=>{saveExpense(event)})

async function saveExpense(event){
    try{
    event.preventDefault();
    const saveUserExpense={
        date:date,
        amount:expenseAmount.value,
        description:chooseDescription.value,
        expensetype:expenseType.value

    }
    const token=localStorage.getItem('token');
    let response=await axios.post('http://localhost:9000/Expense-HomePage',saveUserExpense,{headers:{'Authorization':token}});
    displayExpense(saveUserExpense)
    console.log(response.data.EXPENSE);

}
catch(err){
    console.log(err);
}

}
window.addEventListener('DOMContentLoaded',async (event)=>{
    try{
    const token=localStorage.getItem('token');
    let response=await axios.get('http://localhost:9000/ALLExpense', {headers:{'Authorization':token}});

    // deleteExpense(response.data.EXPENSE.id);
    for(i of response.data.EXPENSE ){
        displayExpense(i);

    }
    }
    catch(err){
        console.log(err);
    }

})

function displayExpense(display){

    const li=document.createElement('li');
    
    li.appendChild(document.createTextNode(`${display.amount} : ${display.description} : ${display.expensetype}`));
    li.id=display.id;
    li.className='classList'
    const Delete=document.createElement('button');
    Delete.appendChild(document.createTextNode('DELETE'));
    Delete.className='delete';
    Delete.id='DeleteButton'
    li.appendChild(Delete)
    
    expenseList.appendChild(li);

}


function deleteExpense(){
    expenseList.addEventListener('click',async (event)=>{
    try{
    if(event.target.className==='delete'){
    console.log(event.target.parentNode.id);
    expenseList.removeChild(event.target.parentNode);
    const token=localStorage.getItem('token');
    
    let response= await axios.delete(`http://localhost:9000/Expense/${event.target.parentNode.id}`,{headers:{'Authorization':token}});
    alert(response.data.Message)
    }
}
catch(err){
    console.log(err);
}


    })
}

deleteExpense()




const toggle = document.getElementById("button1");

toggle.addEventListener("click", (e) => {
    document.body.classList.toggle("dark");
});




function deleteAllExpense(){
const deleteAll = document.getElementById("deleteAll");
deleteAll.addEventListener('click',async(e)=>{
    expenseList.remove();
    console.log();
    const token=localStorage.getItem('token');
    let response= await axios.get(`http://localhost:9000/Expense/Delete`,{headers:{'Authorization':token}});
})
}
deleteAllExpense()