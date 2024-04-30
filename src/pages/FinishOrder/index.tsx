/* eslint-disable camelcase */
import { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { MapPin, CurrencyDollar, Timer } from '@phosphor-icons/react'

import { Header } from '../../components/header'
import { CartContext } from '../../context/cartContext'

import { Endereco } from '../Cart'

type InformacoesDoPedidoType = {
  endereco: Endereco
  forma_pagamento: 'credit-card' | 'debit-card' | 'money'
}

export function FinishOrder() {
  const location = useLocation()
  const informacoesDoPedido: InformacoesDoPedidoType = location.state

  const formaPagam = {
    money: 'Dinheiro',
    'credit-card': 'Cartão de Credito',
    'debit-card': 'Cartão de Débito',
  }

  console.log(
    'informacoesDoPedido',
    formaPagam[informacoesDoPedido.forma_pagamento],
  )

  const { cart } = useContext(CartContext)

  return (
    <div className="mb-40">
      <Header cart={cart} />

      <div className="flex flex-col gap-10 mt-20">
        <div>
          <h1 className="font-extrabold text-[32px] font-baloo2 text-yellow-dark">
            Uhu! Pedido confirmado
          </h1>
          <h2 className="text-xl">
            Agora é só aguardar que logo o café chegará até você
          </h2>
        </div>

        <div className="flex flex-row justify-between flex-wrap gap-28">
          <div className="flex flex-1 p-[1px] bg-gradient-to-r from-[#DBAC2C] to-[#8047F8] rounded-tl-md rounded-tr-[36px] rounded-bl-[36px] rounded-br-md">
            <div className="bg-zinc-50 p-10 flex flex-1 flex-col gap-8 rounded-tl-md rounded-tr-[36px] rounded-bl-[36px] rounded-br-md">
              <div className="flex flex-row gap-3 items-center">
                <div className="flex items-center justify-center rounded-full bg-base-purple p-2">
                  <MapPin weight="fill" size={16} color="#FAFAFA" />
                </div>
                <div className="flex flex-col text-base-text">
                  <span>
                    Entrega em{' '}
                    <strong>
                      {informacoesDoPedido.endereco.rua},{' '}
                      {informacoesDoPedido.endereco.numero}
                    </strong>
                  </span>
                  <span>
                    {informacoesDoPedido.endereco.bairro} -{' '}
                    {informacoesDoPedido.endereco.cidade},{' '}
                    {informacoesDoPedido.endereco.uf}
                  </span>
                </div>
              </div>

              <div className="flex flex-row gap-3 items-center">
                <div className="flex items-center justify-center rounded-full bg-base-yellow p-2">
                  {/* h-8 w-8  */}
                  <Timer weight="fill" size={16} color="#FAFAFA" />
                </div>
                <div className="flex flex-col text-base-text">
                  <span>Previsão de entrega</span>
                  <span>
                    <strong>20 min - 30 min</strong>
                  </span>
                </div>
              </div>

              <div className="flex flex-row gap-3 items-center">
                <div className="flex items-center justify-center rounded-full bg-yellow-dark p-2">
                  <CurrencyDollar size={16} color="#FAFAFA" />
                </div>
                <div className="flex flex-col text-base-text">
                  <span>Pagamento na entrega</span>
                  <span>
                    <strong>
                      {formaPagam[informacoesDoPedido.forma_pagamento]}
                    </strong>
                  </span>
                </div>
              </div>
            </div>
            {/*  min-w-[526px] */}
          </div>

          <img
            className="max-h-[293px] max-w-[492px]"
            src="/assets/coffe-delivery-finish-illustation.svg"
            alt="aaaaa"
          />
        </div>
      </div>
    </div>
  )
}
