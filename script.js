document.addEventListener('DOMContentLoaded', function () {
    const navbarUser = document.getElementById('navbar-user');
    const menuButton = document.querySelector('[data-collapse-toggle="navbar-user"]');

    menuButton.addEventListener('click', function () {
      navbarUser.classList.toggle('hidden');
    });
  });

const cartContainer = document.getElementById('cart-container');
const productsContainer = document.getElementById('products-container');
const productCard = document.getElementById('product-card-container');
const cartBtn = document.getElementById('cart-btn');
const clearCartBtn = document.getElementById('clear-cart-btn');
const totalNumberOfItems = document.getElementById('total-items');
const cartTaxes = document.getElementById('taxes');
const cartTotal = document.getElementById('total');
const showHideCart = document.getElementById('show-hide-cart');
let isCartShowing = false;

const products = [
  {
    id: 1,
    Image: './img/ecommerce-image.png',
    itemName: 'Velvet 3 PC',
    itemColor: 'Green',
    itemPrice: 12,
  },
  {
    id: 2,
    Image: './img/ecommerce-image02.png',
    itemName: 'Velvet 3 PC',
    itemColor: 'Black',
    itemPrice: 23,
  },
  {
    id: 3,
    Image: 'img/ecommerce-image03.png',
    itemName: 'Satin 2 PC',
    itemColor: 'Black',
    itemPrice: 35,
  },
  {
    id: 4,
    Image: 'img/ecommerce-image04.png',
    itemName: 'Satin set',
    itemColor: 'Red',
    itemPrice: 12.5,
  }
]

products.forEach(({id, itemName, Image, itemColor, itemPrice}) => {
  productCard.innerHTML += `
  <div>
    <div class=" w-full overflow-hidden rounded-md bg-gray-200 lg:h-80">
      <img src="${Image}" alt="${itemName}" class="h-full w-full object-cover object-center mr-4">
    </div>
    <div class="mt-4 flex justify-between">
      <div>
        <h3 class="text-sm text-gray-700">
          ${itemName}
        </h3>
        <p class="mt-1 text-sm text-gray-500">
          ${itemColor}
        </p>
      </div>
      <p class="text-sm font-medium text-gray-900">
        ${itemPrice}
      </p>
    </div>
    <button id="${id}" class="add-to-cart-btn mt-4 flex w-full items-center justify-center rounded-md border border-transparent bg-gray-900 py-2 text-sm font-medium text-white uppercase">add to bag</button>
  </div>
  `;
});

class ShoppingCart {
  constructor() {
    this.items = [];
    this.total = 0;
  }

  addItem (id, products) {
    const product = products.find(
      (item) => item.id === id
    );
    const { itemName, Image, itemPrice } = product;
    this.items.push(product);

    const totalCountPerProduct = {};

    this.items.forEach((card) => {
      totalCountPerProduct[card.id] = (totalCountPerProduct[card.id] || 0) + 1;
    })
    

    const currentProductCount = totalCountPerProduct[product.id];

    const currentProductCountSpan = document.getElementById(`product-count-for-id${id}`);

    if (currentProductCount > 1) {
    currentProductCountSpan.textContent = `${currentProductCount}x ${product.itemName}`;
    } else {
    productsContainer.innerHTML += `
    <div id=card${id}>
      <div class="border-b divide-gray-200 mb-4">
        <div class="flex space-x-3">
          <div class=''>
            <img src='${Image}' alt='${itemName}' class='w-24 pb-4'/>
          </div>
          <div class="">
            <h2 id=product-count-for-id${id}>${itemName}</h2>
            <p>${itemPrice}</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

  }

  getCounts () {
    return this.items.length;
  }

  calculateTotal () {
    this.total = this.items.reduce((total, item) => total + item.itemPrice, 0);
    cartTotal.textContent = `$${this.total.toFixed(2)}`;
    return this.total
  }

  clearCart () {
    if (!this.items.length) {
      alert("Your shopping cart is empty");
      return;
    }

    const isCartCleared = confirm(
      "Are you sure you want to clear all items from your shopping cart?"
    );

    if (isCartCleared) {
      this.items = [];
      this.total = 0;
      productsContainer.innerHTML = "";
      totalNumberOfItems.textContent = 0;
      cartTotal.textContent = 0;
    }
  }
};


const cart = new ShoppingCart();
const addToCartBtns = document.getElementsByClassName('add-to-cart-btn');

[...addToCartBtns].forEach((btn) => {
    btn.addEventListener("click", (event) => {
      cart.addItem(Number(event.target.id), products);
      totalNumberOfItems.textContent = cart.getCounts();
      cart.calculateTotal()
    })
})
cartBtn.addEventListener('click', () => {
  isCartShowing = !isCartShowing;
  cartContainer.style.display = isCartShowing ? "block" : "none";
})
clearCartBtn.addEventListener('click', cart.clearCart.bind(cart));