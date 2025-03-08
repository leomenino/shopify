import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import '../styles/ProductsPage.css'
import '../styles/global.css'

// Componente ProductsPage que exibe a lista de produtos
function ProductsPage() {
  const [products, setProducts] = useState([]) // Estado para armazenar os produtos

  // Efeito para buscar os produtos quando o componente é montado
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/products') // Faz a requisição para buscar os produtos
        setProducts(response.data) // Atualiza o estado com os produtos recebidos
      } catch (error) {
        console.error('Erro ao buscar produtos:', error) // Exibe um erro no console se a requisição falhar
      }
    }
    fetchProducts()
  }, [])

  return (
    <div className="products-grid">
      {/* Mapeia os produtos e os exibe como links para a página de detalhes do produto */}
      {products.map(product => (
        <Link key={product.id} to={`/product/${product.id}`}>
          <div className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>€ {product.price}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default ProductsPage