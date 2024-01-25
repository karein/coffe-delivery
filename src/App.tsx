/* eslint-disable camelcase */
import { useEffect, useRef, useState } from 'react'
import coffee_list from './mocks/coffee_list.json'

interface ICoffee {
  name: string
  description: string
  price: string
  tags: string[]
  quantity: number
}

let outRenderCount = 0

export function App() {
  const [availableCoffees, setAvailableCoffees] =
    useState<ICoffee[]>(coffee_list)
  const [cart, setCart] = useState<ICoffee[]>([])
  const [tipoPagamento, setTipoPagamento] = useState<
    'credito' | 'debito' | 'dinheiro' | null
  >()
  const [sumItensValue, setSumItensValue] = useState('')

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

  const renderCount = useRef(0)
  useEffect(() => {
    renderCount.current = renderCount.current + 1
  })

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
    // console.log('data', data)
    console.log('form', formData, '\n\n\n')
    console.log('cart', cart, '\n\n\n')
    let preco = 0
    cart.map((e) => {
      console.log('e.price', e.price, e.quantity, '\n')
      console.log('replace', e.price.replace(',', '.'), '\n')
      console.log('parseFloat(e.price)', parseFloat(e.price), '\n')
      console.log(
        "e.price.replace(',', '.')",
        parseFloat(e.price.replace(',', '.')) * e.quantity,
        '\n',
      )
      return (preco += parseFloat(e.price.replace(',', '.')) * e.quantity)
    })
    console.log('price', preco.toFixed(2))
    setSumItensValue(preco.toFixed(2))
  }

  // function handleChange(event: any) {
  //   console.log('event', event.target.value)
  //   setFormData((prevState)=>{...prevState, })
  // }

  outRenderCount++

  console.count('counter')

  return (
    <>
      <div>
        <span>outRenderCount: {outRenderCount}</span>
        <br></br>
        <span>renderCount: {renderCount.current}</span>
      </div>
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
        <br></br>
        <div>
          <button onClick={() => setTipoPagamento('credito')}>credito</button>
          <button onClick={() => setTipoPagamento('debito')}>debito</button>
          <button onClick={() => setTipoPagamento('dinheiro')}>dinheiro</button>
        </div>
        <br></br>
        <div>Price:{sumItensValue}</div>
      </div>
    </>
  )
}
