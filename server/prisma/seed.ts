import { Pool } from "pg";
import { DATABASE_URL } from "../config/env.ts";

type CategoryRow = { id: number };
type ProductRow = { id: string };

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL must be set before seeding the database.");
}

const pool = new Pool({ connectionString: DATABASE_URL });

async function seed(): Promise<void> {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const categories = new Map<string, number>();
    for (const category of [
      {
        name: "Audio",
        slug: "seed-audio",
        description: "Headphones and other audio essentials.",
      },
      {
        name: "Accessories",
        slug: "seed-accessories",
        description: "Everyday accessories for your devices.",
      },
    ]) {
      const { rows } = await client.query<CategoryRow>(
        `INSERT INTO "Category" ("name", "slug", "description", "isActive", "createdAt", "updatedAt")
         VALUES ($1, $2, $3, TRUE, NOW(), NOW())
         ON CONFLICT ("slug") DO UPDATE SET "slug" = EXCLUDED."slug"
         RETURNING "id"`,
        [category.name, category.slug, category.description],
      );
      categories.set(category.slug, rows[0].id);
    }

    const products = [
      {
        id: "seed-product-wireless-headphones",
        slug: "seed-wireless-headphones",
        title: "Luma Wireless Headphones",
        description: "Over-ear wireless headphones for work and travel.",
        price: "129.00",
        brand: "Luma",
        categoryId: categories.get("seed-audio"),
        thumbnail: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
        sku: "SEED-LUMA-HEADPHONES-BLACK",
        variantId: "seed-variant-headphones-black",
        variantName: "Black",
        options: { color: "Black" },
        stock: 12,
      },
      {
        id: "seed-product-usb-c-hub",
        slug: "seed-usb-c-hub",
        title: "Luma USB-C Hub",
        description: "A compact multi-port USB-C hub for everyday setups.",
        price: "49.00",
        brand: "Luma",
        categoryId: categories.get("seed-accessories"),
        thumbnail: "https://images.unsplash.com/photo-1625842268584-8f3296236761",
        sku: "SEED-LUMA-USB-C-HUB",
        variantId: "seed-variant-usb-c-hub",
        variantName: "Standard",
        options: { finish: "Space Gray" },
        stock: 25,
      },
    ];

    for (const product of products) {
      if (product.categoryId === undefined) {
        throw new Error(`Seed category is missing for product "${product.slug}".`);
      }

      const { rows } = await client.query<ProductRow>(
        `INSERT INTO "Product"
           ("id", "slug", "title", "description", "price", "brand", "categoryId", "thumbnail", "isActive", "createdAt", "updatedAt")
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, TRUE, NOW(), NOW())
         ON CONFLICT ("slug") DO UPDATE SET "slug" = EXCLUDED."slug"
         RETURNING "id"`,
        [
          product.id,
          product.slug,
          product.title,
          product.description,
          product.price,
          product.brand,
          product.categoryId,
          product.thumbnail,
        ],
      );
      const productId = rows[0].id;

      await client.query(
        `INSERT INTO "ProductImage" ("url", "position", "altText", "productId")
         VALUES ($1, 0, $2, $3)
         ON CONFLICT ("productId", "position") DO NOTHING`,
        [product.thumbnail, product.title, productId],
      );

      await client.query(
        `INSERT INTO "ProductVariant"
           ("id", "productId", "sku", "name", "options", "stock", "isActive", "createdAt", "updatedAt")
         VALUES ($1, $2, $3, $4, $5::jsonb, $6, TRUE, NOW(), NOW())
         ON CONFLICT ("sku") DO NOTHING`,
        [
          product.variantId,
          productId,
          product.sku,
          product.variantName,
          JSON.stringify(product.options),
          product.stock,
        ],
      );
    }

    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

seed().catch((error: unknown) => {
  console.error("Database seed failed:", error);
  process.exitCode = 1;
});
