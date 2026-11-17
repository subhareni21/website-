
// PRODUCT DATA - 20 PRODUCTS

const products = [
    {id:1,name:"Smartphone",category:"Electronics",price:15000,rating:4.5,image:"photo-1511707171634-5f897ff02aa9",description:"Latest smartphone with advanced features."},
    {id:2,name:"Laptop",category:"Electronics",price:45000,rating:4.8,image:"photo-1496181133206-80ce9b88a853",description:"Powerful laptop for work and entertainment."},
    {id:3,name:"Headphones",category:"Electronics",price:2500,rating:4.2,image:"photo-1505740420928-5e560c06d30e",description:"Premium wireless headphones."},
    {id:4,name:"Smart Watch",category:"Electronics",price:3500,rating:4.3,image:"photo-1523275335684-37898b6baf30",description:"Smart watch with fitness tracking."},
    {id:5,name:"Camera",category:"Electronics",price:30000,rating:4.7,image:"photo-1516035069371-29a1b244cc32",description:"Professional digital camera."},

    {id:6,name:"Men T-Shirt",category:"Fashion",price:799,rating:4.1,image:"photo-1521572163474-6864f9cf17ab",description:"Comfortable cotton T-shirt."},
    {id:7,name:"Women Dress",category:"Fashion",price:1499,rating:4.5,image:"photo-1539008835657-9e8e9680c956",description:"Elegant fashionable dress."},
    {id:8,name:"Shoes",category:"Fashion",price:2200,rating:4.4,image:"photo-1542291026-7eec264c27ff",description:"Stylish everyday shoes."},
    {id:9,name:"Handbag",category:"Fashion",price:1800,rating:4.2,image:"photo-1584917865442-de89df76afd3",description:"Beautiful handbag for everyday use."},
    {id:10,name:"Sunglasses",category:"Fashion",price:999,rating:4.3,image:"photo-1511499767150-a48a237f0083",description:"Trendy sunglasses."},

    {id:11,name:"Face Cream",category:"Beauty",price:599,rating:4.1,image:"photo-1608248543803-ba4f8c70ae0b",description:"Daily moisturizing face cream."},
    {id:12,name:"Perfume",category:"Beauty",price:1200,rating:4.6,image:"photo-1541643600914-78b084683601",description:"Long lasting fragrance."},
    {id:13,name:"Lipstick",category:"Beauty",price:450,rating:4.2,image:"photo-1586495777744-4413f21062fa",description:"Beautiful lipstick shade."},
    {id:14,name:"Makeup Kit",category:"Beauty",price:2500,rating:4.5,image:"photo-1596462502278-27bfdc403348",description:"Complete makeup essentials."},
    {id:15,name:"Skin Serum",category:"Beauty",price:899,rating:4.4,image:"photo-1601049541289-9b1b7bbbfe19",description:"Skin care serum."},

    {id:16,name:"Table Lamp",category:"Home",price:850,rating:4.1,image:"photo-1507473885765-e6ed057f782c",description:"Modern decorative lamp."},
    {id:17,name:"Chair",category:"Home",price:3500,rating:4.5,image:"photo-1503602642458-232111445657",description:"Comfortable modern chair."},
    {id:18,name:"Wall Clock",category:"Home",price:699,rating:4.0,image:"photo-1563861826100-9cb868fdbe1c",description:"Stylish wall clock."},
    {id:19,name:"Sofa",category:"Home",price:18000,rating:4.7,image:"photo-1555041469-a586c61ea9bc",description:"Comfortable living room sofa."},
    {id:20,name:"Plant Pot",category:"Home",price:499,rating:4.2,image:"photo-1485955900006-10f4d324d411",description:"Beautiful decorative plant pot."}
];

const imageURL = image =>
    `https://images.unsplash.com/${image}?auto=format&fit=crop&w=600&q=80`;


// LOCAL STORAGE

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
let orders = JSON.parse(localStorage.getItem("orders")) || [];

function saveData() {
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    updateCounts();
}

function updateCounts() {
    document.getElementById("cartCount").textContent =
        cart.reduce((sum, item) => sum + item.quantity, 0);

    document.getElementById("wishCount").textContent =
        wishlist.length;
}


// DISPLAY PRODUCTS

function displayProducts() {

    const search = document.getElementById("searchInput").value.toLowerCase();
    const category = document.getElementById("categoryFilter").value;
    const sort = document.getElementById("sortFilter").value;
    const maxPrice = Number(document.getElementById("priceFilter").value);

    let filtered = products.filter(product =>
        product.name.toLowerCase().includes(search) &&
        (category === "All" || product.category === category) &&
        product.price <= maxPrice
    );

    if (sort === "low") filtered.sort((a,b) => a.price-b.price);
    if (sort === "high") filtered.sort((a,b) => b.price-a.price);
    if (sort === "rating") filtered.sort((a,b) => b.rating-a.rating);

    const container = document.getElementById("productContainer");

    container.innerHTML = filtered.length ? filtered.map(product => `
        <div class="col-6 col-md-4 col-lg-3">
            <div class="product-card">
                <img src="${imageURL(product.image)}"
                     alt="${product.name}">

                <div class="product-info">
                    <h5>${product.name}</h5>
                    <p>${product.category}</p>
                    <p class="text-warning">? ${product.rating}</p>
                    <p class="price">?${product.price.toLocaleString("en-IN")}</p>

                    <button class="btn btn-dark btn-sm w-100 mb-2"
                        onclick="showDetails(${product.id})">
                        View Details
                    </button>

                    <button class="btn btn-success btn-sm w-100 mb-2"
                        onclick="addToCart(${product.id})">
                        Add to Cart
                    </button>

                    <button class="btn btn-outline-danger btn-sm w-100"
                        onclick="toggleWishlist(${product.id})">
                        ? Wishlist
                    </button>
                </div>
            </div>
        </div>
    `).join("") : "<p class='text-center'>No products found.</p>";
}


// CATEGORY FILTER

function filterCategory(category) {
    document.getElementById("categoryFilter").value = category;
    displayProducts();
    document.getElementById("products").scrollIntoView();
}

function updatePrice() {
    const value = document.getElementById("priceFilter").value;
    document.getElementById("priceValue").textContent = value;
    displayProducts();
}


// PRODUCT DETAILS

function showDetails(id) {
    const product = products.find(p => p.id === id);

    document.getElementById("productDetails").innerHTML = `
        <div class="row align-items-center">
            <div class="col-md-5">
                <img src="${imageURL(product.image)}"
                     class="img-fluid rounded" alt="${product.name}">
            </div>

            <div class="col-md-7">
                <h2>${product.name}</h2>
                <p>${product.description}</p>
                <p>Category: ${product.category}</p>
                <p>Rating: ? ${product.rating}</p>
                <h3 class="price">?${product.price.toLocaleString("en-IN")}</h3>

                <label>Quantity</label>
                <input type="number" id="detailQuantity"
                       value="1" min="1" max="99"
                       class="form-control mb-3" style="max-width:120px">

                <button class="btn btn-success"
                        onclick="addToCart(${id},
                        Number(document.getElementById('detailQuantity').value))">
                    Add to Cart
                </button>
            </div>
        </div>
    `;

    document.getElementById("details").scrollIntoView();
}


// ADD TO CART

   
function addToCart(id, quantity = 1) {

    quantity = Number(quantity);

    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
        alert("Please enter a valid quantity!");
        return;
    }

    const product = products.find(p => p.id === id);

    if (!product) {
        alert("Product not found!");
        return;
    }

    const existing = cart.find(item => item.id === id);

    if (existing) {

        if (existing.quantity + quantity > 99) {
            alert("Maximum quantity is 99!");
            return;
        }

        existing.quantity += quantity;

    } else {

        cart.push({
            id: id,
            quantity: quantity
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCounts();
    displayCart();

    alert("Product added to cart successfully!");
}



// DISPLAY CART


function displayCart() {

    const container = document.getElementById("cartContainer");

    if (!container) return;

    if (cart.length === 0) {

        container.innerHTML = `
            <div class="alert alert-info">
                Your shopping cart is empty! ??
            </div>
        `;

        document.getElementById("cartTotal").textContent = "0";
        return;
    }

    let total = 0;

    container.innerHTML = cart.map(item => {

        const product = products.find(p => p.id === item.id);

        if (!product) return "";

        const subtotal = product.price * item.quantity;

        total += subtotal;

        return `
            <div class="card mb-3 p-3">

                <div class="row align-items-center">

                    <div class="col-3 col-md-2">
                        <img src="${imageURL(product.image)}"
                             class="img-fluid rounded"
                             alt="${product.name}">
                    </div>

                    <div class="col-9 col-md-3">
                        <h5>${product.name}</h5>
                        <p>?${product.price.toLocaleString("en-IN")}</p>
                    </div>

                    <div class="col-6 col-md-3">
                        <input
                            type="number"
                            min="1"
                            max="99"
                            value="${item.quantity}"
                            class="form-control"
                            onchange="updateQuantity(${item.id}, this.value)">
                    </div>

                    <div class="col-6 col-md-2">
                        ?${subtotal.toLocaleString("en-IN")}
                    </div>

                    <div class="col-12 col-md-2 mt-2">
                        <button
                            class="btn btn-danger btn-sm"
                            onclick="removeCart(${item.id})">
                            Remove
                        </button>
                    </div>

                </div>
            </div>
        `;

    }).join("");

    document.getElementById("cartTotal").textContent =
        total.toLocaleString("en-IN");
}

 

// UPDATE QUANTITY

  function updateQuantity(id, quantity) {

    quantity = Number(quantity);

    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
        alert("Enter a quantity between 1 and 99!");
        displayCart();
        return;
    }

    const item = cart.find(p => p.id === id);

    if (!item) return;

    item.quantity = quantity;

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCounts();
    displayCart();
}

// REMOVE CART

function removeCart(id) {

    cart = cart.filter(item => item.id !== id);

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCounts();
    displayCart();
}

// WISHLIST

       
                
// ADD OR REMOVE WISHLIST PRODUCT

function toggleWishlist(id) {

    if (wishlist.includes(id)) {

        wishlist = wishlist.filter(item => item !== id);

        alert("Product removed from wishlist!");

    } else {

        wishlist.push(id);

        alert("Product added to wishlist!");
    }

    // Save wishlist
    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );

    updateCounts();
    displayWishlist();
}


// DISPLAY WISHLIST PRODUCTS

function displayWishlist() {

    const container = document.getElementById("wishlistContainer");

    if (!container) return;

    if (wishlist.length === 0) {

        container.innerHTML = `
            <div class="col-12">
                <div class="alert alert-info text-center">
                    ?? Your wishlist is empty!
                    <br>
                    Start adding your favourite products.
                </div>
            </div>
        `;

        return;
    }

    container.innerHTML = wishlist.map(id => {

        const product = products.find(p => p.id === id);

        if (!product) return "";

        return `
            <div class="col-6 col-md-4 col-lg-3">

                <div class="product-card">

                    <img src="${imageURL(product.image)}"
                         alt="${product.name}">

                    <div class="product-info">

                        <h5>${product.name}</h5>

                        <p>${product.category}</p>

                        <p class="price">
                            ?${product.price.toLocaleString("en-IN")}
                        </p>

                        <button class="btn btn-success btn-sm w-100 mb-2"
                            onclick="addToCart(${product.id})">
                            Add to Cart
                        </button>

                        <button class="btn btn-danger btn-sm w-100"
                            onclick="toggleWishlist(${product.id})">
                            Remove from Wishlist
                        </button>

                    </div>
                </div>
            </div>
        `;

    }).join("");
}

// display orders

function displayOrders() {

    const container = document.getElementById("ordersContainer");

    if (orders.length === 0) {
        container.innerHTML = `
            <div class="alert alert-info">
                You haven't placed any orders yet.
            </div>
        `;
        return;
    }

    container.innerHTML = orders.slice().reverse().map(order => {

        const itemsHTML = order.items.map(item => {

            const product = products.find(p => p.id === item.id);

            if (!product) return "";

            return `
                <div class="d-flex align-items-center gap-3 mb-3">
                    <img src="${imageURL(product.image)}"
                         width="70" height="70"
                         style="object-fit:cover"
                         alt="${product.name}">

                    <div>
                        <h6>${product.name}</h6>
                        <p class="mb-0">
                            Quantity: ${item.quantity}
                        </p>
                        <p class="mb-0">
                            Price: ?${(product.price * item.quantity).toLocaleString("en-IN")}
                        </p>
                    </div>
                </div>
            `;
        }).join("");

        return `
            <div class="card shadow-sm mb-4">
                <div class="card-header bg-dark text-white">
                    <strong>Order ID: ${order.orderNumber}</strong>
                </div>

                <div class="card-body">

                    <span class="badge bg-success">
                        ${order.status}
                    </span>

                    <p class="mt-3">
                        <strong>Order Date:</strong> ${order.date}
                    </p>

                    <hr>

                    <h5>Ordered Products</h5>

                    ${itemsHTML}

                    <hr>

                    <h5>
                        Total Amount:
                        ?${order.total.toLocaleString("en-IN")}
                    </h5>

                    <p>
                        <strong>Payment Method:</strong>
                        ${order.payment}
                    </p>

                    <p>
                        <strong>Delivery Address:</strong>
                        ${order.address}
                    </p>
                    
                   ${order.status !== "Cancelled" ? `
    <button class="btn btn-danger btn-sm"
        onclick="cancelOrder('${order.orderNumber}')">
        Cancel Order
    </button>
` : `
    <button class="btn btn-outline-danger btn-sm"
        onclick="deleteCancelledOrder('${order.orderNumber}')">
        Delete Order ???
    </button>
`}
                </div>
            </div>
        `;

    }).join("");
}


// CANCEL ORDER FUNCTION


// DELETE CANCELLED ORDER

    
function cancelOrder(orderNumber) {

    const order = orders.find(
        item => String(item.orderNumber) === String(orderNumber)
    );

    if (!order) {
        alert("Order not found!");
        return;
    }

    if (order.status === "Cancelled") {
        alert("This order is already cancelled!");
        return;
    }

    const confirmCancel = confirm(
        "Are you sure you want to cancel this order?"
    );

    if (!confirmCancel) return;

    order.status = "Cancelled";

    localStorage.setItem(
        "orders",
        JSON.stringify(orders)
    );

    displayOrders();

    alert("Order cancelled successfully!");
}


function deleteCancelledOrder(orderNumber) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this cancelled order?"
    );

    if (!confirmDelete) return;

    orders = orders.filter(order =>
        !(String(order.orderNumber) === String(orderNumber) &&
          order.status === "Cancelled")
    );

    localStorage.setItem(
        "orders",
        JSON.stringify(orders)
    );

    displayOrders();

    alert("Cancelled order deleted successfully!");
}

// CHECKOUT

function showCheckout() {

    if (cart.length === 0) {
        alert("Your shopping cart is empty!");
        return;
    }

    document.getElementById("checkout").hidden = false;
    document.getElementById("checkout").scrollIntoView();
}

document.getElementById("checkoutForm").addEventListener("submit", function(e) {

    e.preventDefault();

    if (!this.reportValidity()) return;

    const orderNumber = "ORD" + Date.now();

    const order = {
        orderNumber,
        customer: document.getElementById("customerName").value,
        email: document.getElementById("customerEmail").value,
        phone: document.getElementById("customerPhone").value,
        address: document.getElementById("customerAddress").value,
        payment: document.getElementById("paymentMethod").value,
        items: [...cart],
        total: cart.reduce((sum, item) => {
            const product = products.find(p => p.id === item.id);
            return sum + product.price * item.quantity;
        }, 0)
    };

    // SAVE ORDER IN LOCAL STORAGE

orders.push({
    ...order,
    date: new Date().toLocaleString(),
    status: "Order Placed"
});

localStorage.setItem("orders", JSON.stringify(orders));

displayOrders();



    document.getElementById("orderConfirmation").innerHTML = `
        <div class="alert alert-success">
            <h4>Order Placed Successfully! ??</h4>
            <p>Order ID: ${orderNumber}</p>
            <p>Customer: ${order.customer}</p>
            <p>Total: ?${order.total.toLocaleString("en-IN")}</p>
            <p>Payment: ${order.payment}</p>
        </div>
    `;

    cart = [];
    saveData();
    displayCart();
    this.reset();

    document.getElementById("checkout").hidden = true;
});


// REGISTRATION

   
// REGISTRATION

document.getElementById("registerForm").addEventListener("submit", function(e) {

    e.preventDefault();

    const name = document.getElementById("regName").value.trim();
    const email = document.getElementById("regEmail").value.trim();
    const password = document.getElementById("regPassword").value;

    if (!name || !email || password.length < 6) {
        alert("Please enter valid details!");
        return;
    }

    const user = {
        name: name,
        email: email,
        password: password
    };

    localStorage.setItem("demoUser", JSON.stringify(user));

    document.getElementById("authMessage").innerHTML =
        `<div class="alert alert-success">
            Registration successful! Please login.
        </div>`;

    this.reset();
});


// LOGIN

 
// LOGIN

document.getElementById("loginForm").addEventListener("submit", function(e) {

    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    const user = JSON.parse(localStorage.getItem("demoUser"));

    if (user && user.email === email && user.password === password) {

        // Save login session
        localStorage.setItem("loggedInUser", JSON.stringify({
            name: user.name,
            email: user.email
        }));

        document.getElementById("authMessage").innerHTML =
            `<div class="alert alert-success">
                Welcome ${user.name}! Login successful.
            </div>`;

        displayProfile();

        this.reset();

    } else {

        document.getElementById("authMessage").innerHTML =
            `<div class="alert alert-danger">
                Invalid email or password!
            </div>`;
    }
});


// DISPLAY CUSTOMER PROFILE

function displayProfile() {

    const user = JSON.parse(
        localStorage.getItem("loggedInUser")
    );

    if (!user) {

        document.getElementById("profileName").textContent = "Guest User";
        document.getElementById("profileEmail").textContent =
            "Please login to view your profile.";

        document.getElementById("displayName").textContent = "-";
        document.getElementById("displayEmail").textContent = "-";

        document.getElementById("profileActions").innerHTML = `
            <a href="#login" class="btn btn-primary">
                Login Now
            </a>
        `;

        return;
    }

    document.getElementById("profileName").textContent = user.name;
    document.getElementById("profileEmail").textContent = user.email;

    document.getElementById("displayName").textContent = user.name;
    document.getElementById("displayEmail").textContent = user.email;

    document.getElementById("profileActions").innerHTML = `
        <button class="btn btn-danger" onclick="logout()">
            Logout
        </button>
    `;
}


// LOGOUT FUNCTION

function logout() {

    localStorage.removeItem("loggedInUser");

    displayProfile();

    document.getElementById("authMessage").innerHTML = `
        <div class="alert alert-info">
            You have logged out successfully!
        </div>
    `;

}


 
// INITIALIZE WEBSITE
// INITIALIZE WEBSITE

displayProducts();
displayCart();
displayWishlist();
displayOrders();
updateCounts();
displayProfile();;

