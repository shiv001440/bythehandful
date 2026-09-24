import fs from 'fs';
import { AUTHORITATIVE_PRODUCTS } from './src/lib/products.ts';

const products = Object.values(AUTHORITATIVE_PRODUCTS);

const lines = products.map(p => {
  const origin = p.origin ? p.origin.replace(/'/g, "''") : '';
  return `  ('${p.id}', '${p.name.replace(/'/g, "''")}', '${origin}', ${p.price}, '${p.category}')`;
});

let sql = `DELETE FROM public.products;\n\nINSERT INTO public.products (id, name, origin, price, category) VALUES\n`;
sql += lines.join(',\n');
sql += `\nON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  origin = EXCLUDED.origin,
  price = EXCLUDED.price,
  category = EXCLUDED.category,
  updated_at = timezone('utc'::text, now());
`;

fs.writeFileSync('new_migration.sql', sql);
console.log(`Generated SQL for ${products.length} products`);
