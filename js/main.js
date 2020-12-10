var totalPriceDisplay = document.getElementById("total");
var totalPrice = 0;
var totalQuantity = 0;
var cartList = document.getElementById("cart-list");
var cartCount = document.getElementById("cart-count");
var row = document.getElementsByClassName("row")[0];
var localStorageCart = [];
var clearButton = document.getElementById("clear-cart");

if (localStorage.getItem("cart") == null) {
  localStorage.setItem("cart", "[]");
}

function getInfoFromLocalDB()
{   
    LocalDB.getCartFromDB();
    LocalDB.getTotalQuantityFromDB();
    LocalDB.getTotalPriceFromDB();
}

function putInfoInLocalDB()
{
    LocalDB.putTotalQuantityInDB();
    LocalDB.putTotalPriceInDB();       
}

function displayTotalPrice() {
  totalPriceDisplay.innerHTML = `Grand Total: &#8377; ${totalPrice}`;
}

function displayCartCount() {
  cartCount.innerHTML = `${totalQuantity}`;
}

document.addEventListener("DOMContentLoaded", () => {
  getInfoFromLocalDB()
  if (localStorageCart.length == 0) {
    totalPriceDisplay.textContent = "No items in cart";
    clearButton.classList.add("d-none");
  } else {
    
    displayTotalPrice();
  }

  ProductRepository.addProducts();
  renderCart();
  displayCartCount();

  clearButton.addEventListener("click", clearCart);
});



function clearCart() {
  localStorage.setItem("cart", "[]");
  localStorage.setItem("total-quantity", 0);
  localStorage.setItem("price", 0);
  totalQuantity = 0;
  displayCartCount();
  renderCart();
  totalPriceDisplay.textContent = "No items in cart";
  clearButton.classList.add("d-none");
}

function renderCart() {
  localStorageCart = JSON.parse(localStorage.getItem("cart"));
  cartList.innerHTML = "";
  localStorageCart.forEach((product) => {
    var listItem = document.createElement("li");
    listItem.classList.add("list-group-item");
    listItem.id = `${product.id}`;
    listItem.innerHTML = `
            <h5>${product.name.toUpperCase()}</h5>
            Quantity: <div class="d-inline"">${
      product.quantity
    }</div>
            <div>Total: &#8377; ${
      product.price * product.quantity
    }</div>
            <img src="${product.imgURL}" class="img-fluid float-right">
            `;
    cartList.appendChild(listItem);
  });
}


