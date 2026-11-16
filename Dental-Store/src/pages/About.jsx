import React from 'react'

export default function About() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-14">

      <div className="text-center mb-14">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          About DentalCare
        </h1>

        <p className="text-gray-600 max-w-2xl mx-auto leading-7">
          We are dedicated to providing premium dental products
          that help clinics, dentists, and families maintain
          healthy smiles every day.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">

        <div className="bg-white shadow rounded-2xl p-6 text-center hover:shadow-lg transition">
          <h2 className="text-xl font-bold text-blue-500 mb-3">
            Our Mission
          </h2>

          <p className="text-gray-600 leading-7">
            Deliver trusted dental supplies with high quality,
            affordable prices, and fast service.
          </p>
        </div>

        <div className="bg-white shadow rounded-2xl p-6 text-center hover:shadow-lg transition">
          <h2 className="text-xl font-bold text-green-500 mb-3">
            Our Vision
          </h2>

          <p className="text-gray-600 leading-7">
            Become the first choice for dental stores by
            combining innovation, quality, and customer care.
          </p>
        </div>

        <div className="bg-white shadow rounded-2xl p-6 text-center hover:shadow-lg transition">
          <h2 className="text-xl font-bold text-red-500 mb-3">
            Our Values
          </h2>

          <p className="text-gray-600 leading-7">
            Trust, excellence, hygiene, reliability, and
            commitment to every customer.
          </p>
        </div>

      </div>

      <div className="mt-16 bg-blue-50 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          Why Choose Us?
        </h2>

        <p className="text-gray-600 max-w-3xl mx-auto leading-7">
          We carefully select every product to ensure safety,
          durability, and professional performance for dental
          clinics and personal care users.
        </p>
      </div>

    </div>
  )
}