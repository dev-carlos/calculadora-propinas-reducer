export const formatCurrency = (quantity: number) => {
    return new Intl.NumberFormat(
        'es-Es', {
        style: 'currency', currency: 'EUR'
    }
    ).format(quantity)
}