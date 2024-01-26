import { useLocation } from 'react-router-dom'
import { ICoffee } from '../Home'

export function Cart() {
  const location = useLocation()
  const { cart } = location.state

  // console.log('catr', cart)
  return (
    <div>
      {cart?.map((e: ICoffee) => (
        <div key={e.name} style={{ border: '1px solid black' }}>
          <p>{e.name}</p>
          <p>{e.quantity}</p>
          <p>
            {(e.quantity * parseFloat(e.price.replace(',', '.'))).toFixed(2)}
          </p>
        </div>
      ))}
    </div>
  )
}
