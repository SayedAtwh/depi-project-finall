import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { BeatLoader } from 'react-spinners'
import { Heart, ShoppingCart, Check } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'

import {
  addToCart,
  addToFavorites,
  removeFromFavorites
} from '../Redux/appSplice'

export default function Products() {

  const [products, setProducts] = useState([])
  const [visibleCount, setVisibleCount] = useState(6)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [message, setMessage] = useState('')
  const [addedIds, setAddedIds] = useState({})

  const [selectedProduct, setSelectedProduct] = useState(null)

  
  const [activeIcons, setActiveIcons] = useState({})
  const [localFavs, setLocalFavs] = useState({})

  const dispatch = useDispatch()

  const search = useSelector(state => state.app.search || "")
  const favorites = useSelector(state => state.app.favorites || [])

  useEffect(() => {

    const fetchProducts = async () => {

      try {

        const response = await axios.get(
          '/api/products.php'
        )

        setProducts(response.data)

        
        const initialFavs = {}

        response.data.forEach((p) => {

          const productId = p.Product_ID || p.id

          initialFavs[productId] = !!favorites.find(
            item =>
              (item.Product_ID || item.id) === productId
          )

        })

        setLocalFavs(initialFavs)

        setLoading(false)

      } catch (err) {

        setError('Failed to fetch from API')
        setLoading(false)

      }
    }

    fetchProducts()

  }, [])

  if (loading) {
    return <BeatLoader className="mx-auto mt-10" />
  }

  if (error) {
    return <p>Error: {error}</p>
  }

  
  const filteredProducts = products.filter(product => {

    const title = product.Name || product.title || ""

    return title
      .toLowerCase()
      .includes(search.toLowerCase())

  })

  const isEnd = visibleCount >= filteredProducts.length

  
  const handleClick = () => {

    if (isEnd) {
      setVisibleCount(6)
    } else {
      setVisibleCount(prev => prev + 3)
    }

  }

  
  const handleAddToCart = (product) => {

    const productId = product.Product_ID || product.id

    dispatch(addToCart({
      id: productId,
      title: product.Name || product.title,
      price: product.price,
      image: product.image_url || product.image
    }))

    
    setActiveIcons(prev => ({
      ...prev,
      [`${productId}-cart`]: true
    }))

    setTimeout(() => {

      setActiveIcons(prev => ({
        ...prev,
        [`${productId}-cart`]: false
      }))

    }, 500)

    
    setMessage("Product added to cart ✅")

    
    setAddedIds(prev => ({
      ...prev,
      [productId]: true
    }))

    setTimeout(() => {

      setMessage('')

      setAddedIds(prev => ({
        ...prev,
        [productId]: false
      }))

    }, 2000)

  }

  
  const handleFavorite = (product) => {

    const productId = product.Product_ID || product.id

    
    setActiveIcons(prev => ({
      ...prev,
      [`${productId}-fav`]: true
    }))

    setTimeout(() => {

      setActiveIcons(prev => ({
        ...prev,
        [`${productId}-fav`]: false
      }))

    }, 500)

    
    setLocalFavs(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }))

    const exists = favorites.find(
      item =>
        (item.Product_ID || item.id) === productId
    )

    if (exists) {

      dispatch(removeFromFavorites(productId))

    } else {

      dispatch(addToFavorites({
        id: productId,
        title: product.Name || product.title,
        price: product.price,
        image: product.image_url || product.image
      }))

    }

  }

  
  const handleDetails = (product) => {
    setSelectedProduct(product)
  }

  return (

    <div className="max-w-5xl mx-auto px-4 py-12 relative">

      
      {message && (

        <div className="fixed top-24 right-5 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50">
          {message}
        </div>

      )}

      
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">
        Featured Products
      </h1>

      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">

        {filteredProducts
          .slice(0, visibleCount)
          .map((product) => {

            
            const productId =
              product.Product_ID || product.id

            const isFav =
              localFavs[productId] !== undefined
                ? localFavs[productId]
                : !!favorites.find(
                    item =>
                      (item.Product_ID || item.id) === productId
                  )

            return (

              <motion.div
                key={productId}
                className="bg-white rounded-xl p-4 shadow hover:shadow-lg transition flex flex-col text-center"
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
              >

                
                <img
                  src={product.image_url || product.image}
                  alt={product.Name || product.title}
                  className="h-28 object-contain mb-3 mx-auto"
                />

                
                <h2 className="text-sm font-medium mb-2 line-clamp-2">
                  {product.Name || product.title}
                </h2>

                
                <p className="text-green-600 font-semibold mb-3">
                  ${product.price}
                </p>

                
                <div className="flex justify-center gap-4 mb-3">

                  
                  <Heart
                    size={18}
                    onClick={() => handleFavorite(product)}
                    className={`
                      cursor-pointer transition
                      ${isFav
                        ? "text-red-500 fill-red-500"
                        : "text-gray-500"
                      }
                      ${
                        activeIcons[`${productId}-fav`]
                          ? "scale-150 text-red-600"
                          : ""
                      }
                    `}
                  />

                  
                  <div
                    onClick={() => handleAddToCart(product)}
                  >

                    {addedIds[productId] ? (

                      <Check
                        size={18}
                        className="text-green-500"
                      />

                    ) : (

                      <ShoppingCart
                        size={18}
                        className={`
                          cursor-pointer transition
                          ${
                            activeIcons[`${productId}-cart`]
                              ? "scale-150 text-blue-600"
                              : "text-gray-500"
                          }
                        `}
                      />

                    )}

                  </div>

                </div>

                
                <button
                  onClick={() => handleDetails(product)}
                  className="mt-auto bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg text-sm"
                >
                  Details
                </button>

              </motion.div>

            )
          })}

      </div>

      
      {filteredProducts.length > 6 && (

        <div className="flex justify-center mt-8">

          <button
            onClick={handleClick}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
          >
            {isEnd ? 'Show Less' : 'Show More'}
          </button>

        </div>

      )}

    </div>

  )
}