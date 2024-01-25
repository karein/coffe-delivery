/* eslint-disable camelcase */
import { useEffect, useState } from 'react'
import coffee_list from './mocks/coffee_list.json'

interface ICoffee {
  name: string
  description: string
  price: string
  tags: string[]
  quantity: number
}

export function App() {
  const [availableCoffees, setAvailableCoffees] =
    useState<ICoffee[]>(coffee_list)
  const [cart, setCart] = useState<ICoffee[]>([])
  const [formData, setFormData] = useState({
    cep: '',
    rua: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    uf: '',
  })

  // useEffect(() => {
  //   setAvailableCoffees(coffee_list)
  // }, [])

  function handleIncrementPrice(item: ICoffee) {
    setAvailableCoffees((preValue) =>
      preValue.map((el) => {
        if (el.name === item.name) {
          return { ...el, quantity: el.quantity + 1 }
        }
        return el
      }),
    )
  }

  function handleDecrementPrice(item: ICoffee) {
    setAvailableCoffees((preValue) =>
      preValue.map((el) => {
        if (el.name === item.name && el.quantity > 0) {
          return { ...el, quantity: el.quantity - 1 }
        }
        return el
      }),
    )
  }

  function handleAddItemToCart(item: ICoffee) {
    // setCart((preValue) => [...preValue, item])

    if (item.quantity > 0) {
      setCart((preValue) => {
        const isItemInCart = preValue.some((e) => e.name === item.name)

        if (!isItemInCart) {
          return [...preValue, item]
        }

        return preValue
      })
    }

    return null
  }

  function handleRemoveFromCartItem(itemName: string) {
    setCart((prevState) => {
      const itemExist = prevState.some((e) => e.name === itemName)

      if (itemExist) {
        return prevState.filter((e) => e.name !== itemName)
      }

      return prevState
    })
  }

  function handleSubmit(data: any) {
    data.preventDefault()
    console.log('data', data)
  }

  // function handleChange(event: any) {
  //   console.log('event', event.target.value)
  //   setFormData((prevState)=>{...prevState, })
  // }

  console.log('form', formData, '\n\n\n')

  return (
    <>
      <div>
        <h2>Cart Qnt: {cart.length > 0 && cart.length}</h2>
        {availableCoffees.map((coffee) => (
          <div key={coffee.name}>
            <div>
              <span>{coffee.name}</span>
              <br />
              <span>{coffee.description}</span>
              <br />
              <span>{coffee.price}</span>
              <br />
              <span>{coffee.quantity}</span>
            </div>
            <button onClick={() => handleIncrementPrice(coffee)}>
              increment
            </button>
            <button onClick={() => handleDecrementPrice(coffee)}>
              decrement
            </button>
            <button
              disabled={coffee.quantity < 1}
              onClick={() => handleAddItemToCart(coffee)}
            >
              Add Cart
            </button>
            <button onClick={() => handleRemoveFromCartItem(coffee.name)}>
              remove from cart
            </button>
            <br></br>
            <br></br>
          </div>
        ))}
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="cep"
            id="cep"
            placeholder="cep"
            onChange={(e) => setFormData({ ...formData, cep: e.target.value })}
            value={formData.cep}
          />
          <input
            type="text"
            maxLength={11}
            name="rua"
            id="rua"
            placeholder="rua"
            onChange={(e) => setFormData({ ...formData, rua: e.target.value })}
            value={formData.rua}
          />
          <p>
            <input
              type="number"
              name="numero"
              id="numero"
              placeholder="numero"
              onChange={(e) =>
                setFormData({ ...formData, numero: e.target.value })
              }
              value={formData.numero}
            />
            <input
              type="text"
              name="complemento"
              id="complemento"
              placeholder="complemento (opcional)"
              onChange={(e) =>
                setFormData({ ...formData, complemento: e.target.value })
              }
              value={formData.complemento}
            />
          </p>
          <p>
            <input
              type="text"
              name="bairro"
              id="bairro"
              placeholder="bairro"
              onChange={(e) =>
                setFormData({ ...formData, bairro: e.target.value })
              }
              value={formData.bairro}
            />
            <input
              type="text"
              name="cidade"
              id="cidade"
              placeholder="cidade"
              onChange={(e) =>
                setFormData({ ...formData, cidade: e.target.value })
              }
              value={formData.cidade}
            />
            <input
              type="text"
              name="uf"
              id="uf"
              placeholder="uf"
              maxLength={2}
              onChange={(e) => setFormData({ ...formData, uf: e.target.value })}
              value={formData.uf}
            />
          </p>

          <button type="submit">Confirmar</button>
        </form>

        {/* <div>
          <button>credito</button>
          <button>debito</button>
          <button>dinheiro</button>
        </div> */}
      </div>
    </>
  )
}
