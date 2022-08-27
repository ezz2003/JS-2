const API =
    "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

// let getRequest = (url, cb) => {
//     let xhr = new XMLHttpRequest();
//     // window.ActiveXObject -> xhr = new ActiveXObject()
//     xhr.open("GET", url, true);
//     xhr.onreadystatechange = () => {
//         if(xhr.readyState === 4){
//             if(xhr.status !== 200){
//                 console.log('Error');
//             } else {
//                 cb(xhr.responseText);
//             }
//         }
//     };
//     xhr.send();
// };

class ProductsList {
    constructor(container = ".products") {
            this.container = container;
            this.goods = [];
            this._getProducts().then((data) => {
                this.goods = data;
                this.render();
            });
        }
    _getProducts() {
        return fetch(`${API}/catalogData.json`)
            .then((result) => result.json())
            .catch((error) => {
                console.log(error);
            });
    }
    calcSum() {
        return this.allProducts.reduce((accum, item) => (accum += item.price), 0);
    }
    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObj = new ProductItem(product);
            //            this.allProducts.push(productObj);
            block.insertAdjacentHTML("beforeend", productObj.render());
        }
    }
}

class ProductItem {
    constructor(product, img = "https://via.placeholder.com/200x150") {
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
    }
    render() {
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} $</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`;
    }
}

class Cart {
    constructor(container = ".cart-content") {
        this.container = container;
        // this.goods = [];
        this._getProducts().then((data) => {
            this.goods = data;
            this.render();
            this.showBasket();
        });
    }

    showBasket() {
        let elCartContent = document.querySelector(".cart-content");
        document.querySelector(".btn-cart").addEventListener("click", () => {
            elCartContent.classList.toggle("invisible");
        });
    }

    _getProducts() {
        return fetch(`${API}/getBasket.json`)
            .then((result) => result.json())
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        const block = document.querySelector(this.container);
        block.insertAdjacentHTML(
            "beforeend",
            `<div class="cart-total">
<div class="total-costs">
       <div>
          <p>Total cost </p>
         <span>${this.goods.amount}</span>
        </div>
<div>
   <p>Quantity of goods </p>
  <span>${+this.goods.countGoods}</span>
 </div>
    </div>
</div>`
        );
        for (let product of this.goods.contents) {
            const cartObj = new CartItem(product);
            block.insertAdjacentHTML("beforeend", cartObj.render());
        }
    }
}

class CartItem {
    constructor(product, img = "https://via.placeholder.com/100x80") {
        this.img = img;
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.quantity = product.quantity;
    }

    render() {
        return `<div class="cart-product">
    <img src=${this.img}" alt="cart img" 
class="cart-image" />
    <div class="cart-left-data">
        <span>${this.title}</span>
        <span>Quantity:${this.quantity}</span>
        <span>${this.price}</span>
    </div>
    <div class="cart-right-data">
        <span>45600</span>
        <button class="btn-remove">&#9747</button>
    </div>`;
    }
}

let list = new ProductsList();
let cart = new Cart();