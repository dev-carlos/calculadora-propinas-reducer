import { useEffect, useMemo, useReducer, useState } from "react"
import { menuItemsInit } from "./data/db"
import MenuItemComponent from "./components/MenuItemComponent"
import useOrder from "./hooks/useOrder"
import OrderItemComponent from "./components/OrderItemComponent"
import OrderTotalComponent from "./components/OrderTotalsComponent"
import TipComponent from "./components/TipComponent"
import { initialState, orderReducer } from "./reducer/useReducer"

function App() {
  const [state, dispatch] = useReducer(orderReducer, initialState)

  useEffect(() => {
    localStorage.setItem('order', JSON.stringify(state.order))
  }
    , [state.order])

  const subtotal = useMemo(() => state.order.orderItems.reduce((acc, current) =>
    acc + (current.quantity * current.price), 0), [state.order]);

  const propina = useMemo(() => (state.order.tip * subtotal) / 100, [subtotal, state.order.tip]);


  const total = useMemo(() => subtotal + propina, [subtotal, propina])



  return (
    <>
      <header className="bg-slate-500 py-5">
        <h1 className="text-3xl font-bold text-center">Calculadora de propinas</h1>
      </header>

      <main className="max-w-7xl mx-auto pt-2 grid md:grid-cols-2">
        <div className="p-5">
          <h2 className="text-4xl text-black font-bold">
            Menú
          </h2>
          <div className="space-y-3 mt-5">

            {
              state.menuItems.map(item => (
                <MenuItemComponent key={item.id} item={item} dispatch={dispatch} />
              ))
            }
          </div>
        </div>
        {

          <div className="border border-dashed border-slate-400 p-5">
            {
              state.order.orderItems.length ?
                (
                  <>
                    <OrderItemComponent order={state.order} dispatch={dispatch} />
                    <TipComponent tipSelected={state.order.tip} dispatch={dispatch} />
                    <OrderTotalComponent total={total} subtotal={subtotal} propina={propina} dispatch={dispatch} />
                  </>
                ) :
                <p className="text-center">La orden está vacía</p>

            }

          </div>
        }

      </main>

    </>
  )
}

export default App
