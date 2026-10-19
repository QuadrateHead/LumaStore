'use client'

import { useEffect } from 'react'

import {
  BenefitsSection,
  CategorySection,
  HeroSection,
  ProductSections,
  PromotionSection,
  ReviewsSection,
} from '@/components/HomeSections'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

export default function HomePage() {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const id = window.location.hash.slice(1)
      if (id) {
        document.getElementById(id)?.scrollIntoView()
      }
    }
  }, [])

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
