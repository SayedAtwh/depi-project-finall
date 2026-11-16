export default function Footer() {
  return (
    <footer className="bg-blue-50 text-gray-700 mt-10 border-t">
      <div className="max-w-5xl mx-auto p-6 text-center">

        <h2 className="text-2xl font-bold text-blue-600">
          Dental Store
        </h2>

        <p className="mt-2 text-sm">
          Your trusted dental store for quality products & healthy smiles
        </p>

        <div className="mt-4 text-xs text-gray-500">
          © {new Date().getFullYear()} DentalCare. All rights reserved.
        </div>

      </div>
    </footer>
  );
}