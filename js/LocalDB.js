
class LocalDB
{

    static getTotalQuantityFromDB() {
        totalQuantity = parseInt(localStorage.getItem("total-quantity"), 10) || 0;
    }

    static putTotalQuantityInDB() {
        localStorage.setItem("total-quantity", totalQuantity);
    }

    static getTotalPriceFromDB() {
        totalPrice = parseInt(localStorage.getItem("price"), 10) || 0;
    }

    static putTotalPriceInDB() {
        localStorage.setItem("price", totalPrice);
    }

    static getCartFromDB() {
        localStorageCart = JSON.parse(localStorage.getItem("cart"));
    }
}

