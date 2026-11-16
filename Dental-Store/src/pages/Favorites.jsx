import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ShoppingCart, Trash2, Check } from 'lucide-react'
import { removeFromFavorites, addToCart } from '../Redux/appSplice'

export default function Favorites() {
  const dispatch = useDispatch()

  const favorites = useSelector(state => state.app.favorites || [])

  const [addedIds, setAddedIds] = useState({})
  const [activeIcons, setActiveIcons] = useState({})
  const [message, setMessage] = useState('')

  const handleRemove = (id) => {
    setActiveIcons(prev => ({ ...prev, [`${id}-trash`]: true }))
    setTimeout(() => {
      dispatch(removeFromFavorites(id))
      setActiveIcons(prev => ({ ...prev, [`${id}-trash`]: false }))
    }, 200)
  }

  const handleAddToCart = (product) => {
    dispatch(addToCart(product))

    
    setActiveIcons(prev => ({
      ...prev,
      [`${product.id}-cart`]: true
    }))

    setTimeout(() => {
      setActiveIcons(prev => ({
        ...prev,
        [`${product.id}-cart`]: false
      }))
    }, 500)

    
    setMessage("Product added to cart ✅")

    
    setAddedIds(prev => ({
      ...prev,
      [product.id]: true
    }))

    setTimeout(() => {
      setMessage('')
      setAddedIds(prev => ({
        ...prev,
        [product.id]: false
      }))
    }, 2000)
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 relative">

      
      {message && (
        <div className="fixed top-24 right-5 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50">
          {message}
        </div>
      )}

      <h1 className="text-3xl font-bold text-center mb-10 text-red-500">
        My Favorites ❤️
      </h1>

      {favorites.length === 0 ? (
        <p className="text-center text-gray-500 mt-20">
          No favorite items yet
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">

          {favorites.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow p-4 text-center hover:shadow-lg transition"
            >

              <img
                src={item.image}
                className="h-28 object-contain mx-auto mb-3"
              />

              <h2 className="text-sm font-medium mb-2 line-clamp-2">
                {item.title}
              </h2>

              <p className="text-green-600 font-semibold mb-3">
                ${item.price}
              </p>

              <div className="flex justify-center gap-4">

                
                <button
                  onClick={() => handleAddToCart(item)}
                  className={`p-2 rounded-lg transition-transform ${
                    addedIds[item.id] ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"
                  } text-white ${
                    activeIcons[`${item.id}-cart`] ? "scale-125" : ""
                  }`}
                >
                  {addedIds[item.id] ? (
                    <Check size={18} />
                  ) : (
                    <ShoppingCart size={18} />
                  )}
                </button>

                
                <button
                  onClick={() => handleRemove(item.id)}
                  className={`bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-transform ${
                    activeIcons[`${item.id}-trash`] ? "scale-125" : ""
                  }`}
                >
                  <Trash2 size={18} />
                </button>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  )
}