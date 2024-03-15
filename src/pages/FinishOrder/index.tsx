/* eslint-disable camelcase */
import { useContext } from 'react'

import { Header } from '../../components/header'
import { CartContext } from '../../context/cartContext'

export function FinishOrder() {
  const { cart } = useContext(CartContext)

  return (
    <div className="mb-40">
      <Header cart={cart} />
    </div>
  )
}
