const API =
    "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

const app = new Vue({
    el: "#app",
    data: {
        dataError: false,
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then((result) => result.json())
                .catch((error) => {
                    console.log(error);
                    this.dataError = true;
                });
        },
    },
});