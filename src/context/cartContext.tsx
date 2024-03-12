/* eslint-disable camelcase */
import { ReactNode, createContext, useState } from 'react'

import coffee_list from '../mocks/coffee_list.json'

export interface ICoffee {
  name: string
  description: string
  price: string
  tags: string[]
  quantity: number
  img: string
}

interface IAvailableCoffees {
  name: string
  description: string
  price: string
  tags: string[]
  quantity: number
  img: string
}

interface CartContextType {
  cart: ICoffee[]
  availableCoffees: IAvailableCoffees[]
  handleIncrementQnt: (item: ICoffee) => void
  handleDecrementQnt: (item: ICoffee) => void
  handleAddItemToCart: (item: ICoffee) => void
  handleRemoveItemFromCart: (item: ICoffee) => void
}

interface CartContextProviderProps {
  children: ReactNode
}

export const CartContext = createContext({} as CartContextType)

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [cart, setCart] = useState<ICoffee[]>([])
  const [availableCoffees, setAvailableCoffees] =
    useState<ICoffee[]>(coffee_list)

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

  function handleRemoveItemFromCart(item: ICoffee) {
    try {
      const cartCopy = [...cart]
      const findIndexProduct = cartCopy.findIndex(
        (product) => product.name === item.name,
      )

      if (findIndexProduct !== -1) {
        cartCopy.splice(findIndexProduct, 1)
        setCart(cartCopy)
      } else {
        throw Error()
      }
    } catch (error) {
      return 'Erro na remoção do produto.'
    }
  }

  function handleIncrementQnt(item: ICoffee) {
    console.log('item', item)
    setAvailableCoffees((preValue) =>
      preValue.map((el) => {
        if (el.name === item.name) {
          return { ...el, quantity: el.quantity + 1 }
        }
        return el
      }),
    )

    setCart((preValue) =>
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

    setCart((preValue) =>
      preValue.map((el) => {
        if (el.name === item.name && el.quantity > 1) {
          return { ...el, quantity: el.quantity - 1 }
        } else if (el.name === item.name && el.quantity <= 1) {
          handleRemoveItemFromCart(el)
        }
        return el
      }),
    )
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        handleAddItemToCart,
        handleDecrementQnt,
        handleIncrementQnt,
        availableCoffees,
        handleRemoveItemFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
