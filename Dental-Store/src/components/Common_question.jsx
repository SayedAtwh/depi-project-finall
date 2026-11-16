import React from 'react'
import { HelpCircle } from 'lucide-react'
import { motion } from 'framer-motion'

export default function FAQ() {

  const faqs = [
    {
      q: "What products do you sell?",
      a: "We sell dental tools, toothbrushes, floss, mouthwash, and professional dental equipment."
    },
    {
      q: "Do you offer home delivery?",
      a: "Yes, we provide fast delivery across all cities with tracking options."
    },
    {
      q: "Are your products safe?",
      a: "All our products are certified and approved for dental and personal use."
    },
    {
      q: "Can I return a product?",
      a: "Yes, you can return unused products within 7 days of delivery."
    },
    {
      q: "Do you offer discounts?",
      a: "Yes, we offer seasonal discounts and special deals for clinics."
    }
  ]

  return (
    <div className="bg-gray-50 py-16">

      <div className="max-w-6xl mx-auto px-4">

        
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center text-blue-600 mb-12"
        >
          Frequently Asked Questions
        </motion.h1>

        
        <div className="grid md:grid-cols-2 gap-6">

          {faqs.map((item, index) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              key={index}
              className="bg-white rounded-xl shadow-md p-6 flex gap-4 items-start hover:shadow-xl transition duration-300"
            >

              
              <div className="text-blue-500">
                <HelpCircle size={28} />
              </div>

              
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  {item.q}
                </h2>

                <p className="text-gray-600 text-sm leading-6">
                  {item.a}
                </p>
              </div>

            </motion.div>
          ))}

        </div>

      </div>

    </div>
  )
}