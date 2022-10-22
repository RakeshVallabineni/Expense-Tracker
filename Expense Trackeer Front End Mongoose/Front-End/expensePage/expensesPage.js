const table=document.getElementById('table');
const tables=document.getElementById('tables');
const pagesList=document.getElementById('pagesList');



var total=0;
var page=1
    
//var page=1
window.addEventListener('DOMContentLoaded',async (e)=>{
    e.preventDefault();
    
    
    addButtons();
    display();
    
    
    
})


async function addButtons(){
    const token=localStorage.getItem('token');
    let pageButtons=await axios.get(`http://localhost:9000/getPages`,{headers:{'Authorization':token}});
    
    for(i=0;i<pageButtons.data.button;i++){
        const li=document.createElement('li');
       const  button=document.createElement('button')
       li.id='pagination'
        button.innerText=`${i+1}`;
        li.appendChild(button)
        pagesList.appendChild(li)
      
    }
    const pagination=document.querySelectorAll('#pagination');

    for(i of pagination){
       i.addEventListener('click',async (e)=>{
          e.stopPropagation();
           letpage=parseInt(e.target.innerText);
           page=e.target.innerText
           alert('opening page  '+e.target.innerText)
           table.innerHTML='';
           tables.innerHTML='';
           
           
          // console.log(table.children.slice(1,-1))
           display()
           
          // let response =await axios.get(`http://localhost:9000/Expenses?page=${page}`,{headers:{'Authorization':token}});
         
        })
        
        }

}

async function display(){

    const token=localStorage.getItem('token');
    let response =await axios.get(`http://localhost:9000/Expenses?page=${page}`,{headers:{'Authorization':token}});
    

    for (i of response.data.res){
        displayExpenseItems(i)
        
    }

    let total_tr=document.createElement('tr');
        total_tr.id='expenseTotal'
        let total_th=document.createElement('th');
        let total_t=document.createElement('th');
        let total_=document.createElement('th');
        let tota=document.createElement('th');

        total_th.innerHTML=total;
        total_.innerHTML='Total Expense'
        total_tr.appendChild(total_t);
        total_tr.appendChild(total_);
        total_tr.appendChild(tota);
       
        total_tr.appendChild(total_th);
        
        tables.appendChild(total_tr)
    
   
    
  
  
    // const pagination=document.querySelectorAll('#pagination');
    
    // for(i of pagination){
    // i.addEventListener('click',async (e)=>{
      
    //    page=parseInt(e.target.innerText);

    //    alert(page)
      
    //   // let response =await axios.get(`http://localhost:9000/Expenses?page=${page}`,{headers:{'Authorization':token}});
       
    // })
    
    // }
    // console.log(page)
}


function displayExpenseItems(i){
    
    let date=i.date
    
   
    const tr=document.createElement('tr');
    
    const thDate=document.createElement('th');
    thDate.id='thR';
    thDate.innerText=date;

    const thDescription=document.createElement('th');
    thDescription.id='thR';
    thDescription.innerText=i.description;

    const thCategory=document.createElement('th');
    thCategory.id='thR';
    thCategory.innerText=i.expensetype;

    const thExpense=document.createElement('th');
    thExpense.id='thR';
    thExpense.innerText=i.amount;

    
    total+=i.amount;

    tr.appendChild(thDate);
    tr.appendChild(thDescription);
    tr.appendChild(thCategory);
   
   
    tr.appendChild(thExpense);
    
    table.appendChild(tr);
    
    
}


// const pagination=document.querySelectorAll('#pagination');

// // pagination.addEventListener('click',async (e)=>{
// //    e.preventDefault();
// //     const page=1
// //     const token=localStorage.getItem('token');
// //     let response=await axios.get(`http://localhost:9000/Expense?page=${page}`,{headers:{'Authorization':token}})
// //     console.log(response);
// //     for(i of response.data.res ){
// //     displayExpenseItems(i)
// //     }
// // })

// for(i of pagination){

// i.addEventListener('click',async (e)=>{
//    e.preventDefault();
//    alert('sojnj')
//    console.log()
// })
// }





// const pagination=document.querySelectorAll('#pagination');

//     // pagination.addEventListener('click',async (e)=>{
//     //    e.preventDefault();
//     //     const page=1
//     //     const token=localStorage.getItem('token');
//     //     let response=await axios.get(`http://localhost:9000/Expense?page=${page}`,{headers:{'Authorization':token}})
//     //     console.log(response);
//     //     for(i of response.data.res ){
//     //     displayExpenseItems(i)
//     //     }
//     // })

//     for(i of pagination){

//     i.addEventListener('click',async (e)=>{
//     e.preventDefault();
    
//     alert(e.target.innerText)
    
//     const token=localStorage.getItem('token');
//     let response=await axios.get(`http://localhost:9000/PageExpense?page=${e.target.innerText}`,{headers:{'Authorization':token}})
//     console.log(response);
    

//     })
//     }