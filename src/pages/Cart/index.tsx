import { Fragment, useContext } from 'react'

import { CartContext, ICoffee } from '../../context/cartContext'

export function Cart() {
  const {
    cart,
    handleIncrementQnt,
    handleDecrementQnt,
    handleRemoveItemFromCart,
  } = useContext(CartContext)

  // console.log('cart', cart)
  return (
    <div>
      {cart?.map((e: ICoffee) => (
        <Fragment key={e.name}>
          <div style={{ border: '1px solid black' }}>
            <p>{e.name}</p>
            <button onClick={() => handleIncrementQnt(e)}>add</button>
            <button onClick={() => handleDecrementQnt(e)}>remove</button>
            <p>{e.quantity}</p>
            <p>
              {(e.quantity * parseFloat(e.price.replace(',', '.'))).toFixed(2)}
            </p>
          </div>
          <button onClick={() => handleRemoveItemFromCart(e)}>trash</button>
        </Fragment>
      ))}
    </div>
  )
}
