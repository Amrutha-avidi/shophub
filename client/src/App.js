import './App.css';
import Cart from './components/Cart';
import Dashboard from './components/Dashboard';
import Product from './components/Product';
import {  Route,   Routes, BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import RootLayout from './components/RootLayout';
import Login from './components/auth/Login';
import NotFound from './components/NotFound';
import Register from './components/auth/Register';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route exact path='/' element={<RootLayout />}>

          <Route index element={<Dashboard />}></Route>
          <Route path='/cart' element={<Cart />}></Route>
          <Route path='/products' element={<Product />}></Route>
          <Route path='/register' element={<Register />}></Route>

          <Route path='/login' element={<Login />}></Route>
          <Route path='/*' element={<NotFound />}></Route>

        </Route>
      </Routes>
    </BrowserRouter>
  )


}

export default App;
