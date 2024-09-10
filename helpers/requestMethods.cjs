const chai = require("chai");
const chaihttp = require("chai-http");
chai.use(chaihttp);

const { groceryCredentials } = require("../helpers/helperGrocery.cjs");
const { authbody, baseurl } = groceryCredentials();

async function getStatus() {
  return chai.request(baseurl).get("/status");
}
async function getProducts() {
  return chai.request(baseurl).get("/products");
}
async function getSingleProduct() {
  return chai.request(baseurl).get("/products/" + prodId);
}
async function createCart() {
  return chai.request(baseurl).post("/carts");
}
async function getCart() {
  return chai.request(baseurl).get("/carts/" + cartId01);
}
async function addItemToCart() {
  const cartdata = { productId: prodId };
  return chai
    .request(baseurl)
    .post("/carts/" + cartId01 + "/items")
    .send(cartdata);
}
async function getCartItems() {
  return chai.request(baseurl).get("/carts/" + cartId01 + "/items");
}

async function updateCartItem() {
  const updatecart = { quantity: 1 };
  return chai
    .request(baseurl)
    .patch("/carts/" + cartId01 + "/items/" + itemId01)
    .send(updatecart);
}
async function replaceCartBody() {
  const replacecartbody = { productId: prodId, quantity: 2 };
  return chai
    .request(baseurl)
    .put("/carts/" + cartId01 + "/items/" + itemId01)
    .send(replacecartbody);
}

async function deleteCart() {
  return chai
    .request(baseurl)
    .delete("/carts/" + cartId01 + "/items/" + itemId01);
}

async function registerApiClient() {
  return chai.request(baseurl).post("/api-clients").send(authbody);
}

async function createOrder() {
  const createorderdata = {
    cartId: cartId01,
    customerName: "Bhuvana",
  };
  return chai
    .request(baseurl)
    .post("/orders")
    .send(createorderdata)
    .set("Authorization", accessToken01);
}

async function getOrder() {
  return chai
    .request(baseurl)
    .get("/orders")
    .set("Authorization", accessToken01);
}

async function updateorder() {
  const updateorderdata = {
    customerName: "Bhuvana",
    comment: "An example comment",
  };
  return chai
    .request(baseurl)
    .patch("/orders/" + orderId01)
    .send(updateorderdata)
    .set("Authorization", accessToken01);
}

async function getUpdateOrder() {
  return chai
    .request(baseurl)
    .get("/orders/" + orderId01)
    .set("Authorization", accessToken01);
}
async function deleteOrder() {
  return chai
    .request(baseurl)
    .delete("/orders/" + orderId01)
    .set("Authorization", accessToken01);
}
module.exports = {
  getStatus,
  getProducts,
  getSingleProduct,
  createCart,
  getCart,
  addItemToCart,
  getCartItems,
  updateCartItem,
  replaceCartBody,
  deleteCart,
  registerApiClient,
  createOrder,
  getOrder,
  updateorder,
  getUpdateOrder,
  deleteOrder,
};
