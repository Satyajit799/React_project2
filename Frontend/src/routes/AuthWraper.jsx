import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthWraper = (props) => {
  const user = useSelector((state) => state.userReducer.users);

  return user ? props.children : <Navigate to="/login"></Navigate>;
};

export default AuthWraper;
