/* eslint-disable camelcase */
import { ShoppingCartSimple, Plus, Minus } from '@phosphor-icons/react'

import { ICoffee, handleFuncProps } from '../context/cartContext'

interface CardCoffeeProps {
  coffee: ICoffee
  handleIncrementQnt: ({ name_item }: handleFuncProps) => void
  handleDecrementQnt: ({ name_item }: handleFuncProps) => void
  handleAddItemToCart: (coffee: ICoffee) => void
}

export function CardCoffee({
  coffee,
  handleDecrementQnt,
  handleIncrementQnt,
  handleAddItemToCart,
}: CardCoffeeProps) {
  return (
    <div className="bg-base-card p-5 text-center min-w-[256px] relative rounded-tl-md rounded-tr-[36px] rounded-bl-[36px] rounded-br-md">
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
              <span className="text-2xl font-baloo2"> {coffee.price}</span>
            </span>
          </div>

          <div className="flex flex-row gap-2">
            <div className="bg-base-button rounded-md p-2 flex flex-row gap-1">
              <button
                onClick={() => handleIncrementQnt({ name_item: coffee.name })}
              >
                <Plus size={14} className="text-base-purple" />
              </button>
              <span>{coffee.quantity}</span>
              <button
                onClick={() => handleDecrementQnt({ name_item: coffee.name })}
              >
                <Minus size={14} className="text-base-purple" />
              </button>
            </div>
            <button
              disabled={coffee.quantity < 1}
              onClick={() => handleAddItemToCart(coffee)}
              className="bg-purple-dark rounded-md p-2"
            >
              <ShoppingCartSimple weight="fill" color="#F3F2F2" size={22} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
