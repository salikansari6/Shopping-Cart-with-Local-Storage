var totalPriceDisplay = document.getElementById("total");
var totalPrice = 0;
var totalQuantity = 0;
var cartList = document.getElementById("cart-list");
var cartCount = document.getElementById("cart-count");
var row = document.getElementsByClassName("row")[0];
var products = [];
var localStorageCart = [];
var clearButton = document.getElementById("clear-cart");

if (localStorage.getItem("cart") == null) {
  localStorage.setItem("cart", "[]");
}

class Product {
  constructor(name, imgURL, price, quantity) {
    this.name = name;
    this.imgURL = imgURL;
    this.quantity = quantity;
    this.price = price;
    products.push(this);
  }

  showProduct() {
    var column = document.createElement("div");
    column.classList.add(
      "col-md-4",
      "mt-5",
      "d-flex",
      "justify-content-center"
    );
    column.innerHTML = `
        <div class="card" style="width: 18rem;">
        <img src="${this.imgURL}" class="card-img-top" alt="...">
        <div class="card-body d-flex flex-column text-center">
        <h5 class="card-title">${this.name.toUpperCase()}</h5>
        <p class="card-text">Price: &#8377; <span class="price">${
          this.price
        }</span></p>
        <div class="d-flex">
        <button id=${
          this.name
        } class="p-0 flex-fill mx-2 font-weight-bold btn btn-primary add-to-cart">+</button>
        <button class="p-0 flex-fill mx-2 font-weight-bold btn btn-primary remove-from-cart">-</button>
        </div>
        </div>
        `;
    row.appendChild(column);
  }

  addProductToCart() {
    clearButton.classList.remove("d-none");
    getCartFromDB();
    const isProductInCart = localStorageCart.some(
      (product) => product.name === this.name
    );
    if (!isProductInCart) {
      getTotalPriceFromDB();
      totalPrice += this.price;
      putTotalPriceInDB();
      localStorageCart.push(this);
      displayTotalPrice();
      getTotalQuantityFromDB();
      totalQuantity += 1;
      putTotalQuantityInDB();
      displayCartCount();
    } else {
      getTotalQuantityFromDB();
      getTotalPriceFromDB();
      totalPrice += this.price;
      let productIndex = localStorageCart.findIndex(
        (product) => product.name == this.name
      );
      localStorageCart[productIndex].quantity += 1;
      totalQuantity += 1;
      displayCartCount();
      putTotalQuantityInDB();
      putTotalPriceInDB();
      displayTotalPrice();
    }
    localStorage.setItem("cart", JSON.stringify(localStorageCart));
    renderCart();
  }

  removeProduct() {
    getCartFromDB();
    const isProductInCart = localStorageCart.some(
      (product) => product.name === this.name
    );
    if (isProductInCart) {
      getTotalQuantityFromDB();
      let productIndex = localStorageCart.findIndex(
        (product) => product.name == this.name
      );
      localStorageCart[productIndex].quantity -= 1;
      getTotalPriceFromDB();
      totalPrice -= this.price;
      putTotalPriceInDB();
      displayTotalPrice();
      totalQuantity -= 1;
      displayCartCount();
      putTotalQuantityInDB();
    } else {
      alert("Product not present in Cart");
    }
    localStorageCart = localStorageCart.filter(
      (product) => product.quantity != 0
    );
    localStorage.setItem("cart", JSON.stringify(localStorageCart));
    renderCart();
  }

  handleAddToCart() {
    var addButtons = document.getElementsByClassName("add-to-cart");
    Array.from(addButtons).forEach((button) => {
      button.addEventListener("click", (event) => {
        if (this.name == event.target.id) {
          this.addProductToCart();
        }
      });
    });
  }

  handleRemoveFromCart() {
    var removeButtons = document.getElementsByClassName("remove-from-cart");
    Array.from(removeButtons).forEach((button) => {
      button.addEventListener("click", (event) => {
        if (this.name == event.target.previousElementSibling.id) {
          getTotalQuantityFromDB();
          if (totalQuantity > 0) {
            this.removeProduct();
            if (totalQuantity == 0) {
              clearButton.classList.add("d-none");
              totalPriceDisplay.innerHTML = "No items in cart";
            }
          } else {
            alert("Cart is already empty");
          }
        }
      });
    });
  }

  static addProducts() {
    products.forEach((product) => {
      product.showProduct();
      product.handleAddToCart();
      product.handleRemoveFromCart();
    });
  }
}

var apple = new Product(
  "apple",
  "https://i2.wp.com/ceklog.kindel.com/wp-content/uploads/2013/02/firefox_2018-07-10_07-50-11.png",
  50,
  1
);
var orange = new Product(
  "orange",
  "https://5.imimg.com/data5/VN/YP/MY-33296037/orange-600x600-500x500.jpg",
  100,
  1
);
var watermelon = new Product(
  "watermelon",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSH5STHPSBI40JERnUJSA8FpKfKH9sd_QNpvg&usqp=CAU",
  75,
  1
);
var mango = new Product(
  "mango",
  "https://solidstarts.com/wp-content/uploads/Mango_edited-scaled.jpg",
  60,
  1
);
var strawberry = new Product(
  "strawberry",
  "https://static.independent.co.uk/s3fs-public/thumbnails/image/2020/05/20/19/istock-1143163513.jpg?width=1200",
  80,
  1
);

function displayCartCount() {
  cartCount.innerHTML = `${totalQuantity}`;
}

function getTotalQuantityFromDB() {
  totalQuantity = parseInt(localStorage.getItem("total-quantity"), 10) || 0;
}

function putTotalQuantityInDB() {
  localStorage.setItem("total-quantity", totalQuantity);
}

function getTotalPriceFromDB() {
  totalPrice = parseInt(localStorage.getItem("price"), 10) || 0;
}

function putTotalPriceInDB() {
  localStorage.setItem("price", totalPrice);
}

function getCartFromDB() {
  localStorageCart = JSON.parse(localStorage.getItem("cart"));
}

function displayTotalPrice() {
  totalPriceDisplay.innerHTML = `Grand Total: &#8377; ${totalPrice}`;
}

document.addEventListener("DOMContentLoaded", () => {
  getCartFromDB();
  if (localStorageCart.length == 0) {
    totalPriceDisplay.textContent = "No items in cart";
    clearButton.classList.add("d-none");
  } else {
    getTotalPriceFromDB();
    displayTotalPrice();
  }

  Product.addProducts();
  renderCart();
  getTotalQuantityFromDB();
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
    listItem.id = `${product.name}-list`;
    listItem.innerHTML = `
            <h5>${product.name.toUpperCase()}</h5>
            Quantity: <div class="d-inline" id="${product.name}quantity">${
      product.quantity
    }</div>
            <div id="${product.name}price">Total: &#8377; ${
      product.price * product.quantity
    }</div>
            <img src="${product.imgURL}" class="img-fluid float-right">
            `;
    cartList.appendChild(listItem);
  });
}
