const chai = require("chai");
const chaihttp = require("chai-http");
chai.use(chaihttp);
chai.should();

const { getStatusCodes } = require("../helpers/helperGrocery.cjs");
const { delay } = require("../helpers/helperGrocery.cjs");
const statusCodes = getStatusCodes();
const {
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
} = require("../helpers/requestMethods.cjs");

describe("Grocery Store APIs", () => {
  it("Should successfully get the status", async () => {
    const res = await getStatus();
    res.should.have.status(statusCodes.OK);
    res.body.should.have.property("status");
  });

  it("Should successfully get the products", async () => {
    const res = await getProducts();
    res.should.have.status(statusCodes.OK);
    const product = res.body[0];
    const expectedProps = ["id", "category", "name", "inStock"];
    for (const prop of expectedProps) {
      product.should.have.property(prop);
    }
    product.should.have.property("id").that.is.a("number");
    product.should.have.property("category").that.is.a("string");
    product.should.have.property("name").that.is.a("string");
    product.should.have.property("inStock").that.is.a("boolean");

    prodId = product.id;

    //Should successfully get single product
    await delay(1000);
    const res01 = await getSingleProduct(prodId);
    res01.should.have.status(statusCodes.OK);
    const product01 = res01.body;
    const expectedProps01 = [
      "id",
      "category",
      "name",
      "manufacturer",
      "price",
      "current-stock",
      "inStock",
    ];

    // product01.should.have.all.keys(expectedProps01);
    for (const prop of expectedProps01) {
      product01.should.have.property(prop);
    }
    product01.should.have.property("id").that.is.a("number");
    product01.should.have.property("category").that.is.a("string");
    product01.should.have.property("name").that.is.a("string");
    product01.should.have.property("inStock").that.is.a("boolean");
    product01.should.have.property("manufacturer").that.is.eql("Starbucks");
    product01.should.have.property("price").that.is.a("number");
    product01.should.have.property("current-stock").that.is.a("number");
  });

  it("Should successfully create a cart", async () => {
    await delay(500);
    const postres = await createCart();
    postres.should.have.status(statusCodes.CREATED);
    const expectedProps = ["created", "cartId"];
    for (const prop of expectedProps) {
      postres.body.should.have.property(prop);
    }
    postres.body.should.have
      .property("created")
      .that.is.a("boolean")
      .to.be.eql(true);
    postres.body.should.have.property("cartId").to.be.a("string");
    cartId01 = postres.body.cartId;

    //Should successfully get a cart
    await delay(1000);
    const getres = await getCart();
    getres.should.have.status(statusCodes.OK);
    const expectedProps01 = ["items", "created"];
    for (const prop of expectedProps01) {
      getres.body.should.have.property(prop);
    }

    getres.body.should.have.property("items").to.be.an("array");
    getres.body.should.have.property("created");

    // //Should successfully add items to cart
    await delay(1000);
    const cartres = await addItemToCart();
    cartres.should.have.status(statusCodes.CREATED);
    const expectedProps02 = ["created", "itemId"];
    for (const prop of expectedProps02) {
      cartres.body.should.have.property(prop);
    }
    cartres.body.should.have
      .property("created")
      .to.be.a("boolean")
      .to.be.eql(true);
    cartres.body.should.have.property("itemId").to.be.an("number");
    itemId01 = cartres.body.itemId;

    //Should successfully get a cart items
    await delay(500);
    const getCartRes = await getCartItems();
    getCartRes.should.have.status(statusCodes.OK);
    const expectedProps03 = ["id", "productId", "quantity"];
    for (const prop of expectedProps03) {
      getCartRes.body[0].should.have.property(prop);
    }
    getCartRes.body[0].should.have.property("id").to.be.an("number");
    getCartRes.body[0].should.have.property("productId").to.be.an("number");
    getCartRes.body[0].should.have.property("quantity").to.be.a("number");
  });

  it("Should successfully modify item in cart", async () => {
    await delay(500);
    const patchres = await updateCartItem();
    patchres.should.have.status(statusCodes.NO_CONTENT);

    // Should successfully replace item in cart
    const repres = await replaceCartBody();
    repres.should.have.status(statusCodes.NO_CONTENT);
  });

  it("Should successfully delete item in cart", async () => {
    await delay(500);
    const deleteres = await deleteCart();
    deleteres.should.have.status(statusCodes.NO_CONTENT);
  });

  it("Should successfully register new client and get the orders", async () => {
    await delay(500);
    //add item to cart
    const cartres = await addItemToCart();
    cartres.should.have.status(statusCodes.CREATED);
    const expectedProps04 = ["created", "itemId"];
    for (const prop of expectedProps04) {
      cartres.body.should.have.property(prop);
    }
    cartres.body.should.have
      .property("created")
      .to.be.a("boolean")
      .to.be.eql(true);
    cartres.body.should.have.property("itemId").to.be.an("number");
    itemId01 = cartres.body.itemId;

    // register new API client
    await delay(500);
    const apiRes = await registerApiClient();
    apiRes.should.have.status(statusCodes.CREATED);
    const expectedProps05 = ["accessToken"];
    for (const prop of expectedProps05) {
      apiRes.body.should.have.property(prop);
    }
    accesstoken = apiRes.body.accessToken;
    accessToken01 = "Bearer " + accesstoken;

    //Should successfully create a order
    await delay(500);
    const orderRes = await createOrder();
    orderRes.should.have.status(statusCodes.CREATED);
    const expectedProps06 = ["created", "orderId"];
    for (const prop of expectedProps06) {
      orderRes.body.should.have.property(prop);
    }
    orderRes.body.should.have.property("created");
    orderRes.body.should.have.property("orderId");

    orderId01 = orderRes.body.orderId;

    // should get all the orders
    await delay(500);
    const getRes = await getOrder();
    getRes.should.have.status(statusCodes.OK);
    const expectedProps07 = [
      "id",
      "items",
      "customerName",
      "created",
      "comment",
    ];

    for (const props of expectedProps07) {
      getRes.body[0].should.have.property(props);
    }
    getRes.body[0].items.forEach((item) => {
      item.should.have.property("id");
      item.should.have.property("productId");
      item.should.have.property("quantity");
    });

    //Should successfully update a order
    await delay(500);
    const updateres = await updateorder();
    updateres.should.have.status(statusCodes.NO_CONTENT);

    // //Should successfully get updated a order
    await delay(500);
    const getupdateres = await getUpdateOrder();
    getupdateres.should.have.status(statusCodes.OK);
    const expectedProps08 = ["id", "items", "customerName"];
    for (const props of expectedProps08) {
      getupdateres.body.should.have.property(props);
    }
    getupdateres.body.customerName.should.be.eql("Bhuvana");

    getupdateres.body.items.forEach((item) => {
      item.should.have.property("id");
      item.should.have.property("productId");
      item.should.have.property("quantity");
    });

    //Should successfully delete the order
    await delay(500);
    const deleteres = await deleteOrder();
    deleteres.should.have.status(statusCodes.NO_CONTENT);
  });
});
