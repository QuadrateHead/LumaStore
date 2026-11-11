import { z } from 'zod'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

const productListResponseSchema = z.object({
  products: z.array(
    z.object({
      id: z.string(),
      slug: z.string(),
      title: z.string(),
      brand: z.string().nullable(),
      price: z.union([z.number(), z.string()]).transform(Number).pipe(z.number().finite()),
      rating: z.union([z.number(), z.string()]).transform(Number).pipe(z.number().finite()),
      reviewCount: z.number().int().nonnegative(),
    }),
  ),
  pagination: z.object({
    page: z.number().int().positive(),
    limit: z.number().int().positive(),
    total: z.number().int().nonnegative(),
    pageCount: z.number().int().nonnegative(),
    hasNextPage: z.boolean(),
  }),
})

export type ProductListResponse = z.infer<typeof productListResponseSchema>
export type ApiProduct = ProductListResponse['products'][number]

export async function fetchAllProducts(
  page: number,
  limit = 20,
): Promise<ProductListResponse> {
  if (!API_BASE_URL) {
    throw new Error('NEXT_PUBLIC_API_URL is not configured')
  }

  const url = new URL('/api/products/', API_BASE_URL)
  url.searchParams.set('skip', String((page - 1) * limit))
  url.searchParams.set('limit', String(limit))

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Could not fetch products (${response.status})`)
  }

  const payload: unknown = await response.json()
  const parsedPayload = productListResponseSchema.safeParse(payload)

  if (!parsedPayload.success) {
    throw new Error('The products API returned an invalid response')
  }

  return parsedPayload.data
}