import { Router } from './Router.jsx'
import { BrowserRouter } from 'react-router-dom'

import { CartContextProvider } from './context/cartContext.js'

export function App() {
  return (
    <BrowserRouter>
      <CartContextProvider>
        <Router />
      </CartContextProvider>
    </BrowserRouter>
  )
}
