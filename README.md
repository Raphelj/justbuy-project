<div align="center">
  <h1>🛍️ JusBuy</h1>
  <p><strong>A modern, full-stack eCommerce web application built with the MERN stack, Tailwind CSS, Redux Toolkit, PayPal integration, and Cloudinary media management.</strong></p>

  <p>
    <a href="https://jusbuy.onrender.com/"><strong>🌐 Live Demo: jusbuy.onrender.com</strong></a>
  </p>

  <p>
    <img src="https://img.shields.io/badge/React-19-blue?logo=react" alt="React 19" />
    <img src="https://img.shields.io/badge/Vite-7-646CFF?logo=vite" alt="Vite 7" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?logo=tailwind-css" alt="Tailwind 4" />
    <img src="https://img.shields.io/badge/Node.js-Express_5-green?logo=node.js" alt="Node/Express" />
    <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb" alt="MongoDB" />
    <img src="https://img.shields.io/badge/Cloudinary-Media_CDN-3448C5?logo=cloudinary" alt="Cloudinary" />
    <img src="https://img.shields.io/badge/Render-Deployed-black?logo=render" alt="Render" />
  </p>
</div>

---

## 🌟 Key Features

### 👤 Customer Experience
* **Hero Product Carousel**: Interactive slider with custom slide controls, smooth transitions, and uniform typography.
* **Product Catalog & Advanced Filters**: Filter products by categories, custom price ranges, and brands.
* **Product Details & Customer Reviews**: In-depth product view with high-res imagery, rating breakdowns, stock counters, and user reviews.
* **Wishlist / Favorites**: One-click heart toggle to save favorites with persistent local state and real-time navbar counter badges.
* **Shopping Cart & Checkout**: Real-time quantity controls, subtotal calculations, and responsive summary cards.
* **Integrated Payments**: Seamless PayPal & Credit Card checkout integration via `@paypal/react-paypal-js`.
* **User Accounts & Order Tracking**: Secure registration, JWT authentication in HTTP-only cookies, profile management, and order history tracking.

### 🛡️ Admin Dashboard & Management
* **Analytics & Performance Overview**: Interactive area charts powered by **ApexCharts** visualizing revenue trends, order counts, product quantities, and user metrics.
* **Product Management**: Full CRUD capabilities to create, edit, and delete products, with direct file uploads streamed to **Cloudinary**.
* **Category Management**: Create, rename, and manage product categories.
* **User Administration**: View registered accounts, update user details, and manage roles.
* **Order Fulfillment**: Track paid statuses, view shipping addresses, and mark orders as delivered.

---

## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 19, Vite 7, Tailwind CSS v4, Redux Toolkit, React Router v7, React Icons, React Slick, ApexCharts |
| **Backend** | Node.js, Express.js v5, Mongoose 8, JWT (JSON Web Tokens), Cookie-Parser |
| **Database** | MongoDB Atlas (Cloud NoSQL Database) |
| **Media & Storage** | Cloudinary (Direct buffer upload & global image CDN) |
| **Payments** | PayPal REST SDK (`@paypal/react-paypal-js`) |
| **Deployment** | Render.com (Single-service full-stack deployment) |

---

## 📁 Project Architecture

```
justbuy-project/
├── backend/
│   ├── config/             # Database connection (MongoDB Atlas)
│   ├── controllers/        # Express request handlers (User, Product, Order, Category)
│   ├── middlewares/        # Authentication, Admin guards, Async error wrappers
│   ├── models/             # Mongoose schemas (User, Product, Order, Category)
│   ├── routes/             # API endpoints (/api/users, /api/products, /api/orders, etc.)
│   ├── utils/              # JWT creation, Cloudinary streaming utilities
│   └── index.js            # Express app entry & production static file server
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable UI (Navbar, Loader, Modal, Messages)
│   │   ├── pages/          # Views (Home, Shop, Cart, ProductDetails, Checkout)
│   │   │   ├── Admin/      # Admin dashboard, user/product/order tables
│   │   │   ├── Auth/       # Login, Register, Auth Layout
│   │   │   ├── Orders/     # Shipping, Place Order, Order detail
│   │   │   └── Products/   # Product cards, Carousel, Favourites
│   │   ├── redux/          # Redux Toolkit store, RTK Query API slices, feature state
│   │   └── App.jsx         # Root app layout
│   └── vite.config.js      # Vite build configuration & local dev proxy
├── uploads/                # Local uploads fallback directory
├── .env.example            # Environment variables template
└── package.json            # Root scripts for concurrently & full-stack production build
```

---

## 🚀 Getting Started Locally

### Prerequisites
* [Node.js](https://nodejs.org/) (v18 or higher recommended)
* [MongoDB Atlas](https://www.mongodb.com/atlas) account or local MongoDB instance
* [Cloudinary](https://cloudinary.com/) account for image uploads
* [PayPal Developer](https://developer.paypal.com/) account (Sandbox Client ID)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Raphelj/justbuy-project.git
   cd justbuy-project
   ```

2. **Install root and frontend dependencies:**
   ```bash
   npm install
   npm install --prefix frontend
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory (refer to `.env.example`):
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development
   PAYPAL_CLIENT_ID=your_paypal_client_id

   # Cloudinary Credentials
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. **Run the Application in Development Mode:**
   ```bash
   npm run dev
   ```
   * Frontend will run at: `http://localhost:5173`
   * Backend will run at: `http://localhost:5000`

---

## 📦 Production Build & Deployment

The application is configured to build and serve from a single Node.js instance on cloud providers like **Render**:

```bash
# Production build command
npm run build

# Start production server
npm start
```

### Environment Variables required on Render:
* `NODE_ENV` = `production`
* `MONGO_URI` = `<Your MongoDB Connection String>`
* `JWT_SECRET` = `<Your Secret>`
* `PAYPAL_CLIENT_ID` = `<Your PayPal Client ID>`
* `CLOUDINARY_CLOUD_NAME` = `<Your Cloudinary Cloud Name>`
* `CLOUDINARY_API_KEY` = `<Your Cloudinary API Key>`
* `CLOUDINARY_API_SECRET` = `<Your Cloudinary API Secret>`

---

## 📄 License
This project is licensed under the [MIT License](LICENSE).

