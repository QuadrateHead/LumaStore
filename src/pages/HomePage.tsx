import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

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
  const location = useLocation()

  useEffect(() => {
    const id = location.hash.slice(1)
    if (id) {
      document.getElementById(id)?.scrollIntoView()
    }
  }, [location.hash])

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
