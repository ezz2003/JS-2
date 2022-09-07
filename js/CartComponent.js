Vue.component("cart", {
    data() {
        return {
            imgCart: "https://via.placeholder.com/120x80",
            cartUrl: "/getBasket.json",
            cartItems: [],
            show: false,
        };
    },
    template: `
    <div>
        <button class="btn-cart" type="button" @click="show=!show">
          Корзина
         </button>
        <div class="cart-block" v-show="show">
            <span v-if="!cartItems.length">there is nothing</span>
            <cart-item v-for="item of cartItems" :key="item.id_product" :img="imgCart" :cart-item="item">
            </cart-item>
           
        </div>
    </div>
    `,

    methods: {
        addProduct(product) {
            let find = this.cartItems.find((i) => i.id_product == product.id_product);
            if (find) {
                find.quantity++;
                find.priceAll += find.price;
            } else {
                let itemCart = Object.assign(product);
                Vue.set(itemCart, "quantity", 1);
                Vue.set(itemCart, "priceAll", product.price);
                this.cartItems.push(itemCart);
            }
        },

        delProduct(product) {
            let find = this.cartItems.find((i) => i.id_product == product.id_product);
            if (find.quantity == 1) {
                this.cartItems.splice(this.cartItems.indexOf(find), 1);
            } else {
                find.quantity--;
                find.priceAll -= find.price;
            }
        },
    },

    mounted() {
        this.$parent.getJson(`${API + this.cartUrl}`).then((data) => {
            for (let el of data.contents) {
                // this.cartItems.push(el);
                this.addProduct(el);
            }
        });
    },
});

Vue.component("cart-item", {
    props: ["img", "cartItem"],
    template: `  
   <div class="cart-item">
     <div class="product-bio">
         <img :src='img' alt="Some image"/>
         <div class="product-desc">
             <p class="product-title">{{cartItem.product_name}}</p>
             <p class="product-quantity">Quantity: {{cartItem.quantity}}</p>
             <p class="product-single-price">{{cartItem.price}}</p>
         </div>
         <div class="right-block">
           <p class="product-price">{{cartItem.priceAll}}</p>
           <button class="del-btn" data-id="${this.id_product}" @click="$parent.
             delProduct(cartItem)">
                 &times;
           </button>
         </div>
     </div>
   </div>
`,
});