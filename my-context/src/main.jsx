import { StrictMode } from 'react' // Importa StrictMode para destacar problemas potenciais na aplicação
import { createRoot } from 'react-dom/client' // Importa createRoot para criar a raiz da aplicação React
import { BrowserRouter } from 'react-router-dom' // Importa BrowserRouter para habilitar o roteamento na aplicação
import App from './App.jsx' // Importa o componente principal App
import './index.css' // Importa o arquivo de estilos global

// Cria a raiz da aplicação React e renderiza o componente App dentro do BrowserRouter
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
