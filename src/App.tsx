import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PageWrapper from './components/PageWrapper';
import Index from './pages/Index';
import Cart from './pages/Cart';
import Devis from './pages/Devis';
import Metiers from './pages/Metiers';
import Marques from './pages/Marques';
import Personalization from './pages/Personalization';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PageWrapper><Index /></PageWrapper>} />
        <Route path="/cart" element={<PageWrapper><Cart /></PageWrapper>} />
        <Route path="/devis" element={<PageWrapper><Devis /></PageWrapper>} />
        <Route path="/metiers" element={<PageWrapper><Metiers /></PageWrapper>} />
        <Route path="/marques" element={<PageWrapper><Marques /></PageWrapper>} />
        <Route path="/personalization" element={<PageWrapper><Personalization /></PageWrapper>} />
      </Routes>
    </Router>
  );
}

export default App;