import { OrderActions } from "../reducer/useReducer"
import { Order } from "../types"

type Props = {
    tipSelected: Order['tip']
    dispatch: React.Dispatch<OrderActions>
}

export default function TipComponent({ dispatch, tipSelected }: Props) {

    const tipOptions = [
        {
            id: 'tip-10',
            value: 10,
            label: '10'
        },
        {
            id: 'tip-20',
            value: 20,
            label: '20'
        },
        {
            id: 'tip-50',
            value: 50,
            label: '50'
        },
    ]

    return (
        <div>
            <h3 className="font-black text-2xl">Propina</h3>
            <form>
                {
                    tipOptions.map(tip => (
                        <div key={tip.id}>
                            <label htmlFor="">{tip.label}% </label>
                            <input checked={tip.value === tipSelected} type="radio" id={tip.id} value={tip.value} name="tip" onChange={(e) => dispatch({ type: 'set-tip', payload: { tip: +e.target.value } })} />
                        </div>
                    ))
                }
            </form>
        </div>
    )

}