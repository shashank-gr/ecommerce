const openCart = document.querySelector(".open-cart");
const closeCart = document.querySelector(".close-cart");
const cart = document.querySelector(".cart");
const cartBody = document.querySelector(".cart-body ul");
const body = document.querySelector("body");

const showCart = () => {
  console.log("cliked");
  cart.style.visibility = "visible";
};
const hideCart = () => {
  cart.style.visibility = "hidden";
};

const addToCart = (e) => {
  if (e.target.tagName == "BUTTON") {
    const li = document.createElement("li");
    li.innerText = `item ${e.target.id} is added`;
    cartBody.insertAdjacentElement("beforeend", li);
    const toast = document.createElement("div");
    toast.innerText = "Product added to cart";
    toast.className = "toast";
    body.insertAdjacentElement("beforeend", toast);

    setTimeout(() => {
      toast.remove();
    }, 2000);
  }
};
openCart.addEventListener("click", showCart);
closeCart.addEventListener("click", hideCart);
