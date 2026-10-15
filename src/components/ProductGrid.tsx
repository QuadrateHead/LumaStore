import { ProductCard } from '../elements'
import type { ProductCardProps } from '../elements'

type ProductGridProps = {
  products: readonly ProductCardProps[]
  imageHeight: number
  className?: string
}

export function ProductGrid({
  products,
  imageHeight,
  className = 'grid grid-cols-3 gap-5 max-[860px]:grid-cols-2',
}: ProductGridProps) {
  return (
    <div className={className}>
      {products.map((product) => (
        <ProductCard key={product.name} {...product} imageHeight={imageHeight} />
      ))}
    </div>
  )
}
