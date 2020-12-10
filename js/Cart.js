class Cart
{
    static addProductToCart(addedProduct) {
        clearButton.classList.remove("d-none");
        LocalDB.getCartFromDB();
        const isProductInCart = localStorageCart.some(
          (product) => product.name === addedProduct.name
        );
        if (!isProductInCart) {
          getInfoFromLocalDB();
          totalPrice += addedProduct.price;
          localStorageCart.push(addedProduct);
          totalQuantity += 1;
          putInfoInLocalDB();
          displayTotalPrice();
          displayCartCount();
        } else {
          getInfoFromLocalDB();
          totalPrice += addedProduct.price;
          let productIndex = localStorageCart.findIndex(
            (product) => product.name == addedProduct.name
          );
          localStorageCart[productIndex].quantity += 1;
          totalQuantity += 1;
          displayCartCount();
          putInfoInLocalDB();
          displayTotalPrice();
        }
        localStorage.setItem("cart", JSON.stringify(localStorageCart));
        renderCart();
      }
    
      static removeProduct(productToBeRemoved) {
        getInfoFromLocalDB();
        const isProductInCart = localStorageCart.some(
          (product) => product.name === productToBeRemoved.name
        );
        if (isProductInCart) {
          let productIndex = localStorageCart.findIndex(
            (product) => product.name == productToBeRemoved.name
          );
          localStorageCart[productIndex].quantity -= 1;
          totalPrice -= productToBeRemoved.price;          
          displayTotalPrice();
          totalQuantity -= 1;
          displayCartCount();
          putInfoInLocalDB();
        } else {
          alert("Product not present in Cart");
        }
        localStorageCart = localStorageCart.filter(
          (product) => product.quantity != 0
        );
        localStorage.setItem("cart", JSON.stringify(localStorageCart));
        renderCart();
      }
}