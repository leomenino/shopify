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
  const [cart, setCart] = useState([]) // Estado para armazenar os itens do carrinho

  // Função para adicionar um produto ao carrinho
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

  // Função para remover um produto do carrinho
  const removeFromCart = (productId) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(item => item.id === productId)

      if (existingItem.quantity === 1) {
        // Se a quantidade é 1, remove o item do carrinho
        return currentCart.filter(item => item.id !== productId)
      }

      // Caso contrário, diminui a quantidade
      return currentCart.map(item =>
        item.id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    })
  }

  // Função para realizar o checkout e limpar o carrinho
  const checkout = () => {
    console.log('Checkout realizado com sucesso!') // Para debug
    setCart([]) // Limpa o carrinho
  }

  return (
    <>
      <nav className="nav-bar">
        <Link to="/" className="nav-link">Produtos</Link>
        <Link to="/cart" className="nav-link">
          Carrinho ({cart.reduce((sum, item) => sum + item.quantity, 0)}) {/* Exibe a quantidade total de itens no carrinho */}
        </Link>
      </nav>

      <div className="container">
        <Routes>
          <Route path="/" element={<ProductsPage />} /> {/* Rota para a página de produtos */}
          <Route path="/cart" element={<CartPage cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} checkout={checkout} />} /> {/* Rota para a página do carrinho */}
          <Route path="/checkout" element={<CheckoutPage cart={cart} checkout={checkout} />} /> {/* Rota para a página de checkout */}
          <Route path="/product/:id" element={<ProductPage addToCart={addToCart} />} /> {/* Rota para a página de detalhes do produto */}
          <Route path="*" element={<>404</>} /> {/* Rota para páginas não encontradas */}
        </Routes>
      </div>
    </>
  )
}

export default App
