import { OrderActions } from "../reducer/useReducer"
import { MenuItem } from "../types"

type MenuItemProps = {
    item: MenuItem,
    dispatch: React.Dispatch<OrderActions>
}

export default function MenuItemComponent({ item, dispatch }: MenuItemProps) {

    return (
        <button onClick={() => dispatch({ type: 'add-item', payload: { menuItem: item } })}
            className="border-2 border-slate-400 w-full p-10 hover:bg-gray-100"
        >
            <div className="flex justify-between ">
                <p>{item.name}</p>
                <p className="font-bold text-right">{item.price} €</p>
            </div>

        </button>
    )
}