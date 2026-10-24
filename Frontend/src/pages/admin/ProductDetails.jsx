import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { asyncUpdateProduct } from "../../store/actions/productActions";
import { asyncDeleteProduct } from "../../store/actions/productActions";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const dispatch = useDispatch();

  const products = useSelector((state) => state.productReducer.products);
  const user = useSelector((state) => state.userReducer.users);

  const product = products?.find((item) => String(item.id) === String(id));

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    if (product) {
      reset({
        title: product.title ?? "",
        price: product.price ?? "",
        category: product.category ?? "",
        description: product.description ?? "",
        image: product.image ?? "",
      });
    }
  }, [product, reset]);

  const deleteHandler = async () => {
    try {
      await dispatch(asyncDeleteProduct(id));
      navigate("/products");
    } catch (error) {
      toast.error(error);
    }
  };

  const updateProductHandler = async (formData) => {
    try {
      const updatedProduct = {
        ...product,
        ...formData,
        price: Number(formData.price),
      };

      // Connect your Redux update action here:
      await dispatch(asyncUpdateProduct(updatedProduct));

      console.log("Product to update:", updatedProduct);
      toast.success("Product Update successfully");
    } catch (error) {
      console.error("Product update failed:", error);
    }
  };

  if (!product) {
    return (
      <p className="p-6">
        Product not found or still loading. Check that the product ID matches
        the route and that products have been loaded into Redux.
      </p>
    );
  }

  return (
    <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 p-6 md:grid-cols-2">
      {/* Product details — visible to everyone */}
      <div className="min-w-0">
        <img
          className="h-80 w-full rounded-xl object-cover"
          src={product.image}
          alt={product.title}
        />

        <h1 className="mt-4 wrap-break-words text-4xl font-thin">
          {product.title}
        </h1>

        <h2 className="mt-2 text-2xl text-green-400">₹{product.price}</h2>

        <p className="mt-3 wrap-break-words">{product.description}</p>

        <button
          type="button"
          onClick={() => {
            // Connect your Add to Cart handler here.
            console.log("Add to cart:", product.id);
          }}
          className="mt-4 rounded-lg bg-black px-4 py-2 text-white active:scale-95"
        >
          Add to Cart
        </button>
      </div>

      {/* Admin-only controls */}
      {user?.isAdmin === "true" && (
        <div className="flex min-w-0 flex-col gap-4">
          <form
            onSubmit={handleSubmit(updateProductHandler)}
            className="flex flex-col gap-4"
          >
            <h2 className="text-2xl font-semibold">Edit Product</h2>

            <input
              {...register("title", {
                required: "Title is required",
              })}
              className="w-full rounded-3xl bg-slate-400 px-6 py-4 text-black outline-none"
              placeholder="Enter Product Title"
            />
            {errors.title && (
              <p className="text-red-500">{errors.title.message}</p>
            )}

            <input
              {...register("price", {
                required: "Price is required",
                valueAsNumber: true,
                min: {
                  value: 0,
                  message: "Price cannot be negative",
                },
              })}
              type="number"
              className="w-full rounded-3xl bg-slate-400 px-6 py-4 text-black outline-none"
              placeholder="Enter Product Price"
            />
            {errors.price && (
              <p className="text-red-500">{errors.price.message}</p>
            )}

            <input
              {...register("category", {
                required: "Category is required",
              })}
              className="w-full rounded-3xl bg-slate-400 px-6 py-4 text-black outline-none"
              placeholder="Enter Product Category"
            />
            {errors.category && (
              <p className="text-red-500">{errors.category.message}</p>
            )}

            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              className="w-full rounded-3xl bg-slate-400 px-6 py-4 text-black outline-none"
              placeholder="Enter Product Description"
            />
            {errors.description && (
              <p className="text-red-500">{errors.description.message}</p>
            )}

            <input
              {...register("image", {
                required: "Image URL is required",
                pattern: {
                  value: /^https?:\/\/.+/i,
                  message: "Please enter a valid image URL",
                },
              })}
              type="url"
              className="w-full rounded-3xl bg-slate-400 px-6 py-4 text-black outline-none"
              placeholder="Enter Product Image URL"
            />
            {errors.image && (
              <p className="text-red-500">{errors.image.message}</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-3xl bg-slate-900 px-6 py-3 text-xl font-medium text-white active:scale-95 disabled:opacity-50"
            >
              {isSubmitting ? "Updating..." : "Update Product"}
            </button>
          </form>

          <button
            type="button"
            onClick={deleteHandler}
            className="rounded-2xl bg-red-700 px-4 py-2 font-medium text-white active:scale-95"
          >
            Delete Product
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
