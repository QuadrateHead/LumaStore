import type { NextFunction, Request, Response } from "express";
import { prisma } from "../lib/db.ts";
import { productListQuerySchema } from "../schemas/queries.schema.ts";

export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const parsedQuery = productListQuerySchema.safeParse(req.query);
    if (!parsedQuery.success) {
      res.status(400).json({ error: "Invalid pagination parameters" });
      return;
    }
    const { skip, limit } = parsedQuery.data;

    const where = { isActive: true };
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.product.count({ where }),
    ]);

    res.json({
      products,
      pagination: {
        page: Math.floor(skip / limit) + 1,
        limit,
        total,
        pageCount: Math.ceil(total / limit),
        hasNextPage: skip + products.length < total,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const slug = req.params.slug;
    if (typeof slug !== "string" || slug.length === 0) {
      res.status(400).json({ error: "Invalid product slug" });
      return;
    }
    const product = await prisma.product.findUnique({
      where: { slug: slug },
    });
    if (!product || !product.isActive) {
      res.status(404).json({ error: "Product not found" });
      return;
    }
    res.json({ product });
  } catch (error) {
    next(error);
  }
};
