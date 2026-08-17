function getCart() {
    const cart = localStorage.getItem('shoppingCart');
    return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
    updateCartDisplay(); 
    updateCartItemCount();
}

function addItemToCart(item) {
    const cart = getCart();
    const existingItem = cart.find(cartItem => cartItem.id === item.id);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...item, quantity: 1 });
    }
    saveCart(cart);
    alert(`${item.name} added to cart!`); 
}

function removeItemFromCart(itemId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== itemId);
    saveCart(cart);
}

function updateItemQuantity(itemId, change) {
    const cart = getCart();
    const itemIndex = cart.findIndex(item => item.id === itemId);

    if (itemIndex > -1) {
        cart[itemIndex].quantity += change;
        if (cart[itemIndex].quantity <= 0) {
            removeItemFromCart(itemId); 
        } else {
            saveCart(cart);
        }
    }
}

function calculateCartTotals(cart) {
    let subtotal = 0;
    cart.forEach(item => {
        subtotal += item.price * item.quantity;
    });
    const tax = subtotal * 0.0;
    const total = subtotal + tax;
    return { subtotal, tax, total };
}

function renderCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cart = getCart();

    if (!cartItemsContainer) return; 

    cartItemsContainer.innerHTML = ''; 

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart-message">Your cart is empty.</p>';
        document.getElementById('cart-subtotal').textContent = '0.00';
        document.getElementById('cart-tax').textContent = '0.00';
        document.getElementById('cart-total').textContent = '0.00';
        return;
    }

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.setAttribute('data-id', item.id); 

        itemElement.innerHTML = `
            <img src="${item.img}" alt="${item.name}">
            <div class="item-details">
                <h4>${item.name}</h4>
                <p>₹${item.price.toFixed(2)} each</p>
            </div>
            <div class="item-quantity-controls">
                <button class="decrease-quantity-btn" data-id="${item.id}">-</button>
                <span>${item.quantity}</span>
                <button class="increase-quantity-btn" data-id="${item.id}">+</button>
            </div>
            <div class="item-price-total">₹${(item.price * item.quantity).toFixed(2)}</div>
            <button class="remove-item-btn" data-id="${item.id}"><i class='bx bx-trash'></i></button>
        `;
        cartItemsContainer.appendChild(itemElement);
    });

    cartItemsContainer.querySelectorAll('.decrease-quantity-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const itemId = e.target.dataset.id;
            updateItemQuantity(itemId, -1);
        });
    });
    cartItemsContainer.querySelectorAll('.increase-quantity-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const itemId = e.target.dataset.id;
            updateItemQuantity(itemId, 1);
        });
    });
    cartItemsContainer.querySelectorAll('.remove-item-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const itemId = e.target.dataset.id;
            removeItemFromCart(itemId);
        });
    });

    updateCartTotalsDisplay();
}

function updateCartTotalsDisplay() {
    const cart = getCart();
    const { subtotal, tax, total } = calculateCartTotals(cart);

    document.getElementById('cart-subtotal').textContent = subtotal.toFixed(2);
    document.getElementById('cart-tax').textContent = tax.toFixed(2);
    document.getElementById('cart-total').textContent = total.toFixed(2);
}

function updateCartItemCount() {
    const cart = getCart();
    const itemCount = cart.reduce((count, item) => count + item.quantity, 0);
    const cartCountSpan = document.getElementById('cart-item-count');
    if (cartCountSpan) {
        cartCountSpan.textContent = itemCount;
    }
}

function updateCartDisplay() {
    renderCartItems(); 
    updateCartTotalsDisplay(); 
    updateCartItemCount(); 
}

document.addEventListener('DOMContentLoaded', () => {
    updateCartDisplay();

    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            const cart = getCart();
            if (cart.length === 0) {
                alert('Your cart is empty. Please add items before checking out.');
                return;
            }
            alert('Proceeding to checkout! (This is a placeholder for real checkout logic)');
        });
    }
});
window.addItemToCart = addItemToCart;