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

    // --- 1. Generador de Catálogo Dinámico ---
    
    const products = [
        { name: "Top Crop Floral", price: 65.00, img: "/images/FloralTop.jpg", deliveryDays: 5 },
        { name: "Amigurumi Osito", price: 45.00, img: "/images/FloralTop.jpg", deliveryDays: 3 },
        { name: "Bolso Lila Boho", price: 89.00, img: "https://images.unsplash.com/photo-1544816155-12df9643f363?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", deliveryDays: 7 },
        { name: "Bufanda Infinita", price: 55.00, img: "/images/FloralTop.jpg", deliveryDays: 4 },
        { name: "Set Gorro Invierno", price: 40.00, img: "https://images.unsplash.com/photo-1576053139778-7e32f2ae3cfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", deliveryDays: 3 },
        { name: "Cardigan Pastel", price: 120.00, img: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", deliveryDays: 10 },
        { name: "Chaleco Vintage", price: 95.00, img: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", deliveryDays: 8 },
        { name: "Posavasos Flor (Set)", price: 25.00, img: "/images/FloralTop.jpg", deliveryDays: 2 },
        { name: "Cesta Organizadora", price: 50.00, img: "/images/FloralTop.jpg", deliveryDays: 6 }
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

    // Función para renderizar tarjetas
    products.forEach((product, index) => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-img-box">
                <img src="${product.img}" alt="${product.name}" class="product-img">
            </div>
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

    // --- 2. Manejo del Modal de Pedido ---
    
    let selectedProduct = null;

    // Abrir modal de pedido al hacer clic en "Separar pedido"
    productGrid.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-reserve') || e.target.closest('.btn-reserve')) {
            const button = e.target.classList.contains('btn-reserve') ? e.target : e.target.closest('.btn-reserve');
            const productIndex = button.getAttribute('data-index');
            selectedProduct = products[productIndex];
            
            // Llenar datos del producto en el modal
            document.getElementById('productName').value = selectedProduct.name;
            document.getElementById('productPrice').value = `S/ ${selectedProduct.price.toFixed(2)}`;
            
            // Llenar imagen y nombre en la vista previa
            document.getElementById('modalProductImage').src = selectedProduct.img;
            document.getElementById('modalProductName').textContent = selectedProduct.name;
            document.getElementById('modalProductPrice').textContent = `S/ ${selectedProduct.price.toFixed(2)}`;
            
            // Reset quantity to 1
            quantityInput.value = 1;
            
            // Actualizar mensaje de entrega dinámicamente
            deliveryMessage.textContent = `Hola, el pedido llegará en ${selectedProduct.deliveryDays} días. Se le comunicará a su WhatsApp. Gracias.`;
            
            // Mostrar modal
            orderModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    });

    // --- 3. Quantity Controls ---
    
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

    // --- 4. Cerrar modales ---
    
    closeOrderModal.addEventListener('click', () => {
        orderModal.style.display = 'none';
        orderForm.reset();
        document.body.style.overflow = '';
    });

    closeConfirmationModal.addEventListener('click', () => {
        confirmationModal.style.display = 'none';
        document.body.style.overflow = '';
    });

    // Cerrar modal al hacer clic fuera de él
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

    // --- 5. Validación del DNI (solo números, 8 dígitos) ---
    
    const dniInput = document.getElementById('dni');
    dniInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
    });

    // --- 6. Validación del código de seguridad (solo números) ---
    
    const securityCodeInput = document.getElementById('securityCode');
    securityCodeInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
    });

    // --- 7. Envío del Formulario ---
    
    orderForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Obtener empresa de envío seleccionada
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
                // Cerrar modal de pedido
                orderModal.style.display = 'none';
                orderForm.reset();
                document.body.style.overflow = '';
                
                // Mostrar modal de confirmación
                confirmationModal.style.display = 'block';
                
                // Crear confeti de corazones
                createHeartConfetti();
            } else {
                alert('Hubo un error al procesar tu pedido. Por favor, intenta nuevamente.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un error al procesar tu pedido. Por favor, intenta nuevamente.');
        }
    });

    // --- 8. Heart Confetti Effect ---
    
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
    const style = document.createElement('style');
    style.textContent = `
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
    document.head.appendChild(style);

    // --- 9. Dynamic Decorative Elements ---
    
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
