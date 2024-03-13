import { useContext } from 'react'
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

import { CartContext, ICoffee } from '../../context/cartContext'
import { Header } from '../../components/header'

export function Cart() {
  const {
    cart,
    handleIncrementQnt,
    handleDecrementQnt,
    handleRemoveItemFromCart,
  } = useContext(CartContext)

  const entrega = 3.5
  const totalItens = cart.reduce((accumulator, item) => {
    return (
      accumulator + parseFloat(item.price.replace(',', '.')) * item.quantity
    )
  }, 0)
  const total = totalItens + entrega

  return (
    <div className="mb-40">
      <Header cart={cart} />

      <div className="flex flex-row flex-wrap gap-8 ">
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

              <form
                action=""
                className="grid gap-x-3 grid-cols-8 gap-y-4 text-sm"
              >
                <input
                  type="text"
                  placeholder="CEP"
                  className="block bg-base-input p-3 rounded col-span-3 border-solid border-[1px] border-base-button placeholder:text-base-label"
                />
                <input
                  type="text"
                  placeholder="Rua"
                  className="bg-base-input p-3 rounded col-span-8 border-solid border-[1px] border-base-button placeholder:text-base-label"
                />
                <input
                  type="text"
                  placeholder="Número"
                  className="bg-base-input p-3 rounded col-span-3 border-solid border-[1px] border-base-button placeholder:text-base-label"
                />
                <input
                  type="text"
                  placeholder="Complemento"
                  className="bg-base-input p-3 rounded col-span-5 border-solid border-[1px] border-base-button placeholder:text-base-label"
                />
                <input
                  type="text"
                  placeholder="Bairro"
                  className="bg-base-input p-3 rounded col-span-3 border-solid border-[1px] border-base-button placeholder:text-base-label"
                />
                <input
                  type="text"
                  placeholder="Cidade"
                  className="bg-base-input p-3 rounded flex-1 col-span-4 border-solid border-[1px] border-base-button placeholder:text-base-label"
                />
                <input
                  type="text"
                  placeholder="UF"
                  className="bg-base-input p-3 rounded max-w-[60px] border-solid border-[1px] border-base-button placeholder:text-base-label"
                />
              </form>
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

              <div className="text-base-text text-xs gap-3 grid lg:grid-cols-3">
                <button className="bg-base-button p-4 rounded-md flex gap-3 items-center">
                  <CreditCard size={16} className="text-base-purple" />
                  CARTÃO DE CRÉDITO
                </button>
                <button className="bg-base-button p-4 rounded-md flex gap-3 items-center">
                  <Bank size={16} className="text-base-purple" />
                  CARTÃO DE DÉBITO
                </button>
                <button className="bg-base-button p-4 rounded-md flex gap-3 items-center">
                  <Money size={16} className="text-base-purple" />
                  DINHEIRO
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Resumo Pedido - cafés selecionados */}
        <div className="flex flex-col gap-3 lg:lg:min-w-[448px]">
          <span className="text-base-subtitle font-baloo2 font-bold text-lg">
            Cafés selecionados
          </span>

          <div className="bg-base-card p-10 flex flex-col gap-6  rounded-tl-md rounded-tr-[44px] rounded-bl-[44px] rounded-br-md">
            {/* lista itens */}
            {cart?.map((e: ICoffee) => (
              <div key={e.name}>
                {/* item */}
                <div className="flex flex-row justify-between text-base gap-[50px]">
                  <div className="flex flex-row gap-5">
                    <img src={e.img} alt="" className="max-w-16 max-h-16" />

                    <div className="flex flex-col gap-2 ">
                      <span className="text-base-subtitle">{e.name}</span>

                      <div className="flex flex-row gap-2">
                        <div className="bg-base-button rounded-md p-2 flex flex-row gap-1 max-h-8 items-center">
                          <button onClick={() => handleIncrementQnt(e)}>
                            <Plus size={14} className="text-base-purple" />
                          </button>
                          <span className="text-base-title">{e.quantity}</span>
                          <button onClick={() => handleDecrementQnt(e)}>
                            <Minus size={14} className="text-base-purple" />
                          </button>
                        </div>
                        <button
                          onClick={() => handleRemoveItemFromCart(e)}
                          className="bg-base-button text-base-text text-xs flex flex-row gap-1 items-center p-2 rounded-md"
                        >
                          <Trash size={16} className="text-base-purple" />
                          REMOVER
                        </button>
                      </div>
                    </div>
                  </div>

                  <span className="text-base-text font-bold">
                    R${' '}
                    {(e.quantity * parseFloat(e.price.replace(',', '.')))
                      .toFixed(2)
                      .replace('.', ',')}
                  </span>
                </div>

                {/* divider */}
                <div className="h-[1px] w-full bg-base-button mt-6" />
              </div>
            ))}

            {/* totais */}
            <div>
              <div className="flex flex-row justify-between text-sm text-base-text">
                <span>Total de itens</span>
                <span className="text-base">
                  R$ {totalItens.toFixed(2).toString().replace('.', ',')}
                </span>
              </div>
              <div className="flex flex-row justify-between text-sm text-base-text">
                <span>Entrega</span>
                <span className="text-base">
                  R$ {entrega.toFixed(2).toString().replace('.', ',')}
                </span>
              </div>
              <div className="flex flex-row justify-between text-base-subtitle font-bold text-xl">
                <span>Total</span>
                <span>R$ {total.toFixed(2).replace('.', ',')}</span>
              </div>
            </div>

            <div>
              <button className="w-full bg-base-yellow text-white p-3 font-bold text-sm rounded-md">
                CONFIRMAR PEDIDO
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
