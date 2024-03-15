import { Routes, Route } from 'react-router-dom'

import { Home } from './pages/Home'
import { Cart } from './pages/Cart'
import { FinishOrder } from './pages/FinishOrder'

export function Router() {
  return (
    <Routes>
      <Route>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/finish-order" element={<FinishOrder />} />
      </Route>
    </Routes>
  )
}
