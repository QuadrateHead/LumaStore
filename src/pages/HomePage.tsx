import {
  BenefitsSection,
  CategorySection,
  HeroSection,
  ProductSections,
  PromotionSection,
  ReviewsSection,
} from '../components/HomeSections'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'

export function HomePage() {
  return (
    <div className='min-h-screen leading-[1.6]'>
      <Header />
      <main>
        <HeroSection />
        <CategorySection />
        <ProductSections />
        <PromotionSection />
        <BenefitsSection />
        <ReviewsSection />
      </main>
      <Footer />
    </div>
  )
}
