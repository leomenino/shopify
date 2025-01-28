import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import axios from 'axios'
import '../styles/ProductPage.css'
import '../styles/global.css'

function ProductPage({ addToCart }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/products/${id}`)
        setProduct(response.data)
      } catch (error) {
        console.error('Erro ao buscar produto:', error)
      }
    }
    fetchProduct()
  }, [id])

  const handleAddToCart = () => {
    console.log('Adicionando ao carrinho:', product)
    addToCart(product)
  }

  if (!product) return <div>Carregando...</div>

  return (
    <div className="product-detail">
      <button 
        onClick={() => navigate('/')} 
        className="back-button"
      >
        ← Voltar para Produtos
      </button>

      <img src={product.image} alt={product.name} />
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>€ {product.price}</p>
      <button onClick={handleAddToCart}>
        Adicionar ao Carrinho
      </button>
    </div>
  )
}

ProductPage.propTypes = {
  addToCart: PropTypes.func.isRequired
}

export default ProductPage