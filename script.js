// Update cart functionality for the cart page
function updateCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.querySelector('.cart-items');
    cartContainer.innerHTML = '';

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <img src="product1.jpg" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>$${item.price}</p>
            <input type="number" value="${item.quantity}" onchange="updateQuantity(${item.id}, this.value)">
            <button onclick="removeItem(${item.id})">Remove</button>
        `;
        cartContainer.appendChild(itemElement);
    });

    // Total Calculation
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    document.querySelector('.total').innerText = `Total: $${total}`;
}

function updateQuantity(id, quantity) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let item = cart.find(product => product.id === id);
    if (item) {
        item.quantity = parseInt(quantity);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
    }
}

function removeItem(id) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(product => product.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

// Call updateCart() on page load for Cart Page
if (document.body.classList.contains('cart-page')) {
    updateCart();
}
