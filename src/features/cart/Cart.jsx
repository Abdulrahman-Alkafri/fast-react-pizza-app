import { Link } from 'react-router-dom';
import Button from '../../ui/Button';
import CartItem from './CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getCart } from './cartSlice';
import EmptyCart from "./EmptyCart"
 
function Cart() {
  
  const cart = useSelector(getCart);
  const username = useSelector(state => state.user.username);
  const dispatch = useDispatch();
  if (!cart.length) return <EmptyCart />
  return (
    <div className='px-4 py-3'>
      <Link to="/menu" className='text-blue-500 text-sm hover:text-blue-600 hover:underline'>&larr; Back to menu</Link>

      <h2 className='mt-7 font-semibold text-xl'>Your cart, {username}</h2>
      <ul className='divide-y mt-3 divide-stone-200 border-b'>
        {cart.map(item=><CartItem item={item} key={item.pizzaId}/>)}
      </ul>

      <div className='mt-3 space-x-2'>
        <Button to="/order/new" type="primary">Order pizzas</Button>
        <Button type="secondary" onClick={()=>dispatch(clearCart())}>Clear cart</Button>
      </div>
    </div>
  );
}

export default Cart;
