import React, { useState } from 'react'
import {
  Heart,
  Search,
  ShoppingCart,
  User,
  LayoutDashboard,
  Menu,
  X
} from 'lucide-react'

import { NavLink, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setSearch } from '../Redux/appSplice'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const dispatch = useDispatch()

  const search = useSelector(state => state.app.search || "")
  const products = useSelector(state => state.app.products || [])
  const favorites = useSelector(state => state.app.favorites || [])

  const totalCount = products.reduce(
    (acc, item) => acc + item.quantity,
    0
  )

  const favCount = favorites.length

  
  const linkStyle = ({ isActive }) =>
    isActive
      ? "text-blue-600 border-b-2 border-blue-600 pb-1"
      : "text-gray-700 hover:text-blue-500"

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">

      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-[50px]">

        
        <Link to="/" className="text-2xl font-bold">
          EQUP.
        </Link>

        
        <ul className="hidden md:flex gap-10 items-center">

          <li>
            <NavLink to="/" className={linkStyle}>
              Home
            </NavLink>
          </li>

          <li>
            <NavLink to="/about" className={linkStyle}>
              About
            </NavLink>
          </li>

          <li>
            <NavLink to="/contact" className={linkStyle}>
              Contact
            </NavLink>
          </li>

          
          <li className="relative w-[230px]">

            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) =>
                dispatch(setSearch(e.target.value))
              }
              className="w-full border rounded-lg py-2 px-4 pr-10"
            />

            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />

          </li>

        </ul>

        
        <div className="flex items-center gap-4">

          
          <Link to="/wishlist" className="relative">
            <Heart />

            {favCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {favCount}
              </span>
            )}
          </Link>

          
          <Link to="/admin-login" title="Admin Dashboard">
            <LayoutDashboard className="text-gray-500 hover:text-blue-600 transition" />
          </Link>

          
          <Link to="/login" title="Login/Register">
            <User className="text-gray-500 hover:text-blue-600 transition" />
          </Link>

          
          <Link to="/cart" className="relative">
            <ShoppingCart />

            {totalCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {totalCount}
              </span>
            )}
          </Link>

          
          <button
            className="md:hidden"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>

        </div>

      </div>

      
      {open && (
        <div className="md:hidden bg-white border-t px-6 py-4 space-y-4">

          
          <div className="relative w-full mb-4">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => dispatch(setSearch(e.target.value))}
              className="w-full border rounded-lg py-2 px-4 pr-10 focus:outline-none focus:border-blue-500"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
          </div>

          <NavLink to="/" className={() => "block " + linkStyle({isActive: window.location.pathname === "/"})}>
            Home
          </NavLink>

          <NavLink to="/about" className={() => "block " + linkStyle({isActive: window.location.pathname === "/about"})}>
            About
          </NavLink>

          <NavLink to="/contact" className={() => "block " + linkStyle({isActive: window.location.pathname === "/contact"})}>
            Contact
          </NavLink>

        </div>
      )}

    </nav>
  )
}