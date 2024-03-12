/* eslint-disable camelcase */
import { useContext } from 'react'
import {
  ShoppingCartSimple,
  Timer,
  Package,
  Coffee,
  Plus,
  Minus,
} from '@phosphor-icons/react'

import { CartContext } from '../../context/cartContext'
import { Header } from '../../components/header'

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
    <>
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
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-x-8 gap-y-10 mb-40">
        {availableCoffees.length > 0 ? (
          availableCoffees.map((coffee) => (
            <div
              key={coffee.name}
              className="bg-base-card p-5 text-center min-w-[256px] relative rounded-tl-md rounded-tr-[36px] rounded-bl-[36px] rounded-br-md"
            >
              <img
                src={coffee.img}
                alt=""
                className="absolute top-[-20px] left-0 right-0 m-auto"
              />
              <div className="flex flex-col mt-[100px]">
                <span className="font-bold text-xl text-base-subtitle font-baloo2">
                  {coffee.name}
                </span>
                <span className="text-base-label text-sm mt-2">
                  {coffee.description}
                </span>

                <div className="flex flex-row items-center justify-between mt-8">
                  <div className="text-base-text text-sm font-roboto">
                    <span>
                      R$
                      <span className="text-2xl font-baloo2">
                        {' '}
                        {coffee.price}
                      </span>
                    </span>
                  </div>

                  <div className="flex flex-row gap-2">
                    <div className="bg-base-button rounded-md p-2 flex flex-row gap-1">
                      <button onClick={() => handleIncrementQnt(coffee)}>
                        <Plus size={14} color="#8047F8" />
                      </button>
                      <span>{coffee.quantity}</span>
                      <button onClick={() => handleDecrementQnt(coffee)}>
                        <Minus size={14} color="#8047F8" />
                      </button>
                    </div>
                    <button
                      disabled={coffee.quantity < 1}
                      onClick={() => handleAddItemToCart(coffee)}
                      className="bg-purple-dark rounded-md p-2"
                    >
                      <ShoppingCartSimple
                        weight="fill"
                        color="#F3F2F2"
                        size={22}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h3>Nenhum item encontrado!</h3>
        )}
      </div>
    </>
  )
}
