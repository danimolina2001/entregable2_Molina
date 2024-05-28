document.addEventListener('DOMContentLoaded', () => {
  // Definir los productos
  const productos = [
      {
        id: 1,
        nombre: 'Taza ondas',
        imagen: './assets/taza-mango.jpg',
        precio: 9000,
        descripcion: 'Taza con asa en forma de ondas irregulares. Varios colores',
      },
      {
        id: 2,
        nombre: 'Tacita natural',
        imagen: './assets/tacita.jpg',
        precio: 6000,
        descripcion: 'Tacita de 200ml color natural.',
        stock: 20,
      },
      {
        id: 3,
        nombre: 'Plato corazon',
        imagen: './assets/plato-corazon.jpg',
        precio: 10000,
        descripcion: 'Plato mediano con forma de corazon',
      },
      {
        id: 4,
        nombre: 'Cuchara corazon',
        imagen: './assets/cuchara-corazon.jpg',
        precio: 7000,
        descripcion: 'Cuchara con detalle de corazoncito color berenjena',
        stock: 30,
      },
      {
        id: 5,
        nombre: 'Taza personalizada',
        imagen: './assets/taza-michis.jpg',
        precio: 13000,
        descripcion: 'Taza personalizada con tu amigo animal!💘',
        stock: 5,
      },
      {
        id: 6,
        nombre: 'Cazuela',
        imagen: './assets/cazuela.jpg',
        precio: 10000,
        descripcion: 'Cazuela colores varios disponibles, tamaño mediano.',
        stock: 15,
      }
  ];

  let carrito = [];

  const contenedorProductos = document.getElementById('produjs');
  const inputSearch = document.getElementById('inputSearch');
  const viewCartBtn = document.getElementById('viewCart');
  const cartModal = document.getElementById('cartModal');
  const cartItems = document.getElementById('cartItems');
  const totalAmount = document.getElementById('totalAmount');
  const checkoutBtn = document.getElementById('checkout');

  const loginBtn = document.getElementById('loginBtn');
  const loginModal = document.getElementById('loginModal');
  const registerModal = document.getElementById('registerModal');
  const registerLink = document.getElementById('registerLink');

  // Crear y agregar elementos para cada producto
  productos.forEach(producto => {
      const productElement = document.createElement('div');
      productElement.classList.add('product-card');
      productElement.innerHTML = `
          <img src="${producto.imagen}" alt="${producto.nombre}">
          <h3>${producto.nombre}</h3>
          <h4>${producto.descripcion}</h4>
          <p>$${producto.precio}</p>
          <button class="btn-add-cart" data-id="${producto.id}">Agregar al Carrito</button>
      `;
      contenedorProductos.appendChild(productElement);
  });

  // Manejo de búsqueda de productos
  inputSearch.addEventListener('input', function () {
      const query = this.value.toLowerCase();
      const productCards = document.querySelectorAll('.product-card');
      productCards.forEach(card => {
          const productName = card.querySelector('h3').textContent.toLowerCase();
          if (productName.includes(query)) {
              card.style.display = '';
          } else {
              card.style.display = 'none';
          }
      });
  });

  // Agregar productos al carrito
  contenedorProductos.addEventListener('click', function (e) {
      if (e.target.classList.contains('btn-add-cart')) {
          const productId = parseInt(e.target.dataset.id);
          const product = productos.find(p => p.id === productId);
          carrito.push(product);
          actualizarCarrito();
      }
  });

  // Ver el carrito
  viewCartBtn.addEventListener('click', function () {
      mostrarCarrito();
      cartModal.style.display = 'block';
  });

  // Cerrar modales
  document.querySelectorAll('.modal .close').forEach(closeBtn => {
      closeBtn.addEventListener('click', function () {
          closeBtn.parentElement.parentElement.style.display = 'none';
      });
  });

  // Mostrar carrito
  function mostrarCarrito() {
      cartItems.innerHTML = '';
      carrito.forEach((item, index) => {
          const cartItem = document.createElement('div');
          cartItem.classList.add('cart-item');
          cartItem.innerHTML = `
              <img src="${item.imagen}" alt="${item.nombre}">
              <div>
                  <h4>${item.nombre}</h4>
                  <p>$${item.precio}</p>
                  <button class="btn-remove-cart" data-index="${index}">Eliminar</button>
              </div>
          `;
          cartItems.appendChild(cartItem);
      });
      totalAmount.textContent = carrito.reduce((total, item) => total + item.precio, 0);
  }

  // Eliminar producto del carrito
  cartItems.addEventListener('click', function (e) {
      if (e.target.classList.contains('btn-remove-cart')) {
          const index = parseInt(e.target.dataset.index);
          carrito.splice(index, 1);
          mostrarCarrito();
          actualizarCarrito();
      }
  });

  // Actualizar carrito (icono de cantidad)
  function actualizarCarrito() {
      document.querySelector('.numerito').textContent = carrito.length;
  }

  // Manejo de inicio de sesión
  loginBtn.addEventListener('click', function () {
      loginModal.style.display = 'block';
  });

  document.getElementById('loginForm').addEventListener('submit', function (e) {
      e.preventDefault();
      // Aquí se manejaría la lógica de autenticación
      alert('Inicio de sesión exitoso');
      loginModal.style.display = 'none';
  });

  registerLink.addEventListener('click', function () {
      loginModal.style.display = 'none';
      registerModal.style.display = 'block';
  });

  document.getElementById('registerForm').addEventListener('submit', function (e) {
      e.preventDefault();
      // Aquí se manejaría la lógica de registro
      alert('Registro exitoso');
      registerModal.style.display = 'none';
  });

  // Manejo de checkout
  checkoutBtn.addEventListener('click', function () {
      alert('Gracias por tu compra');
      carrito = [];
      mostrarCarrito();
      actualizarCarrito();
      cartModal.style.display = 'none';
  });

  // Cerrar el modal al hacer clic fuera de él
  window.addEventListener('click', function (event) {
      if (event.target === cartModal) {
          cartModal.style.display = 'none';
      }
      if (event.target === loginModal) {
          loginModal.style.display = 'none';
      }
      if (event.target === registerModal) {
          registerModal.style.display = 'none';
      }
  });
});
