/* eslint-disable camelcase */
import { redirect, useNavigate } from 'react-router-dom'
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react'
import {
  MapPinLine,
  Plus,
  Minus,
  CurrencyDollar,
  Money,
  CreditCard,
  Bank,
  Trash,
} from '@phosphor-icons/react'

import { CartContext } from '../../context/cartContext'
import { Header } from '../../components/header'

// type PaymentType = 'credit-card' | 'debit-card' | 'money' | null

export type PaymentType = string | null

export interface Endereco {
  cep: string
  rua: string
  numero: string
  complemento: string
  bairro: string
  cidade: string
  uf: string
}

interface ItensPedidos {
  name: string
  quantity: number
  valor: number
  img: string
}

interface Totais {
  total_itens: number
  valor_entrega: number
  valor_total: number
}

interface ResumoPedido {
  itens: ItensPedidos[]
  totais: Totais
}

interface PedidoFechado {
  endereco: Endereco
  forma_pagamento: PaymentType
  resumo_pedido: ResumoPedido
}

const enderecoObj = {
  cep: '',
  rua: '',
  numero: '',
  complemento: '',
  bairro: '',
  cidade: '',
  uf: '',
}

const resumoPedidoObj = {
  itens: [],
  totais: {
    total_itens: 0,
    valor_entrega: 0,
    valor_total: 0,
  },
}

export function Cart() {
  const navigate = useNavigate()

  const {
    cart,
    handleIncrementQnt,
    handleDecrementQnt,
    handleRemoveItemFromCart,
  } = useContext(CartContext)

  const [formEndereco, setFormEndereco] = useState<Endereco>(enderecoObj)
  const [paymentType, setPaymentType] = useState<PaymentType>(null)
  const [resumoPedido, setResumoPedido] =
    useState<ResumoPedido>(resumoPedidoObj)
  const [pedidoFinal, setPedidoFinal] = useState<PedidoFechado>({
    endereco: enderecoObj,
    forma_pagamento: null,
    resumo_pedido: resumoPedidoObj,
  })
  // const [pedidoFinal, setPedidoFinal] = useState<PedidoFechado>({
  //   endereco: formEndereco,
  //   forma_pagamento: paymentType,
  //   resumo_pedido: resumoPedido,
  // })

  useEffect(() => {
    // if (cart.length > 0) {
    setResumoPedido((prevState) => {
      const pedidosArr = cart.map((e) => {
        return {
          name: e.name,
          quantity: e.quantity,
          valor: parseFloat(e.price.replace(',', '.')) * e.quantity,
          img: e.img,
        }
      })

      const totalItens = pedidosArr.reduce((acc, item) => acc + item.valor, 0)
      const valorEntrega = 3.5
      const valorTotal = totalItens + valorEntrega

      return {
        ...prevState,
        itens: pedidosArr,
        totais: {
          total_itens: totalItens,
          valor_entrega: valorEntrega,
          valor_total: valorTotal,
        },
      }
    })

    // }
  }, [cart])

  const submitConfirmarPedido = (event: FormEvent) => {
    event.preventDefault()

    if (!paymentType) {
      alert('Selecione uma forma de pagamento!')
    }

    const finishOrder = {
      endereco: formEndereco,
      forma_pagamento: paymentType,
      resumo_pedido: resumoPedido,
    }

    console.log('finishOrder', finishOrder)
    setPedidoFinal({ ...finishOrder })
    return navigate('/finish-order', {
      state: { endereco: formEndereco, forma_pagamento: paymentType },
    })
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setFormEndereco((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  function handleChangePayment(event: ChangeEvent<HTMLInputElement>) {
    // setPaymentType(event.target.value as PaymentType)
    setPaymentType(event.target.value)
  }

  return (
    <div className="mb-40">
      <Header cart={cart} />

      <form
        onSubmit={submitConfirmarPedido}
        className="flex flex-row flex-wrap gap-8"
      >
        {/* Form - complete seu pedido */}
        <div className="flex flex-col gap-3 flex-1">
          <span className="text-base-subtitle font-baloo2 font-bold text-lg">
            Complete seu pedido
          </span>

          <div className="flex flex-col gap-3">
            {/* Endereço */}
            <div className="bg-base-card p-10 rounded-md flex-col flex gap-8">
              <div className="flex flex-row items-start gap-2">
                <MapPinLine size={22} className="text-yellow-dark" />
                <div className="flex flex-col items-start">
                  <span className="text-base-subtitle text-base">
                    Endereço de Entrega
                  </span>
                  <span className="text-base-text text-sm">
                    Informe o endereço onde deseja receber seu pedido
                  </span>
                </div>
              </div>

              <div className="grid gap-x-3 xl:grid-cols-8 gap-y-4 text-sm text-base-text">
                <input
                  required
                  name="cep"
                  type="text"
                  maxLength={8}
                  value={formEndereco.cep}
                  onChange={handleInputChange}
                  placeholder="CEP"
                  className="block bg-base-input p-3 rounded col-span-3 border-solid border-[1px] border-base-button placeholder:text-base-label"
                />
                <input
                  required
                  name="rua"
                  type="text"
                  placeholder="Rua"
                  value={formEndereco.rua}
                  onChange={handleInputChange}
                  className="bg-base-input p-3 rounded col-span-8 border-solid border-[1px] border-base-button placeholder:text-base-label"
                />
                <input
                  required
                  type="text"
                  name="numero"
                  placeholder="Número"
                  value={formEndereco.numero}
                  onChange={handleInputChange}
                  className="bg-base-input p-3 rounded col-span-3 border-solid border-[1px] border-base-button placeholder:text-base-label"
                />
                <input
                  type="text"
                  name="complemento"
                  placeholder="Complemento"
                  onChange={handleInputChange}
                  value={formEndereco.complemento}
                  className="bg-base-input p-3 rounded col-span-5 border-solid border-[1px] border-base-button placeholder:text-base-label"
                />
                <input
                  required
                  type="text"
                  name="bairro"
                  placeholder="Bairro"
                  value={formEndereco.bairro}
                  onChange={handleInputChange}
                  className="bg-base-input p-3 rounded col-span-3 border-solid border-[1px] border-base-button placeholder:text-base-label"
                />
                <input
                  required
                  type="text"
                  name="cidade"
                  placeholder="Cidade"
                  value={formEndereco.cidade}
                  onChange={handleInputChange}
                  className="bg-base-input p-3 rounded flex-1 col-span-4 border-solid border-[1px] border-base-button placeholder:text-base-label"
                />
                <input
                  required
                  name="uf"
                  type="text"
                  maxLength={2}
                  placeholder="UF"
                  value={formEndereco.uf}
                  onChange={handleInputChange}
                  className="bg-base-input p-3 rounded max-w-[60px] border-solid border-[1px] border-base-button placeholder:text-base-label"
                />
              </div>
            </div>

            {/* pagamento */}
            <div className="bg-base-card p-10 rounded-md flex-col flex gap-8">
              <div className="flex flex-row items-start gap-2">
                <CurrencyDollar size={22} className="text-base-purple" />
                <div className="flex flex-col items-start">
                  <span className="text-base-subtitle text-base">
                    Pagamento
                  </span>
                  <span className="text-base-text text-sm">
                    O pagamento é feito na entrega. Escolha a forma que deseja
                    pagar
                  </span>
                </div>
              </div>

              <ul className="text-base-text text-xs gap-3 grid xl:grid-cols-3">
                <li>
                  <input
                    type="radio"
                    id="credit-card"
                    name="payment-type"
                    value="credit-card"
                    className="peer/debit hidden"
                    onChange={handleChangePayment}
                    // checked={paymentType === 'credit-card'}
                  />
                  <label
                    htmlFor="credit-card"
                    className="bg-base-button p-4 rounded-md flex gap-3 items-center cursor-pointer hover:bg-base-hover peer-checked/debit:bg-purple-light peer-checked/debit:ring-1 peer-checked/debit:ring-base-purple"
                  >
                    <CreditCard size={16} className="text-base-purple" />
                    <span>CARTÃO DE CRÉDITO</span>
                  </label>
                </li>

                <li>
                  <input
                    type="radio"
                    id="debit-card"
                    name="payment-type"
                    value="debit-card"
                    className="peer/credit hidden"
                    onChange={handleChangePayment}
                  />
                  <label
                    htmlFor="debit-card"
                    className="bg-base-button p-4 rounded-md flex gap-3 items-center cursor-pointer hover:bg-base-hover peer-checked/credit:bg-purple-light peer-checked/credit:ring-1 peer-checked/credit:ring-base-purple"
                  >
                    <Bank size={16} className="text-base-purple" />
                    <span>CARTÃO DE DÉBITO</span>
                  </label>
                </li>

                <li>
                  <input
                    type="radio"
                    id="money"
                    name="payment-type"
                    value="money"
                    className="peer/money hidden"
                    onChange={handleChangePayment}
                  />
                  <label
                    htmlFor="money"
                    className="bg-base-button p-4 rounded-md flex gap-3 items-center cursor-pointer hover:bg-base-hover peer-checked/money:bg-purple-light peer-checked/money:ring-1 peer-checked/money:ring-base-purple"
                  >
                    <Money size={16} className="text-base-purple" />
                    <span>DINHEIRO</span>
                  </label>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Resumo Pedido - cafés selecionados */}
        <div className="flex flex-col gap-3 xl:max-w-[450px] md:flex-1">
          <span className="text-base-subtitle font-baloo2 font-bold text-lg">
            Cafés selecionados
          </span>

          <div className="bg-base-card p-10 flex flex-col gap-6  rounded-tl-md rounded-tr-[44px] rounded-bl-[44px] rounded-br-md">
            {/* lista itens */}
            {resumoPedido.itens.length > 0 ? (
              resumoPedido.itens?.map((e: ItensPedidos) => (
                <div key={e.name}>
                  {/* item */}
                  <div className="flex flex-row justify-between text-base gap-[50px]">
                    <div className="flex flex-row gap-5">
                      <img src={e.img} alt="" className="max-w-16 max-h-16" />

                      <div className="flex flex-col gap-2 ">
                        <span className="text-base-subtitle">{e.name}</span>

                        <div className="flex flex-row gap-2">
                          <div className="bg-base-button rounded-md p-2 flex flex-row gap-1 max-h-8 items-center">
                            <button
                              onClick={() =>
                                handleIncrementQnt({ name_item: e.name })
                              }
                            >
                              <Plus size={14} className="text-base-purple" />
                            </button>
                            <span className="text-base-title">
                              {e.quantity}
                            </span>
                            <button
                              onClick={() =>
                                handleDecrementQnt({ name_item: e.name })
                              }
                            >
                              <Minus size={14} className="text-base-purple" />
                            </button>
                          </div>
                          <button
                            onClick={() =>
                              handleRemoveItemFromCart({ name_item: e.name })
                            }
                            className="bg-base-button text-base-text text-xs flex flex-row gap-1 items-center p-2 rounded-md"
                          >
                            <Trash size={16} className="text-base-purple" />
                            REMOVER
                          </button>
                        </div>
                      </div>
                    </div>

                    <span className="text-base-text font-bold">
                      R$ {e.valor.toFixed(2).replace('.', ',')}
                    </span>
                  </div>

                  {/* divider */}
                  <div className="h-[1px] w-full bg-base-button mt-6" />
                </div>
              ))
            ) : (
              <span className="text-xl text-base-subtitle self-center">
                Nenhum item adicionado ao carrinho
              </span>
            )}

            {/* totais */}
            <div>
              <div className="flex flex-row justify-between text-sm text-base-text">
                <span>Total de itens</span>
                <span className="text-base">
                  R${' '}
                  {resumoPedido.totais.total_itens.toFixed(2).replace('.', ',')}
                </span>
              </div>
              <div className="flex flex-row justify-between text-sm text-base-text">
                <span>Entrega</span>
                <span className="text-base">
                  R${' '}
                  {resumoPedido.totais.valor_entrega
                    .toFixed(2)
                    .replace('.', ',')}
                </span>
              </div>
              <div className="flex flex-row justify-between text-base-subtitle font-bold text-xl">
                <span>Total</span>
                <span>
                  R${' '}
                  {resumoPedido.totais.valor_total.toFixed(2).replace('.', ',')}
                </span>
              </div>
            </div>

            {/* <div> */}
            <button
              disabled={resumoPedido.itens.length < 1}
              type="submit"
              className="w-full bg-base-yellow text-white p-3 font-bold text-sm rounded-md hover:bg-yellow-dark transition-all  disabled:bg-yellow-dark disabled:opacity-60"
            >
              CONFIRMAR PEDIDO
            </button>
            {/* </div> */}
          </div>
        </div>
      </form>
    </div>
  )
}
