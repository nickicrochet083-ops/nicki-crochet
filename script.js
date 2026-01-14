document.addEventListener('DOMContentLoaded', () => {
    
    // --- Store Closure Overlay Control ---
    const storeStatusElement = document.getElementById('store-status');
    const storeClosureOverlay = document.getElementById('storeClosureOverlay');
    const closeOverlayBtn = document.getElementById('closeOverlayBtn');
    const closureMessageText = document.getElementById('closureMessageText');

    // Check if store is closed
    if (storeStatusElement && storeStatusElement.dataset.status) {
        const closureMessage = storeStatusElement.dataset.status;
        closureMessageText.textContent = closureMessage;
        storeClosureOverlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    // Close overlay button
    if (closeOverlayBtn) {
        closeOverlayBtn.addEventListener('click', () => {
            storeClosureOverlay.style.display = 'none';
            document.body.style.overflow = '';
        });
    }

    // --- 1. Products Array with Multiple Images and Categories ---
    
    const products = [
        { 
            // --- 1. Ramos productos ---
            name: "Ramo de Hello Kitty", 
            price: 55.00, 
            images: [
                "https://res.cloudinary.com/dwzwa3gp0/image/upload/v1768409244/WhatsApp_Image_2026-01-11_at_5.20.52_PM_yctd1y.jpg",
                
            // ---"Imagen 2" ---
            ],
            deliveryDays: 5,
            category: "ramos"
        },
       
        { 
            name: "Ramo de Snoopy", 
            price: 60.00, 
            images: [
                "https://res.cloudinary.com/dwzwa3gp0/image/upload/v1768409998/WhatsApp_Image_2026-01-11_at_5.12.30_PM_nxyrjn.jpg"
            ], 
            deliveryDays: 5,
            category: "ramos"
        },
        
        { 
        name: "Ramo de spiderman", 
            price: 18.00, 
            images: [
                "https://res.cloudinary.com/dwzwa3gp0/image/upload/v1768425769/WhatsApp_Image_2026-01-14_at_1.53.37_PM_ueo9i4.jpg"
            ], 
            deliveryDays: 5,
            category: "ramos"
        },

            { 
        name: "Ramo de Lionel Messi, con diseño de Barcelona", 
            price: 110.00, 
            images: [
                "https://res.cloudinary.com/dwzwa3gp0/image/upload/v1768426126/WhatsApp_Image_2026-01-14_at_1.53.39_PM_jfx8uv.jpg"
            ], 
            deliveryDays: 5,
            category: "ramos"
        },
        
        { 
        name: "Ramo de Cr7 con uniforme Al Nassr Football Club", 
            price: 110.00, 
            images: [
                "https://res.cloudinary.com/dwzwa3gp0/image/upload/v1768427203/WhatsApp_Image_2026-01-14_at_1.53.41_PM_onjpga.jpg"
            ], 
            deliveryDays: 5,
            category: "ramos"
        },

            // --- 1. Personajes productos ---
         { 
            name: "Vegeta", 
            price: 140.00, 
            images: [
                "https://res.cloudinary.com/dwzwa3gp0/image/upload/v1768409737/WhatsApp_Image_2026-01-11_at_5.19.36_PM_ne186o.jpg"
            ], 
            deliveryDays: 5,
            category: "personajes"
        },
        
        { 
            name: "Capibara bebé", 
            price: 45.00, 
            images: [
                "https://res.cloudinary.com/dwzwa3gp0/image/upload/v1768412464/image_88_xhoukg.jpg"
            ], 
            deliveryDays: 5,
            category: "personajes"
        },
        { 
            name: "Mini Spiderman", 
            price: 55.00, 
            images: [
                "https://res.cloudinary.com/dwzwa3gp0/image/upload/v1768412752/image_89_a8ogo7.jpg"
            ], 
            deliveryDays: 5,
            category: "personajes"
        },

         { 
            name: "Cristiano Ronaldo", 
            price: 45.00, 
            images: [
                "https://res.cloudinary.com/dwzwa3gp0/image/upload/v1768423917/WhatsApp_Image_2026-01-14_at_1.53.08_PM_j9szbv.jpg"
            ], 
            deliveryDays: 5,
            category: "personajes"
        },

        { 
            name: "Lionel Messi", 
            price: 110.00, 
            images: [
                "https://res.cloudinary.com/dwzwa3gp0/image/upload/v1768425418/WhatsApp_Image_2026-01-14_at_1.53.35_PM_ks0bdc.jpg"
            ], 
            deliveryDays: 5,
            category: "personajes"
        },

        
        
        
            // --- 1. LLaveros productos ---
        { 
            name: "Pareja de llaveros de palta", 
            price: 35.00, 
            images: [
                "https://res.cloudinary.com/dwzwa3gp0/image/upload/v1768429192/WhatsApp_Image_2026-01-14_at_5.14.51_PM_j08jgx.jpg"
            ], 
            deliveryDays: 5,
            category: "llaveros"
        },

        { 
            name: "LLavero de Goku", 
            price: 32.00, 
            images: [
                "https://res.cloudinary.com/dwzwa3gp0/image/upload/v1768423809/WhatsApp_Image_2026-01-14_at_1.53.05_PM_imvxw7.jpg"
            ], 
            deliveryDays: 5,
            category: "llaveros"
        },
        
    ];

    const productGrid = document.getElementById('productGrid');
    const orderModal = document.getElementById('orderModal');
    const confirmationModal = document.getElementById('confirmationModal');
    const closeOrderModal = document.getElementById('closeOrderModal');
    const closeConfirmationModal = document.getElementById('closeConfirmationModal');
    const orderForm = document.getElementById('orderForm');
    const deliveryMessage = document.getElementById('deliveryMessage');
    const quantityInput = document.getElementById('quantity');
    const qtyMinusBtn = document.getElementById('qtyMinus');
    const qtyPlusBtn = document.getElementById('qtyPlus');

    // Lightbox elements
    const lightboxModal = document.getElementById('lightboxModal');
    const closeLightbox = document.getElementById('closeLightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    const lightboxCounter = document.getElementById('lightboxCounter');
    
    let currentLightboxProduct = null;
    let currentLightboxIndex = 0;

    // --- 2. Render Product Cards with Gallery Support and "Open Image" Button ---
    
    function renderProducts() {
        productGrid.innerHTML = '';
        
        products.forEach((product, index) => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.setAttribute('data-category', product.category);
            
            // Create image gallery HTML
            const hasMultipleImages = product.images.length > 1;
            
            // Only show gallery controls if there are multiple images
            const galleryControlsHTML = hasMultipleImages ? `
                <button class="gallery-nav prev" data-direction="prev">
                    <i class="fa-solid fa-chevron-left"></i>
                </button>
                <button class="gallery-nav next" data-direction="next">
                    <i class="fa-solid fa-chevron-right"></i>
                </button>
                <div class="gallery-indicators">
                    ${product.images.map((_, i) => `
                        <span class="gallery-indicator ${i === 0 ? 'active' : ''}" data-index="${i}"></span>
                    `).join('')}
                </div>
            ` : '';
            
            const galleryHTML = `
                <div class="product-img-box" data-product-index="${index}">
                    <img src="${product.images[0]}" alt="${product.name}" class="product-img" data-current-index="0">
                    ${galleryControlsHTML}
                    <button class="open-image-btn" data-product-index="${index}">
                        <i class="fa-solid fa-expand"></i> </butto> 
                    </div>
            `;
            
            card.innerHTML = `
                ${galleryHTML}
                <div class="product-info">
                    <h4 class="product-title">${product.name}</h4>
                    <span class="product-price">S/ ${product.price.toFixed(2)}</span>
                    <span class="delivery-days">
                        <i class="fa-solid fa-truck-fast"></i>
                        Llega en ${product.deliveryDays} días
                    </span>
                    <button class="btn-reserve" data-index="${index}">
                        <i class="fa-solid fa-bookmark"></i> Separar pedido
                    </button>
                </div>
            `;
            productGrid.appendChild(card);
        });
        
        // Initialize gallery navigation
        initializeGalleryNavigation();
        
        // Initialize "Open Image" buttons
        initializeOpenImageButtons();
    }

    // --- 3. Gallery Navigation Logic ---
    
    function initializeGalleryNavigation() {
        const imageBoxes = document.querySelectorAll('.product-img-box');
        
        imageBoxes.forEach(box => {
            const productIndex = parseInt(box.getAttribute('data-product-index'));
            const product = products[productIndex];
            const img = box.querySelector('.product-img');
            const prevBtn = box.querySelector('.gallery-nav.prev');
            const nextBtn = box.querySelector('.gallery-nav.next');
            const indicators = box.querySelectorAll('.gallery-indicator');
            
            if (product.images.length <= 1) return;
            
            // Navigation button handlers
            if (prevBtn) {
                prevBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    navigateGallery(box, img, indicators, product.images, -1);
                });
            }
            
            if (nextBtn) {
                nextBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    navigateGallery(box, img, indicators, product.images, 1);
                });
            }
            
            // Indicator click handlers
            indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', (e) => {
                    e.stopPropagation();
                    setGalleryImage(img, indicators, product.images, index);
                });
            });
            
            // Touch swipe support
            let touchStartX = 0;
            let touchEndX = 0;
            
            box.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });
            
            box.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe(box, img, indicators, product.images, touchStartX, touchEndX);
            }, { passive: true });
        });
    }
    
    function navigateGallery(box, img, indicators, images, direction) {
        const currentIndex = parseInt(img.getAttribute('data-current-index'));
        let newIndex = currentIndex + direction;
        
        if (newIndex < 0) newIndex = images.length - 1;
        if (newIndex >= images.length) newIndex = 0;
        
        setGalleryImage(img, indicators, images, newIndex);
    }
    
    function setGalleryImage(img, indicators, images, index) {
        img.src = images[index];
        img.setAttribute('data-current-index', index);
        
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
    }
    
    function handleSwipe(box, img, indicators, images, startX, endX) {
        const swipeThreshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next image
                navigateGallery(box, img, indicators, images, 1);
            } else {
                // Swipe right - previous image
                navigateGallery(box, img, indicators, images, -1);
            }
        }
    }

    // --- 4. "Open Image" Button Functionality ---
    
    function initializeOpenImageButtons() {
        const openImageButtons = document.querySelectorAll('.open-image-btn');
        
        openImageButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const productIndex = parseInt(button.getAttribute('data-product-index'));
                const product = products[productIndex];
                
                // Get current image index from the product card
                const imgBox = button.closest('.product-img-box');
                const img = imgBox.querySelector('.product-img');
                const currentIndex = parseInt(img.getAttribute('data-current-index'));
                
                openLightbox(product, currentIndex);
            });
        });
    }
    
    function openLightbox(product, startIndex = 0) {
        currentLightboxProduct = product;
        currentLightboxIndex = startIndex;
        
        updateLightboxImage();
        lightboxModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    
    function updateLightboxImage() {
        if (!currentLightboxProduct) return;
        
        lightboxImage.src = currentLightboxProduct.images[currentLightboxIndex];
        
        // Update counter
        if (currentLightboxProduct.images.length > 1) {
            lightboxCounter.textContent = `${currentLightboxIndex + 1} / ${currentLightboxProduct.images.length}`;
            lightboxCounter.style.display = 'block';
        } else {
            lightboxCounter.style.display = 'none';
        }
        
        // Show/hide navigation buttons
        if (currentLightboxProduct.images.length > 1) {
            lightboxPrev.style.display = 'flex';
            lightboxNext.style.display = 'flex';
        } else {
            lightboxPrev.style.display = 'none';
            lightboxNext.style.display = 'none';
        }
    }
    
    function closeLightboxModal() {
        lightboxModal.style.display = 'none';
        document.body.style.overflow = '';
        currentLightboxProduct = null;
        currentLightboxIndex = 0;
    }
    
    // Lightbox navigation
    lightboxPrev.addEventListener('click', () => {
        if (!currentLightboxProduct) return;
        currentLightboxIndex--;
        if (currentLightboxIndex < 0) {
            currentLightboxIndex = currentLightboxProduct.images.length - 1;
        }
        updateLightboxImage();
    });
    
    lightboxNext.addEventListener('click', () => {
        if (!currentLightboxProduct) return;
        currentLightboxIndex++;
        if (currentLightboxIndex >= currentLightboxProduct.images.length) {
            currentLightboxIndex = 0;
        }
        updateLightboxImage();
    });
    
    closeLightbox.addEventListener('click', closeLightboxModal);
    
    // Close lightbox when clicking outside the image
    lightboxModal.addEventListener('click', (e) => {
        if (e.target === lightboxModal) {
            closeLightboxModal();
        }
    });
    
    // Keyboard navigation for lightbox
    document.addEventListener('keydown', (e) => {
        if (lightboxModal.style.display === 'block') {
            if (e.key === 'Escape') {
                closeLightboxModal();
            } else if (e.key === 'ArrowLeft') {
                lightboxPrev.click();
            } else if (e.key === 'ArrowRight') {
                lightboxNext.click();
            }
        }
    });

    // --- 5. Filter Functionality ---
    
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter products
            filterProducts(filter);
        });
    });
    
    function filterProducts(category) {
        const cards = document.querySelectorAll('.product-card');
        
        cards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            
            if (category === 'all' || cardCategory === category) {
                card.classList.remove('hidden');
                // Trigger animation
                card.style.animation = 'none';
                setTimeout(() => {
                    card.style.animation = 'fadeInUp 0.5s ease';
                }, 10);
            } else {
                card.classList.add('hidden');
            }
        });
    }
    
    // Add fadeInUp animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);

    // Initial render
    renderProducts();

    // --- 6. Order Modal Logic ---
    
    let selectedProduct = null;

    // Open modal when clicking "Separar pedido"
    productGrid.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-reserve') || e.target.closest('.btn-reserve')) {
            const button = e.target.classList.contains('btn-reserve') ? e.target : e.target.closest('.btn-reserve');
            const productIndex = button.getAttribute('data-index');
            selectedProduct = products[productIndex];
            
            // Fill product data in modal
            document.getElementById('productName').value = selectedProduct.name;
            document.getElementById('productPrice').value = `S/ ${selectedProduct.price.toFixed(2)}`;
            
            // Fill preview section with first image
            document.getElementById('modalProductImage').src = selectedProduct.images[0];
            document.getElementById('modalProductName').textContent = selectedProduct.name;
            document.getElementById('modalProductPrice').textContent = `S/ ${selectedProduct.price.toFixed(2)}`;
            
            // Reset quantity to 1
            quantityInput.value = 1;
            
            // Update delivery message
            deliveryMessage.textContent = `Hola, el pedido llegará en ${selectedProduct.deliveryDays} días. Se le comunicará a su WhatsApp. Gracias.`;
            
            // Show modal
            orderModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    });

    // --- 7. Quantity Controls ---
    
    qtyMinusBtn.addEventListener('click', () => {
        let currentValue = parseInt(quantityInput.value);
        if (currentValue > 1) {
            quantityInput.value = currentValue - 1;
        }
    });

    qtyPlusBtn.addEventListener('click', () => {
        let currentValue = parseInt(quantityInput.value);
        if (currentValue < 99) {
            quantityInput.value = currentValue + 1;
        }
    });

    // --- 8. Close Modals ---
    
    closeOrderModal.addEventListener('click', () => {
        orderModal.style.display = 'none';
        orderForm.reset();
        document.body.style.overflow = '';
    });

    closeConfirmationModal.addEventListener('click', () => {
        confirmationModal.style.display = 'none';
        document.body.style.overflow = '';
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === orderModal) {
            orderModal.style.display = 'none';
            orderForm.reset();
            document.body.style.overflow = '';
        }
        if (e.target === confirmationModal) {
            confirmationModal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });

    // --- 9. DNI Validation (numbers only, 8 digits) ---
    
    const dniInput = document.getElementById('dni');
    dniInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
    });

    // --- 10. Security Code Validation (numbers only) ---
    
    const securityCodeInput = document.getElementById('securityCode');
    securityCodeInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
    });

    // --- 11. Form Submission ---
    
    orderForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get selected shipping company
        const shippingCompany = document.querySelector('input[name="shippingCompany"]:checked');
        
        if (!shippingCompany) {
            alert('Por favor, selecciona una empresa de envío.');
            return;
        }

        const quantity = parseInt(quantityInput.value);
        const unitPrice = selectedProduct.price;
        const totalPrice = unitPrice * quantity;

        const formData = {
            whatsapp: document.getElementById('whatsapp').value,
            nombre: document.getElementById('userName').value,
            dni: document.getElementById('dni').value,
            producto: selectedProduct.name,
            cantidad: quantity,
            precioUnitario: `S/ ${unitPrice.toFixed(2)}`,
            precioTotal: `S/ ${totalPrice.toFixed(2)}`,
            lugarDeResidencia: document.getElementById('destination').value,
            empresaEnvio: shippingCompany.value,
            codigoSeguridad: document.getElementById('securityCode').value,
            diasEntrega: `${selectedProduct.deliveryDays} días`
        };

        try {
            const response = await fetch('https://formspree.io/f/xeeejvvn', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                // Close order modal
                orderModal.style.display = 'none';
                orderForm.reset();
                document.body.style.overflow = '';
                
                // Show confirmation modal
                confirmationModal.style.display = 'block';
                
                // Create heart confetti
                createHeartConfetti();
            } else {
                alert('Hubo un error al procesar tu pedido. Por favor, intenta nuevamente.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un error al procesar tu pedido. Por favor, intenta nuevamente.');
        }
    });

    // --- 12. Heart Confetti Effect ---
    
    function createHeartConfetti() {
        const confettiContainer = document.createElement('div');
        confettiContainer.style.position = 'fixed';
        confettiContainer.style.top = '0';
        confettiContainer.style.left = '0';
        confettiContainer.style.width = '100%';
        confettiContainer.style.height = '100%';
        confettiContainer.style.pointerEvents = 'none';
        confettiContainer.style.zIndex = '9999';
        document.body.appendChild(confettiContainer);

        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.textContent = '💗';
                heart.style.position = 'absolute';
                heart.style.left = Math.random() * 100 + '%';
                heart.style.top = '-50px';
                heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
                heart.style.opacity = '1';
                heart.style.animation = `fallConfetti ${Math.random() * 2 + 3}s linear forwards`;
                confettiContainer.appendChild(heart);

                setTimeout(() => {
                    heart.remove();
                }, 5000);
            }, i * 100);
        }

        setTimeout(() => {
            confettiContainer.remove();
        }, 6000);
    }

    // Add confetti animation
    const confettiStyle = document.createElement('style');
    confettiStyle.textContent = `
        @keyframes fallConfetti {
            0% {
                top: -50px;
                opacity: 1;
                transform: rotate(0deg);
            }
            100% {
                top: 100vh;
                opacity: 0;
                transform: rotate(360deg);
            }
        }
    `;
    document.head.appendChild(confettiStyle);

    // --- 13. Dynamic Decorative Elements ---
    
    function createDynamicDecorations() {
        const floatingHearts = document.querySelector('.floating-hearts');
        const fallingPetals = document.querySelector('.falling-petals');
        const butterflies = document.querySelector('.butterflies');
        const sparkles = document.querySelector('.sparkles');

        // Add more hearts
        for (let i = 0; i < 3; i++) {
            const heart = document.createElement('span');
            heart.textContent = '💗';
            heart.style.position = 'absolute';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.top = Math.random() * 100 + '%';
            heart.style.fontSize = '20px';
            heart.style.opacity = '0.3';
            heart.style.animation = `floatHeart ${15 + Math.random() * 10}s infinite ease-in-out`;
            heart.style.animationDelay = Math.random() * 5 + 's';
            floatingHearts.appendChild(heart);
        }

        // Add more petals
        for (let i = 0; i < 4; i++) {
            const petal = document.createElement('span');
            petal.textContent = '🌸';
            petal.style.position = 'absolute';
            petal.style.left = Math.random() * 100 + '%';
            petal.style.top = '-10%';
            petal.style.fontSize = '18px';
            petal.style.opacity = '0.4';
            petal.style.animation = `fallPetal ${20 + Math.random() * 10}s infinite linear`;
            petal.style.animationDelay = Math.random() * 10 + 's';
            fallingPetals.appendChild(petal);
        }

        // Add more butterflies
        for (let i = 0; i < 2; i++) {
            const butterfly = document.createElement('span');
            butterfly.textContent = '🦋';
            butterfly.style.position = 'absolute';
            butterfly.style.left = Math.random() * 100 + '%';
            butterfly.style.top = Math.random() * 100 + '%';
            butterfly.style.fontSize = '22px';
            butterfly.style.opacity = '0.35';
            butterfly.style.animation = `flyButterfly ${25 + Math.random() * 10}s infinite ease-in-out`;
            butterfly.style.animationDelay = Math.random() * 10 + 's';
            butterflies.appendChild(butterfly);
        }

        // Add more sparkles
        for (let i = 0; i < 5; i++) {
            const sparkle = document.createElement('span');
            sparkle.textContent = '✨';
            sparkle.style.position = 'absolute';
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            sparkle.style.fontSize = '16px';
            sparkle.style.opacity = '0';
            sparkle.style.animation = `sparkle 3s infinite`;
            sparkle.style.animationDelay = Math.random() * 3 + 's';
            sparkles.appendChild(sparkle);
        }
    }

    createDynamicDecorations();
});
