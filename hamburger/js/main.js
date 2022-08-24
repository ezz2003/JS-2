class Components {
    constructor(
        fraction,
        INGRIDIENTS = [
            { name: "little", price: 50, calories: 20 },
            { name: "big", price: 100, calories: 40 },
            { name: "cheese", price: 10, calories: 20 },
            { name: "salad", price: 20, calories: 5 },
            { name: "potatoes", price: 15, calories: 10 },
            { name: "seasoning", price: 15, calories: 0 },
            { name: "mayonnaise", price: 20, calories: 5 },
        ]
    ) {
        this.fraction = this._getFraction(fraction, INGRIDIENTS);
    }

    _getFraction(fraction, INGRIDIENTS) {
        let a = INGRIDIENTS.find((e) => e.name == fraction);
        return a;
    }
}

class Hamburger {
    constructor(size, fillings, options) {
        this.size = this._choiceBase(size);
        this.fillings = this._choiceBase(fillings);
        this.options = this._choiceOptions(options);
        this.insertHtml();
    }

    _choiceBase(name) {
        let a = document.querySelector(`input[name=${name}]:checked`);
        return new Components(a.value).fraction;
    }

    _choiceOptions(name) {
        let a = [];
        let b = document.querySelectorAll(`input[name=${name}]:checked`);
        b.forEach((i) => {
            a.push(new Components(i.value).fraction);
        });
        return a;
    }

    _fetchOptions(options) {
        let a = [];
        options.forEach((i) => {
            a.push(i.name);
        });
        return a;
    }

    insertHtml() {
        const CARTWRAP = document.querySelector(".cart-wrap");
        const ELCART = document.querySelector(".cart");
        CARTWRAP.remove();
        ELCART.insertAdjacentHTML("afterbegin", this.renderHtml());
    }

    renderHtml() {
        return `<div class="cart-wrap"><h4>size: ${
      this.size.name
    }</h4><h4>fillings: ${
      this.fillings.name
    }</h4><h4>addings:  ${this._fetchOptions(
      this.options
    )}</h4><h3>Total price: ${this.getTotalScore(
      "price"
    )}</h3><h4>Total calories: ${this.getTotalScore("calories")}
    </h4></div>`;
    }

    getTotalScore(mark) {
        let score = 0;
        score = score + this.size[`${mark}`] + this.fillings[`${mark}`];
        this.options.forEach((i) => {
            score += i[`${mark}`];
        });
        return score;
    }
}

const ELCREATE = document.querySelector(".create");
ELCREATE.addEventListener("click", () => {
    new Hamburger("size", "fillings", "options");
});