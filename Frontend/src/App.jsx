import MainRoutes from "./routes/MainRoutes";
import Nav from "./components/Nav";
import { Suspense, useEffect } from "react";
import { asyncCurrentUser } from "./store/actions/userActions";
import { useDispatch } from "react-redux";
import { asyncLoadProducts } from "./store/actions/productActions";


const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncCurrentUser());
    dispatch(asyncLoadProducts());
  }, []);
  return (
    <div className="min-h-screen w-full overflow-x-clip bg-gray-800 px-[5%] font-thin text-white">
      <Nav />

      <Suspense
        fallback={
          <div className="flex min-h-[50vh] items-center justify-center">
            <p>Loading page...</p>
          </div>
        }
      >
        <MainRoutes />
      </Suspense>
    </div>
  );
};

export default App;
