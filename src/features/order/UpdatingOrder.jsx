import { useFetcher } from "react-router-dom"
import Button from "../../ui/Button" 
import { updateOrder } from "../../services/apiRestaurant";
function UpdatingOrder() {
    const fetcher = useFetcher();
    return (
        <fetcher.Form method='PATCH' className='text-right'>
        <Button type="primary">Make Priority</Button>
        </fetcher.Form>
        
    )
}

export default UpdatingOrder;
export async function action({ params }) {
    const data = { priority: true };
    await updateOrder(params.orderId, data);
    return null

}