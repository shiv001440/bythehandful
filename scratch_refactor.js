const fs = require("fs");
let content = fs.readFileSync("src/routes/index.tsx", "utf8");

let matchCount = 0;
const replaced = content.replace(
  /\{\s*id:\s*"([^"]+)",\s*name:\s*"([^"]+)",\s*(?:origin:\s*"([^"]+)",\s*)?price:\s*(\d+),/g,
  (match, id, name, origin, price) => {
    matchCount++;
    return `{
    ...AUTHORITATIVE_PRODUCTS["${id}"],`;
  },
);

console.log("Matches found:", matchCount);
