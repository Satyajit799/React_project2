import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { nanoid } from "nanoid";
import { asyncRegisterUser } from "./../store/actions/userActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const RegisterHandler = async (user) => {
    try {
      user.id = nanoid();
      user.isAdmin = false;
      user.cart = [];

      const result = await dispatch(asyncRegisterUser(user));
      console.log(result);

      if (result) {
        reset();
        navigate("/login");
      }
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="flex h-[70%] justify-center">
      <div className="bg-slate-600 w-[45%] h-full rounded-3xl flex flex-col p-10 gap-10">
        <div className="flex justify-between">
          <h1 className="text-3xl text-black font-bold">Register</h1>
          <Link to="/login" className="text-2xl cursor-pointer">
            Login
          </Link>
        </div>

        <form
          onSubmit={handleSubmit(RegisterHandler)}
          className="flex flex-col gap-5"
        >
          <input
            {...register("username", {
              required: "Username is required",
            })}
            className="outline-0 px-6 py-4 rounded-3xl bg-slate-400 placeholder:text-black text-black font-normal"
            type="text"
            placeholder="Enter your Username"
          />

          {errors.username && (
            <p className="text-red-300 text-sm">{errors.username.message}</p>
          )}

          <input
            {...register("email", {
              required: "Email is required",
            })}
            className="outline-0 px-6 py-4 rounded-3xl bg-slate-400 placeholder:text-black text-black font-normal"
            type="Email"
            placeholder="Enter your Email"
          />

          {errors.email && (
            <p className="text-red-300 text-sm">{errors.email.message}</p>
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

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-slate-800 p-6 py-2 mt-5 cursor-pointer active:scale-95 text-2xl font-medium rounded-3xl disabled:opacity-50"
          >
            {isSubmitting ? "Register in..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
