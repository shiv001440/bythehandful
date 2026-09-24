const fs = require('fs');

const productsContent = fs.readFileSync('src/lib/products.ts', 'utf8');

const regex = /id:\s*"([^"]+)",\s*name:\s*"([^"]+)",(?:\s*origin:\s*("([^"]+)"|`([^`]+)`),)?\s*price:\s*(\d+),\s*category:\s*"([^"]+)"/g;

let match;
const products = [];
while ((match = regex.exec(productsContent)) !== null) {
  const id = match[1];
  const name = match[2];
  let origin = '';
  if (match[4]) origin = match[4];
  if (match[5]) origin = match[5];
  const price = match[6];
  const category = match[7];
  products.push(`  ('${id}', '${name}', '${origin.replace(/'/g, "''")}', ${price}, '${category}')`);
}

let sql = `DELETE FROM public.products;\n\nINSERT INTO public.products (id, name, origin, price, category) VALUES\n`;
sql += products.join(',\n');
sql += `\nON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  origin = EXCLUDED.origin,
  price = EXCLUDED.price,
  category = EXCLUDED.category,
  updated_at = timezone('utc'::text, now());
`;

fs.writeFileSync('new_migration.sql', sql);
console.log(`Generated SQL for ${products.length} products`);
