const displayOrder = (id, products) => {
  const div = document.createElement("div");
  const main = document.querySelector("main");
  let text = `<div><strong>Order ID:</strong> ${id}</div>`;
  for (const product of products) {
    text =
      text +
      `<div><strong>Item:</strong> ${product.title} <strong>Quantity:</strong> ${product.orderItem.quantity}<div>`;
  }
  div.innerHTML = text;
  div.className = "order";
  main.insertAdjacentElement("beforeend", div);
};

const getEachOrder = (orders) => {
  for (const order of orders) {
    const id = order.id;
    const products = order.products;
    // console.log(id);
    // console.log(products);
    displayOrder(id, products);
  }
};

const getOrders = async () => {
  try {
    const orders = await axios.get("http://localhost:3000/orders");
    // document.querySelector("main").textContent = orders;
    console.log(orders);
    if (orders.status == 201) {
      console.log(orders.data.msg);
    } else {
      getEachOrder(orders.data);
    }
  } catch (err) {
    console.log(err);
  }
};

document.addEventListener("DOMContentLoaded", getOrders);
