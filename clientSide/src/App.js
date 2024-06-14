import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/navbar/NavBar';
import Home from './components/home/Home';
import Shops from './components/shop/Shops';
import Cart from './components/cart/Cart';
import { CartProvider } from './components/cart/CartContext';
import ContactUs from './components/contactus/ContactUs';
import AboutUs from './components/about/AboutUs';
import Footer from './components/footer/Footer';
import LoginPage from './components/login/LoginPage';
import RegistrationPage from './components/login/RegistrationPage';
import CheckoutForm from './components/cheakoutform/CheckoutForm';
import { Provider } from 'react-redux';
import Girls from './components/shop/kids/Girls';
import Man from './components/shop/Man';
import Woman from './components/shop/Woman';
import Boy from './components/shop/kids/Boy';
import PaymentSuccess from './components/payment/PaymentSucess';
import PaymentCancel from './components/payment/PayementCancel';
import { store } from './state/store';
import Seller from './components/shop/Seller';
import Wishlist from './components/wishlist/Wishlist';

const App = () => {
  return (
    <Provider store={store}>
    <CartProvider>
    <Router>
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-grow container mx-auto mt-4">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/shop" element={<Shops />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/checkout" element={<CheckoutForm />} />
            <Route path="/shop/girl" element={<Girls/>} />
            <Route path="/shop/man" element={<Man/>} />
            <Route path="/shop/woman" element={<Woman/>} />
            <Route path="/shop/boy" element={<Boy/>} />
            <Route path="/shop/seller" element={<Seller/>} />
            <Route path="/sucess" element={<PaymentSuccess/>} />
            <Route path="/cancel" element={<PaymentCancel/>} />
            <Route path="/wishlist" element={<Wishlist/>} />
          </Routes>
        </main>
        <Footer/>
      </div>
    </Router>
    </CartProvider>
    </Provider>
  );
}

export default App;
