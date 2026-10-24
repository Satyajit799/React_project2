import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { asyncLogoutUser } from "../store/actions/userActions";

const Nav = () => {
  const user = useSelector((state) => state.userReducer.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(asyncLogoutUser());
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="flex items-center justify-center gap-10 p-5 mb-10">
      <NavLink to="/">Home</NavLink>

      {!user ? (
        <NavLink to="/login">Login</NavLink>
      ) : (
        <>
          {user.isAdmin === true || user.isAdmin === "true" ? (
            <NavLink to="/admin/create-product">Create Product</NavLink>
          ) : (
            <NavLink to="/add-to-cart">Add To Cart</NavLink>
          )}

          <NavLink to={`/user_profile/${user.id}`}>My Profile</NavLink>

          <button
            onClick={handleLogout}
            className="rounded-lg bg-red-600 px-4 py-2 text-white"
          >
            Logout
          </button>
        </>
      )}
    </nav>
  );
};

export default Nav;
