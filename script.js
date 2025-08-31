document.addEventListener("DOMContentLoaded", () => {
  const cartBtn = document.getElementById("cart-btn");
  const cartDrawer = document.getElementById("cart-drawer");
  const closeCartBtn = document.getElementById("close-cart-btn");
  const cartItemsContainer = document.getElementById("cart-items");
  const cartCount = document.getElementById("cart-count");
  const cartTotal = document.getElementById("cart-total");
  const checkoutBtn = document.getElementById("checkout-btn");
  const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const productsGrid = document.getElementById("products-grid");
  const searchInput = document.getElementById("search-input");

  let cart = {};

  function updateCartUI() {
    // Clear current items
    cartItemsContainer.innerHTML = "";

    const items = Object.values(cart);
    if (items.length === 0) {
      cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
      checkoutBtn.disabled = true;
      cartCount.textContent = 0;
      cartTotal.textContent = "Total: $0.00";
      return;
    }

    let total = 0;
    items.forEach(item => {
      total += item.price * item.quantity;

      const li = document.createElement("li");

      const infoDiv = document.createElement("div");
      infoDiv.classList.add("cart-item-info");

      const nameP = document.createElement("p");
      nameP.classList.add("cart-item-name");
      nameP.textContent = item.name;
      infoDiv.appendChild(nameP);

      const qtyP = document.createElement("p");
      qtyP.classList.add("cart-item-qty");
      qtyP.textContent = `Qty: ${item.quantity}`;
      infoDiv.appendChild(qtyP);

      li.appendChild(infoDiv);

      const priceSpan = document.createElement("span");
      priceSpan.classList.add("cart-item-price");
      priceSpan.textContent = `$${(item.price * item.quantity).toFixed(2)}`;
      li.appendChild(priceSpan);

      const removeBtn = document.createElement("button");
      removeBtn.classList.add("cart-item-remove-btn");
      removeBtn.innerHTML = "&times;";
      removeBtn.title = "Remove item";
      removeBtn.addEventListener("click", () => {
        removeFromCart(item.id);
      });
      li.appendChild(removeBtn);

      cartItemsContainer.appendChild(li);
    });

    cartCount.textContent = items.reduce((acc, item) => acc + item.quantity, 0);
    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
    checkoutBtn.disabled = false;
  }

  function addToCart(product) {
    if (cart[product.id]) {
      cart[product.id].quantity += 1;
    } else {
      cart[product.id] = { ...product, quantity: 1 };
    }
    updateCartUI();
  }

  function removeFromCart(productId) {
    delete cart[productId];
    updateCartUI();
  }

  // Add to cart button listeners
  addToCartButtons.forEach(button => {
    button.addEventListener("click", e => {
      const productCard = e.target.closest(".product-card");
      const id = productCard.getAttribute("data-id");
      const name = productCard.querySelector("h3").textContent;
      const priceText = productCard.querySelector(".price").textContent;
      const price = parseFloat(priceText.replace("$", ""));
      addToCart({ id, name, price });
    });
  });

  // Open and close cart drawer
  cartBtn.addEventListener("click", () => {
    cartDrawer.classList.add("open");
  });
  closeCartBtn.addEventListener("click", () => {
    cartDrawer.classList.remove("open");
  });

  // Filter buttons
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      // Remove active class from all
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const category = btn.getAttribute("data-category");
      filterProducts(category, searchInput.value.trim().toLowerCase());
    });
  });

  // Search input listener
  searchInput.addEventListener("input", () => {
    const activeFilterBtn = document.querySelector(".filter-btn.active");
    const category = activeFilterBtn ? activeFilterBtn.getAttribute("data-category") : "all";
    const searchTerm = searchInput.value.trim().toLowerCase();

    filterProducts(category, searchTerm);
  });

  // Filter and search products
  function filterProducts(category, searchTerm) {
    const products = productsGrid.querySelectorAll(".product-card");
    products.forEach(product => {
      const productCategory = product.getAttribute("data-category");
      const productName = product.querySelector("h3").textContent.toLowerCase();

      const matchesCategory = category === "all" || productCategory === category;
      const matchesSearch = productName.includes(searchTerm);

      if (matchesCategory && matchesSearch) {
        product.style.display = "flex";
      } else {
        product.style.display = "none";
      }
    });
  }

  // Contact form submission
  const contactForm = document.getElementById("contact-form");
  contactForm.addEventListener("submit", e => {
    e.preventDefault();
    alert("Thank you for contacting us!");
    contactForm.reset();
  });

  // Checkout button (dummy)
  checkoutBtn.addEventListener("
