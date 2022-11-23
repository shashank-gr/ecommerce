const openCart = document.querySelector(".open-cart");
const closeCart = document.querySelector(".close-cart");
const cart = document.querySelector(".cart-container");
const cartBody = document.querySelector(".cart-body ul");
const body = document.querySelector("body");

const findTotal = () => {
  const cartItems = document.querySelectorAll(".cart-item");
  let total = 0;
  for (let i = 0; i < cartItems.length; i++) {
    const price = cartItems[i].querySelector(".item-price").textContent;
    const quantity =
      cartItems[i].querySelector(".item-quantity").children[0].value;
    total = total + price * quantity;
  }
  document.querySelector(".cart-total").textContent = `Total ($) : ${total}`;
};

const updateTotal = (e) => {
  const quantity = document.querySelectorAll(".quantity");
  for (let i = 0; i < quantity.length; i++) {
    if (quantity[i].value <= 0) {
      quantity[i].value = 1;
    }
  }
  findTotal();
};

const showCart = () => {
  // console.log("cliked");
  const cartBackground = document.querySelector(".cart");
  // cartBackground.style.visibility = "visible";
  findTotal();
  cart.style.visibility = "visible";
};
const hideCart = () => {
  const cartBackground = document.querySelector(".cart");
  // cartBackground.style.visibility = "hidden";
  cart.style.visibility = "hidden";
};
const deleteCartItem = (e) => {
  e.preventDefault();
  if (e.target.className == "delete-item") {
    e.target.parentElement.parentElement.parentElement.remove();
    findTotal();
    createToast("Item deleted from Cart");
  }
};
const createToast = (msg) => {
  const toast = document.createElement("div");
  toast.innerText = msg;
  toast.className = "toast";
  body.insertAdjacentElement("beforeend", toast);

  setTimeout(() => {
    toast.remove();
  }, 2000);
};

const checkIfItemExistsInCart = (itemName) => {
  const cartItems = document.querySelectorAll(".cart-item");
  for (let i = 0; i < cartItems.length; i++) {
    const name = cartItems[i].querySelector(".item-name").textContent;
    if (name == itemName) {
      return true;
    }
  }
  return false;
};

const addToCart = async (e) => {
  if (e.target.tagName == "BUTTON") {
    const parent = e.target.parentElement.parentElement;
    const itemName = parent.querySelector(".img-heading").textContent;
    const itemPrice = parent
      .querySelector(".img-price")
      .textContent.replace("$", "");
    const itemQuantity = 1;
    const productId = e.target.id;
    // console.log(productId);

    //make a post request;
    try {
      const response = await axios.post("http://localhost:3000/cart", {
        productId,
      });
      console.log(response.data.msg);
    } catch (err) {
      console.log(response.data.msg);
    }

    // check if it is in the cart
    const itemExists = checkIfItemExistsInCart(itemName);
    if (itemExists) {
      return createToast("Product already present in the cart");
    } else {
      const itemRow = document.createElement("div");
      itemRow.innerHTML = `<li class="item-name">${itemName}</li>
    <li class="item-price">${itemPrice}</li>
    <li class="item-quantity">
      <input type="number" class="quantity" value="1" />
      <span><button class="delete-item">✕</button></span>
    </li>`;
      itemRow.className = "cart-item";

      const cartTable = document.querySelector(".cart-items");
      cartTable.insertAdjacentElement("beforeend", itemRow);

      //creating toast message
      createToast("Product added to Cart");
      //calculate total after adding new element
      findTotal();
    }
  }
};
const displayProduct = ({ id, title, imageUrl, price }) => {
  // console.log(id, title, imageUrl, price);
  const imgContainer = document.querySelector(".img-container.music");
  // console.log(imgContainer);
  const img = document.createElement("div");
  img.className = "img";
  img.innerHTML = ` <h3 class="img-heading">${title}</h3>
  <img
    src=${imageUrl}
    alt="product image"
  />
  <div class="img-action">
    <p class="img-price">$${price}</p>
    <button id="${id}">Add to Cart</button>
  </div>`;
  imgContainer.insertAdjacentElement("beforeend", img);
};

const getProducts = async () => {
  try {
    const response = await axios.get("http://localhost:3000/products");
    const products = response.data.products;
    products.forEach((product) => {
      displayProduct(product);
    });
  } catch (err) {
    console.log(err);
  }
};
openCart.addEventListener("click", showCart);
closeCart.addEventListener("click", hideCart);
document.addEventListener("DOMContentLoaded", getProducts);
