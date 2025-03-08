import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import axios from 'axios'
import '../styles/ProductPage.css'
import '../styles/global.css'

// Componente ProductPage que recebe a prop addToCart
function ProductPage({ addToCart }) {
  const { id } = useParams() // Hook para obter o parâmetro de ID da URL
  const navigate = useNavigate() // Hook para navegação
  const [product, setProduct] = useState(null) // Estado para armazenar o produto

  // Efeito para buscar o produto quando o ID mudar
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

  // Função para adicionar o produto ao carrinho
  const handleAddToCart = () => {
    console.log('Adicionando ao carrinho:', product)
    addToCart(product)
  }

  // Exibe uma mensagem de carregamento enquanto o produto está sendo buscado
  if (!product) return <div>Carregando...</div>

  return (
    <div className="product-detail">
      {/* Botão para voltar à página de produtos */}
      <button 
        onClick={() => navigate('/')} 
        className="back-button"
      >
        ← Voltar para Produtos
      </button>

      {/* Exibe os detalhes do produto */}
      <img src={product.image} alt={product.name} />
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>€ {product.price}</p>
      {/* Botão para adicionar o produto ao carrinho */}
      <button onClick={handleAddToCart}>
        Adicionar ao Carrinho
      </button>
    </div>
  )
}

// Definição das propTypes para validação das props
ProductPage.propTypes = {
  addToCart: PropTypes.func.isRequired
}

export default ProductPage