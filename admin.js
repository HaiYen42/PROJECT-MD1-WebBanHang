let listRender = JSON.parse(localStorage.getItem("listUser"));
//Render email, password và trạng thái User trên trang admin
function renderUser(all) {
  let data = "";
  for (let i = 0; i < all.length; i++) {
    data += `
        <tr>
            <td>${i + 1}</td>
            <td>${all[i].email}</td>
            <td>${all[i].password}</td>
            <td>${all[i].Sercurity}</td>
            <td>${all[i].status}</td>
            <td>
            <button onclick="activeUser(${i})">Active</button>
            <button onclick="inactive(${i})">Inactive</button>
            </td>
            </tr>
        `;
  }
  document.getElementById("tbody").innerHTML = data;
}
renderUser(listRender);

//Kích hoạt trạng thái Active và Inactive của User 
function inactive(id) {
  let inactiveUser = JSON.parse(localStorage.getItem("listUser"));
  inactiveUser[id].status = "Inactive";
  localStorage.setItem("listUser", JSON.stringify(inactiveUser));
  renderUser(inactiveUser);
}

function activeUser(id) {
  console.log(id);
  let activeUser = JSON.parse(localStorage.getItem("listUser"));
  activeUser[id].status = "Active";
  localStorage.setItem("listUser", JSON.stringify(activeUser));
  renderUser(activeUser);
}

//Tìm kiếm User
function searchUser() {
  let listSeach = [];
  let searchUser = JSON.parse(localStorage.getItem("listUser"));
  let valueSearch = document.getElementById("valueSearch").value.toLowerCase();
  for (let i = 0; i < searchUser.length; i++) {
    if (searchUser[i].email.toLowerCase().indexOf(valueSearch) != -1) {
      listSeach.push(searchUser[i]);
    }
  }
  renderUser(listSeach);
}

// Render list hàng trên trang admind (Em nên reder bằng bảng, chị render kiểu này hơi khó nhìn)
var listAdd = JSON.parse(localStorage.getItem("listProduct"));
function renderAddProduct(all) {
  let data = "";
  for (let i = 0; i < all.length; i++) {
    data += `
       <div class="product">
       <img src="./${all[i].image}" alt="" width="200px" height="200px">
       <p>${all[i].name}</p>
       <label for="price">Price: $${all[i].price}</label> <br>
       <div class="btnDelEdit">
         <button onclick="deleteItem(${i})" id="btnDel">Delete</button>
        <button onclick="editItem(${i})" id="btnEdit">Edit</button>
        </div>
       </div>
       `;
  }
  document.getElementById("showProduct").innerHTML = data;
}
renderAddProduct(listAdd);

//Thêm sản phẩm vào trang Homepage từ trang Admin
let valueName = document.getElementById("inpName");
let valuePic = document.getElementById("inpPic");
let valuePrice = document.getElementById("inpPrice");
function addProduct() {
  let listAdd = JSON.parse(localStorage.getItem("listProduct"));
  //   console.log("listAdd", listAdd);
  if (listAdd == null) {
    listAdd = [];
    let obj = {
      name: valueName.value,
      image: valuePic.value,
      price: valuePrice.value,
      id: listAdd.length,
      count: 1,
    };
    listAdd.push(obj);
    localStorage.setItem("listProduct", JSON.stringify(listAdd));
    renderAddProduct(listAdd);
  } else {
    listAdd = JSON.parse(localStorage.getItem("listProduct"));
    console.log("111");
    obj = {
      name: valueName.value,
      image: valuePic.value,
      price: valuePrice.value,
      id: listAdd.length,
      count: 1,
    };
    listAdd.push(obj);
    localStorage.setItem("listProduct", JSON.stringify(listAdd));
    renderAddProduct(listAdd);
  }
}

//Xóa products từ trang admin
function deleteItem(id){
    console.log("id",id);
    let dataDelete=JSON.parse(localStorage.getItem("listProduct"));
    dataDelete.splice (id,1);
    for(i=0;i<dataDelete.length;i++) {
        dataDelete[i].id = i;
    }
    localStorage.setItem("listProduct",JSON.stringify(dataDelete));
    renderAddProduct(dataDelete);
  }

  function editItem(id) {
    let dataEdit=JSON.parse(localStorage.getItem("listProduct"));
    valueName.value=dataEdit[id].name;
    valuePic.value=dataEdit[id].image;
    valuePrice.value=dataEdit[id].price;
    localStorage.setItem("listProduct",JSON.stringify(dataEdit));
    localStorage.setItem("key",(id));  
}
function updateItem() {
    dataEdit=JSON.parse(localStorage.getItem("listProduct"));
    let key =localStorage.getItem("key");
    dataEdit[key].name=valueName.value;
    dataEdit[key].image=valuePic.value;
    dataEdit[key].price=valuePrice.value;
    localStorage.setItem("listProduct",JSON.stringify(dataEdit));
    renderAddProduct(dataEdit);
}


function searchItem() {
    let listSearch=[];
    console.log("111");
    let valueSearch=document.getElementById("inptSearch").value.toLowerCase();
    console.log(listAdd);
    for (let i = 0; i < listAdd.length; i++) {
      if (listAdd[i].name.toLowerCase().indexOf(valueSearch)!=-1) {
        listSearch.push(listAdd[i]);
      }
        
    }  
    renderAddProduct(listSearch);
}