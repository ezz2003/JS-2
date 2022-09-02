const API =
    "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

const app = new Vue({
    el: "#app",
    data: {
        catalogUrl: "/catalogData.json",
        cartUrl: "/getBasket.json",
        products: [],
        filtered: [],
        cartItems: [],
        imgCatalog: "https://via.placeholder.com/200x150",
        imgCart: "https://via.placeholder.com/120x80",
        userSearch: "",
        show: false,
    },
    methods: {
        filter() {
            if (!this.userSearch) {
                this.products = [];
                this.pMounted();
            } else {
                const regexp = new RegExp(this.userSearch, "i");
                this.filtered = this.products.filter((product) =>
                    regexp.test(product.product_name)
                );
                this.products = this.filtered.slice();
            }
        },

        getJson(url) {
            return fetch(url)
                .then((result) => result.json())
                .catch((error) => {
                    console.log(error);
                });
        },
        addProduct(product) {
            this.getJson(`${API}/addToBasket.json`).then((data) => {
                if (data.result == 1) {
                    let find = this.cartItems.find(
                        (i) => i.id_product == product.id_product
                    );
                    if (find) {
                        find.quantity++;
                        find.priceAll += find.price;
                    } else {
                        let itemCart = Object.assign(product);
                        Vue.set(itemCart, "quantity", 1);
                        Vue.set(itemCart, "priceAll", product.price);
                        this.cartItems.push(itemCart);
                    }
                }
            });
        },

        delProduct(product) {
            this.getJson(`${API}/deleteFromBasket.json`).then((data) => {
                if (data.result == 1) {
                    let find = this.cartItems.find(
                        (i) => i.id_product == product.id_product
                    );
                    if (find.quantity == 1) {
                        this.cartItems.splice(this.cartItems.indexOf(find), 1);
                    } else {
                        find.quantity--;
                        find.priceAll -= find.price;
                    }
                }
            });
        },

        pMounted() {
            this.getJson(`${API + this.catalogUrl}`).then((data) => {
                // два товара с сервера
                for (let el of data) {
                    this.$data.products.push(el); // $data ознвчат что данные брать только из текущего конструктора если вдруг будем массивы переопределять
                }
            });
            this.getJson(`getProducts.json`).then((data) => {
                // и два товара локальных
                for (let el of data) {
                    this.$data.products.push(el); // $data ознвчат что данные брать только из текущего конструктора если вдруг будем массивы переопределять
                }
            });
        },
    },
    mounted() {
        this.pMounted();
        // чтобы не делать здесь дубликат products для filter, пусть будет на серверах
        this.getJson(`${API + this.cartUrl}`).then((data) => {
            console.log(data.contents);
            for (let el of data.contents) {
                this.$data.cartItems.push(el);
            }
        });
    },
});