import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { AboutPage } from './pages/AboutPage'
import { AccountPage } from './pages/AccountPage'
import { AdminPage } from './pages/AdminPage'
import { AdminProductFormPage } from './pages/AdminProductFormPage'
import { HomePage } from './pages/HomePage'
import { ProductPage } from './pages/ProductPage'

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/account' element={<AccountPage />} />
        <Route path='/admin' element={<AdminPage />} />
        <Route path='/admin/products/new' element={<AdminProductFormPage />} />
        <Route path='/admin/products/:id/edit' element={<AdminProductFormPage />} />
        <Route path='/product' element={<ProductPage />} />
        <Route path='/products/:slug' element={<ProductPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
