import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import {
  asyncUpdateUser,
  asyncDeleteUser,
} from "../../store/actions/userActions";

const UserProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.userReducer.users);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    if (user) {
      reset({
        username: user.username ?? "",
        email: user.email ?? "",
      });
    }
  }, [user, reset]);

  const deleteUserHandler = async () => {
    try {
      const success = await dispatch(asyncDeleteUser(id));

      if (success) {
        navigate("/login", { replace: true });
      }
    } catch (error) {
      console.error("Account deletion failed:", error);
    }
  };

  const updateUserHandler = async (formData) => {
    try {
      const updatedUser = {
        ...user,
        ...formData,
      };

      await dispatch(asyncUpdateUser(updatedUser));
    } catch (error) {
      console.error("Profile update failed:", error);
    }
  };

  if (!user) {
    return <p className="p-6">Please log in to view your profile.</p>;
  }

  return (
    <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 p-6 md:grid-cols-2">
      <div className="flex min-w-0 flex-col gap-4">
        <form
          onSubmit={handleSubmit(updateUserHandler)}
          className="flex flex-col gap-4"
        >
          <h2 className="text-2xl font-semibold">Edit User Details</h2>

          <input
            {...register("username", {
              required: "Username is required",
            })}
            type="text"
            className="w-full rounded-3xl bg-slate-400 px-6 py-4 text-black outline-none"
            placeholder="Enter Username"
          />
          {errors.username && (
            <p className="text-red-500">{errors.username.message}</p>
          )}

          <input
            {...register("email", {
              required: "Email is required",
            })}
            type="email"
            className="w-full rounded-3xl bg-slate-400 px-6 py-4 text-black outline-none"
            placeholder="Enter Email"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}

          <input
            {...register("password", {
              required: "Password is required",
            })}
            type="password"
            className="w-full rounded-3xl bg-slate-400 px-6 py-4 text-black outline-none"
            placeholder="Enter Updated Password"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-3xl bg-slate-900 px-6 py-3 text-xl font-medium text-white active:scale-95 disabled:opacity-50"
          >
            {isSubmitting ? "Updating..." : "Update Profile"}
          </button>
        </form>

        <button
          type="button"
          onClick={deleteUserHandler}
          className="rounded-2xl bg-red-700 px-4 py-2 font-medium text-white active:scale-95"
        >
          Delete User
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
