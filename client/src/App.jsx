import './App.css'
import { Home, Login, Public } from '../src/pages/public/'
import { Routes, Route } from "react-router-dom";
import path from './ultils/path';
function App() {
  return (
    <div className='main-h-screen font-main'>
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.LOGIN} element={<Login />} />

        </Route>

      </Routes>
    </div>
  )
}

export default App
