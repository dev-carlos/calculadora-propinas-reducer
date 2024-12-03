
import { formatCurrency } from "../helpers/utils"
import { OrderActions } from "../reducer/useReducer";

type Props = {
    subtotal: number,
    propina: number,
    total: number,
    dispatch: React.Dispatch<OrderActions>
}

export default function OrderTotalComponent({ subtotal, propina, total, dispatch }: Props) {

    const disabled = total === 0;

    return (
        <>
            <div className="space-y-3 my-5">
                <h2 className="font-black text-2xl">Total y propinas</h2>
                <p className="font-black">Subtotal: {formatCurrency(subtotal)}</p>
                <p className="font-black">Propina: {formatCurrency(propina)}</p>
                <p className="font-black">TOTAL: {formatCurrency(total)}</p>
            </div>
            <button onClick={() => dispatch({ type: 'save' })} className="w-full bg-black uppercase text-white py-4 disabled:opacity-20"
                disabled={disabled}>
                Guardar pedido
            </button>
        </>
    )

}