//add to cart
function addToCart(name, price) {
    let cart = JSON.parse(sessionStorage.getItem('cart') || '[]');
    let foundObject = cart.find(object => object.name === name);

    if (foundObject) {
        foundObject.qty += 1;
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
    let totalCartPrice = 0;

    if (!itemsDiv || !totalSpan) {
        return;
    }

    if (cart.length === 0) {
        itemsDiv.innerHTML = '<p class="cart-item-name" style="color:white;">Košarica je prazna.</p>';
        totalSpan.textContent = '0.00€';
        return;
    }

    let html = '';

    cart.forEach((object, index) => {
        let objectTotalPrice = object.price * object.qty;

        totalCartPrice += objectTotalPrice;

        html += `
            <div class="cart-item">
                <div>
                    <span class="cart-item-name">${object.name}</span>
                    <span class="cart-item-qty"> ${object.qty} kom</span>
                </div>
                <div class="cart-item-price">${objectTotalPrice.toFixed(2)}€</div>
                <button class="btn-buy cart-remove" onclick="removeFromCart(${index})">Ukloni</button>
            </div>
        `;
    });

    itemsDiv.innerHTML = html;
    totalSpan.textContent = totalCartPrice.toFixed(2) + '€';
}

function removeFromCart(index) {
    let cart = JSON.parse(sessionStorage.getItem('cart') || '[]');

    if (cart[index].qty > 1) {
        cart[index].qty -= 1;
    } else {
        cart.splice(index, 1);
    }

    sessionStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

if (document.getElementById('cart-items')) {
    renderCart();
}

//filters for products
function filterProducts() {
    let categoryFilters = Array.from(document.querySelectorAll('input[name="category"]:checked')).map(checkbox => checkbox.value);
    let brandFilters = Array.from(document.querySelectorAll('input[name="brand"]:checked')).map(checkbox => checkbox.value);

    let cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        let lensTypeDiv = card.querySelector('.lens-type');
        let categoryDiv = lensTypeDiv ? lensTypeDiv : card.querySelector('.card-type');
        let categoryText = categoryDiv ? categoryDiv.textContent.trim() : '';
        let cardTitle = card.querySelector('.card-title') ? card.querySelector('.card-title').textContent.trim() : '';
        let isLensPage = !!lensTypeDiv;
        let categoryMatch;

        if (categoryFilters.length === 0) {
            categoryMatch = true;
        } else if (isLensPage) {
            categoryMatch = categoryFilters.every(f => categoryText.includes(f));
        } else {
            categoryMatch = categoryFilters.some(f => categoryText === f);
        }

        let brandMatch = brandFilters.length === 0 || brandFilters.some(brand => cardTitle.toLowerCase().includes(brand.toLowerCase()));

        if (categoryMatch && brandMatch) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}