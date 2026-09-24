const fs = require('fs');

const productsTsPath = './src/lib/products.ts';
const migrationPath = './supabase/migrations/20260913180000_add_menu_catalog_products.sql';

const productsTsContent = fs.readFileSync(productsTsPath, 'utf8');
const migrationContent = fs.readFileSync(migrationPath, 'utf8');

// Parse products.ts
const tsPrices = {};
const tsRegex = /id:\s*"([^"]+)"[\s\S]*?price:\s*(\d+)/g;
let match;
while ((match = tsRegex.exec(productsTsContent)) !== null) {
  tsPrices[match[1]] = parseInt(match[2], 10);
}

// Parse migration
const sqlPrices = {};
const sqlRegex = /\('([^']+)',\s*'[^']+',\s*'[^']+',\s*(\d+),\s*'[^']+'\)/g;
while ((match = sqlRegex.exec(migrationContent)) !== null) {
  sqlPrices[match[1]] = parseInt(match[2], 10);
}

console.log(`Found ${Object.keys(tsPrices).length} products in products.ts`);
console.log(`Found ${Object.keys(sqlPrices).length} products in migration (uncommented)`);

let mismatches = false;

// Check TS against SQL
for (const [id, price] of Object.entries(tsPrices)) {
  if (sqlPrices[id] === undefined) {
    console.log(`❌ Missing in migration: ${id}`);
    mismatches = true;
  } else if (sqlPrices[id] !== price) {
    console.log(`❌ Price mismatch for ${id}: TS=${price}, SQL=${sqlPrices[id]}`);
    mismatches = true;
  }
}

// Check SQL against TS
for (const [id, price] of Object.entries(sqlPrices)) {
  if (tsPrices[id] === undefined) {
    console.log(`❌ Missing in products.ts: ${id}`);
    mismatches = true;
  }
}

if (!mismatches) {
  console.log("✅ All prices match perfectly!");
}
