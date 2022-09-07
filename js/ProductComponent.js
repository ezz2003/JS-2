Vue.component("products", {
    props: ["products", "img"],
    data() {
        return {
            products: [],
            filtered: [],
            imgCatalog: "https://via.placeholder.com/200x150",
            catalogUrl: "/catalogData.json",
        };
    },

    methods: {
        filter(userSearch) {
            if (!userSearch) {
                this.products = [];
                this.pMounted();
            } else {
                const regexp = new RegExp(userSearch, "i");
                this.filtered = this.products.filter((product) =>
                    regexp.test(product.product_name)
                );
                this.products = this.filtered.slice();
            }
        },

        pMounted() {
            this.products = [];

            this.$parent.getJson(`${API + this.catalogUrl}`).then((data) => {
                // два товара с сервера
                for (let el of data) {
                    this.products.push(el);
                }
            });
            this.$parent.getJson(`getProducts.json`).then((data) => {
                // и два товара локальных
                for (let el of data) {
                    this.products.push(el);
                }
            });
        },
    },

    mounted() {
        this.pMounted();
    },

    template: `<div class="products">
                <product v-for="product of products" 
                :key="product.id_product" 
                :img="imgCatalog"
                :products = "products"
                :product="product"></product>
               </div>`,
});

Vue.component("product", {
    props: ["product", "img"],
    template: `
            <div class="product-item">
                <img :src='img' alt="Some img">
                <div class="desc">
                    <h3>{{product.product_name}}</h3>
                    <p>{{product.price}}</p>
                    <button class="buy-btn" @click="$root.$refs.cart.addProduct(product)">Купить</button>
                </div>
            </div>
    `,
    methods: {},
});