import { NavLink } from 'react-router-dom'
import { MapPin, ShoppingCartSimple } from '@phosphor-icons/react'

import { ICoffee } from '../context/cartContext'
import logo from '../assets/coffe-delivery-logo.svg'

interface HeaderProps {
  cart: ICoffee[]
}

export function Header({ cart }: HeaderProps) {
  return (
    <div className="py-8 flex flex-row justify-between">
      <NavLink to="/" title="home" state={{ cart }}>
        <img src={logo} alt="" />
      </NavLink>

      <div className="flex flex-row gap-3 text-sm">
        <button className="flex flex-row bg-purple-light items-center text-base-purple p-2 rounded-md gap-1 ">
          <MapPin size={22} weight="fill" />
          <span className="text-purple-dark">Porto Alegre, RS</span>
        </button>

        <NavLink to="/cart" title="carrinho" state={{ cart }}>
          <button className="bg-yellow-light text-yellow-dark p-2 rounded-md">
            {cart.length > 0 && <span>{cart.length}</span>}

            <ShoppingCartSimple size={22} weight="fill" />
          </button>
        </NavLink>
      </div>
    </div>
  )
}
