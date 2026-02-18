import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Watches from './pages/Watches';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import WatchDetail from './pages/WatchDetail';
import { CartProvider } from './context/CartContext';
import Payments from './pages/Payments';
import PaymentStatus from './pages/PaymentStatus';
import Payment from './pages/Payment';


function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <div className="App">
          <nav>
          </nav>
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/watches" element={<Watches />} />
<Route path="/watch/:id" element={<WatchDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/payment-status" element={<PaymentStatus />} />
            <Route path="/payment" element={<Payment />} />

          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App; 