const fs = require('fs');

let content = fs.readFileSync('src/lib/catalog.ts', 'utf8');

// Replace spread: ...AUTHORITATIVE_PRODUCTS["X-250g"] -> ...AUTHORITATIVE_PRODUCTS["X"]
content = content.replace(/\.\.\.AUTHORITATIVE_PRODUCTS\["([^"]+?)-(250g|500g)"\]/g, '...(AUTHORITATIVE_PRODUCTS["$1"] || { id: "$1", name: "$1", price: 0 })');

// Replace price: AUTHORITATIVE_PRODUCTS["X-250g"].price -> (AUTHORITATIVE_PRODUCTS["X"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["X"].price / 4) : 0)
// For 500g -> / 2
content = content.replace(/AUTHORITATIVE_PRODUCTS\["([^"]+?)-250g"\]\.price/g, '(AUTHORITATIVE_PRODUCTS["$1"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["$1"].price / 4) : 0)');
content = content.replace(/AUTHORITATIVE_PRODUCTS\["([^"]+?)-500g"\]\.price/g, '(AUTHORITATIVE_PRODUCTS["$1"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["$1"].price / 2) : 0)');

// Also handle any remaining occurrences without .price
content = content.replace(/AUTHORITATIVE_PRODUCTS\["([^"]+?)-(250g|500g)"\]/g, '(AUTHORITATIVE_PRODUCTS["$1"] || { id: "$1", name: "$1", price: 0 })');

fs.writeFileSync('src/lib/catalog.ts', content, 'utf8');
console.log('Fixed catalog.ts');
