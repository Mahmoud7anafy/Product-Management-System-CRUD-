var productName=    document.getElementById("productName");
var productPrice=   document.getElementById("productPrice");
var ProductCategory= document.getElementById("productcat");
var ProductDescription= document.getElementById("productdesc");
var addbtn=document.getElementById('add');
var updatebtn=document.getElementById('update');
var productList=[];
var temp;



if(localStorage.getItem("productList"))
{
   productList=JSON.parse(localStorage.getItem("productList"));
   displayProduct(productList);

}



function addProduct()
{
    var product=
    {
        name:productName.value,
        price:productPrice.value,
        category:ProductCategory.value,
        Description:ProductDescription.value,
    };
    
    productList.push(product);
   displayProduct(productList);
   localStorage.setItem("productList",JSON.stringify(productList));
   clearForm();
  
   
}

function displayProduct(list)
{
  if(list.length>0)
  {
    var cartona=``;
    for(var i=0;i<list.length;i++)
    {
      cartona+=` <tr>
      <td>${i+1}</td>
     <td>${list[i].name}</td>
     <td>${list[i].price}</td>
     <td>${list[i].category}</td>
     <td>${list[i].Description}</td>
     <td><button class="btn btn-warning " onclick="getUpdate(${i})"> Update</button></td>
     <td><button class="btn btn-danger" onclick="deleteProduct(${i})">Delete</button></td>
  </tr>`
    }
    document.getElementById("table-content").innerHTML=cartona;
    document.getElementById('noData').classList.add('d-none')
    document.getElementById("table-content").classList.remove('d-none')
    
  }
  else
  {
    console.log("no");
    document.getElementById("table-content").classList.add('d-none')
    document.getElementById('noData').classList.replace('d-none','d-block')
    document.getElementById('noData').innerHTML= `<h3 class="text-center my-4"> NO DATA FOUND</h3>`;

   
  }





   
}

function deleteProduct(index)
{

   productList.splice(index,1);
   localStorage.setItem("productList",JSON.stringify(productList));
   displayProduct(productList);
}

function clearForm()
{
    productName.value="";
    productPrice.value="";
    ProductCategory.value="";
    ProductDescription.value="";
}

function searchProduct(searchLetter)
{
  var foundProduct=[];
  for(var i=0;i<productList.length ;i++)
  {
   
    if(productList[i].name.toLowerCase().includes(searchLetter.toLowerCase()))
    {
           
           foundProduct.push(productList[i]);
    }
    
  }
 
  displayProduct(foundProduct)
}

function getUpdate(index)
{
  updatebtn.classList.replace('d-none','d-block')
  addbtn.classList.add('d-none')
  console.log(productList[index]);
  productName.value=productList[index].name;
  productPrice.value=productList[index].price;
  ProductCategory.value=productList[index].category;
  ProductDescription.value=productList[index].Description;

  temp=index;
  
}

function update()
{

  productList[temp].name=productName.value;
  productList[temp].price=productPrice.value;
  productList[temp].category=ProductCategory.value;
  productList[temp].Description=ProductDescription.value;
  localStorage.setItem("productList",JSON.stringify(productList));
  displayProduct(productList)
  clearForm();
  

}


