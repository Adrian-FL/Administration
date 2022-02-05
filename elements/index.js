const newProductButton = document.querySelector("section form button");
const searchInput = document.querySelector("#search-product");

newProductButton.addEventListener("click", function (event) {
    event.preventDefault();
    location.href = "add_item.html";
});

// keyup -> writing event
searchInput.addEventListener("keyup", function (event) {
    populateTable(this.value);
});

function removeProductsFromTable() {
    const tBody = document.querySelector("tbody");
    while (tBody.firstChild) {
        tBody.removeChild(tBody.lastChild);
    }
}

function getProducts() {
    const serializedProducts = localStorage.getItem("products");
    return JSON.parse(serializedProducts) ?? [];
}

function populateTable(string = undefined) {
    const tBody = document.querySelector("tbody");
    const template = document.querySelector("template");
    let products = getProducts();

    removeProductsFromTable();

    if (string !== undefined)
        products = products.filter((product) => product.name.includes(string));

    products.forEach((product) => {
        const tr = template.content.cloneNode(true);

        const tdName = tr.querySelector(".name");
        const tdArticleNumber = tr.querySelector(".article-number");
        const tdDescription = tr.querySelector(".description");
        const tdPrice = tr.querySelector(".price");

        tdName.textContent = product.name;
        tdArticleNumber.textContent = product.articleNumber;
        tdDescription.textContent = product.description;
        tdPrice.textContent = product.price;

        tBody.appendChild(tr);
    });
}

populateTable();
