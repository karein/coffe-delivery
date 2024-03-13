/* eslint-disable camelcase */
import { useContext } from 'react'
import {
  ShoppingCartSimple,
  Timer,
  Package,
  Coffee,
} from '@phosphor-icons/react'

import { Header } from '../../components/header'
import { CartContext } from '../../context/cartContext'
import { CardCoffee } from '../../components/card-coffee'

import bannerImg from '../../assets/coffe-delivery-banner.svg'

export function Home() {
  const {
    cart,
    availableCoffees,
    handleAddItemToCart,
    handleDecrementQnt,
    handleIncrementQnt,
  } = useContext(CartContext)

  return (
    <div className="mb-40">
      <Header cart={cart} />

      <div className="flex flex-row justify-between py-[94px]">
        <div className="flex flex-col gap-[66px] text-start">
          <div className="flex flex-col gap-4">
            <h1 className="font-extrabold text-5xl text-base-title leading-[130%] font-baloo2">
              Encontre o café perfeito para qualquer hora do dia
            </h1>
            <p className="text-xl text-base-subtitle">
              Com o Coffee Delivery você recebe seu café onde estiver, a
              qualquer hora
            </p>
          </div>

          <div className="text-base text-base-text flex flex-row gap-10 leading-[130%]">
            <div className="flex flex-col gap-5">
              <div className="flex flex-row gap-3 items-center">
                <div className="flex items-center justify-center rounded-full bg-yellow-dark p-2">
                  <ShoppingCartSimple weight="fill" size={16} color="#FAFAFA" />
                </div>
                <span>Compra simples e segura</span>
              </div>

              <div className="flex flex-row gap-3 items-center">
                <div className="flex items-center justify-center rounded-full bg-base-text p-2">
                  <Package weight="fill" size={16} color="#FAFAFA" />
                </div>
                <span>Embalagem mantém o café intacto</span>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <div className="flex flex-row gap-3 items-center">
                <div className="flex items-center justify-center rounded-full bg-base-yellow p-2">
                  <Timer weight="fill" size={16} color="#FAFAFA" />
                </div>
                <span>Entrega rápida e rastreada</span>
              </div>

              <div className="flex flex-row gap-3 items-center">
                <div className="flex items-center justify-center rounded-full bg-base-purple p-2">
                  <Coffee weight="fill" size={16} color="#FAFAFA" />
                </div>
                <span>O café chega fresquinho até você</span>
              </div>
            </div>
          </div>
        </div>

        <img src={bannerImg} alt="" />
      </div>

      <h2 className="text-start font-extrabold text-3xl text-base-subtitle font-baloo2 mb-12">
        Nossos cafés
      </h2>
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-x-8 gap-y-10 ">
        {availableCoffees.length > 0 ? (
          availableCoffees.map((coffee) => (
            <CardCoffee
              key={coffee.name}
              coffee={coffee}
              handleIncrementQnt={handleIncrementQnt}
              handleDecrementQnt={handleDecrementQnt}
              handleAddItemToCart={handleAddItemToCart}
            />
          ))
        ) : (
          <h3>Nenhum item encontrado!</h3>
        )}
      </div>
    </div>
  )
}
