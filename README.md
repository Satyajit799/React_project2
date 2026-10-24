# React Shopping Cart

A responsive e-commerce frontend built with React and Tailwind CSS. The application allows users to browse products, view product details, manage a shopping cart, and manage their profiles. It uses Redux Toolkit for state management and JSON Server as a development API.

## Features

- **User Authentication:** Registration and login using a local JSON Server API.
- **Product Listing:** Browse products with product images, descriptions, prices, and details.
- **Infinite Scrolling:** Load products in batches as users browse the listing.
- **Shopping Cart:** Add products, increase or decrease quantities, and remove items.
- **Cart Persistence:** Save cart updates to the user record in the development database.
- **Product Details:** View individual product information.
- **Admin Features:** Access product creation and management pages based on the user's role.
- **User Profile:** View and manage account information.
- **Responsive UI:** Layouts styled with Tailwind CSS for different screen sizes.
- **Client-side Routing:** Navigate between pages using React Router.

## Tech Stack

- React
- JavaScript
- Tailwind CSS
- Redux Toolkit
- React Redux
- React Router
- Axios
- React Toastify
- React Infinite Scroll Component
- JSON Server
- Vite

## Getting Started

### Prerequisites

Install the following before running the project:

- Node.js and npm
- Git
- A terminal
- A local JSON Server database

### Installation

1. Clone the repository:

   ```bash
   git clone <YOUR_GITHUB_REPOSITORY_URL>
   ```

2. Navigate into the project directory:

   ```bash
   cd <YOUR_PROJECT_FOLDER>
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

### Start the Development API

If your project uses JSON Server with a `db.json` file, start it on port `3000`:

```bash
npx json-server --watch db.json --port 3000
```

If you use JSON Server v1 or a different startup command, follow the command supported by your installed version.

### Start the React Application

Open another terminal in the project directory and run:

```bash
npm run dev
```

Open the local URL printed by Vite in your terminal, usually:

```text
http://localhost:5173
```

Keep the frontend and JSON Server running in separate terminals.

## Project Structure

```text
project/
├── public/
├── src/
│   ├── api/
│   │   └── axiosConfig.js
│   ├── components/
│   │   └── Nav.jsx
│   ├── pages/
│   │   ├── Products.jsx
│   │   ├── Cart.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── PageNotFound.jsx
│   │   ├── admin/
│   │   └── user/
│   ├── routes/
│   │   ├── MainRoutes.jsx
│   │   └── AuthWraper.jsx
│   ├── store/
│   │   ├── actions/
│   │   └── reducers/
│   ├── App.jsx
│   └── main.jsx
├── db.json
├── .gitignore
├── package.json
└── README.md
```

*The structure above is illustrative. Adjust it to match your actual repository.*

## API Endpoints

The application uses JSON Server during development. Common resources include:

| Endpoint | Purpose |
|---|---|
| `GET /products` | Retrieve products |
| `GET /products/:id` | Retrieve a product |
| `POST /products` | Create a product |
| `PATCH /products/:id` | Update a product |
| `DELETE /products/:id` | Delete a product |
| `GET /users` | Retrieve user records |
| `POST /users` | Register a user |
| `PATCH /users/:id` | Update user and cart information |

These are development endpoints, not a production-ready authentication or authorization system.

## Future Improvements

- Implement a complete checkout and order management flow.
- Integrate a payment gateway.
- Add backend-enforced authentication and role-based authorization.
- Improve form validation and error handling.
- Add automated tests.
- Deploy the frontend and backend API.

## Security Notes

- Never commit passwords, API secrets, private keys, or sensitive environment files.
- Do not use real user credentials in the development database.
- Client-side role checks are not sufficient for production authorization.
- JSON Server is suitable for development and practice, not as a secure production backend.

## Author

Satyajit mohanty

GitHub: https://github.com/Satyajit799

---

Built as a project to practice React, state management, routing, API integration, and e-commerce frontend development.
