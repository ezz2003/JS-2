class Feedback {
    constructor() {
        this.arrData = [
            { type: "name", regExp: /^[a-zа-я ,.'-]+$/i, msg: "Введите имя" },
            {
                type: "email",
                regExp: /^[a-zа-я0-9._-]+@[a-z0-9._-]+\.[a-z]{2,4}/i,
                msg: "Введите E-mail",
            },
            {
                type: "phone",
                regExp: /^((\+7|7|8)+([0-9]){10})$/,
                msg: "Введите номер телефона",
            },
        ];
        this.enterData();
    }

    enterData() {
        document
            .querySelector(".registration-forms")
            .addEventListener("submit", (e) => {
                e.preventDefault();
                document.querySelectorAll(".inText").forEach((i) => {
                    i.classList.remove("inTextCast");
                    this.filter(i);
                });
            });
    }

    filter(i) {
        let j = this.arrData.find((l) => i.id == l.type);
        if (!i.value.match(j.regExp)) {
            i.classList.add("inTextCast");
            i.value = j.msg;
        }
    }
}

new Feedback();
products.getJson(`getProducts.json`).then((data) => products.handleData(data));