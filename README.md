# Pizza Palace - Full-Stack MERN E-Commerce Application

Pizza Palace is a modern web-based food ordering platform built using the MERN stack (MongoDB, Express.js, React, and Node.js) and styled with Tailwind CSS. The application features a dynamic product catalog with interactive category sorting, a custom state-managed shopping cart, custom promotion validation, responsive touch-optimized mobile layouts, and secure token-based user authentication.

---

## Technical Architecture & Core Features

* **Responsive User Interfaces:** Built with tailored viewport controls including a mobile-first bottom navigation drawer (`md:hidden`), a horizontal touch-swiping categories scrollbar hidden row on compact screens (`scrollbar-none`), and full desktop scaling support up to 1400px viewports.
* **Custom Promotion Flow:** Includes a functional "Flat 30% Off on First Order" activation mechanism using session storage validation rules to automatically process item discount calculations upon checkout checkout pipelines.
* **Secure Checkout & Verification:** Dynamic frontend client form evaluation coupled with backend database validators (`qty` and `deliveryAddress` schemas) managed via secure JSON Web Token (JWT) authorization header contexts.
* **Asset Safety Fault Tolerance:** Fully equipped with dynamic image rendering error safety boundaries (`onError` callbacks) that substitute broken remote link paths with robust high-resolution asset placeholders automatically.

---

## Project Structure

```text
pizza-palace/
├── backend/
│   ├── config/          # Database connection configurations
│   ├── models/          # Mongoose Schemas (User, Pizza, Order)
│   ├── routes/          # REST API endpoints (/api/pizzas, /api/orders)
│   ├── middleware/      # JWT Authentication guards
│   └── server.js        # Node.js entry point
└── frontend/
    ├── public/          # Static assets (custom favicon.ico, index.html)
    └── src/
        ├── assets/      # Local background and banner images
        ├── components/  # Shared layouts (Navbar, Footer, BottomNavigation)
        ├── context/     # Application states (CartContext, AuthContext)
        ├── pages/       # Route Views (Home, Cart, Orders)
        ├── App.js       # Core routing engine
        └── index.js     # React application mounting point
