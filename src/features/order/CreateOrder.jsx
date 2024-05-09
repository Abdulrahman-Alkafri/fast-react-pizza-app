import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import store from "../../store"
import EmptyCart from "../cart/EmptyCart"
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";
import { fetchAddress } from "../user/userSlice";
// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false),
        dispatch = useDispatch(),
    {
      username,
      status: addressStatus,
      position,
      address,
      error: addressError
    } = useSelector(state => state.user),
    isLoading = addressStatus === "loading",
        cart = useSelector(getCart),
        totalCartPrice = useSelector(getTotalCartPrice),
        priorityPrice = withPriority ? totalCartPrice * 0.2 : 0,
        totalPrice = totalCartPrice + priorityPrice,
        navigation = useNavigation(),
        isSubmitting = navigation.state === "submitting",
        formError = useActionData();
  if (!cart.length) return <EmptyCart />;
  return (
    <div className="px-4 py-6">
      <h2 className="text-xl font-semibold mb-8">Ready to order? Let's go!</h2>
      
      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:items-center sm:flex-row">
          <label className="sm:basis-40">First Name</label>
          <input defaultValue={username} className="input grow" type="text" name="customer" required />
        </div>
        <div className="mb-5 flex flex-col gap-2 sm:items-center sm:flex-row">
          <label className="sm:basis-40" >Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
          </div>
          {formError?.phone && <p className="mt-2 p-2 text-xs bg-red-100 text-red-700 rounded-full">{formError.phone}</p>}
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:items-center sm:flex-row relative">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="address"
              defaultValue={address}
              disabled={isLoading}
              required />
            {addressStatus === "error" && !address && <p className="mt-2 p-2 text-xs bg-red-100 text-red-700 rounded-full">{addressError}</p>}
          </div>
          <span className='absolute right-[0px] top-[35px] z-50 sm:right-0 sm:-top-[-4px] md:right-[-2px] md:top-[0px]'>
            {!address && <Button disabled={isLoading} type="small" onClick={() => dispatch(fetchAddress())}>
              Get Location
            </Button>}
          </span>
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input 
            className="accent-yellow-400 w-6 focus:ring-yellow-400 h-6 focus:outline-none focus:ring focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input type="hidden" name="position" value={position.longitude &&position.latitude ? `${position.latitude},${position.longitude}` :""} />
          <Button disabled={isSubmitting || isLoading} type="primary"
          >
            {isSubmitting ? "placing order..." : `Order now for ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}
export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };
  console.log(order);
  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      "please give us your correct phone number. we might need to contact you.";
  if (Object.keys(errors).length) return errors;
  const newOrder = await createOrder(order);
  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
