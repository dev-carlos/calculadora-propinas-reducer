import { useState, useMemo } from "react"
import { MenuItem, OrderItem } from "../types"

export default function useOrder() {
    const [order, setOrder] = useState<OrderItem[]>([])
    const [tip, setTip] = useState(0);


    const addItem = (item: MenuItem) => {
        const index = order.findIndex((i) => i.id === item.id);

        if (index >= 0) {
            const newOrder = order.map(i =>
                i.id === item.id ? { ...item, quantity: i.quantity + 1 } : i
            )
            setOrder(newOrder)
        }
        else {
            const newOrderItem: OrderItem = {
                ...item,
                quantity: 1,
            }
            setOrder(prevOrder => [...prevOrder, newOrderItem])
        }
    }

    const removeItem = (item: OrderItem) => {
        let newOrder = [];
        if (item.quantity > 1) {
            newOrder = order.map(o => {
                if (o.id === item.id) {
                    return {
                        ...o, quantity: o.quantity - 1
                    }
                }
                return o;

            });
        }
        else {
            newOrder = order.filter(o => o.id !== item.id)
        }
        setOrder(newOrder)
    }

    const save = () => {
        setOrder([])
    }

    const subtotal = useMemo(() => order.reduce((acc, current) =>
        acc + (current.quantity * current.price), 0), [order]);

    const propina = useMemo(() => (tip * subtotal) / 100, [subtotal, tip]);


    const total = useMemo(() => subtotal + propina, [subtotal, propina])

    return {
        addItem,
        removeItem,
        order,
        propina,
        setTip,
        total,
        subtotal,
        save
    }
}