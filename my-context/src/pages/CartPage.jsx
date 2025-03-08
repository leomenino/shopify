import React from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import '../styles/CartPage.css'
import '../styles/global.css'

// Componente CartPage que recebe as props cart, addToCart, removeFromCart e checkout
function CartPage({ cart, addToCart, removeFromCart, checkout }) {
  const navigate = useNavigate() // Hook para navegação

  // Calcula o total do carrinho
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  return (
    <div className="cart-page">
      {/* Botão para voltar à página de produtos */}
      <button
        onClick={() => navigate('/')}
        className="back-button"
      >
        ← Voltar para Produtos
      </button>

      <h2>Seu Carrinho</h2>
      {/* Mapeia os itens do carrinho e os exibe */}
      {cart.map(item => (
        <div key={item.id} className="cart-item">
          <img src={item.image} alt={item.name} />
          <h3>{item.name}</h3>
          <p>€ {item.price}</p>
          <div className="quantity-controls">
            {/* Botão para aumentar a quantidade do item */}
            <button onClick={() => addToCart(item)}>+</button>
            <span>{item.quantity}</span>
            {/* Botão para diminuir a quantidade do item */}
            <button onClick={() => removeFromCart(item.id)}>-</button>
          </div>
        </div>
      ))}
      <div className="cart-total">
        <h3>Total: € {total.toFixed(2)}</h3>
      </div>
      {/* Botão para finalizar a compra */}
      <button
        onClick={() => {
          checkout() // Chama a função checkout para limpar o carrinho
          navigate('/checkout') // Navega para a página de checkout
        }}
        className="checkout-button"
      >
        Finalizar Compra
      </button>
    </div>
  )
}

// Definição das propTypes para validação das props
CartPage.propTypes = {
  cart: PropTypes.array.isRequired,
  addToCart: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  checkout: PropTypes.func.isRequired
}

export default CartPage