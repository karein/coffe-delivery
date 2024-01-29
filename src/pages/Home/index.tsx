/* eslint-disable camelcase */
import { useContext } from 'react'
import { NavLink } from 'react-router-dom'

import { CartContext } from '../../context/cartContext'

export function Home() {
  const {
    cart,
    availableCoffees,
    handleAddItemToCart,
    handleDecrementQnt,
    handleIncrementQnt,
  } = useContext(CartContext)

  console.log('CART HOME', cart)

  return (
    <>
      <h2>QNT: {cart.length}</h2>
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
