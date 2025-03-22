// Initialize database if it doesn't exist
function initializeDatabase() {
  // Initialize users
  if (!localStorage.getItem("users")) {
    const users = [
      {
        id: "1",
        name: "Admin User",
        email: "admin@example.com",
        password: "admin123",
        role: "admin",
        createdAt: new Date().toISOString(),
      },
      {
        id: "2",
        name: "Test User",
        email: "user@example.com",
        password: "user123",
        role: "user",
        createdAt: new Date().toISOString(),
      },
    ]

    localStorage.setItem("users", JSON.stringify(users))
  }

  // Initialize products
  if (!localStorage.getItem("products")) {
    const products = [
      {
        id: "1",
        name: "Smartphone X",
        description: "The latest smartphone with advanced features and a stunning display.",
        price: 799.99,
        image: "https://placehold.co/300x300/007bff/white?text=Smartphone+X",
        category: "electronics",
        rating: 4.5,
        ratingCount: 120,
      },
      {
        id: "2",
        name: "Laptop Pro",
        description: "Powerful laptop for professionals with high-performance specs.",
        price: 1299.99,
        image: "https://placehold.co/300x300/28a745/white?text=Laptop+Pro",
        category: "electronics",
        rating: 4.8,
        ratingCount: 85,
      },
      {
        id: "3",
        name: "Wireless Headphones",
        description: "Premium wireless headphones with noise cancellation.",
        price: 199.99,
        image: "https://placehold.co/300x300/6f42c1/white?text=Headphones",
        category: "electronics",
        rating: 4.3,
        ratingCount: 210,
      },
      {
        id: "4",
        name: "Cotton T-Shirt",
        description: "Comfortable cotton t-shirt available in various colors.",
        price: 24.99,
        image: "https://placehold.co/300x300/fd7e14/white?text=T-Shirt",
        category: "clothing",
        rating: 4.1,
        ratingCount: 150,
      },
      {
        id: "5",
        name: "Denim Jeans",
        description: "Classic denim jeans with a modern fit.",
        price: 49.99,
        image: "https://placehold.co/300x300/17a2b8/white?text=Jeans",
        category: "clothing",
        rating: 4.2,
        ratingCount: 95,
      },
      {
        id: "6",
        name: "Coffee Maker",
        description: "Automatic coffee maker for brewing delicious coffee at home.",
        price: 89.99,
        image: "https://placehold.co/300x300/dc3545/white?text=Coffee+Maker",
        category: "home",
        rating: 4.7,
        ratingCount: 75,
      },
      {
        id: "7",
        name: "Non-Stick Pan Set",
        description: "Set of 3 non-stick pans for easy cooking and cleaning.",
        price: 59.99,
        image: "https://placehold.co/300x300/20c997/white?text=Pan+Set",
        category: "home",
        rating: 4.4,
        ratingCount: 60,
      },
      {
        id: "8",
        name: "Bestselling Novel",
        description: "The latest bestselling novel that everyone is talking about.",
        price: 14.99,
        image: "https://placehold.co/300x300/6c757d/white?text=Novel",
        category: "books",
        rating: 4.6,
        ratingCount: 220,
      },
    ]

    localStorage.setItem("products", JSON.stringify(products))
  }

  // Initialize cart
  if (!localStorage.getItem("cart")) {
    localStorage.setItem("cart", JSON.stringify([]))
  }

  // Initialize orders
  if (!localStorage.getItem("orders")) {
    localStorage.setItem("orders", JSON.stringify([]))
  }

  // Initialize reviews
  if (!localStorage.getItem("reviews")) {
    const reviews = [
      {
        id: "1",
        productId: "1",
        userId: "2",
        userName: "Test User",
        rating: 5,
        comment: "Great smartphone! The camera quality is amazing.",
        date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "2",
        productId: "2",
        userId: "2",
        userName: "Test User",
        rating: 4,
        comment: "Excellent laptop, but battery life could be better.",
        date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ]

    localStorage.setItem("reviews", JSON.stringify(reviews))
  }
}

// Initialize database on page load
initializeDatabase()

// Helper functions
function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || []
}

function getProducts() {
  return JSON.parse(localStorage.getItem("products")) || []
}

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || []
}

function getOrders() {
  return JSON.parse(localStorage.getItem("orders")) || []
}

function getReviews() {
  return JSON.parse(localStorage.getItem("reviews")) || []
}

function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser")) || null
}

function generateId() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
}

// Update auth UI based on login status
function updateAuthUI() {
  const authLink = document.getElementById("auth-link")
  const currentUser = getCurrentUser()

  if (currentUser) {
    authLink.textContent = "Logout"
    authLink.href = "#"
    authLink.addEventListener("click", (e) => {
      e.preventDefault()
      localStorage.removeItem("currentUser")
      window.location.href = "index.html"
    })
  } else {
    authLink.textContent = "Login"
    authLink.href = "login.html"
  }
}

// Update cart count
function updateCartCount() {
  const cartCountElement = document.getElementById("cart-count")
  if (cartCountElement) {
    const cart = getCart()
    const count = cart.reduce((sum, item) => sum + item.quantity, 0)
    cartCountElement.textContent = count
  }
}

// Add to cart
function addToCart(product) {
  const cart = getCart()
  const existingItem = cart.find((item) => item.id === product.id)

  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    })
  }

  localStorage.setItem("cart", JSON.stringify(cart))
}

// Buy now function
function buyNow(product) {
  // First add to cart
  addToCart(product)
  // Then redirect to cart page
  window.location.href = "cart.html"
}

// Generate star rating HTML
function generateStarRating(rating) {
  let stars = ""
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars += '<span class="star filled">★</span>'
    } else {
      stars += '<span class="star">☆</span>'
    }
  }
  return stars
}

// Update the createProductCard function to link to the new product-view.html page
function createProductCard(product) {
  const card = document.createElement("div")
  card.className = "product-card"

  card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="product-info">
            <h3>${product.name}</h3>
            <div class="product-rating">
                ${generateStarRating(product.rating)}
                <span class="rating-count">(${product.ratingCount || 0})</span>
            </div>
            <div class="product-price">$${product.price.toFixed(2)}</div>
            <div class="product-actions">
                <button class="btn btn-primary buy-now-btn" data-id="${product.id}">Buy Now</button>
                <button class="btn btn-secondary add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
            </div>
            <a href="product-view.html?id=${product.id}" class="product-link">View Details</a>
        </div>
    `

  // Add event listeners
  setTimeout(() => {
    const buyNowBtn = card.querySelector(".buy-now-btn")
    const addToCartBtn = card.querySelector(".add-to-cart-btn")

    buyNowBtn.addEventListener("click", function () {
      const productId = this.getAttribute("data-id")
      const product = getProducts().find((p) => p.id === productId)
      if (product) {
        buyNow(product)
      }
    })

    addToCartBtn.addEventListener("click", function () {
      const productId = this.getAttribute("data-id")
      const product = getProducts().find((p) => p.id === productId)
      if (product) {
        addToCart(product)
        updateCartCount()

        // Show added to cart message
        this.textContent = "Added!"
        this.disabled = true

        setTimeout(() => {
          this.textContent = "Add to Cart"
          this.disabled = false
        }, 2000)
      }
    })
  }, 0)

  return card
}

