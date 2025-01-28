import './styles/global.css'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import ProductsPage from './pages/ProductsPage'
import ProductPage from './pages/ProductPage'
import CheckoutPage from './pages/CheckoutPage'
import CartPage from './pages/CartPage'
import { useState } from 'react'
import { Link } from 'react-router-dom'

function App() {

  const [cart, setCart] = useState([])

  const addToCart = (product) => {
    console.log('Função addToCart chamada com:', product) // Para debug
    setCart(currentCart => {
      const existingItem = currentCart.find(item => item.id === product.id)

      if (existingItem) {
        // Se o produto já existe, aumenta a quantidade
        return currentCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        // Se não existe, adiciona com quantidade 1
        return [...currentCart, { ...product, quantity: 1 }]
      }
    })
  }

  const removeFromCart = (productId) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(item => item.id === productId)

      if (existingItem.quantity === 1) {
        return currentCart.filter(item => item.id !== productId)
      }

      return currentCart.map(item =>
        item.id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    })
  }

  return (
    <>
      <nav className="nav-bar">
        <Link to="/" className="nav-link">Produtos</Link>
        <Link to="/cart" className="nav-link">
          Carrinho ({cart.reduce((sum, item) => sum + item.quantity, 0)})
        </Link>
      </nav>

      <div className="container">
        <Routes>
          <Route path="/" element={<ProductsPage />} />
          <Route path="/cart" element={<CartPage cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} />} />
          <Route path="/checkout" element={<CheckoutPage cart={cart} />} />
          <Route path="/product/:id" element={<ProductPage addToCart={addToCart} />} />
          <Route path="*" element={<>404</>} />
        </Routes>
      </div>
    </>
  )
}

export default App
