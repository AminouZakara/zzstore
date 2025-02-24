import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from './pages/home/Home';
import Order from './pages/order/Order';
import Cart from './pages/cart/Cart';
import Dashboard from './pages/admin/dashboard/Dashboard';
import NoPage from './pages/nopage/NoPage';
import MyState from './context/data/myState';
import AllProducts from './pages/allproducts/AllProducts';
import Login from './pages/registration/Login';
import Signup from './pages/registration/Signup';
import ProductCard from './components/productCart/ProductCart';
import ProductInfo from './components/productInfo/ProductInfo';
import AddProduct from './pages/admin/pages/AddProduct';
import UpdateProduct from './pages/admin/pages/UpdateProduct';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <MyState>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/order" element={<ProtectedRoutes><Order /></ProtectedRoutes>} />
          <Route path="/cart" element={<ProtectedRoutes><Cart /></ProtectedRoutes>} />
          <Route path="/allproducts" element={<AllProducts />} />
          <Route path="/dashboard" element={<ProtectedRoutesForAdmin> <Dashboard /> </ProtectedRoutesForAdmin>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/productinfo/:id" element={<ProductInfo />} />
          <Route path="/addproduct" element={<ProtectedRoutesForAdmin> <AddProduct /> </ProtectedRoutesForAdmin>} />
          <Route path="/updateproduct" element={<ProtectedRoutesForAdmin> <UpdateProduct /> </ProtectedRoutesForAdmin>} />
          <Route path="/*" element={<NoPage />} />
        </Routes>
        <ToastContainer />
      </Router>
    </MyState>

  )
}

export default App

//Protect user from accessing dashboard without login
export const ProtectedRoutes = ({ children }) => {
  if (localStorage.getItem('user')) {
    return children
  }
  else {
    return <Navigate to='/login' />
  }
}

// Protect admin from accessing dashboard without login
export const ProtectedRoutesForAdmin = ({ children }) => {
  const admin = JSON.parse(localStorage.getItem('user'))
  if (admin?.user?.email === 'aminuzak446@gmail.com') {
    return children
  }
  else {
    return <Navigate to='/login' />
  }
}