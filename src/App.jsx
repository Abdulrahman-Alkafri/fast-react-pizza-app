import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./ui/Home";
import Cart from "./features/cart/Cart";
import Order, { loader as orderLoader } from "./features/order/Order";
import CreateOrder, {
  action as createOrder,
} from "./features/order/CreateOrder";
import Menu, { loader as menuLoader } from "./features/menu/Menu";
import AppLayout from "./ui/AppLayout";
import Error from "./ui/Error";
import { action as updateOrder } from "./features/order/UpdatingOrder"
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />,
      },
      {
        path: "/Cart",
        element: <Cart />,
      },
      {
        path: "/order/new",
        element: <CreateOrder />,
        action: createOrder,
      },
      {
        path: "/order/:orderId",
        element: <Order />,
        loader: orderLoader,
        action: updateOrder
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
