import { AUTHORITATIVE_PRODUCTS } from "./src/lib/products";
import * as fs from "fs";

const catalogPath = "./src/lib/catalog.ts";
const content = fs.readFileSync(catalogPath, "utf8");

const regex = /AUTHORITATIVE_PRODUCTS\["([^"]+)"\]/g;
let match;
const missing = [];

while ((match = regex.exec(content)) !== null) {
  const key = match[1];
  if (!AUTHORITATIVE_PRODUCTS[key]) {
    missing.push(key);
  }
}

console.log("Missing keys:", missing);
