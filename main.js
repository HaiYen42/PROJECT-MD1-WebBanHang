const showCartbtn = document.getElementById("showCart");
//Chuyển trang Register
function toRegister() {
  window.location = "./Register.html";
}
//Để ảnh chạy Slice
let arrayimg = [
  "IMG/slideshow-1.jpg",
  "IMG/slideshow-2.jpg",
  "IMG/slideshow-3.jpg",
];
let count = 0;
function showBanner() {
  let image = document.getElementById("image");
  image.src = arrayimg[count];
  count++;
  if (count == 3) {
    count = 0;
  }
}
setInterval(showBanner, 3000);
// Đổ JS
let listProduct = [
  {
    name: "Apple",
    price: "80",
    image: "IMG/img1.jpg",
    id: 0,
    count: 1,
  },
  {
    name: "Grape",
    price: "100",
    image: "IMG/img2.jpg",
    id: 1,
    count: 1,
  },
  {
    name: "Lemon",
    price: "50",
    image: "IMG/img3.jpg",
    id: 2,
    count: 1,
  },
  {
    name: "Bread",
    price: "70",
    image: "IMG/img4.jpg",
    id: 3,
    count: 1,
  },
  {
    name: "Strawberry",
    price: "60",
    image: "IMG/img5.jpg",
    id: 4,
    count: 1,
  },
  {
    name: "Avocado",
    price: "90",
    image: "IMG/img6.jpg",
    id: 5,
    count: 1,
  },
  {
    name: "Lemon",
    price: "40",
    image: "IMG/img7.jpg",
    id: 6,
    count: 1,
  },
  {
    name: "Peach",
    price: "90",
    image: "IMG/img8.jpg",
    id: 7,
    count: 1,
  },
];
// Lưu trên LocalStorage
localStorage.setItem("listProduct", JSON.stringify(listProduct));
let list = JSON.parse(localStorage.getItem("listProduct"));
function renderProduct(all) {
  if(all!=null) {
  let data = "";
  for (let i = 0; i < all.length; i++) {
    data += `
        <div class="product">
        <img src="./${all[i].image}" alt="" width="200px" height="200px">
        <p>${all[i].name}</p>
        <label for="price">Price: $${all[i].price}</label> <br>
        <i onclick="addToCart(${i})" class="fa-solid fa-cart-shopping icon"></i>   
        <i class="fa-solid fa-heart icon1" onclick="addToFavourite(${all[i].id})"></i>
        <i class="fa-solid fa-heart icon2" onclick="clearToFavourite(${all[i].id})"></i>
        <i class="fa-solid fa-circle-info icon" id="detailBtn" onclick="showDetail(${i})" ></i>
        </div>
        `;
  }
  document.getElementById("showProduct").innerHTML = data;}
}
renderProduct(list);
function searchProduct() {
  let data = [];
  let valueSeach = document.getElementById("value-search").value.toLowerCase();
  for (let i = 0; i < list.length; i++) {
    if (list[i].name.toLowerCase().indexOf(valueSeach) != -1) {
      data.push(list[i]);
    }
  }
  renderProduct(data);
}

// localStorage.setItem("listDetail", JSON.stringify(listProduct));
let showDetails = document.getElementById("showDetail");
let listDetails = JSON.parse(localStorage.getItem("listDetail"));
//Function hiển thị chi tiết
function showDetail(id) {
  console.log(id);
  let data = "";
  data = `
            <div class="about2">
                <div class="detail-img">
                    <img src="${listDetails[id].image}" alt="" width="200px">
                </div>
                <div class="detail-info">
                <p>Name:${listDetails[id].name}</p> 
                <p>Price:${listDetails[id].price}</p> 
                 <p>Details: The customer is very important, the customer will be followed by the customer. Suspendisse sapien urn, commodo ut molestie vitae, feugia tincidunt ligula. In fact, there is no pregnancy in the valley.</p>
                </div>
                <span class="close" id="close" onclick="handleClick()">&times;</span>
            </div>
    `;
  showDetails.innerHTML = data;
  if (showDetails.style.display == "none") {
    showDetails.style.display = "block";
  } else {
    showDetails.style.display = "none";
  }
}
//Function Close
function handleClick() {
  if (showDetails.style.display == "block") {
    showDetails.style.display = "none";
  }
}

let LoginUser = JSON.parse(localStorage.getItem("LoginUser"));

function addToCart(id) {
  let listProductCart = JSON.parse(localStorage.getItem("listProductCart"));
  let key = false;
  if (LoginUser[0].login == true) {
    if (listProductCart == null) {
      listProductCart = [];
      listProductCart.push(list[id]);
      localStorage.setItem('listProductCart', JSON.stringify(listProductCart));
    } else {
      for (i = 0 ; i <listProductCart.length ; i++){
        if (id == listProductCart[i].id) {
          key = true;
          listProductCart[i].count++;
          console.log(listProductCart[i]);
          localStorage.setItem('listProductCart', JSON.stringify(listProductCart));
          break;
        } 
      } 
      if (key == false){
        listProductCart.push(list[id]);
        localStorage.setItem('listProductCart', JSON.stringify(listProductCart));
      }
      }
  } else {
    alert("Please login to add to Cart");
  }
}
function login() {
  window.location = "./login.html";
}

let actions = document.getElementById("actions");
let userAction = document.getElementById("userAction");
let logIn = document.getElementById("logIn");
let logOut = document.getElementById("logOut");

function logout() {
  console.log("111");
  LoginUser[0].login = false;
  logOut.style.display = "none";
  logIn.style.display = "block";
  actions.innerHTML = "";
  localStorage.setItem("LoginUser", JSON.stringify(LoginUser));
}
function showProfile() {
  if (LoginUser[0].login == true) {
    userAction.style.display = "block";
    actions.innerHTML = LoginUser[0].email;
    logIn.style.display = "none";
    logOut.style.display = "block";
  } else {
    logOut.style.display = "none";
    logIn.style.display = "block";
  }
}
showProfile();

function toPayment() {
  window.location = "./payment.html";
}

//Add to Favourite
function toFavourite() {
  console.log("111");
  window.location = "./favourite.html";
}

let love = document.getElementsByClassName("fa-heart");

let icon1 = document.getElementsByClassName("icon1");
let icon2 = document.getElementsByClassName("icon2");

function addToFavourite(id) {
  let listFavourite = JSON.parse(localStorage.getItem("listFavourite"));
  // love[id].style.color = love[id].style.color == "yellow" ? "white" : "yellow";
  // console.log(icon1[1].style);
  console.log(list[id])
  if (LoginUser[0].login == true) {
        if (listFavourite == null) {
          icon1[id].style.display = "none";
          icon2[id].style.display = "inline-block";
          listFavourite = [];
          listFavourite.push(list[id]);
          localStorage.setItem("listFavourite", JSON.stringify(listFavourite));
        } else {
          icon1[id].style.display = "none";
          icon2[id].style.display = "inline-block";
          listFavourite.push(list[id]);
          localStorage.setItem("listFavourite", JSON.stringify(listFavourite));
        }
      }
      
  else {
    alert("Please login to add favourite");
  }
}

function clearToFavourite(id) {
  console.log(id);
  let dataClear = JSON.parse(localStorage.getItem("listFavourite"));
  if (LoginUser[0].login == true) {
    for(i=0;i<dataClear.length;i++) {
      if(dataClear[i].id == list[id].id) {
        icon1[id].style.display = "inline-block";
        icon2[id].style.display = "none";
        dataClear.splice(i, 1);
        localStorage.setItem("listFavourite", JSON.stringify(dataClear));
      }
    }
   
  } 
  else {
    alert("Please login to add favourite");
  }

}

function toAdmin(){
  window.location = "./admin.html";
} 