import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { asyncUpdateUser } from "../store/actions/userActions";
import { toast } from "react-toastify";
import { Suspense } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import useInfiniteProducts from "./../utils/useInfiniteProducts";

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const users = useSelector((state) => state.userReducer.users);

  const { products, loading, error, hasMore, fetchProducts } =
    useInfiniteProducts();

  const addToCartHandler = async (id) => {
    if (!users?.id) {
      toast.error("Please log in first");
      navigate("/login");
      return;
    }

    const cart = [...(users.cart || [])];

    const index = cart.findIndex(
      (item) => String(item.productId) === String(id),
    );

    if (index === -1) {
      cart.push({ productId: id, quantity: 1 });
    } else {
      cart[index] = {
        ...cart[index],
        quantity: Number(cart[index].quantity || 0) + 1,
      };
    }

    try {
      await dispatch(asyncUpdateUser({ ...users, cart }));
      toast.success("Cart updated!");
      navigate("/add-to-cart");
    } catch (err) {
      console.error("Cart update failed:", err);
      toast.error("Could not update cart.");
    }
  };

  if (loading) {
    return <p className="p-6 text-center">Loading products...</p>;
  }

  if (error) {
    return <p className="p-6 text-center text-red-500">{error}</p>;
  }

  if (products.length === 0) {
    return <p className="p-6 text-center">No products available.</p>;
  }

  return (
    <main className="w-full min-w-0 px-4 pb-10">
      <InfiniteScroll
        dataLength={products.length}
        next={fetchProducts}
        hasMore={hasMore}
        endMessage={
          <p className="p-6 text-center text-gray-500">
            You have viewed all products.
          </p>
        }
      >
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Suspense
            fallback={
              <h1 className="text-5xl text-center text-white">Loading....</h1>
            }
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="flex min-w-0 flex-col justify-between overflow-hidden rounded-xl bg-slate-600 p-4 text-white shadow-md"
              >
                <div className="min-w-0">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-48 w-full rounded-lg object-cover"
                  />

                  <h2 className="mt-3 wrap-break-words text-xl font-bold">
                    {product.title}
                  </h2>

                  <p className="mt-2 wrap-break-words text-sm">
                    {product.description?.slice(0, 100)}...
                  </p>

                  <Link
                    to={`/product/${product.id}`}
                    className="text-xl font-medium"
                  >
                    More Info...
                  </Link>
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  <p className="font-semibold">₹{product.price}</p>

                  <button
                    type="button"
                    onClick={() => addToCartHandler(product.id)}
                    className="rounded-lg bg-black px-4 py-2 text-white transition active:scale-95"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            ))}
          </Suspense>
        </div>
      </InfiniteScroll>
    </main>
  );
};

export default Products;
