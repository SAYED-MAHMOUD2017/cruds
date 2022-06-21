"use strict"
let nameInput = document.getElementById("productNmae");
let priceInput = document.getElementById("productPrice");
let categoryInput = document.getElementById("productCategory");
let descraptionInput = document.getElementById("productDescraption");
let searchInput = document.getElementById("searchInput");

let addBtn = document.getElementById("addPorduct");
let editBtn = document.getElementById("addEdit");
let clearBtn = document.getElementById("clearForm");

let currntIndex;
let productList;

if(localStorage.getItem("List Items") != null) {
  productList = JSON.parse(localStorage.getItem("List Items"));
  displayData(productList)
}else {
  productList = [];
}

addBtn.addEventListener("click", addProduct)
function addProduct() {
  if(validationName() == true && validationPrice() == true) {
  let product = {
    name: nameInput.value,
    price: priceInput.value,
    category: categoryInput.value,
    descraption: descraptionInput.value
  };
    productList.push(product);
    localStorage.setItem("List Items", JSON.stringify(productList));
    displayData(productList);
    
    // You want to clear form after add product auto invok this function
    // clearForm()
}
}

function displayData(list) {
  let temp = ``;
  for(let i = 0; i < list.length; i++) {
        temp += `
        <div class="col-sm-6 col-md-4 col-xl-3 g-4">
        <div class="item p-2">
        <h6 title="Index" class="text-white-50 text-center d-block fs-3 bg-danger bg-opacity-25">${i}</h6>
        <div class="box d-flex">
          <div class="labels">
            <h6 class="d-block">name:</h6>
            <h6 class="d-block">price:</h6>
            <h6 class="d-block">category:</h6>
            <h6 class="d-block">decraption:</h6>
          </div>
          <div class="decraptions ms-2">
            <h6 title="productNmae" class="text-white-50">${list[i].name}</h6>
            <h6 title="productCategory" class="text-white-50">${list[i].category}</h6>
            <h6 title="productPrice" class="text-white-50">${list[i].price}</h6>
            <h6 title="productDescraption" class="text-white-50">${list[i].descraption}</h6>
          </div>
        </div>
        <div class="buttons d-flex">
          <button class="btn btn-outline-warning my-2 me-2 w-50" type="button" title="Update" id="update" onclick="update(${i})"><i class="fa-solid fa-file-pen"></i></button>
          <button class="btn btn-outline-danger my-2 w-50" type="button" title="Delete" id="delete" onclick="deleteProduct(${i})"><i class="fa-solid fa-trash-can"></i></button>
        </div>
        </div>
      </div>
        `;
      }
  document.getElementById("tableData").innerHTML = temp;
}
clearBtn.addEventListener("click", clearForm)
function clearForm() {
  nameInput.value = '';
  priceInput.value = '';
  descraptionInput.value = '';
  addBtn.classList.replace("d-none","d-inline-block");
  editBtn.classList.replace("d-inline-block", "d-none");
}

function update(index) {
  nameInput.value = productList[index].name;
  priceInput.value = productList[index].price;
  categoryInput.value = productList[index].category;
  descraptionInput.value = productList[index].descraption;
  addBtn.classList.add("d-none");
  editBtn.classList.replace("d-none","d-inline-block");
  currntIndex = index;
}

editBtn.addEventListener("click", ()=> addEdit(currntIndex))
function addEdit(currntIndex) {
  if(validationName() == true && validationPrice() == true) {
  productList[currntIndex].name = nameInput.value;
  productList[currntIndex].price = priceInput.value;
  productList[currntIndex].category = categoryInput.value;
  productList[currntIndex].descraption = descraptionInput.value;
  addBtn.classList.replace("d-none","d-inline-block");
  editBtn.classList.replace("d-inline-block","d-none");
  displayData(productList)
  clearForm();
  }
}

function deleteProduct(index) {
  productList.splice(index, 1);
  displayData(productList);
  localStorage.setItem("List Items", JSON.stringify(productList));
}

searchInput.addEventListener("keyup", (e)=> search(e.target.value) )
function search(input) {
  let resultSearch = [];
  for(let i = 0; i < productList.length; i++) {
    if(productList[i].name.toLowerCase().includes(input.toLowerCase())) {
      resultSearch.push(productList[i]);
    }
    displayData(resultSearch);
  }
}

nameInput.addEventListener("blur", validationName)  
function validationName() {
    let regexname = /^[A-Z][a-z0-9]{3,20}$/;
      if(regexname.test(nameInput.value) == true) {
        document.getElementById("nameAlert").classList.replace("d-block", "d-none");
        return true;
      }else {
      document.getElementById("nameAlert").classList.replace("d-none", "d-block");
      return false;
    }
}

priceInput.addEventListener("blur", validationPrice)
function validationPrice() {
  let regexPrice = /^[1-9][0-9]{3,5}$/;
      if(regexPrice.test(priceInput.value) == true) {
        document.getElementById("priceAlert").classList.replace("d-block", "d-none");
        return true;
      }else {
        document.getElementById("priceAlert").classList.replace("d-none", "d-block");
        return false;
    }
}