import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'

import axios from 'axios';

export default function Checkout() {

  const location = useLocation()
  const { products = [], totalPrice = 0 } = location.state || {}

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: ''
  })

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true);

    try {
      
      const customerRes = await axios.post('/api/customers.php', {
        Name: form.name,
        Phone_num: form.phone,
        address: `${form.address}, ${form.city}`
      });

      const customerId = customerRes.data.id;

      
      const orderDetails = products.map(item => ({
        product_ID: item.Product_ID || item.id,
        quantity: item.quantity
      }));

      await axios.post('/api/orders.php', {
        Customer_ID: customerId,
        details: orderDetails
      });

      alert("Order placed successfully ✅");
    } catch (err) {
      console.error(err);
      alert("Failed to place order. Please try again.");
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">

        
        <div className="bg-white shadow-lg rounded-xl p-6">

          <h1 className="text-2xl font-bold mb-6 text-blue-600">
            Checkout
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              className="w-full border p-3 rounded"
              required
            />

            <input
              name="phone"
              placeholder="Phone"
              onChange={handleChange}
              className="w-full border p-3 rounded"
              required
            />

            <input
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="w-full border p-3 rounded"
            />

            <input
              name="address"
              placeholder="Address"
              onChange={handleChange}
              className="w-full border p-3 rounded"
              required
            />

            <input
              name="city"
              placeholder="City"
              onChange={handleChange}
              className="w-full border p-3 rounded"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className={`w-full text-white py-3 rounded ${loading ? 'bg-gray-400' : 'bg-blue-500'}`}
            >
              {loading ? 'Processing...' : 'Place Order'}
            </button>

          </form>

        </div>

        
        <div className="bg-white shadow-lg rounded-xl p-6">

          <h2 className="text-xl font-bold mb-4">
            Order Summary
          </h2>

          {products.length === 0 ? (
            <p className="text-gray-500">
              No products in order
            </p>
          ) : (
            <div className="space-y-4">

              {products.map(item => (
                <div
                  key={item.id}
                  className="flex justify-between border-b pb-2"
                >

                  <div>
                    <p className="font-semibold text-sm">
                      {item.title}
                    </p>

                    <p className="text-gray-500 text-xs">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <p className="text-green-600 font-bold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>

                </div>
              ))}

              
              <div className="flex justify-between mt-4 border-t pt-3">

                <span className="font-bold">
                  Total:
                </span>

                <span className="text-green-600 font-bold">
                  ${totalPrice.toFixed(2)}
                </span>

              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  )
}