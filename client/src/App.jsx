import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProfilePage from './pages/ProfilePage'
import ProtectedRoute from './components/common/ProtectedRoute'
import { AuthProvider } from './context/AuthContext'
import { SettingsProvider } from './context/SettingsContext'
import WhatsAppButton from './components/common/WhatsAppButton'

import AdminDashboardPage from './pages/admin/AdminDashboardPage'
import AdminLoginPage from './pages/admin/AdminLoginPage'
import ProductsPage from './pages/admin/products/ProductsPage'
import OrdersPage from './pages/admin/orders/OrdersPage'
import CustomersPage from './pages/admin/customers/CustomersPage'
import SettingsPage from './pages/admin/settings/SettingsPage'
import CategoriesPage from './pages/admin/categories/CategoriesPage'

import ShopPage from './pages/ShopPage'
import ProductDetailPage from './pages/ProductDetailPage'
import CartPage from './pages/CartPage'
import WishlistPage from './pages/WishlistPage'
import CheckoutPage from './pages/CheckoutPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import CareerPage from './pages/CareerPage'
import BlogPage from './pages/BlogPage'
import HelpCenterPage from './pages/HelpCenterPage'
import ReturnsPage from './pages/ReturnsPage'
import OurStoryPage from './pages/OurStoryPage'
import PressPage from './pages/PressPage'
import OrderTrackingPage from './pages/OrderTrackingPage'
import SizeGuidePage from './pages/SizeGuidePage'
import MyOrdersPage from './pages/MyOrdersPage'

import './App.css'

function App() {
  return (
    <AuthProvider>
      <SettingsProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/shop/:id" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />

              {/* Customer Order History & Support Pages */}
              <Route path="/my-orders" element={<MyOrdersPage />} />
              <Route path="/careers" element={<CareerPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/help" element={<HelpCenterPage />} />
              <Route path="/returns" element={<ReturnsPage />} />
              <Route path="/our-story" element={<OurStoryPage />} />
              <Route path="/press" element={<PressPage />} />
              <Route path="/track-order" element={<OrderTrackingPage />} />
              <Route path="/size-guide" element={<SizeGuidePage />} />

              <Route element={<ProtectedRoute />}>
                <Route path="/profile" element={<ProfilePage />} />
              </Route>
              <Route element={<ProtectedRoute adminOnly={true} />}>
                <Route path="/admin" element={<AdminDashboardPage />} />
                <Route path="/admin/products" element={<ProductsPage />} />
                <Route path="/admin/categories" element={<CategoriesPage />} />
                <Route path="/admin/orders" element={<OrdersPage />} />
                <Route path="/admin/customers" element={<CustomersPage />} />
                <Route path="/admin/settings" element={<SettingsPage />} />
              </Route>
              <Route path="/admin/login" element={<AdminLoginPage />} />
              <Route path="*" element={<div className="px-4 py-20 text-center text-2xl font-semibold">404 — Page not found</div>} />
            </Route>
          </Routes>
          <WhatsAppButton />
        </BrowserRouter>
      </SettingsProvider>
    </AuthProvider>
  )
}

export default App
