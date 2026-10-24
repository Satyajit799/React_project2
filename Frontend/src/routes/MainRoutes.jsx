import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { lazy } from "react";
const Products = lazy(() => import("../pages/Products"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("./../pages/Register"));
const CreateProduct = lazy(() => import("../pages/admin/CreateProduct"));
const ProductDetails = lazy(() => import("../pages/admin/ProductDetails"));
const UserProfile = lazy(() => import("./../pages/user/UserProfile"));
const PageNotFound = lazy(() => "./../pages/PageNotFound");
const Cart = lazy(() => import("./../pages/Cart"));
const AuthWraper = lazy(() => import("./AuthWraper"));

const MainRoutes = () => {
  const user = useSelector((state) => state.userReducer.users);
  return (
    <Routes>
      <Route path="/" element={<Products />} />

      <Route
        path="/login"
        element={user ? <Navigate to="/" replace /> : <Login />}
      />
      <Route
        path="/register"
        element={user ? <Navigate to="/" replace /> : <Register />}
      />

      <Route path="/add-to-cart" element={<Cart />} />

      <Route
        path="/admin/create-product"
        element={
          <AuthWraper>
            <CreateProduct />
          </AuthWraper>
        }
      />
      <Route
        path="/product/:id"
        element={
          <AuthWraper>
            <ProductDetails />
          </AuthWraper>
        }
      />
      <Route
        path="/user_profile/:id"
        element={
          <AuthWraper>
            <UserProfile />
          </AuthWraper>
        }
      />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default MainRoutes;
