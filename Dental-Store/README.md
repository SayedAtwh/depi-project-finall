# Dental Store 🦷

A full-stack e-commerce web application for dental supplies, equipment, and instruments. Built with React (Vite, Tailwind CSS, Redux Toolkit) and a PHP/MySQL backend API.

## Features

- **Storefront & Catalog**: Browse products by category, view product specifications, and search items.
- **Shopping Cart & Favorites**: Add items to cart or wishlist with real-time state management via Redux Toolkit.
- **Checkout System**: Streamlined order placement with customer and shipping details.
- **Admin Dashboard**: Manage inventory, products, orders, and customer records.
- **RESTful PHP Backend**: Lightweight API handling database operations and order fulfillment.

## Tech Stack

### Frontend
- **React 19** with **Vite**
- **Tailwind CSS** for styling
- **Redux Toolkit** for global state management
- **React Router** for client-side routing
- **Framer Motion** & **Swiper** for animations and carousels
- **Lucide React** for icons

### Backend & Database
- **PHP** (MySQLi)
- **MySQL / MariaDB** (via XAMPP)

## Getting Started

### 1. Database Setup
1. Start **Apache** and **MySQL** in XAMPP.
2. Open phpMyAdmin or your MySQL client and import `seed.sql` or run the setup script:
   ```bash
   http://localhost/dentalstore/api/setup.php
   ```

### 2. Frontend Installation & Run
```bash
# Install dependencies
npm install

# Start Vite development server
npm run dev
```

### 3. Build for Production
```bash
npm run build
```
