import React from 'react'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'

export default function Contact() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-14">

      <div className="text-center mb-14">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          Contact Us
        </h1>

        <p className="text-gray-600 max-w-2xl mx-auto leading-7">
          We’d love to hear from you. Reach out for product
          inquiries, orders, support, or partnership requests.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10">

        <div className="bg-white shadow rounded-2xl p-8">

          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Get In Touch
          </h2>

          <div className="space-y-5">

            <div className="flex items-center gap-4">
              <Phone className="text-blue-500" />
              <span className="text-gray-700">
                +20 100 123 4567
              </span>
            </div>

            <div className="flex items-center gap-4">
              <Mail className="text-green-500" />
              <span className="text-gray-700">
                support@dentalcare.com
              </span>
            </div>

            <div className="flex items-center gap-4">
              <MapPin className="text-red-500" />
              <span className="text-gray-700">
                Cairo, Egypt
              </span>
            </div>

            <div className="flex items-center gap-4">
              <Clock className="text-orange-500" />
              <span className="text-gray-700">
                Sat - Thu : 9:00 AM - 6:00 PM
              </span>
            </div>

          </div>

        </div>

        <div className="bg-white shadow rounded-2xl p-8">

          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Send Message
          </h2>

          <form className="space-y-5">

            <input
              type="text"
              placeholder="Your Name"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="text"
              placeholder="Subject"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <textarea
              rows="5"
              placeholder="Your Message"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition"
            >
              Send Message
            </button>

          </form>

        </div>

      </div>

    </div>
  )
}