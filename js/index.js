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
 if( validateProductName() && validateProductPrice() && validateProductCategory() && validateProductDescription())
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

function validateProductName()
{
  var regex=/^[A-Z][a-z]{2,9}$/;
  var nameError=document.getElementById('nameError');

  if(regex.test(productName.value))
  {
    nameError.classList.replace('d-block','d-none')
    productName.classList.replace('is-invalid','is-valid');
    return true;
  }
  else
 nameError.classList.replace('d-none','d-block')
 productName.classList.add('is-invalid');
  return false;
  
}

function validateProductPrice()
{
  var regex =/^[1-9][0-9]{3,4}$/;
  var priceError=document.getElementById('priceError');
  if(regex.test(productPrice.value))
  {

    priceError.classList.replace('d-block','d-none')
    productPrice.classList.replace('is-invalid','is-valid')
      return true
  }
  else
  {
    priceError.classList.replace('d-none','d-block')
    productPrice.classList.add('is-invalid')
    return false
  }

}


function validateProductCategory()
{
  var regex =/^(mobile|laptop|TV)$/;
  var CategoryError=document.getElementById('CategoryError');
  if(regex.test(ProductCategory.value))
  {

    CategoryError.classList.replace('d-block','d-none')
    ProductCategory.classList.replace('is-invalid','is-valid')
      return true
  }
  else
  {
    CategoryError.classList.replace('d-none','d-block')
    ProductCategory.classList.add('is-invalid')
    return false
  }

}


function validateProductDescription()
{
  var regex =/^[a-zA-z]{10}$/;
  var descriptionError=document.getElementById('descriptionError');
  if(regex.test(ProductDescription.value))
  {

    descriptionError.classList.replace('d-block','d-none')
    ProductDescription.classList.replace('is-invalid','is-valid')
      return true
  }
  else
  {
    descriptionError.classList.replace('d-none','d-block')
    ProductDescription.classList.add('is-invalid')
    return false
  }

}