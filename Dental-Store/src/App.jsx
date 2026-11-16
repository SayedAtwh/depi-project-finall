import React from 'react'
import Navbar from './components/Navbar'
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Outlet, Route, useLocation } from 'react-router-dom'
import Footer from './pages/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import Favorites from './pages/Favorites'
import Common_question from './components/Common_question'
import Checkout from './pages/Checkout'
import Admin from './pages/Admin'
import AdminLogin from './pages/AdminLogin'
import Login from './pages/Login'
import Register from './pages/Register'

const Layout = () => {
  const location = useLocation();
  const hideFooterItems = location.pathname === '/login' || location.pathname === '/register';

  return (
    <>
      <Navbar />
      <Outlet />
      {!hideFooterItems && (
        <>
          <Common_question />
          <Footer />
        </>
      )}
    </>
  )
}

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/Cart' element={<Cart />} />
          <Route path="/wishlist" element={<Favorites />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
      </>
    )
  );
  return (
    <RouterProvider router={router} />
  )

}