// Test ID: IIDSAT

import { useFetcher, useLoaderData } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import OrderItem from "./OrderItem.jsx"
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import { useEffect } from "react";
import UpdatingOrder from "./UpdatingOrder.jsx";

function Order() {
  const order = useLoaderData();
  const fetcher = useFetcher();
  useEffect(() => {
    if (!fetcher.data && fetcher.state === 'idle')
      fetcher.load('/menu');
  }, [fetcher]);
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="px-4 py-6 space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h2 className="font-semibold text-xl"> Order #{id} Status</h2>
        <div className="space-x-4">
          {priority && <span className="bg-red-500 text-red-50 font-semibold uppercase text-sm py-1 px-3 rounded-full">Priority</span>}
          <span className="bg-green-500 text-green-50 font-semibold uppercase text-sm py-1 px-3 rounded-full">{status} order</span>
        </div>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-2 bg-stone-200 px-6 py-5">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-xs text-stone-500">(Estimated delivery: {formatDate(estimatedDelivery)})</p>
      </div>
      <ul className="divide-y divide-stone-200 border-b border-t">
        {cart.map(item => <OrderItem item={item} key={item.pizzaId}
          ingredients={fetcher?.data?.find((el) => el.id === item.pizzaId)?.ingredients ?? []}
          isLoadingIngredients={fetcher.state === "loading"}
        />)}
            </ul>
      
      <div className="space-y-2 px-6 py-5 bg-stone-200">
        <p className="text-sm text-stone-600 font-medium">Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && <p className="text-sm text-stone-600 font-medium">Price priority: {formatCurrency(priorityPrice)}</p>}
        <p className="font-bold">To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}</p>
      </div>
      {!priority && <UpdatingOrder/>}
    </div>
  );
}
export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}
export default Order;
