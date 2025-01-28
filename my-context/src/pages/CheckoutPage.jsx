import React from 'react'
import PropTypes from 'prop-types'

function CheckoutPage({ cart }) {
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aqui você pode adicionar a lógica para processar o pagamento
    alert('Pedido realizado com sucesso!')
  }

  return (
    <div className="checkout-page">
      <h2>Finalizar Compra</h2>
      
      <div className="order-summary">
        <h3>Resumo do Pedido</h3>
        {cart.map(item => (
          <div key={item.id} className="checkout-item">
            <span>{item.name}</span>
            <span>{item.quantity}x</span>
            <span>€ {(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="total">
          <strong>Total: € {total.toFixed(2)}</strong>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nome Completo:</label>
          <input type="text" required />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input type="email" required />
        </div>

        <div className="form-group">
          <label>Endereço:</label>
          <input type="text" required />
        </div>

        <div className="form-group">
          <label>Número do Cartão:</label>
          <input type="text" pattern="\d{16}" placeholder="1234 5678 9012 3456" required />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Validade:</label>
            <input type="text" pattern="\d{2}/\d{2}" placeholder="MM/AA" required />
          </div>

          <div className="form-group">
            <label>CVV:</label>
            <input type="text" pattern="\d{3}" required />
          </div>
        </div>

        <button type="submit" className="checkout-button">
          Finalizar Compra
        </button>
      </form>
    </div>
  )
}

CheckoutPage.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired
    })
  ).isRequired
}

export default CheckoutPage