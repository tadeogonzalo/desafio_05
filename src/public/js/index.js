const socketClient = io();

document.addEventListener('DOMContentLoaded', function () {
    const socket = io.connect('http://localhost:8081');
  
   
    socketClient.on('newProduct', function (data) {
      console.log('Productos actualizados en tiempo real:', data.products);
      
     
      const productList = document.getElementById('product-list');
      productList.innerHTML = ''; 
  
      data.products.forEach(product => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
          <strong>${product.title}</strong>
          <p>${product.description}</p>
          <p>Precio: ${product.price}</p>
        `;
        productList.appendChild(listItem);
      });
    });
  });