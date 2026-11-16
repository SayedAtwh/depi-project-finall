import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  increaseQty,
  decreaseQty,
  removeFromCart
} from '../Redux/appSplice'

import { useNavigate } from 'react-router-dom'

export default function Cart() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const products = useSelector(state => state.app.products)

  const totalPrice = products.reduce(
    (acc, item) =>
      acc + (Number(item.price) || 0) * (item.quantity || 1),
    0
  )

  const totalItems = products.reduce(
    (acc, item) => acc + (item.quantity || 1),
    0
  )

  if (products.length === 0) {
    return (
      <div className="text-center mt-20 text-gray-500">
        <h2 className="text-2xl">Cart is empty 🛒</h2>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">

      <h1 className="text-2xl font-bold mb-6">
        Cart ({totalItems})
      </h1>

      <div className="space-y-4">

        {products.map(item => (
          <div
            key={item.id}
            className="flex justify-between items-center bg-white p-4 shadow rounded"
          >

            <div className="flex items-center gap-4">

              <img
                src={item.image}
                className="w-16 h-16 object-contain"
              />

              <div>
                <h2 className="text-sm font-semibold">
                  {item.title}
                </h2>

                <p className="text-green-600 font-bold">
                  ${item.price} × {item.quantity}
                </p>
              </div>

            </div>

            <div className="flex gap-2 items-center">

              <button
                onClick={() => dispatch(decreaseQty(item.id))}
                className="px-2 bg-gray-200"
              >
                -
              </button>

              <span>{item.quantity}</span>

              <button
                onClick={() => dispatch(increaseQty(item.id))}
                className="px-2 bg-gray-200"
              >
                +
              </button>

            </div>

            <button
              onClick={() => dispatch(removeFromCart(item.id))}
              className="text-red-500"
            >
              Remove
            </button>

          </div>
        ))}

      </div>

      <div className="mt-8 flex justify-between border-t pt-4">
        <h2>Total:</h2>
        <span className="text-green-600 font-bold">
          ${totalPrice.toFixed(2)}
        </span>
      </div>

      <button
        onClick={() => navigate('/checkout', { state: { products, totalPrice } })}
        className="mt-6 w-full bg-blue-500 text-white py-3 rounded"
      >
        Checkout
      </button>

    </div>
  )
}