import { formatCurrency } from "../../utils/helpers";

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="py-3 space-y-1">
      <div className="flex justify-between items-center text-sm gap-4">
        <p className="font-medium">
          <span className="font-bold">{quantity}&times;</span> {name}
        </p>
        <p className="font-bold">{formatCurrency(totalPrice)}</p>
      </div>
      <p className='italic text-stone-500 text-sm capitalize'>{isLoadingIngredients ? "Loading..." : ingredients.join(", ")}</p>
    </li>
  );
}

export default OrderItem;
