document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Generador de Catálogo Dinámico ---
    
    const products = [
        { name: "Top Crop Floral", price: 65.00, img: "/images/photo1767997092.jpg", deliveryDays: 5 },
        { name: "Amigurumi Osito", price: 45.00, img: "/images/photo1767997092.jpg", deliveryDays: 3 },
        { name: "Bolso Lila Boho", price: 89.00, img: "https://images.unsplash.com/photo-1544816155-12df9643f363?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", deliveryDays: 7 },
        { name: "Bufanda Infinita", price: 55.00, img: "/images/photo1767997092.jpg", deliveryDays: 4 },
        { name: "Set Gorro Invierno", price: 40.00, img: "https://images.unsplash.com/photo-1576053139778-7e32f2ae3cfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", deliveryDays: 3 },
        { name: "Cardigan Pastel", price: 120.00, img: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", deliveryDays: 10 },
        { name: "Chaleco Vintage", price: 95.00, img: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", deliveryDays: 8 },
        { name: "Posavasos Flor (Set)", price: 25.00, img: "/images/photo1767997092.jpg", deliveryDays: 2 },
        { name: "Cesta Organizadora", price: 50.00, img: "/images/photo1767997092.jpg", deliveryDays: 6 }
    ];

    const productGrid = document.getElementById('productGrid');
    const orderModal = document.getElementById('orderModal');
    const confirmationModal = document.getElementById('confirmationModal');
    const closeOrderModal = document.getElementById('closeOrderModal');
    const closeConfirmationModal = document.getElementById('closeConfirmationModal');
    const orderForm = document.getElementById('orderForm');
    const deliveryMessage = document.getElementById('deliveryMessage');

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
            
            // Actualizar mensaje de entrega dinámicamente
            deliveryMessage.textContent = `Hola, el pedido llegará en ${selectedProduct.deliveryDays} días. Se le comunicará a su WhatsApp. Gracias.`;
            
            // Mostrar modal
            orderModal.style.display = 'block';
        }
    });

    // Cerrar modal de pedido
    closeOrderModal.addEventListener('click', () => {
        orderModal.style.display = 'none';
        orderForm.reset();
    });

    // Cerrar modal de confirmación
    closeConfirmationModal.addEventListener('click', () => {
        confirmationModal.style.display = 'none';
    });

    // Cerrar modal al hacer clic fuera de él
    window.addEventListener('click', (e) => {
        if (e.target === orderModal) {
            orderModal.style.display = 'none';
            orderForm.reset();
        }
        if (e.target === confirmationModal) {
            confirmationModal.style.display = 'none';
        }
    });

    // --- 3. Validación del DNI (solo números, 8 dígitos) ---
    
    const dniInput = document.getElementById('dni');
    dniInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
    });

    // --- 4. Validación del código de seguridad (solo números) ---
    
    const securityCodeInput = document.getElementById('securityCode');
    securityCodeInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
    });

    // --- 5. Envío del Formulario ---
    
    orderForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Obtener empresa de envío seleccionada
        const shippingCompany = document.querySelector('input[name="shippingCompany"]:checked');
        
        if (!shippingCompany) {
            alert('Por favor, selecciona una empresa de envío.');
            return;
        }

        const formData = {
            whatsapp: document.getElementById('whatsapp').value,
            nombre: document.getElementById('userName').value,
            dni: document.getElementById('dni').value,
            producto: selectedProduct.name,
            precio: `S/ ${selectedProduct.price.toFixed(2)}`,
            lugarDeResidencia: document.getElementById('destination').value,
            empresaEnvio: shippingCompany.value,
            codigoSeguridad: document.getElementById('securityCode').value,
            diasEntrega: `${selectedProduct.deliveryDays} días`
        };

        try {
            // Reemplaza 'YOUR_FORMSPREE_ID' con tu ID real de Formspree
            const response = await fetch('https://formspree.io/f/xeeejggy', {
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
                
                // Mostrar modal de confirmación
                confirmationModal.style.display = 'block';
            } else {
                alert('Hubo un error al procesar tu pedido. Por favor, intenta nuevamente.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un error al procesar tu pedido. Por favor, intenta nuevamente.');
        }
    });
});
