const fs = require("fs");
let content = fs.readFileSync("src/routes/index.tsx", "utf8");

if (!content.includes("AUTHORITATIVE_PRODUCTS")) {
  content = content.replace(
    'import { useState } from "react";',
    'import { useState } from "react";\nimport { AUTHORITATIVE_PRODUCTS } from "@/lib/products";',
  );
}

const replaced = content.replace(
  /\{\s*id:\s*"([^"]+)",\s*name:\s*"([^"]+)",\s*(?:origin:\s*"([^"]+)",\s*)?price:\s*(\d+),/g,
  (match, id) => {
    return `{
    ...AUTHORITATIVE_PRODUCTS["${id}"],`;
  },
);

fs.writeFileSync("src/routes/index.tsx", replaced);
console.log("Refactored index.tsx successfully.");
