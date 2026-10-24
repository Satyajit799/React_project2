import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { asyncUpdateUser } from "../store/actions/userActions";

const Cart = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.users);
  const products = useSelector((state) => state.productReducer.products) ?? [];

  const [updating, setUpdating] = useState(false);

  const cart = user?.cart ?? [];

  const cartItems = cart
    .map((item) => {
      const product = products.find(
        (p) => String(p.id) === String(item.productId),
      );

      return product ? { ...item, product } : null;
    })
    .filter(Boolean);

  const totalItems = cart.reduce(
    (sum, item) => sum + Number(item.quantity || 0),
    0,
  );

  const totalPrice = cartItems.reduce(
    (sum, item) =>
      sum + Number(item.product.price || 0) * Number(item.quantity || 0),
    0,
  );

  // Save cart changes to Redux, localStorage, and json-server
  const saveCart = async (newCart) => {
    if (!user?.id || updating) return;

    setUpdating(true);

    try {
      await dispatch(
        asyncUpdateUser({
          ...user,
          cart: newCart,
        }),
      );
    } catch (error) {
      console.error("Cart update failed:", error);
    } finally {
      setUpdating(false);
    }
  };

  const increaseQuantity = (productId) => {
    const newCart = cart.map((item) =>
      String(item.productId) === String(productId)
        ? { ...item, quantity: Number(item.quantity || 0) + 1 }
        : item,
    );

    saveCart(newCart);
  };

  const decreaseQuantity = (productId) => {
    const newCart = cart
      .map((item) =>
        String(item.productId) === String(productId)
          ? { ...item, quantity: Number(item.quantity || 0) - 1 }
          : item,
      )
      .filter((item) => Number(item.quantity) > 0);

    saveCart(newCart);
  };

  const removeItem = (productId) => {
    const newCart = cart.filter(
      (item) => String(item.productId) !== String(productId),
    );

    saveCart(newCart);
    toast.info("Item removed from cart");
  };

  if (!user) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <h2 className="mb-3 text-2xl font-bold">Please log in</h2>
        <p className="mb-6 text-gray-500">Log in to view your shopping cart.</p>
        <Link
          to="/login"
          className="inline-block rounded-lg bg-indigo-600 px-6 py-3 text-white hover:bg-indigo-700"
        >
          Login
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen px-4 py-8 text-gray-900 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl text-white font-bold sm:text-4xl">Shopping Cart</h1>
            <p className="mt-2 text-gray-500">
              {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
            </p>
          </div>

          <Link
            to="/"
            className="font-medium text-xl text-indigo-600 hover:text-indigo-800"
          >
            ← Continue shopping
          </Link>
        </div>

        {cart.length === 0 ? (
          <div className="rounded-2xl bg-slate-400 px-6 py-16 text-center shadow-sm">
            <div className="mb-4 text-6xl">🛒</div>
            <h2 className="text-2xl font-semibold">Your cart is empty</h2>
            <p className="mt-2 text-gray-100">
              Discover products and add your favourites.
            </p>
            <Link
              to="/"
              className="mt-6 inline-block rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700"
            >
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
            {/* Cart product list */}
            <section className="space-y-4 lg:col-span-2">
              {cartItems.map(({ product, quantity }) => (
                <article
                  key={product.id}
                  className="flex flex-col gap-4 rounded-2xl bg-slate-400 p-4 shadow-sm sm:flex-row sm:items-center"
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-36 w-full rounded-xl bg-gray-100 object-contain sm:h-28 sm:w-28"
                  />

                  <div className="min-w-0 flex-1">
                    <h2 className="wrap-break-words text-lg font-semibold">
                      {product.title}
                    </h2>

                    <p className="mt-1 text-gray-100">
                      ₹{Number(product.price).toLocaleString("en-IN")}
                    </p>

                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <div className="flex items-center rounded-lg border border-gray-300">
                        <button
                          type="button"
                          aria-label="Decrease quantity"
                          disabled={updating}
                          onClick={() => decreaseQuantity(product.id)}
                          className="px-3 py-2 hover:bg-gray-100 disabled:opacity-50 rounded-sm"
                        >
                          −
                        </button>

                        <span className="min-w-10 text-center font-medium">
                          {quantity}
                        </span>

                        <button
                          type="button"
                          aria-label="Increase quantity"
                          disabled={updating}
                          onClick={() => increaseQuantity(product.id)}
                          className="px-3 py-2 hover:bg-gray-100 disabled:opacity-50 rounded-sm"
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        disabled={updating}
                        onClick={() => removeItem(product.id)}
                        className="text-sm font-medium bg-red-800 text-white px-2 py-2 rounded-xl disabled:opacity-50"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="font-bold sm:text-right">
                    ₹
                    {(
                      Number(product.price || 0) * Number(quantity || 0)
                    ).toLocaleString("en-IN")}
                  </div>
                </article>
              ))}

              {cartItems.length === 0 && cart.length > 0 && (
                <div className="rounded-xl bg-white p-6 text-gray-600">
                  These products could not be found. Return to the products page
                  and check that the product IDs still exist.
                </div>
              )}
            </section>

            {/* Order summary */}
            <aside className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm lg:sticky lg:top-6">
              <h2 className="text-xl font-bold">Order Summary</h2>

              <div className="mt-6 space-y-4">
                <div className="flex justify-between gap-4 text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{totalPrice.toLocaleString("en-IN")}</span>
                </div>

                <div className="flex justify-between gap-4 text-gray-600">
                  <span>Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between gap-4 text-lg font-bold">
                    <span>Total</span>
                    <span>₹{totalPrice.toLocaleString("en-IN")}</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                disabled={updating || cartItems.length === 0}
                onClick={() =>
                  toast.info("Checkout functionality coming soon!")
                }
                className="mt-6 w-full rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {updating ? "Updating cart..." : "Proceed to Checkout"}
              </button>

              <p className="mt-4 text-center text-xs text-gray-500">
                Your cart is saved to your account.
              </p>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
};

export default Cart;
