import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { asyncLoginUser } from "./../store/actions/userActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const LoginHandler = async (user) => {
    try {
      const success = await dispatch(asyncLoginUser(user));

      if (success) {
        reset();
        navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="flex h-[70%] justify-center">
      <div className="bg-slate-600 w-[45%] h-full rounded-3xl flex flex-col p-10 gap-10">
        <div className="flex justify-between">
          <h1 className="text-3xl text-black font-bold">Login</h1>
          <Link to="/register" className="text-2xl cursor-pointer">
            Sign Up
          </Link>
        </div>

        <form
          onSubmit={handleSubmit(LoginHandler)}
          className="flex flex-col gap-5"
        >
          <input
            {...register("loginId", {
              required: "Username or email is required",
            })}
            className="outline-0 px-6 py-4 rounded-3xl bg-slate-400 placeholder:text-black text-black font-normal"
            type="text"
            placeholder="Enter your Username or Email"
          />

          {errors.loginId && (
            <p className="text-red-300 text-sm">{errors.loginId.message}</p>
          )}

          <input
            {...register("password", {
              required: "Password is required",
            })}
            className="outline-0 px-6 py-4 rounded-3xl bg-slate-400 placeholder:text-black text-black font-normal"
            type="password"
            placeholder="Enter your Password"
          />

          {errors.password && (
            <p className="text-red-300 text-sm">{errors.password.message}</p>
          )}

          <p className="self-end cursor-pointer">Forgot password?</p>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-slate-800 p-6 py-2 mt-5 cursor-pointer active:scale-95 text-2xl font-medium rounded-3xl disabled:opacity-50"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
