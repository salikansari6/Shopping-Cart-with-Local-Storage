var productList = [];
productId=0;

class Product {
    constructor(name, imgURL, price, quantity) {
      this.id=productId++;
      this.name = name;
      this.imgURL = imgURL;
      this.quantity = quantity;
      this.price = price;
      productList.push(this);
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
              this.id
            } class="p-0 flex-fill mx-2 font-weight-bold btn btn-primary add-to-cart">+</button>
            <button class="p-0 flex-fill mx-2 font-weight-bold btn btn-primary remove-from-cart">-</button>
            </div>
            </div>
            `;
        row.appendChild(column);
      }

    


    handleAddToCart() {
        var addButtons = document.getElementsByClassName("add-to-cart");
        Array.from(addButtons).forEach((addButton) => {
          addButton.addEventListener("click", (event) => {
            if (this.id == event.target.id) {
                Cart.addProductToCart(this);
            }
          });
        });
      }
    
      handleRemoveFromCart() {
        var removeButtons = document.getElementsByClassName("remove-from-cart");
        Array.from(removeButtons).forEach((removeButton) => {
          removeButton.addEventListener("click", (event) => {
            if (this.id == event.target.previousElementSibling.id) {
              getInfoFromLocalDB();
              if (totalQuantity > 0) {
                Cart.removeProduct(this);
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
  
    
  
    
  }
  