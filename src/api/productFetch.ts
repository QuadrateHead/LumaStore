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
})

export type ApiProduct = z.infer<typeof productListResponseSchema>['products'][number]

export async function fetchAllProducts(): Promise<ApiProduct[]> {
  if (!API_BASE_URL) {
    throw new Error('NEXT_PUBLIC_API_URL is not configured')
  }

  const response = await fetch(`${API_BASE_URL}/api/products/`)

  if (!response.ok) {
    throw new Error(`Could not fetch products (${response.status})`)
  }

  const payload: unknown = await response.json()
  const parsedPayload = productListResponseSchema.safeParse(payload)

  if (!parsedPayload.success) {
    throw new Error('The products API returned an invalid response')
  }

  return parsedPayload.data.products
}