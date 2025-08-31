// Sample product data
const products = [
  {
    id: 1,
    name: 'Minimalist White Shirt',
    category: 'men',
    price: 29.99,
    image: 'https://via.placeholder.com/200x250?text=White+Shirt',
  },
  {
    id: 2,
    name: 'Elegant Black Dress',
    category: 'women',
    price: 59.99,
    image: 'https://via.placeholder.com/200x250?text=Black+Dress',
  },
  {
    id: 3,
    name: 'Casual Jeans',
    category: 'men',
    price: 49.99,
    image: 'https://via.placeholder.com/200x250?text=Jeans',
  },
  {
    id: 4,
    name: 'Summer Hat',
    category: 'women',
    price: 19.99,
    image: 'https://via.placeholder.com/200x250?text=Summer+Hat',
  },
];

// DOM Elements
const productList = document.getElementById('product-list');
const shopProducts = document.getElementById('shop-products');
const searchInput = document.getElementById('search-input');
const categoryFilter = document.getElementById('category-filter');
const cartButton = document.getElementById('cart-button');
const cartDrawer = document.getElementById('cart-drawer');
const closeCartBtn = document.getElementById('close-cart');
const cartItemsList = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout');
const contactForm = document.getElementById('contact-form');
const formFeedback = document.getElementById('form-feedback');

let cart = [];

// Utility: format price
function formatPrice(price) {
  return `$${price.toFixed(2)}`;
}

// Render product cards
function renderProducts(targetElement, productsToRender) {
  targetElement.innerHTML = '';
  if (productsToRender.length === 0) {
    targetElement.innerHTML = '<p>No products found.</p>';
    return;
  }
  productsToRender.forEach((product) => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <div class="product-info">
        <h3>${product.name}</h3>
        <p class="product-price">${formatPrice(product.price)}</p>
        <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
      </div>
    `;
    targetElement.appendChild(card);
  });
}

// Initial rendering
renderProducts(productList, products);
renderProducts(shopProducts, products);

// Filter products by search and category
function filterProducts() {
  const searchTerm = searchInput.value.toLowerCase();
  const category = categoryFilter.value;

  const filtered = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm);
    const matchesCategory = category === 'all' || product.category === category;
    return matchesSearch && matchesCategory;
  });

  renderProducts(shopProducts, filtered);
}

// Cart functions
function updateCartCount() {
  cartCount.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
}

function updateCartUI() {
  cartItemsList.innerHTML = '';
  if (cart.length === 0) {
    cartItemsList.innerHTML = '<li>Your cart is empty.</li>';
    cartTotal.textContent = 'Total: $0.00';
    checkoutBtn.disabled = true;
    return;
  }
  let total = 0;
  cart.forEach((item) => {
    total += item.price * item.quantity;
    const li = document.createElement('li');
    li.textContent = `${item.name} x${item.quantity} - ${formatPrice(item.price * item.quantity)}`;
    cartItemsList.appendChild(li);
  });
  cartTotal.textContent = `Total: ${formatPrice(total)}`;
  checkoutBtn.disabled = false;
}

function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  const cartItem = cart.find((item) => item.id === productId);
  if (cartItem) {
    cartItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  updateCartCount();
  updateCartUI();
}

// Event Listeners

// Add to cart buttons
document.body.addEventListener('click', (e) => {
  if (e.target.classList.contains('add-to-cart')) {
    const id = parseInt(e.target.dataset.id);
    addToCart(id);
  }
});

// Search and filter
searchInput.addEventListener('input', filterProducts);
categoryFilter.addEventListener('change', filterProducts);

// Cart drawer toggle
cartButton.addEventListener('click', () => {
  cartDrawer.classList.add('open');
  cartDrawer.setAttribute('aria-hidden', 'false');
});
closeCartBtn.addEventListener('click', () => {
  cartDrawer.classList.remove('open');
  cartDrawer.setAttribute('aria-hidden', 'true');
});

// Contact form validation and feedback
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!contactForm.checkValidity()) {
    formFeedback.textContent = 'Please fill out the form correctly.';
    formFeedback.style.color = 'red';
    return;
  }
  formFeedback.textContent = 'Thank you for your message! We will get back to you soon.';
  formFeedback.style.color = 'green';
  contactForm.reset();
});

// Initialize cart UI
updateCartCount();
updateCartUI();
