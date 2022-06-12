"use strict"
let nameInput = document.getElementById("productNmae");
let priceInput = document.getElementById("productPrice");
let categoryInput = document.getElementById("productCategory");
let descraptionInput = document.getElementById("productDescraption");
let addBtn = document.getElementById("addPorduct");
let clearBtn = document.getElementById("clearForm");
let currntIndex;
let productList;

if(localStorage.getItem("List Items") != null) {
  productList = JSON.parse(localStorage.getItem("List Items"));
  displayData(productList)
}else {
  productList = [];
}
function addProduct() {
  if(validationName() == true && validationPrice() == true && validationCategory() == true) {
  let product = {
    name: nameInput.value,
    price: priceInput.value,
    category: categoryInput.value,
    descraption: descraptionInput.value
  };
    productList.push(product);
    localStorage.setItem("List Items", JSON.stringify(productList));
    displayData(productList);
    
    // You want to clear form after add product auto
    // clearForm()
}
}

function displayData(list) {
  let temp = ``;
  for(let i = 0; i < list.length; i++) {
        temp += `
        <tr>
          <td>${i}</td>
          <td>${list[i].name}</td>
          <td>${list[i].price}</td>
          <td>${list[i].category}</td>
          <td>${list[i].descraption}</td>
          <td><button class="btn btn-outline-warning" type="button" id="update" onclick="update(${i})">update</button></td>
          <td><button class="btn btn-outline-danger" type="button" id="delete" onclick="deleteProduct(${i})">delete</button></td>
        </tr>
        `;
      }
  document.getElementById("tableData").innerHTML = temp;
}

function clearForm() {
  nameInput.value = '';
  priceInput.value = '';
  categoryInput.value = '';
  descraptionInput.value = '';
}

function update(index) {
  nameInput.value = productList[index].name;
  priceInput.value = productList[index].price;
  categoryInput.value = productList[index].category;
  descraptionInput.value = productList[index].descraption;
  document.getElementById("addPorduct").classList.add("d-none");
  document.getElementById("addEdit").classList.replace("d-none","d-inline-block");
  currntIndex = index;
}

function addEdit(currntIndex) {
  productList[currntIndex].name = nameInput.value;
  productList[currntIndex].price = priceInput.value;
  productList[currntIndex].category = categoryInput.value;
  productList[currntIndex].descraption = descraptionInput.value;
  document.getElementById("addPorduct").classList.replace("d-none","d-inline-block");
  document.getElementById("addEdit").classList.replace("d-inline-block","d-none");
  clearForm();
  displayData(productList)
}

function deleteProduct(index) {
  productList.splice(index, 1);
  displayData(productList);
  localStorage.setItem("List Items", JSON.stringify(productList));
}

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
categoryInput.addEventListener("blur", validationCategory)
function validationCategory() {
    let regexCategory = /^[A-Z][a-z0-9 ]{3,20}$/;
      if(regexCategory.test(categoryInput.value) == true) {
        document.getElementById("categoryAlert").classList.replace("d-block", "d-none");
        return true;
      }else {
      document.getElementById("categoryAlert").classList.replace("d-none", "d-block");
      return false;
    }
}