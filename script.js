// Menu Data
const menuItems = [
    // Appetizers
    {
        id: 1,
        name: "Samosa Chaat",
        description: "Crispy samosas topped with tangy chutneys, yogurt, and fresh herbs",
        price: 120,
        category: "appetizers",
        emoji: "🥟"
    },
    {
        id: 2,
        name: "Paneer Tikka",
        description: "Marinated cottage cheese cubes grilled to perfection with spices",
        price: 180,
        category: "appetizers",
        emoji: "🧀"
    },
    {
        id: 3,
        name: "Chicken Wings",
        description: "Spicy chicken wings with our signature sauce and herbs",
        price: 220,
        category: "appetizers",
        emoji: "🍗"
    },
    {
        id: 4,
        name: "Vegetable Spring Rolls",
        description: "Crispy rolls filled with fresh vegetables and served with sweet chili sauce",
        price: 140,
        category: "appetizers",
        emoji: "🥢"
    },

    // Main Course
    {
        id: 5,
        name: "Butter Chicken",
        description: "Tender chicken in rich, creamy tomato-based curry with aromatic spices",
        price: 320,
        category: "mains",
        emoji: "🍛"
    },
    {
        id: 6,
        name: "Biryani Special",
        description: "Fragrant basmati rice layered with marinated meat and traditional spices",
        price: 380,
        category: "mains",
        emoji: "🍚"
    },
    {
        id: 7,
        name: "Dal Makhani",
        description: "Creamy black lentils slow-cooked with butter and aromatic spices",
        price: 240,
        category: "mains",
        emoji: "🍲"
    },
    {
        id: 8,
        name: "Grilled Fish Curry",
        description: "Fresh fish grilled and served in coconut-based curry with vegetables",
        price: 420,
        category: "mains",
        emoji: "🐟"
    },
    {
        id: 9,
        name: "Vegetable Thali",
        description: "Complete meal with variety of vegetables, dal, rice, and bread",
        price: 280,
        category: "mains",
        emoji: "🍽️"
    },
    {
        id: 10,
        name: "Tandoori Chicken",
        description: "Whole chicken marinated in yogurt and spices, cooked in tandoor",
        price: 450,
        category: "mains",
        emoji: "🍖"
    },

    // Desserts
    {
        id: 11,
        name: "Gulab Jamun",
        description: "Soft milk dumplings soaked in rose-flavored sugar syrup",
        price: 100,
        category: "desserts",
        emoji: "🍯"
    },
    {
        id: 12,
        name: "Chocolate Brownie",
        description: "Rich chocolate brownie served with vanilla ice cream",
        price: 150,
        category: "desserts",
        emoji: "🍫"
    },
    {
        id: 13,
        name: "Kulfi",
        description: "Traditional Indian ice cream with cardamom and pistachios",
        price: 80,
        category: "desserts",
        emoji: "🍨"
    },
    {
        id: 14,
        name: "Ras Malai",
        description: "Soft cottage cheese dumplings in sweet, thickened milk",
        price: 120,
        category: "desserts",
        emoji: "🥛"
    },

    // Beverages
    {
        id: 15,
        name: "Masala Chai",
        description: "Traditional spiced tea brewed with aromatic herbs and spices",
        price: 40,
        category: "beverages",
        emoji: "🍵"
    },
    {
        id: 16,
        name: "Fresh Lime Soda",
        description: "Refreshing lime juice with soda water and mint leaves",
        price: 60,
        category: "beverages",
        emoji: "🥤"
    },
    {
        id: 17,
        name: "Mango Lassi",
        description: "Creamy yogurt drink blended with fresh mango pulp",
        price: 80,
        category: "beverages",
        emoji: "🥭"
    },
    {
        id: 18,
        name: "Filter Coffee",
        description: "South Indian style coffee brewed to perfection",
        price: 50,
        category: "beverages",
        emoji: "☕"
    }
];

// Cart Management
let cart = [];
let currentCategory = 'all';

// DOM Elements
const menuGrid = document.getElementById('menu-grid');
const cartCount = document.getElementById('cart-count');
const cartItems = document.getElementById('cart-items');
const cartSummary = document.getElementById('cart-summary');
const subtotalElement = document.getElementById('subtotal');
const taxElement = document.getElementById('tax');
const deliveryElement = document.getElementById('delivery');
const totalElement = document.getElementById('total');
const modal = document.getElementById('order-modal');
const paymentModal = document.getElementById('payment-modal');

// Payment variables
let paymentTimer;
let timeLeft = 300; // 5 minutes in seconds
let currentOrderTotal = 0;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    renderMenu();
    setupEventListeners();
    updateCartDisplay();
    setupNavigation();
});

// Removed complex interactive effects to prevent errors

// Removed mobile optimizations to prevent errors

// Setup Navigation
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Get target section
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });

    // Smooth scroll on page load for hash links
    if (window.location.hash) {
        setTimeout(() => {
            scrollToSection(window.location.hash.substring(1));
        }, 100);
    }
}

// Smooth scroll function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Setup Event Listeners
function setupEventListeners() {
    // Category buttons
    const categoryButtons = document.querySelectorAll('.category-btn');
    categoryButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryButtons.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Update current category and render menu
            currentCategory = this.dataset.category;
            renderMenu();
        });
    });

    // Modal close events
    const closeBtn = document.querySelector('.close');
    closeBtn.addEventListener('click', closeModal);
    
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Scroll effect for navbar
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    });
}

// Render Menu Items
function renderMenu() {
    const filteredItems = currentCategory === 'all' 
        ? menuItems 
        : menuItems.filter(item => item.category === currentCategory);

    menuGrid.innerHTML = '';

    filteredItems.forEach((item, index) => {
        const menuItemElement = document.createElement('div');
        menuItemElement.className = 'menu-item';
        menuItemElement.style.animationDelay = `${index * 0.1}s`;
        
        menuItemElement.innerHTML = `
            <div class="menu-item-image">
                ${item.emoji}
            </div>
            <div class="menu-item-content">
                <h3>${item.name}</h3>
                <p class="menu-item-description">${item.description}</p>
                <div class="menu-item-footer">
                    <span class="menu-item-price">₹${item.price}</span>
                    <button class="add-to-cart" onclick="addToCart(${item.id})">
                        <i class="fas fa-plus"></i> Add to Cart
                    </button>
                </div>
            </div>
        `;
        
        menuGrid.appendChild(menuItemElement);
    });
}

// Add item to cart
function addToCart(itemId) {
    const item = menuItems.find(item => item.id === itemId);
    const existingItem = cart.find(cartItem => cartItem.id === itemId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({...item, quantity: 1});
    }
    
    updateCartDisplay();
    showFloatingNotification(`${item.name} added to cart! 🛒`);
}

// Show add to cart animation
function showAddToCartAnimation(itemId) {
    const cartLink = document.querySelector('.cart-link');
    const button = document.querySelector(`button[onclick="addToCart(${itemId})"]`);
    
    // Animate the button
    if (button) {
        button.style.transform = 'scale(0.95)';
        button.innerHTML = '<i class="fas fa-check"></i> Added!';
        button.style.background = 'linear-gradient(45deg, #27ae60, #2ecc71)';
        
        setTimeout(() => {
            button.style.transform = 'scale(1)';
            button.innerHTML = '<i class="fas fa-plus"></i> Add to Cart';
            button.style.background = '';
        }, 1000);
    }
    
    // Animate the cart link
    cartLink.style.transform = 'scale(1.15) rotate(5deg)';
    cartLink.style.background = 'linear-gradient(45deg, #27ae60, #2ecc71)';
    cartLink.style.boxShadow = '0 8px 25px rgba(46, 204, 113, 0.4)';
    
    setTimeout(() => {
        cartLink.style.transform = 'scale(1) rotate(0deg)';
        cartLink.style.background = '';
        cartLink.style.boxShadow = '';
    }, 300);
}

// Play add to cart sound (visual feedback)
function playAddToCartSound() {
    // Create a visual "sound wave" effect
    const soundWave = document.createElement('div');
    soundWave.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        width: 40px;
        height: 40px;
        border: 2px solid #27ae60;
        border-radius: 50%;
        animation: soundWave 0.6s ease-out;
        pointer-events: none;
        z-index: 9999;
    `;
    
    document.body.appendChild(soundWave);
    
    setTimeout(() => {
        document.body.removeChild(soundWave);
    }, 600);
}

// Show floating notification
function showFloatingNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'floating-notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        ${message}
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(45deg, #27ae60, #2ecc71);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 50px;
        box-shadow: 0 10px 30px rgba(46, 204, 113, 0.3);
        z-index: 9999;
        animation: slideInRight 0.5s ease, slideOutRight 0.5s ease 2.5s;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (document.body.contains(notification)) {
            document.body.removeChild(notification);
        }
    }, 3000);
}

// Update cart display with enhanced animations
function updateCartDisplay() {
    // Update cart count with animation
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElement = document.getElementById('cart-count');
    
    if (cartCountElement.textContent !== totalItems.toString()) {
        cartCountElement.style.transform = 'scale(1.3)';
        cartCountElement.style.background = '#27ae60';
        
        setTimeout(() => {
            cartCountElement.textContent = totalItems;
            cartCountElement.style.transform = 'scale(1)';
            cartCountElement.style.background = '';
        }, 200);
    }
    
    // Update cart items display
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <h3>Your cart is empty</h3>
                <p>Add some delicious items from our menu!</p>
                <button class="btn btn-primary" onclick="scrollToSection('menu')">Browse Menu</button>
            </div>
        `;
        cartSummary.style.display = 'none';
    } else {
        renderCartItems();
        updateCartSummary();
        cartSummary.style.display = 'block';
        
        // Animate cart summary appearance
        cartSummary.style.transform = 'scale(0.95)';
        setTimeout(() => {
            cartSummary.style.transform = 'scale(1)';
        }, 100);
    }
}

// Render cart items
function renderCartItems() {
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-image">${item.emoji}</div>
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">₹${item.price} each</div>
            </div>
            <div class="quantity-controls">
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">
                    <i class="fas fa-minus"></i>
                </button>
                <span class="quantity">${item.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">
                    <i class="fas fa-plus"></i>
                </button>
            </div>
            <button class="remove-item" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');
}

// Update item quantity
function updateQuantity(itemId, change) {
    const item = cart.find(cartItem => cartItem.id === itemId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(itemId);
        } else {
            updateCartDisplay();
        }
    }
}

// Remove item from cart with animation
function removeFromCart(itemId) {
    const item = cart.find(cartItem => cartItem.id === itemId);
    if (item) {
        showFloatingNotification(`${item.name} removed from cart!`);
    }
    
    cart = cart.filter(item => item.id !== itemId);
    updateCartDisplay();
}

// Update cart summary with price animations
function updateCartSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.05; // 5% tax
    const delivery = subtotal > 0 ? 50 : 0; // ₹50 delivery charge
    const total = subtotal + tax + delivery;
    
    // Animate price changes
    animatePrice(subtotalElement);
    animatePrice(taxElement);
    animatePrice(deliveryElement);
    animatePrice(totalElement);
    
    setTimeout(() => {
        subtotalElement.textContent = `₹${subtotal.toFixed(2)}`;
        taxElement.textContent = `₹${tax.toFixed(2)}`;
        deliveryElement.textContent = `₹${delivery.toFixed(2)}`;
        totalElement.textContent = `₹${total.toFixed(2)}`;
    }, 150);
}

// Checkout function
function checkout() {
    if (cart.length === 0) {
        showFloatingNotification('Your cart is empty! Add some items first.');
        return;
    }
    
    // Show loading animation
    const checkoutBtn = document.querySelector('.checkout-btn');
    const checkoutText = checkoutBtn.querySelector('.checkout-text');
    const checkoutLoader = checkoutBtn.querySelector('.checkout-loader');
    
    checkoutText.style.display = 'none';
    checkoutLoader.style.display = 'block';
    checkoutBtn.disabled = true;
    
    // Simulate processing time
    setTimeout(() => {
        checkoutText.style.display = 'inline';
        checkoutLoader.style.display = 'none';
        checkoutBtn.disabled = false;
        
        // Show QR code payment modal
        showPaymentModal();
    }, 2000);
}

// Show QR code payment modal
function showPaymentModal() {
    // Calculate total
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.05;
    const delivery = 50;
    const total = subtotal + tax + delivery;
    
    currentOrderTotal = total;
    
    // Update payment total with error handling
    const paymentTotalElement = document.getElementById('payment-total');
    if (paymentTotalElement) {
        paymentTotalElement.textContent = `₹${total.toFixed(2)}`;
    }
    
    // Payment modal ready to display
    
    // Show payment modal with error handling
    if (paymentModal) {
        paymentModal.style.display = 'block';
    } else {
        console.error('Payment modal not found');
        showFloatingNotification('Payment system error. Please try again.');
    }
}

// Removed complex interactive functions to prevent errors

// Simple order confirmation (dummy payment)
function confirmOrder() {
    // Show success notification
    showFloatingNotification(`Order confirmed! Total: ₹${currentOrderTotal.toFixed(2)} 🎉`);
    
    // Clear cart
    cart = [];
    updateCartDisplay();
    
    // Close payment modal
    closePaymentModal();
    
    // Navigate back to menu for new order
    setTimeout(() => {
        scrollToSection('menu');
        showFloatingNotification('Ready for your next order! 🍽️');
    }, 1000);
}

// Close payment modal
function closePaymentModal() {
    if (paymentModal) {
        paymentModal.style.display = 'none';
    }
    if (paymentTimer) {
        clearInterval(paymentTimer);
    }
}

// Show order confirmation modal
function showOrderConfirmation() {
    const modalOrderItems = document.getElementById('modal-order-items');
    const modalTotal = document.getElementById('modal-total');
    
    // Populate order items
    modalOrderItems.innerHTML = cart.map(item => `
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
            <span>${item.name} x ${item.quantity}</span>
            <span>₹${(item.price * item.quantity).toFixed(2)}</span>
        </div>
    `).join('');
    
    // Show total
    modalTotal.textContent = `₹${currentOrderTotal.toFixed(2)}`;
    
    // Generate payment ID and order time
    const paymentId = Math.random().toString(36).substr(2, 9).toUpperCase();
    const orderTime = new Date().toLocaleString();
    
    document.getElementById('payment-id').textContent = paymentId;
    document.getElementById('order-time').textContent = orderTime;
    
    // Show modal
    modal.style.display = 'block';
    
    // Clear cart after showing confirmation
    setTimeout(() => {
        cart = [];
        updateCartDisplay();
    }, 1000);
}

// Download receipt function
function downloadReceipt() {
    const receiptContent = `
        THINDHAM RESTAURANT
        ===================
        
        Order Receipt
        Payment ID: #TH${document.getElementById('payment-id').textContent}
        Order Time: ${document.getElementById('order-time').textContent}
        
        Items:
        ${cart.map(item => `${item.name} x ${item.quantity} - ₹${(item.price * item.quantity).toFixed(2)}`).join('\n        ')}
        
        Total Amount: ₹${currentOrderTotal.toFixed(2)}
        
        Thank you for dining with us!
        Estimated Delivery: 25-30 minutes
    `;
    
    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Thindham_Receipt_${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    showFloatingNotification('Receipt downloaded! 📄');
}

// Close modal
function closeModal() {
    modal.style.display = 'none';
    
    // Reset payment variables
    currentOrderTotal = 0;
    timeLeft = 300;
}

// Enhanced interactive features
document.addEventListener('DOMContentLoaded', function() {
    // Add loading animation for menu items
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add staggered animation for menu items
                const menuItems = document.querySelectorAll('.menu-item');
                menuItems.forEach((item, index) => {
                    if (item === entry.target) {
                        setTimeout(() => {
                            item.classList.add('animate-in');
                        }, index * 100);
                    }
                });
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe all menu items when they're created
    const observeMenuItems = () => {
        const menuItems = document.querySelectorAll('.menu-item');
        menuItems.forEach(item => {
            observer.observe(item);
        });
    };

    // Call initially and whenever menu is re-rendered
    setTimeout(observeMenuItems, 100);

    // Enhanced hover effects
    document.addEventListener('mouseover', function(e) {
        if (e.target.classList.contains('add-to-cart')) {
            e.target.innerHTML = '<i class="fas fa-shopping-cart"></i> Add to Cart';
            e.target.style.transform = 'scale(1.05)';
        }
        
        if (e.target.classList.contains('menu-item') || e.target.closest('.menu-item')) {
            const menuItem = e.target.classList.contains('menu-item') ? e.target : e.target.closest('.menu-item');
            menuItem.style.transform = 'translateY(-15px) scale(1.02)';
        }
    });

    document.addEventListener('mouseout', function(e) {
        if (e.target.classList.contains('add-to-cart')) {
            e.target.innerHTML = '<i class="fas fa-plus"></i> Add to Cart';
            e.target.style.transform = 'scale(1)';
        }
        
        if (e.target.classList.contains('menu-item') || e.target.closest('.menu-item')) {
            const menuItem = e.target.classList.contains('menu-item') ? e.target : e.target.closest('.menu-item');
            menuItem.style.transform = 'translateY(0) scale(1)';
        }
    });
    
    // Add parallax effect to hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero-section');
        const particles = document.querySelector('.particles');
        
        if (heroSection && particles) {
            heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
            particles.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });
    
    // Add dynamic background color change based on scroll
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const navbar = document.querySelector('.navbar');
        
        if (scrolled > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
    });
});

// Enhanced keyboard shortcuts and interactions
document.addEventListener('keydown', function(e) {
    // Press 'C' to open cart
    if (e.key.toLowerCase() === 'c' && !e.ctrlKey && !e.altKey) {
        scrollToSection('cart');
        showFloatingNotification('Navigated to Cart! 🛒');
    }
    
    // Press 'M' to open menu
    if (e.key.toLowerCase() === 'm' && !e.ctrlKey && !e.altKey) {
        scrollToSection('menu');
        showFloatingNotification('Navigated to Menu! 🍽️');
    }
    
    // Press 'H' to go home
    if (e.key.toLowerCase() === 'h' && !e.ctrlKey && !e.altKey) {
        scrollToSection('home');
        showFloatingNotification('Welcome Home! 🏠');
    }
    
    // Press 'A' to go to about
    if (e.key.toLowerCase() === 'a' && !e.ctrlKey && !e.altKey) {
        scrollToSection('about');
        showFloatingNotification('Learn About Us! ℹ️');
    }
    
    // Press 'Escape' to close modal
    if (e.key === 'Escape') {
        closeModal();
    }
    
    // Press 'Enter' to checkout if cart is not empty
    if (e.key === 'Enter' && cart.length > 0) {
        const cartSection = document.getElementById('cart');
        if (isElementInViewport(cartSection)) {
            checkout();
        }
    }
});

// Helper function to check if element is in viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Add dynamic pricing animations
function animatePrice(element) {
    element.style.transform = 'scale(1.1)';
    element.style.color = '#27ae60';
    
    setTimeout(() => {
        element.style.transform = 'scale(1)';
        element.style.color = '#e74c3c';
    }, 300);
}

// Enhanced cart update with animations
function updateCartDisplayWithAnimation() {
    const cartCountElement = document.getElementById('cart-count');
    const oldCount = parseInt(cartCountElement.textContent);
    const newCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    if (newCount !== oldCount) {
        cartCountElement.style.transform = 'scale(1.5)';
        cartCountElement.style.color = '#27ae60';
        
        setTimeout(() => {
            cartCountElement.textContent = newCount;
            cartCountElement.style.transform = 'scale(1)';
            cartCountElement.style.color = 'white';
        }, 200);
    }
}

// Add search functionality (bonus feature)
function searchMenu(query) {
    const filteredItems = menuItems.filter(item => 
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
    );
    
    menuGrid.innerHTML = '';
    
    if (filteredItems.length === 0) {
        menuGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 2rem;">
                <h3>No items found</h3>
                <p>Try searching for something else</p>
            </div>
        `;
        return;
    }
    
    filteredItems.forEach((item, index) => {
        const menuItemElement = document.createElement('div');
        menuItemElement.className = 'menu-item';
        menuItemElement.style.animationDelay = `${index * 0.1}s`;
        
        menuItemElement.innerHTML = `
            <div class="menu-item-image">
                ${item.emoji}
            </div>
            <div class="menu-item-content">
                <h3>${item.name}</h3>
                <p class="menu-item-description">${item.description}</p>
                <div class="menu-item-footer">
                    <span class="menu-item-price">₹${item.price}</span>
                    <button class="add-to-cart" onclick="addToCart(${item.id})">
                        <i class="fas fa-plus"></i> Add to Cart
                    </button>
                </div>
            </div>
        `;
        
        menuGrid.appendChild(menuItemElement);
    });
}

// Performance optimization: Debounce function for search
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes soundWave {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .animate-in {
        animation: bounceIn 0.6s ease;
    }
    
    @keyframes bounceIn {
        0% {
            transform: scale(0.3) translateY(30px);
            opacity: 0;
        }
        50% {
            transform: scale(1.05) translateY(-10px);
            opacity: 0.8;
        }
        70% {
            transform: scale(0.9) translateY(5px);
            opacity: 0.9;
        }
        100% {
            transform: scale(1) translateY(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Initialize enhanced features
function initializeEnhancedFeatures() {
    // Add loading screen
    const loadingScreen = document.createElement('div');
    loadingScreen.innerHTML = `
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            color: white;
            font-size: 2rem;
            font-weight: 700;
        ">
            <div style="text-align: center;">
                <div style="font-size: 4rem; margin-bottom: 1rem;">🍽️</div>
                <div>Loading Thindham...</div>
                <div style="
                    width: 200px;
                    height: 4px;
                    background: rgba(255,255,255,0.3);
                    border-radius: 2px;
                    margin: 1rem auto;
                    overflow: hidden;
                ">
                    <div style="
                        width: 100%;
                        height: 100%;
                        background: linear-gradient(45deg, #f39c12, #e74c3c);
                        animation: loading 2s ease-in-out;
                        transform: translateX(-100%);
                    "></div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(loadingScreen);
    
    // Remove loading screen after 2 seconds
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            document.body.removeChild(loadingScreen);
        }, 500);
    }, 2000);
}

// Add loading animation CSS
const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
    @keyframes loading {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(0); }
    }
`;
document.head.appendChild(loadingStyle);

// Initialize when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeEnhancedFeatures);
} else {
    initializeEnhancedFeatures();
}
