/* ==========================================================================
   KICKCRAZE ENGINE ARCHITECTURE 2026 | PRODUCTION DATASHEET & INTERACTIONS
   ========================================================================== */

// 1. SNEAKER CATALOGUE MASTER INVENTORY
const KICKCRAZE_CATALOGUE = [
    {
        id: 1,
        name: "Aurelia Midnight Sneaker",
        category: "Shoes",
        price: 185000,
        rating: 5,
        description: "Exquisitely structured silhouette sneaker assembled with premium raw technical matte overlays, neon crimson highlights, reactive runtime gel arches, and heavy reinforced ballistic nylon base matrix threads.",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 2,
        name: "Monolith Carbon Chelsea Runner",
        category: "Shoes",
        price: 95000,
        rating: 5,
        description: "High-top hybrid streetwear slip-on built using custom hyper-flexible knit structures. Bound to a high-traction vulcanized black tire tread outer deck base frame for true architectural stability parameters.",
        image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 3,
        name: "Atelier Street Windbreaker Jacket",
        category: "Clothing",
        price: 45000,
        rating: 4,
        description: "Heavy asymmetrical technical canvas outerwear paneling lined with water-repellent alloy coatings. Features dual magnetic deployment pouches and drop shoulder futuristic tailoring lines.",
        image: "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 4,
        name: "Chrono Cyber Metallic Watch",
        category: "Accessories",
        price: 410000,
        rating: 5,
        description: "Monolithic engineering running on high-precision tactical counter structures. Lined in pure brushed aircraft titanium, deep anti-reflective mineral crystals, and an adjustable links locking deploy clasp.",
        image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 5,
        name: "Versailles Tinted Street Aviators",
        category: "Accessories",
        price: 38000,
        rating: 4,
        description: "Ultralight aerodynamic structure frames finished in custom signature metallic gunmetal plating. Optimized with high-definition impact protection screens tuned precisely for high street visibility fields.",
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 6,
        name: "Oud Cyber Extrait Parfum",
        category: "Fragrance",
        price: 24500,
        rating: 5,
        description: "High-concentration signature scent statement deployment. Combines intense smoked wood saps, heavy raw amber spice drops, and metallic velvet undertones bound to establish instant environmental spatial presence.",
        image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 7,
        name: "Sovereign Industrial Buckle Cap",
        category: "Accessories",
        price: 15000,
        rating: 5,
        description: "Heavy twill technical standard headwear uniform. Centered with an embossed matte black metal structural brand emblem and adjusted via an authentic snap-lock industrial backend canvas harness.",
        image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 8,
        name: "Quantum High-Tech Utility Tote",
        category: "Bags",
        price: 110000,
        rating: 5,
        description: "Modular load-bearing system layout built from pure grid ripstop nylon panels. Configured with dual tactical side loops, secure internal storage sectors, and heavy water-resistant slider zippers.",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80"
    }
];

// Memory States Matrix
let internalCartState = [];
let internalWishlistState = new Set();
let operationalCategoryFilter = "all";
let currentlySelectedPopupProductId = null;
let currentPopupQuantityValue = 1;

// Global Component Selectors
const dynamicProductsInjectionPoint = document.getElementById("dynamic-products-injection-point");
const categoryFilterTabs = document.getElementById("category-filter-tabs");
const sortSelectorDropdown = document.getElementById("sort-selector-dropdown");
const searchInputField = document.getElementById("search-input-field");
const searchToggleBtn = document.getElementById("search-toggle-btn");
const searchDropdownBarNode = document.getElementById("search-dropdown-bar-node");
const searchCloseEmbedBtn = document.getElementById("search-close-embed-btn");

// Modal/Drawer Controls Selectors
const globalBackdrop = document.getElementById("global-backdrop");
const cartDrawerSidebar = document.getElementById("cart-drawer-sidebar");
const cartDrawerTrigger = document.getElementById("cart-drawer-trigger");
const closeCartDrawerBtn = document.getElementById("close-cart-drawer-btn");
const cartItemsInjectionPane = document.getElementById("cart-items-injection-pane");
const cartTotalNumericValue = document.getElementById("cart-total-numeric-value");
const cartBadgeCount = document.getElementById("cart-badge-count");
const cartMatrixSubtotal = document.getElementById("cart-matrix-subtotal");
const cartMatrixShipping = document.getElementById("cart-matrix-shipping");

const loginIdentityModal = document.getElementById("login-identity-modal");
const loginModalTrigger = document.getElementById("login-modal-trigger");
const closeIdentityModalBtn = document.getElementById("close-identity-modal-btn");
const mobileMenuTrigger = document.getElementById("mobile-menu-trigger");
const navNavigationLinks = document.getElementById("nav-navigation-links");

// Feature Selectors
const topAnnouncementBar = document.getElementById("top-announcement-bar");
const dismissAnnouncementTrigger = document.getElementById("dismiss-announcement-trigger");
const productDetailPopupModal = document.getElementById("product-detail-popup-modal");
const closeProductModalTrigger = document.getElementById("close-product-modal-trigger");

// CHECKOUT FLOW SELECTORS
const customerCheckoutAddressModal = document.getElementById("customer-checkout-address-modal");
const closeCheckoutModalBtn = document.getElementById("close-checkout-modal-btn");
const cartCheckoutActionBtn = document.getElementById("cart-checkout-action-btn");
const actualCheckoutShippingForm = document.getElementById("actual-checkout-shipping-form");

const invoiceSubtotal = document.getElementById("invoice-subtotal");
const invoiceShipping = document.getElementById("invoice-shipping");
const invoiceGrandtotal = document.getElementById("invoice-grandtotal");

// Pop-up Selectors
const popupProductImg = document.getElementById("popup-product-img");
const popupProductCategory = document.getElementById("popup-product-category");
const popupProductTitle = document.getElementById("popup-product-title");
const popupProductStarsContainer = document.getElementById("popup-product-stars-container");
const popupProductPrice = document.getElementById("popup-product-price");
const popupProductDescription = document.getElementById("popup-product-description");
const qtyNumericalDisplay = document.getElementById("qty-numerical-display");
const qtyDecrementBtn = document.getElementById("qty-decrement-btn");
const qtyIncrementBtn = document.getElementById("qty-increment-btn");
const popupAddToCartMainAction = document.getElementById("popup-add-to-cart-main-action");

// Policy Modal Selectors
const policyDisplayPopupModal = document.getElementById("policy-display-popup-modal");
const closePolicyModalTrigger = document.getElementById("close-policy-modal-trigger");
const policyModalTitle = document.getElementById("policy-modal-title");
const policyModalBody = document.getElementById("policy-modal-body");

/* ==========================================================================
   2. DOM GRAPHICS INJECTION LAYER
   ========================================================================== */

function compileProductsDisplay(datasource) {
    dynamicProductsInjectionPoint.innerHTML = "";
    
    if (datasource.length === 0) {
        dynamicProductsInjectionPoint.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 60px 0; color: var(--text-muted-editorial); font-style: italic;">
                No elite sneaker drop allocations match your parameter tokens.
            </div>`;
        return;
    }

    datasource.forEach(product => {
        let ratingStarsCompiled = "";
        for (let position = 1; position <= 5; position++) {
            ratingStarsCompiled += position <= product.rating ? `<i class="fa-solid fa-star"></i>` : `<i class="fa-regular fa-star"></i>`;
        }

        const localizedPrice = new Intl.NumberFormat('en-IN', {
            style: 'currency', currency: 'INR', maximumFractionDigits: 0
        }).format(product.price);

        const isWishlisted = internalWishlistState.has(product.id) ? "active" : "";

        const cardDOMTemplate = `
            <article class="product-card" data-product-id="${product.id}">
                <div class="product-media-container">
                    <button class="wishlist-heart-btn ${isWishlisted}" onclick="event.stopPropagation(); toggleWishlistTrace(${product.id}, this)" aria-label="Add to Wishlist">
                        <i class="fa-solid fa-heart"></i>
                    </button>
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                    <div class="product-actions-drawer-slide">
                        <button class="add-to-drawer-action-trigger" onclick="event.stopPropagation(); appendItemToCartDrawer(${product.id}, 1)">Add To Drawer</button>
                    </div>
                </div>
                <div class="product-meta-specs-box">
                    <div>
                        <p class="p-spec-category">${product.category}</p>
                        <h3 class="p-spec-title">${product.name}</h3>
                    </div>
                    <div>
                        <div class="p-spec-stars">${ratingStarsCompiled}</div>
                        <p class="p-spec-price">${localizedPrice}</p>
                    </div>
                </div>
            </article>
        `;
        dynamicProductsInjectionPoint.insertAdjacentHTML("beforeend", cardDOMTemplate);
    });

    document.querySelectorAll(".product-card").forEach(cardElement => {
        cardElement.addEventListener("click", () => {
            const targetId = parseInt(cardElement.getAttribute("data-product-id"));
            launchProductPopupModal(targetId);
        });
    });
}

/* ==========================================================================
   3. PIPELINE FILTERS ALGORITHM
   ========================================================================== */

function executePipelineProcessing() {
    let datasetBuffer = [...KICKCRAZE_CATALOGUE];

    if (operationalCategoryFilter !== "all") {
        datasetBuffer = datasetBuffer.filter(item => item.category === operationalCategoryFilter);
    }

    const internalSearchQueryToken = searchInputField.value.toLowerCase().trim();
    if (internalSearchQueryToken !== "") {
        datasetBuffer = datasetBuffer.filter(item => 
            item.name.toLowerCase().includes(internalSearchQueryToken) || 
            item.category.toLowerCase().includes(internalSearchQueryToken)
        );
    }

    const selectedSortValue = sortSelectorDropdown.value;
    if (selectedSortValue === "price-asc") {
        datasetBuffer.sort((first, second) => first.price - second.price);
    } else if (selectedSortValue === "price-desc") {
        datasetBuffer.sort((first, second) => second.price - first.price);
    }

    compileProductsDisplay(datasetBuffer);
}

categoryFilterTabs.addEventListener("click", (event) => {
    const targetTabBtn = event.target.closest(".tab-filter-link");
    if (!targetTabBtn) return;

    document.querySelectorAll(".tab-filter-link").forEach(btn => btn.classList.remove("active"));
    targetTabBtn.classList.add("active");

    operationalCategoryFilter = targetTabBtn.getAttribute("data-filter");
    executePipelineProcessing();
});

sortSelectorDropdown.addEventListener("change", executePipelineProcessing);
searchInputField.addEventListener("input", executePipelineProcessing);

/* ==========================================================================
   4. MODALS & SLIDE DRAWER CONTROLS
   ========================================================================== */

function globalStateDismissal() {
    cartDrawerSidebar.classList.remove("active");
    loginIdentityModal.classList.remove("active");
    productDetailPopupModal.classList.remove("active");
    customerCheckoutAddressModal.classList.remove("active");
    policyDisplayPopupModal.classList.remove("active"); 
    searchDropdownBarNode.classList.remove("active"); 
    globalBackdrop.classList.remove("active");
}

globalBackdrop.addEventListener("click", globalStateDismissal);
closeCartDrawerBtn.addEventListener("click", globalStateDismissal);
closeIdentityModalBtn.addEventListener("click", globalStateDismissal);
closeProductModalTrigger.addEventListener("click", globalStateDismissal);
closeCheckoutModalBtn.addEventListener("click", globalStateDismissal);
closePolicyModalTrigger.addEventListener("click", globalStateDismissal);

searchToggleBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    navNavigationLinks.classList.remove("mobile-active"); 
    searchDropdownBarNode.classList.toggle("active");
    if (searchDropdownBarNode.classList.contains("active")) {
        searchInputField.focus();
    }
});

searchCloseEmbedBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    searchDropdownBarNode.classList.remove("active");
});

loginModalTrigger.addEventListener("click", () => {
    globalStateDismissal();
    globalBackdrop.classList.add("active");
    loginIdentityModal.classList.add("active");
});

cartDrawerTrigger.addEventListener("click", () => {
    globalStateDismissal();
    globalBackdrop.classList.add("active");
    cartDrawerSidebar.classList.add("active");
});

mobileMenuTrigger.addEventListener("click", () => {
    searchDropdownBarNode.classList.remove("active"); 
    navNavigationLinks.classList.toggle("mobile-active");
    const interiorIconNode = mobileMenuTrigger.querySelector("i");
    if (navNavigationLinks.classList.contains("mobile-active")) {
        interiorIconNode.className = "fa-solid fa-xmark";
    } else {
        interiorIconNode.className = "fa-solid fa-bars-staggered";
    }
});

document.querySelectorAll(".nav-link").forEach(anchorLink => {
    anchorLink.addEventListener("click", () => {
        navNavigationLinks.classList.remove("mobile-active");
        mobileMenuTrigger.querySelector("i").className = "fa-solid fa-bars-staggered";
    });
});

dismissAnnouncementTrigger.addEventListener("click", () => {
    topAnnouncementBar.style.display = "none";
    document.body.classList.add("announcement-closed");
});

/* QUICK VIEW POPUP CONTROLS */
function launchProductPopupModal(productId) {
    const matchedProduct = KICKCRAZE_CATALOGUE.find(p => p.id === productId);
    if (!matchedProduct) return;

    currentlySelectedPopupProductId = productId;
    currentPopupQuantityValue = 1;
    qtyNumericalDisplay.textContent = currentPopupQuantityValue;

    popupProductImg.src = matchedProduct.image;
    popupProductImg.alt = matchedProduct.name;
    popupProductCategory.textContent = matchedProduct.category;
    popupProductTitle.textContent = matchedProduct.name;
    popupProductDescription.textContent = matchedProduct.description;

    popupProductPrice.textContent = new Intl.NumberFormat('en-IN', {
        style: 'currency', currency: 'INR', maximumFractionDigits: 0
    }).format(matchedProduct.price);

    let compiledStars = "";
    for (let starPos = 1; starPos <= 5; starPos++) {
        compiledStars += starPos <= matchedProduct.rating ? `<i class="fa-solid fa-star"></i>` : `<i class="fa-regular fa-star"></i>`;
    }
    popupProductStarsContainer.innerHTML = compiledStars;

    const sizeVariantsSection = document.getElementById("popup-size-variants-section");
    if (matchedProduct.category === "Fragrance" || matchedProduct.category === "Bags" || matchedProduct.category === "Accessories") {
        sizeVariantsSection.style.display = "none";
    } else {
        sizeVariantsSection.style.display = "block";
    }

    globalBackdrop.classList.add("active");
    productDetailPopupModal.classList.add("active");
}

qtyIncrementBtn.addEventListener("click", () => {
    currentPopupQuantityValue++;
    qtyNumericalDisplay.textContent = currentPopupQuantityValue;
});

qtyDecrementBtn.addEventListener("click", () => {
    if (currentPopupQuantityValue > 1) {
        currentPopupQuantityValue--;
        qtyNumericalDisplay.textContent = currentPopupQuantityValue;
    }
});

document.querySelectorAll(".size-variant-bubble").forEach(bubbleBtn => {
    bubbleBtn.addEventListener("click", () => {
        document.querySelectorAll(".size-variant-bubble").forEach(b => b.classList.remove("active"));
        bubbleBtn.classList.add("active");
    });
});

document.querySelectorAll(".color-variant-palette").forEach(paletteNode => {
    paletteNode.addEventListener("click", () => {
        document.querySelectorAll(".color-variant-palette").forEach(p => p.classList.remove("active"));
        paletteNode.classList.add("active");
    });
});

popupAddToCartMainAction.addEventListener("click", () => {
    if (currentlySelectedPopupProductId !== null) {
        appendItemToCartDrawer(currentlySelectedPopupProductId, currentPopupQuantityValue);
        globalStateDismissal();
    }
});

/* ==========================================================================
   5. RE-CALCULATING WARDROBE BAG ENGINE WITH DYNAMIC SHIPPING MATRIX
   ========================================================================== */

window.appendItemToCartDrawer = function(targetProductId, targetedQuantity = 1) {
    const identifiedProductObject = KICKCRAZE_CATALOGUE.find(item => item.id === targetProductId);
    const itemPreexistingInCart = internalCartState.find(row => row.id === targetProductId);

    if (itemPreexistingInCart) {
        itemPreexistingInCart.quantity += targetedQuantity;
    } else {
        internalCartState.push({ ...identifiedProductObject, quantity: targetedQuantity });
    }

    refreshBagInterface();
    globalBackdrop.classList.add("active");
    cartDrawerSidebar.classList.add("active");
};

window.removeTargetItemFromCart = function(targetProductId) {
    internalCartState = internalCartState.filter(row => row.id !== targetProductId);
    refreshBagInterface();
};

function refreshBagInterface() {
    const absoluteItemsCount = internalCartState.reduce((accum, row) => accum + row.quantity, 0);
    cartBadgeCount.textContent = absoluteItemsCount;

    cartItemsInjectionPane.innerHTML = "";

    if (internalCartState.length === 0) {
        cartItemsInjectionPane.innerHTML = `<p class="empty-drawer-notice">Your wardrobe drawer is empty.</p>`;
        cartMatrixSubtotal.textContent = "₹0";
        cartMatrixShipping.textContent = "₹0";
        cartTotalNumericValue.textContent = "₹0";
        return;
    }

    let absoluteSubtotal = 0;

    internalCartState.forEach(rowItem => {
        absoluteSubtotal += (rowItem.price * rowItem.quantity);
        
        const rowPriceFormatted = new Intl.NumberFormat('en-IN', {
            style: 'currency', currency: 'INR', maximumFractionDigits: 0
        }).format(rowItem.price);

        const compiledRowLayoutHTML = `
            <div class="drawer-row-item">
                <img src="${rowItem.image}" alt="${rowItem.name}" class="drawer-row-img">
                <div class="drawer-row-specs">
                    <h4 class="drawer-row-title">${rowItem.name}</h4>
                    <p class="drawer-row-price">${rowPriceFormatted}</p>
                    <p class="drawer-row-qty-tracker">Allocated: ${rowItem.quantity}</p>
                </div>
                <button class="drawer-row-trash-trigger" onclick="removeTargetItemFromCart(${rowItem.id})" title="Remove Line Allocation">
                    <i class="fa-regular fa-trash-can"></i>
                </button>
            </div>
        `;
        cartItemsInjectionPane.insertAdjacentHTML("beforeend", compiledRowLayoutHTML);
    });

    let shippingCharge = absoluteSubtotal >= 2999 ? 0 : 99;
    let grandTotal = absoluteSubtotal + shippingCharge;

    const formatter = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });

    cartMatrixSubtotal.textContent = formatter.format(absoluteSubtotal);
    cartMatrixShipping.textContent = shippingCharge === 0 ? "FREE" : formatter.format(shippingCharge);
    cartTotalNumericValue.textContent = formatter.format(grandTotal);

    invoiceSubtotal.textContent = formatter.format(absoluteSubtotal);
    invoiceShipping.textContent = shippingCharge === 0 ? "FREE" : formatter.format(shippingCharge);
    invoiceGrandtotal.textContent = formatter.format(grandTotal);
}

/* ==========================================================================
   6. ATELIER DYNAMIC PAYMENT CONCIERGE FLOW (NETLIFY SERVERLESS ROUTER)
   ========================================================================== */

// Check Cart State ("Please add a product to cart first." if empty)
cartCheckoutActionBtn.addEventListener("click", () => {
    if (internalCartState.length === 0) {
        alert("Please add a product to cart first.");
        return;
    }
    
    cartDrawerSidebar.classList.remove("active");
    prefillCheckoutFormCredentials();

    globalBackdrop.classList.add("active");
    customerCheckoutAddressModal.classList.add("active");
});

function captureCheckoutCredentials() {
    const customerDetailsPayload = {
        fullName: document.getElementById("checkout-fullname").value,
        phone: document.getElementById("checkout-phone").value,
        email: document.getElementById("checkout-email").value,
        address: document.getElementById("checkout-address").value,
        city: document.getElementById("checkout-city").value,
        state: document.getElementById("checkout-state").value,
        pincode: document.getElementById("checkout-pincode").value
    };
    localStorage.setItem("kickcraze_customer_cache", JSON.stringify(customerDetailsPayload));
}

function prefillCheckoutFormCredentials() {
    const persistentCacheString = localStorage.getItem("kickcraze_customer_cache");
    if (!persistentCacheString) return;

    try {
        const cacheObj = JSON.parse(persistentCacheString);
        document.getElementById("checkout-fullname").value = cacheObj.fullName || "";
        document.getElementById("checkout-phone").value = cacheObj.phone || "";
        document.getElementById("checkout-email").value = cacheObj.email || "";
        document.getElementById("checkout-address").value = cacheObj.address || "";
        document.getElementById("checkout-city").value = cacheObj.city || "";
        document.getElementById("checkout-state").value = cacheObj.state || "";
        document.getElementById("checkout-pincode").value = cacheObj.pincode || "";
    } catch (err) {
        console.error("Failed to parse local customer credentials matrix token ledger.", err);
    }
}

// Intercept form submission to invoke asynchronous serverless background transaction scripts
actualCheckoutShippingForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    captureCheckoutCredentials();

    const checkoutSubmitButton = actualCheckoutShippingForm.querySelector(".checkout-submit-btn");
    const originalButtonText = checkoutSubmitButton.textContent;
    
    const subtotalText = document.getElementById("invoice-subtotal").innerText.replace(/[₹,]/g, '');
    const subtotal = parseInt(subtotalText);
    const shipping = subtotal >= 2999 ? 0 : 99;
    const totalAmount = subtotal + shipping;

    try {
        checkoutSubmitButton.textContent = "Processing...";
        checkoutSubmitButton.disabled = true;

        const res = await fetch("/.netlify/functions/create-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount: totalAmount })
        });

        if (!res.ok) throw new Error("Initialization failed");

        const orderData = await res.json();

        const options = {
            key: orderData.key,
            amount: totalAmount * 100,
            currency: "INR",
            name: "KickCraze",
            order_id: orderData.id,
            handler: async function (payload) {
                try {
                    checkoutSubmitButton.textContent = "Verifying...";
                    const vRes = await fetch("/.netlify/functions/verify-payment", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                       body: JSON.stringify({
    order_id: payload.razorpay_order_id,
    payment_id: payload.razorpay_payment_id,
    signature: payload.razorpay_signature,
    customer: JSON.parse(localStorage.getItem("kickcraze_customer_cache") || "{}"),
    cart_items: internalCartState,
    subtotal,
    shipping,
    total: totalAmount
})
                    });
                    const vData = await vRes.json();

                    if (vRes.ok && vData.status === "success") {
                        alert("Payment successful. Your KickCraze order has been placed.");
                        internalCartState = [];
                        refreshBagInterface();
                        globalStateDismissal();
                    } else {
                        alert("Payment could not be verified. Please contact support.");
                    }
                } catch (e) {
                    alert("Payment could not be verified. Please contact support.");
                } finally {
                    checkoutSubmitButton.textContent = originalButtonText;
                    checkoutSubmitButton.disabled = false;
                }
            },
            theme: { color: "#E01A22" }
        };

        new Razorpay(options).open();

    } catch (err) {
        alert("Payment failed. Please try again.");
        checkoutSubmitButton.textContent = originalButtonText;
        checkoutSubmitButton.disabled = false;
    }
});

/* ==========================================================================
   7. POLICY DATA MATRIX & MODAL INJECTOR
   ========================================================================= */
const KICKCRAZE_POLICIES = {
    "Shipping Policy": `
        <h4>1. Dispatch Timeline</h4>
        <p>All premium sneakers and limited streetwear allocations are processed and dispatched within 24–48 business hours from our central authentication warehouse ledger hub.</p>
        
        <h4>2. Shipping Charges Across India</h4>
        <p>• Orders valuing ₹2,999 and above qualify for complimentary priority air-cargo dispatch.<br>
        • Orders below ₹2,999 incur a standardized secure packaging and fulfillment fee of ₹99 across all states in India.</p>
        
        <h4>3. Delivery Carriers & Tracking</h4>
        <p>We partner with high-tier premium couriers (BlueDart, Delhivery, Delhivery Air) to guarantee fast transport. Secure encrypted tracking URLs will send straight to your email register immediately upon carrier scan lines execution.</p>
        
        <h4>4. Transit Boundaries</h4>
        <p>Standard delivery spans 2–5 business days for major Indian metro hubs (Delhi, Mumbai, Bangalore, Kolkata, Ranchi) and up to 5–7 days for smaller regional pins.</p>
    `,
    "Return & Refund Policy": `
        <h4>1. 7-Day Inspection Loop</h4>
        <p>We maintain a secure 7-day inspection return window. The product must remain strictly unworn, clean, unwashed, and completely intact inside its original double-boxed layers with our custom red KickCraze security plastic tags undisturbed.</p>
        
        <h4>2. Exclusions Matrix</h4>
        <p>Certain special limited-allocation tier drops, customized high-aroma perfumes, and capsule street apparel collections cannot accept return logs due to market rarity constraints. Please review item labels carefully during launch window periods.</p>
        
        <h4>3. Refund Issuance System</h4>
        <p>Once your returned specimen passes through our intake verification center check logs, approval triggers automatic gateway clearance lines. Refunds route instantly to your original payment ledger instrument via Razorpay within 3–5 professional banking clearance cycles. Cash-on-Delivery alternatives adjust via secured direct IMPS/NEFT ledger transfers.</p>
    `,
    "Privacy Policy": `
        <h4>1. Information Capture Matrix</h4>
        <p>We capture secure personal identifiers provided by your input channels—specifically Full Names, mobile contact phone streams, shipping address rows, and private email registers—purely to execute fulfillment protocol lines.</p>
        
        <h4>2. Encryption Safeguards</h4>
        <p>KickCraze utilizes industrial-grade Secure Socket Layer (SSL) matrices to protect database files. Under no circumstances do our system caches log, parse, or hold your credit card passphrases, internet banking credentials, or wallet security tokens.</p>
        
        <h4>3. Zero Third-Party Monetization</h4>
        <p>Your tracking logs and address matrices are shared strictly with certified delivery nodes to complete transit runs. We enforce a total ban on third-party marketing exploitation pipelines.</p>
    `,
    "Terms & Conditions": `
        <h4>1. Single Allocation Rule</h4>
        <p>To ensure fair market access and kill bot scraping/scalper automation interference, orders are restricted to limited pair metrics per identity account register.</p>
        
        <h4>2. Gateway Contract Lock</h4>
        <p>Submitting our shipping coordinates form initializes a formal allocation request. Redirection to the live Razorpay system constitutes an escrow session transaction log log under Indian Consumer Electronic Protection Directives.</p>
        
        <h4>3. Product Precision Ledger</h4>
        <p>Minor variations in grain texture, high-tech paint cuts, and edge alignments are characteristic of custom premium composite manufacturing workflows. They do not constitute structural errors or defects.</p>
    `
};

window.togglePolicyDisplay = function(policyKey) {
    globalStateDismissal(); 
    if (!KICKCRAZE_POLICIES[policyKey]) return;
    
    policyModalTitle.textContent = policyKey;
    policyModalBody.innerHTML = KICKCRAZE_POLICIES[policyKey];
    
    globalBackdrop.classList.add("active");
    policyDisplayPopupModal.classList.add("active");
};

/* ==========================================================================
   8. GLOBAL INTERCEPTS & APP STARTUP
   ========================================================================= */
window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        globalStateDismissal();
    }
});

document.getElementById("actual-auth-form").addEventListener("submit", (e) => {
    e.preventDefault();
    globalStateDismissal();
});

document.getElementById("newsletter-form-submit").addEventListener("submit", (e) => {
    e.preventDefault();
    const targetedEmailNode = document.getElementById("newsletter-email");
    targetedEmailNode.value = "";
});

// App Startup Bootstrapper
document.addEventListener("DOMContentLoaded", () => {
    compileProductsDisplay(KICKCRAZE_CATALOGUE);
    refreshBagInterface();
});