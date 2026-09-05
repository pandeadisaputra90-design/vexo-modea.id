import { Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import WhatsAppButton from './components/ui/WhatsAppButton'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Inventory from './pages/Inventory'
import VehicleDetail from './pages/VehicleDetail'
import Rental from './pages/Rental'
import Financing from './pages/Financing'
import Inspection from './pages/Inspection'
import About from './pages/About'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-charcoal-950 font-sans text-white">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/katalog" element={<Inventory />} />
          <Route path="/katalog/:id" element={<VehicleDetail />} />
          <Route path="/sewa" element={<Rental />} />
          <Route path="/kredit-asuransi" element={<Financing />} />
          <Route path="/inspeksi" element={<Inspection />} />
          <Route path="/tentang" element={<About />} />
          <Route path="/kontak" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton variant="floating" />
    </div>
  )
}

export default App
