import './App.css'
import { Home, Login, Public, Product, ProductDetail, Service } from '../src/pages/public/'
import { Routes, Route } from "react-router-dom";
import path from './ultils/path';
function App() {
  return (
    <div className='main-h-screen font-main'>
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.LOGIN} element={<Login />} />
          <Route path={path.PRODUCT} element={<Product />} />
          <Route path={path.SERVICE} element={<Service />} />
          <Route path={path.PRODUCT_DETAIL} element={<ProductDetail />} />
        </Route>

      </Routes>
    </div>
  )
}

export default App
