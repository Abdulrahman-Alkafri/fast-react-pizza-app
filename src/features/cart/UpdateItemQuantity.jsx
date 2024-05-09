import { useDispatch } from "react-redux"
import Button from "../../ui/Button"
import { decreaseItem, increaseItem } from "./cartSlice";

function UpdateItemQuantity({ pizzaId,getCurrrentQuantity }) {
    const dispatch = useDispatch();
    return (
        <div className="flex items-center gap-1 md:gap-3">
            <Button type="round" onClick={() => dispatch(decreaseItem(pizzaId))}>-</Button>
            <span className="font-medium text-sm">{getCurrrentQuantity}</span>
            <Button type="round" onClick={()=>dispatch(increaseItem(pizzaId))}>+</Button>
        </div>
    )
}

export default UpdateItemQuantity
