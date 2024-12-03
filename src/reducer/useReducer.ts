import { MenuItem, OrderItem, Order } from "../types";
import { menuItemsInit as db } from '../data/db';

export type OrderActions =
    { type: 'add-item', payload: { menuItem: MenuItem } } |
    { type: 'remove-item', payload: { orderItem: OrderItem } } |
    { type: 'set-tip', payload: { tip: Order['tip'] } } |
    { type: 'save' }

export type OrderState = {
    menuItems: MenuItem[],
    order: Order
}

const defaultOrder: Order = { orderItems: [], tip: 10 }

const initialOrder = (): Order => {
    const localStorageOrder = localStorage.getItem('order');
    return localStorageOrder ? JSON.parse(localStorageOrder) : defaultOrder;
}


export const initialState: OrderState = {
    order: initialOrder(),
    menuItems: db
}

export const orderReducer = (
    state: OrderState = initialState,
    action: OrderActions
) => {
    if (action.type === 'add-item') {
        const menuItem = action.payload.menuItem
        const itemExist = state.order.orderItems.find(item => item.id === menuItem.id)
        let newOrderItems: OrderItem[] = [];
        if (itemExist) {
            newOrderItems = state.order.orderItems.map(item => {

                return item.id === menuItem.id ? {
                    ...item,
                    quantity: item.quantity + 1
                } :
                    item
            })

        }
        else {
            const newItem: OrderItem = { ...action.payload.menuItem, quantity: 1 }
            newOrderItems = [...state.order.orderItems, newItem]
        }
        return {
            ...state,
            order: { ...state.order, orderItems: newOrderItems }
        };
    }

    if (action.type === 'remove-item') {
        const newOrderItems = state.order.orderItems.filter(item => item.id !== action.payload.orderItem.id)

        return {
            ...state,
            order: { ...state.order, orderItems: newOrderItems }
        }
    }

    if (action.type === 'save') {

        return {
            ...state,
            order: { ...defaultOrder }
        }
    }
    if (action.type === 'set-tip') {
        const newTip = action.payload.tip;

        return {
            ...state,
            order: { ...state.order, tip: newTip }
        }
    }

    return state
}