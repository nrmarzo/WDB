"use strict";

const NUMPRODUCTS = 10;

let faker = require("faker");

let product = faker.commerce.productName;
let price = faker.commerce.price;

console.log("=====================");
console.log("WELCOME TO MY SHOP!");
console.log("=====================");

for (let i = 0; i < NUMPRODUCTS; i++) {
  console.log(product() + " - $" + price());
}
