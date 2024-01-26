/* eslint-disable camelcase */
import { useState } from 'react'
import { NavLink } from 'react-router-dom'

import coffee_list from '../../mocks/coffee_list.json'

export interface ICoffee {
  name: string
  description: string
  price: string
  tags: string[]
  quantity: number
}

export function Home() {
  const [availableCoffees, setAvailableCoffees] =
    useState<ICoffee[]>(coffee_list)
  const [cart, setCart] = useState<ICoffee[]>([])

  function handleAddItemToCart(item: ICoffee) {
    if (item.quantity > 0) {
      setCart((preValue) => {
        const isItemInCart = preValue.some((e) => e.name === item.name)

        if (!isItemInCart) {
          return [...preValue, item]
        }

        const updateExistent = preValue.filter((e) => e.name !== item.name)
        return [...updateExistent, item]
      })
    }

    return null
  }

  function handleIncrementQnt(item: ICoffee) {
    setAvailableCoffees((preValue) =>
      preValue.map((el) => {
        if (el.name === item.name) {
          return { ...el, quantity: el.quantity + 1 }
        }
        return el
      }),
    )
  }

  function handleDecrementQnt(item: ICoffee) {
    setAvailableCoffees((preValue) =>
      preValue.map((el) => {
        if (el.name === item.name && el.quantity > 1) {
          return { ...el, quantity: el.quantity - 1 }
        }
        return el
      }),
    )
  }

  console.log('CART HOME', cart)

  return (
    <>
      <header>
        logo; local;
        <NavLink to="/cart" title="carrinho" state={{ cart }}>
          <button>carrinho</button>
        </NavLink>
      </header>
      <br></br>
      <div>painel</div>
      <br></br>
      <div>
        <h2>Nossos cafés</h2>
        {availableCoffees.map((coffee) => (
          <div key={coffee.name} style={{ border: '1px solid black' }}>
            <div>
              <span>{coffee.name}</span>
              <br />
              <span>{coffee.description}</span>
              <br />
              <span>{coffee.price}</span>
              <br />
              <span>{coffee.quantity}</span>
            </div>
            <button onClick={() => handleIncrementQnt(coffee)}>
              increment
            </button>
            <button onClick={() => handleDecrementQnt(coffee)}>
              decrement
            </button>
            <button
              disabled={coffee.quantity < 1}
              onClick={() => handleAddItemToCart(coffee)}
            >
              Add Cart
            </button>
          </div>
        ))}
      </div>
    </>
  )
}
