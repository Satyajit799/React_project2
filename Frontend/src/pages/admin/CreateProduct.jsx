import { useForm } from "react-hook-form";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import { asyncCreateProduct } from "./../../store/actions/productActions";
import { useDispatch } from "react-redux";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const createProductHandler = async (product) => {
    try {
      const newProduct = {
        id: nanoid(),
        title: product.title,
        price: Number(product.price),
        category: product.category,
        description: product.description,
        image: product.image, // Store the image URL directly
      };

      const success = await dispatch(asyncCreateProduct(newProduct));

      if (success) {
        reset();
        navigate("/products");
      }
    } catch (error) {
      console.error("Product creation failed:", error);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="bg-slate-600 w-[45%] h-full rounded-3xl flex flex-col p-8 gap-10">
        <div className="flex justify-between">
          <h1 className="text-3xl text-black font-bold">Create Product</h1>
        </div>

        <form
          onSubmit={handleSubmit(createProductHandler)}
          className="flex flex-col gap-5"
        >
          <input
            {...register("title", {
              required: "Title is required",
            })}
            className="outline-0 px-6 py-4 rounded-3xl bg-slate-400 placeholder:text-black text-black font-normal"
            type="text"
            placeholder="Enter Product Title"
          />

          {errors.title && (
            <p className="text-red-300 text-sm">{errors.title.message}</p>
          )}

          <input
            {...register("price", {
              required: "Price is required",
            })}
            className="outline-0 px-6 py-4 rounded-3xl bg-slate-400 placeholder:text-black text-black font-normal"
            type="number"
            placeholder="Enter Product Price"
          />

          {errors.price && (
            <p className="text-red-300 text-sm">{errors.price.message}</p>
          )}

          <input
            {...register("category", {
              required: "category is required",
            })}
            className="outline-0 px-6 py-4 rounded-3xl bg-slate-400 placeholder:text-black text-black font-normal"
            type="text"
            placeholder="Enter Product category"
          />

          {errors.category && (
            <p className="text-red-300 text-sm">{errors.category.message}</p>
          )}

          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            className="outline-0 px-6 py-4 rounded-3xl bg-slate-400 placeholder:text-black text-black font-normal"
            placeholder="Enter Product Description"
          ></textarea>

          {errors.description && (
            <p className="text-red-300 text-sm">{errors.description.message}</p>
          )}

          <input
            {...register("image", {
              required: "Please enter a product image URL",
              pattern: {
                value: /^https?:\/\/.+/i,
                message: "Please enter a valid image URL",
              },
            })}
            type="url"
            placeholder="Enter product image URL"
            className="outline-0 px-6 py-4 rounded-3xl bg-slate-400 text-black font-normal"
          />

          {errors.image && (
            <p className="text-red-500 text-sm">{errors.image.message}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-slate-800 p-6 py-2 mt-5 cursor-pointer active:scale-95 text-2xl font-medium rounded-3xl disabled:opacity-50"
          >
            {isSubmitting ? "Creating..." : "Create"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
