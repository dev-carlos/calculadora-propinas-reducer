export type MenuItem = {
    id: number,
    name: string,
    price: number
}

export type OrderItem = {
    quantity: number
} & MenuItem

export type Order = {
    orderItems: OrderItem[],
    tip: number
}
