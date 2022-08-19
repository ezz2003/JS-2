const products = [
    { id: 1, title: "Notebook", price: 2000, img: "https://i.yapx.ru/TYPf9.jpg" },
    { id: 2, title: "Mouse", price: 20, img: "https://i.yapx.ru/TYPgA.png" },
    { id: 3, title: "Keyboard", price: 200, img: "https://i.yapx.ru/TYPf8.jpg" },
    { id: 4, title: "Gamepad", price: 50, img: "https://i.yapx.ru/TYPf7.jpg" },
];
//Функция для формирования верстки каждого товара
//Добавить в выводе изображение
const renderProduct = (item) => {
    return `<div class="product-item">
                <div class = "product-item-left">
                  <img src="${item.img}" alt="img" />
                </div>
                <div class = "product-item-right">
                  <h3>${item.title}</h3>
                  <p>price: <span>${item.price} $</span></p>
                  <button class="buy-btn">Купить</button>
                </div>
            </div>`;
};
const renderPage = (list) => {
    const productsList = list.map((item) => renderProduct(item));
    console.log(productsList);
    document.querySelector(".products").innerHTML = productsList.join("");
};

renderPage(products);