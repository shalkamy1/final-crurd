let input=document.querySelectorAll("input");
let producttitle=document.querySelector(".producttitle");
let alltotal=document.querySelector(".total");
let add=document.querySelector('.added');
let button=document.querySelector('button');
let elements=document.querySelector('.elements');
let tbody=document.querySelector('tbody');
let clearbtn=document.querySelector('.clear')
let addButton=document.querySelector('.addButton')
let span=document.querySelector('span');
let products;

let moode="create"
let globalId;
if(localStorage.products!=null){
products=JSON.parse(localStorage.products);
}
else{
products=[];
}

let gettotal=()=>{
let price=input[1].value;
let tax=input[2].value;
let discount=input[3].value;
let taxCost=+price*(+tax/100);
input[4].value=(+taxCost + +price)- +discount;
} 
for( let i = 0; i<input.length;i++){
    input[i].addEventListener("keyup",gettotal);
}
let craeteobject= () => {
    let newproduct = {
title:input[0].value,   
price:input[1].value,
    tax:input[2].value,
    discount:input[3].value,
    total:input[4].value,
    count:input[5].value,
    department:input[6].value,
    };

        if(input[0].value==""||input[1].value==""||input[2].value==""||input[3].value==""||input[4].value==""||input[6].value==""){
            window.alert("please enter valid data"); 
        }
        else{
                if(moode=="create"){
                    if(newproduct.count>1){
                        for( let i=0;i<newproduct.count;i++){
                            products.push(newproduct);
                        }
                      }
                      else{
                        products.push(newproduct);
                      }
                }
                else{
            products[globalId]=newproduct;
            moode=="create";
            addButton.innerHTML=`Add this product
                     <style>
                     .addButton{
                        background-color: black;
                     }
                 </style>`
                 add.classList.remove("none")    
                     
                }
              
            
            //    console.log(products);
               clearinputs();
               randerData();
            
            localStorage.setItem("products",JSON.stringify(products));
        }
    }
        
    
    

let clearinputs=()=>{
    input[0].value=""   
    input[1].value="" 
        input[2].value="" 
        input[3].value="" 
        input[4].value="" 
        input[5].value="" 
        input[6].value="" 
}
let randerData=()=>{
    let table="";
    for(let i=0;i<products.length;i++){
        table+=`
        <tr>
        <td>${i+1}</td>
        <td>${products[i].title}</td>
        <td>${products[i].price}</td>
        <td>${products[i].tax}</td>
        <td>${products[i].discount}</td>
        <td>${products[i].total}</td>
        <td>${products[i].department}</td>
        <td><button class="edit" onclick="update(${i})">edit</button></td>
        <td><button class="delete" onclick= 'deleteItem(${i})' >delete</button></td>
        </tr>
        `
    }
    tbody.innerHTML=table;
}
let deleteItem=(i)=>{
    products.splice(i,1);
    localStorage.products=JSON.stringify(products)
    randerData();
}

randerData();

button.addEventListener('click',craeteobject);


let update=(i)=>{
 moode="update";
 globalId=i;
    input[0].value=products[i].title
    input[1].value=products[i].price
        input[2].value=products[i].tax
        input[3].value=products[i].discount
        input[4].value=products[i].total
        input[6].value=products[i].department
         add.classList.add("none")
         addButton.innerHTML=`update : ${i+1}
         <style>
         .addButton{
            background-color: brown;
         }
     </style>`
         
}
let clearData=()=>{
    localStorage.clear();
    products.splice(0)
    randerData();
}

 clearbtn.addEventListener("click",clearData);


