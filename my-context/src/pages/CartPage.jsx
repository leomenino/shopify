import React from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import '../styles/CartPage.css'
import '../styles/global.css'


function CartPage({ cart, addToCart, removeFromCart }) {
  const navigate = useNavigate()
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  return (
    <div className="cart-page">
      <button
        onClick={() => navigate('/')}
        className="back-button"
      >
        ← Voltar para Produtos
      </button>

      <h2>Seu Carrinho</h2>
      {cart.map(item => (
        <div key={item.id} className="cart-item">
          <img src={item.image} alt={item.name} />
          <h3>{item.name}</h3>
          <p>€ {item.price}</p>
          <div className="quantity-controls">
            <button onClick={() => addToCart(item)}>+</button>
            <span>{item.quantity}</span>
            <button onClick={() => removeFromCart(item.id)}>-</button>
          </div>
        </div>
      ))}
      <div className="cart-total">
        <h3>Total: € {total.toFixed(2)}</h3>
      </div>
    </div>
  )
}

CartPage.propTypes = {
  cart: PropTypes.array.isRequired,
  addToCart: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired
}

export default CartPage