import { toast } from "react-toastify";
import axios from "../../api/axiosConfig";
import { loadUser, logoutUser, removeUser } from "../reducers/userSlice";

export const asyncLoginUser = (user) => async (dispatch) => {
  try {
    const { data: users } = await axios.get("/users");

    const loggedInUser = users.find(
      (u) => u.username === user.loginId || u.email === user.loginId,
    );

    if (!loggedInUser || loggedInUser.password !== user.password) {
      toast.error("Invalid username/email or password");
      return false;
    }

    // Exclude the password from Redux and localStorage
    const safeUser = {
      id: loggedInUser.id,
      username: loggedInUser.username,
      email: loggedInUser.email,
      isAdmin: loggedInUser.isAdmin ?? false,
      cart: loggedInUser.cart ?? [],
    };

    dispatch(loadUser(safeUser));
    localStorage.setItem("user", JSON.stringify(safeUser));

    toast.success(safeUser.isAdmin ? "Welcome, Admin!" : "Login successful!");

    return true;
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Login failed. Please try again.",
    );
    throw error;
  }
};

export const asyncLogoutUser = () => async (dispatch, getState) => {
  try {
    localStorage.removeItem("user");
    toast.success("Logout successful!");
    dispatch(logoutUser());
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Logout failed. Please try again.",
    );
    throw error;
  }
};

export const asyncCurrentUser = () => async (dispatch, getState) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch(loadUser(user));
    } else {
      toast.error("Please User logged in!");
    }
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Logout failed. Please try again.",
    );
    throw error;
  }
};

export const asyncRegisterUser = (user) => async (dispatch, getState) => {
  try {
    const res = await axios.post("/users", user);
    toast.success("Registration successful!");

    return res.data;
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Registration failed. Please try again.",
    );
    throw error;
  }
};

export const asyncUpdateUser = (user) => async (dispatch) => {
  try {
    if (!user?.id) {
      throw new Error("User ID is missing");
    }

    const { data } = await axios.patch(`/users/${user.id}`, user);

    // Update Redux state
    dispatch(loadUser(data));

    // Update localStorage
    localStorage.setItem("user", JSON.stringify(data));

    return data;
  } catch (error) {
    console.error("Update user failed:", error);
    toast.error("Failed to update user");
    throw error;
  }
};

export const asyncDeleteUser = (id) => async (dispatch, getState) => {
  try {
    const currentUser = getState().userReducer.users;

    // Only allow deleting the currently logged-in account
    if (!currentUser || String(currentUser.id) !== String(id)) {
      throw new Error("You can only delete your own account.");
    }

    // Delete the user record from the database
    await axios.delete(`/users/${id}`);

    // Clear Redux session
    dispatch(removeUser(id));

    // Clear persisted session
    localStorage.removeItem("user");

    toast.success("Account deleted successfully!");
    return true;
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
        error.message ||
        "Failed to delete account.",
    );
    throw error;
  }
};
