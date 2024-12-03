import { formatCurrency } from "../helpers/utils"
import { OrderActions } from "../reducer/useReducer"
import { Order } from "../types"

type Props = {
    order: Order,
    dispatch: React.Dispatch<OrderActions>
}

export default function OrderItemComponent({ order, dispatch }: Props) {

    return (
        <div>
            <h2 className="font-black text-4xl pb-5">
                Consumos
            </h2>
            <div className="space-y-3 mt5">

                {
                    order.orderItems.map(o => (
                        <div key={o.id} className="flex justify-between border-t border-slate-400 p-5 last-of-type:border-b items-center">
                            <div>
                                <p className="text-lg">{o.name} - {formatCurrency(o.price)}</p>
                                <p className="font-black">{o.quantity} - {formatCurrency(o.quantity * o.price)}</p>
                            </div>
                            <button
                                onClick={() => dispatch({ type: 'remove-item', payload: { orderItem: o } })} className="bg-red-600 w-8 h-8 rounded-full text-white font-black">X</button>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}