import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { AboutPage } from './pages/AboutPage'
import { AccountPage } from './pages/AccountPage'
import { AdminPage } from './pages/AdminPage'
import { AdminProductFormPage } from './pages/AdminProductFormPage'
import { CartPage } from './pages/CartPage'
import { CatalogPage } from './pages/CatalogPage'
import { CategoryPage } from './pages/CategoryPage'
import { CheckoutPage } from './pages/CheckoutPage'
import { ContactPage } from './pages/ContactPage'
import { FaqPage } from './pages/FaqPage'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { ProductPage } from './pages/ProductPage'
import { RegisterPage } from './pages/RegisterPage'

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/account' element={<AccountPage />} />
        <Route path='/catalog' element={<CatalogPage />} />
        <Route path='/category' element={<CategoryPage />} />
        <Route path='/categories/:slug' element={<CategoryPage />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/checkout' element={<CheckoutPage />} />
        <Route path='/checkout/success' element={<CheckoutPage />} />
        <Route path='/contact' element={<ContactPage />} />
        <Route path='/faq' element={<FaqPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/admin' element={<AdminPage />} />
        <Route path='/admin/products/new' element={<AdminProductFormPage />} />
        <Route path='/admin/products/:id/edit' element={<AdminProductFormPage />} />
        <Route path='/product' element={<ProductPage />} />
        <Route path='/products' element={<CatalogPage />} />
        <Route path='/products/:slug' element={<ProductPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
