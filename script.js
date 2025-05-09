function addToCart(name, price) {
    let cart = JSON.parse(sessionStorage.getItem('cart') || '[]');
    let found = cart.find(item => item.name === name);
    if (found) {
        found.qty += 1;
    } else {
        cart.push({ name, price, qty: 1 });
    }
    sessionStorage.setItem('cart', JSON.stringify(cart));
    window.location.href = 'cart.html';
}

function renderCart() {
    let cart = JSON.parse(sessionStorage.getItem('cart') || '[]');
    let itemsDiv = document.getElementById('cart-items');
    let totalSpan = document.getElementById('cart-total');
    let total = 0;

    if (!itemsDiv || !totalSpan) return;

    if (cart.length === 0) {
        itemsDiv.innerHTML = '<p class="cart-item-name" style="color:white;">Košarica je prazna.</p>';
        totalSpan.textContent = '0.00€';
        return;
    }

    let html = '';
    cart.forEach((item, idx) => {
        let itemTotal = item.price * item.qty;
        total += itemTotal;
        html += `
            <div class="cart-item">
                <div>
                    <span class="cart-item-name">${item.name}</span>
                    <span class="cart-item-qty"> ${item.qty} kom</span>
                </div>
                <div class="cart-item-price">${itemTotal.toFixed(2)}€</div>
                <button class="btn-buy cart-remove" onclick="removeFromCart(${idx})">Ukloni</button>
            </div>
        `;
    });

    itemsDiv.innerHTML = html;
    totalSpan.textContent = total.toFixed(2) + '€';
}

function removeFromCart(idx) {
    let cart = JSON.parse(sessionStorage.getItem('cart') || '[]');
    if (cart[idx].qty > 1) {
        cart[idx].qty -= 1;
    } else {
        cart.splice(idx, 1);
    }
    sessionStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}


// Only call renderCart on cart.html
if (document.getElementById('cart-items')) {
    renderCart();
}