const form = document.querySelector("form");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const product = {
        name: this["product-name"].value,
        articleNumber: this["article-number"].value,
        description: this["description"].value,
        price: this["price"].value,
        imageURL: this["image-url"].value,
    };

    try {
        addProduct(product);

        location.href = "index.html";
    } catch (err) {
        alert(err.message);
    }
});

function addProduct(product) {
    if (productExists(product)) {
        throw new Error("Product already exists!");
    }

    const products = fetchProducts();

    products.push(product);

    const serializedProducts = JSON.stringify(products);

    localStorage.setItem("products", serializedProducts);
}

function productExists(product) {
    const products = fetchProducts();
}

function fetchProducts() {
    const serializedProducts = localStorage.getItem("products");

    return JSON.parse(serializedProducts) ?? [];
}
