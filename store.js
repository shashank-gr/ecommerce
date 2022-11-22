const openCart = document.querySelector(".open-cart");
const closeCart = document.querySelector(".close-cart");
const cart = document.querySelector(".cart");
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
  console.log("cliked");
  cart.style.visibility = "visible";
};
const hideCart = () => {
  cart.style.visibility = "hidden";
};

const addToCart = (e) => {
  if (e.target.tagName == "BUTTON") {
    const parent = e.target.parentElement.parentElement;
    const itemName = parent.querySelector(".img-heading").textContent;
    const itemPrice = parent
      .querySelector(".img-price")
      .textContent.replace("$", "");
    const itemQuantity = 1;

    const itemRow = document.createElement("div");
    itemRow.innerHTML = `<li class="item-name">${itemName}</li>
    <li class="item-price">${itemPrice}</li>
    <li class="item-quantity">
      <input type="number" class="quantity" value="1" />
    </li>`;
    itemRow.className = "cart-item";

    const cartTable = document.querySelector(".cart-items");
    cartTable.insertAdjacentElement("beforeend", itemRow);

    //creating toast message
    const toast = document.createElement("div");
    toast.innerText = "Product added to cart";
    toast.className = "toast";
    body.insertAdjacentElement("beforeend", toast);

    setTimeout(() => {
      toast.remove();
    }, 2000);
  }
  //calculate total after adding new element
  findTotal();
};
openCart.addEventListener("click", showCart);
closeCart.addEventListener("click", hideCart);
