class ProductRepository
{
    
      static addProducts() {

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
        productList.forEach((product) => {
          product.showProduct();
          product.handleAddToCart();
          product.handleRemoveFromCart();
        });
      }
}


