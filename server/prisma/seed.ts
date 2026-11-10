import { Pool, PoolClient } from "pg";
import { DATABASE_URL } from "../config/env.ts";

type CategoryRow = { id: number };
type ProductRow = { id: string };

type DummyJsonProduct = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand?: string | null;
  sku?: string | null;
  tags?: string[];
  thumbnail?: string | null;
  images?: string[];
  reviews?: Array<{ rating?: number }>;
};

const DUMMYJSON_PRODUCT_EXPORT = "https://dummyjson.com/products?limit=100";
const TECH_PRODUCT_CATEGORIES = new Set([
  "laptops",
  "smartphones",
  "tablets",
  "mobile-accessories",
  "mens-watches",
  "womens-watches",
]);
const DUMMYJSON_SCHEMA_GAPS = [
  "DummyJSON categories are plain strings, while the Prisma schema uses a separate Category row and categoryId FK.",
  "DummyJSON products do not include ProductVariant records, so this seed creates a single variant per product and stores the API tags in JSON options.",
  "DummyJSON review arrays are used to derive reviewCount; the DB stores an aggregate value rather than raw review objects.",
  "Only tech-oriented DummyJSON categories are imported to match the LumaStore catalog scope.",
  "User data is intentionally not imported yet; product seed is completed first as requested.",
];

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL must be set before seeding the database.");
}

const pool = new Pool({ connectionString: DATABASE_URL });

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "product";
}

function titleCase(input: string): string {
  return input
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ") || "Uncategorized";
}

async function fetchDummyJsonProducts(): Promise<DummyJsonProduct[]> {
  const response = await fetch(DUMMYJSON_PRODUCT_EXPORT, {
    headers: {
      Accept: "application/json",
      "User-Agent": "LumaStore/1.0",
    },
  });

  if (!response.ok) {
    throw new Error(`DummyJSON fetch failed with status ${response.status}.`);
  }

  const payload = (await response.json()) as { products?: DummyJsonProduct[] };
  if (!Array.isArray(payload.products) || payload.products.length === 0) {
    throw new Error("DummyJSON product response did not include any products.");
  }

  return payload.products.filter((product) => {
    const category = (product.category ?? "").trim().toLowerCase();
    return TECH_PRODUCT_CATEGORIES.has(category);
  });
}

async function setCategory(client: PoolClient, categoryName: string): Promise<number> {
  const normalizedName = categoryName.trim() || "Uncategorized";
  const slug = slugify(normalizedName);

  const { rows } = await client.query<CategoryRow>(
    `INSERT INTO "Category" ("name", "slug", "description", "isActive", "createdAt", "updatedAt")
     VALUES ($1, $2, $3, TRUE, NOW(), NOW())
     ON CONFLICT ("slug") DO UPDATE SET "name" = EXCLUDED."name"
     RETURNING "id"`,
    [titleCase(normalizedName), slug, `Products in the ${titleCase(normalizedName)} collection.`],
  );

  return rows[0].id;
}

function generateUniqueProductSlug(title: string, usedSlugs: Set<string>): string {
  const base = slugify(title);
  if (!usedSlugs.has(base)) {
    usedSlugs.add(base);
    return base;
  }

  let suffix = 2;
  let candidate = `${base}-${suffix}`;

  while (usedSlugs.has(candidate)) {
    suffix += 1;
    candidate = `${base}-${suffix}`;
  }

  usedSlugs.add(candidate);
  return candidate;
}

async function seedProductsFromDummyJson(client: PoolClient): Promise<void> {
  const products = await fetchDummyJsonProducts();
  const categoryIds = new Map<string, number>();
  const usedSlugs = new Set<string>();

  if (products.length === 0) {
    throw new Error("No DummyJSON products matched the LumaStore tech-only category filter.");
  }

  await client.query(`DELETE FROM "ProductImage";`);
  await client.query(`DELETE FROM "ProductVariant";`);
  await client.query(`DELETE FROM "Product";`);
  await client.query(`DELETE FROM "Category";`);

  const existingProductSlugs = await client.query<{ slug: string }>(`SELECT "slug" FROM "Product"`);
  existingProductSlugs.rows.forEach((row) => usedSlugs.add(row.slug));

  for (const product of products) {
    const categoryKey = slugify(product.category || "uncategorized");
    if (!categoryIds.has(categoryKey)) {
      categoryIds.set(categoryKey, await setCategory(client, product.category || "Uncategorized"));
    }
  }

  for (const product of products) {
    const categoryKey = slugify(product.category || "uncategorized");
    const categoryId = categoryIds.get(categoryKey);

    if (categoryId === undefined) {
      throw new Error(`Category mapping missing for product: ${product.title}`);
    }

    const slug = generateUniqueProductSlug(product.title, usedSlugs);
    const productId = `dummyjson-product-${product.id}`;
    const imageUrls = Array.isArray(product.images) && product.images.length > 0 ? product.images : [product.thumbnail ?? ""];
    const reviewCount = Array.isArray(product.reviews) ? product.reviews.length : 0;
    const variantOptions = product.tags && product.tags.length > 0 ? { tags: product.tags } : {};

    const { rows } = await client.query<ProductRow>(
      `INSERT INTO "Product"
         ("id", "slug", "title", "description", "price", "discountPercentage", "rating", "reviewCount", "brand", "categoryId", "thumbnail", "isActive", "createdAt", "updatedAt")
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, TRUE, NOW(), NOW())
       ON CONFLICT ("title") DO UPDATE SET
         "slug" = EXCLUDED."slug",
         "description" = EXCLUDED."description",
         "price" = EXCLUDED."price",
         "discountPercentage" = EXCLUDED."discountPercentage",
         "rating" = EXCLUDED."rating",
         "reviewCount" = EXCLUDED."reviewCount",
         "brand" = EXCLUDED."brand",
         "categoryId" = EXCLUDED."categoryId",
         "thumbnail" = EXCLUDED."thumbnail",
         "updatedAt" = NOW()
       RETURNING "id"`,
      [
        productId,
        slug,
        product.title,
        product.description,
        product.price.toFixed(2),
        product.discountPercentage.toFixed(2),
        product.rating.toFixed(2),
        reviewCount,
        product.brand ?? null,
        categoryId,
        product.thumbnail ?? imageUrls[0] ?? "",
      ],
    );

    const importedProductId = rows[0].id;

    for (const [position, imageUrl] of imageUrls.entries()) {
      if (!imageUrl) {
        continue;
      }

      await client.query(
        `INSERT INTO "ProductImage" ("url", "position", "altText", "productId")
         VALUES ($1, $2, $3, $4)
         ON CONFLICT ("productId", "position") DO NOTHING`,
        [imageUrl, position, `${product.title} image ${position + 1}`, importedProductId],
      );
    }

    const variantId = `dummyjson-variant-${product.id}`;
    const variantSku = product.sku || `${slug}-default`;

    await client.query(
      `INSERT INTO "ProductVariant"
         ("id", "productId", "sku", "name", "options", "stock", "isActive", "createdAt", "updatedAt")
       VALUES ($1, $2, $3, $4, $5::jsonb, $6, TRUE, NOW(), NOW())
       ON CONFLICT ("sku") DO UPDATE SET
         "productId" = EXCLUDED."productId",
         "name" = EXCLUDED."name",
         "options" = EXCLUDED."options",
         "stock" = EXCLUDED."stock",
         "updatedAt" = NOW()
       RETURNING "id"`,
      [
        variantId,
        importedProductId,
        variantSku,
        product.title,
        JSON.stringify(variantOptions),
        product.stock ?? 0,
      ],
    );
  }
}

async function seed(): Promise<void> {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    console.log("Importing DummyJSON product catalog into the Prisma/PostgreSQL schema.");
    console.log("Schema gaps checked against the DB model:");
    DUMMYJSON_SCHEMA_GAPS.forEach((gap) => console.log(`- ${gap}`));

    await seedProductsFromDummyJson(client);
    await client.query("COMMIT");

    console.log("DummyJSON product import complete.");
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
