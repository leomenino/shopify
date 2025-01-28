import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import '../styles/ProductsPage.css'
import '../styles/global.css'

function ProductsPage() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/products')
        setProducts(response.data)
      } catch (error) {
        console.error('Erro ao buscar produtos:', error)
      }
    }
    fetchProducts()
  }, [])

  return (
    <div className="products-grid">
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