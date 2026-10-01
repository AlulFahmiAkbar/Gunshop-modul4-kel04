import { useState, useEffect } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Catalog from './pages/Catalog.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Cart from './pages/Cart.jsx'
import './App.css'

function App() {
  const [tab, setTab] = useState('Catalog')
  const [cart, setCart] = useState([])

  // State untuk menyimpan event instalasi PWA
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [isInstallable, setIsInstallable] = useState(false)

  const addToCart = (gun) => {
    setCart(prev => {
      const existing = prev.find(item => item.gun.name === gun.name)
      if (existing) {
        return prev.map(item => item.gun.name === gun.name ? { ...item, quantity: item.quantity + 1 } : item)
      }
      return [...prev, { gun, quantity: 1 }]
    })
  }

  const updateQuantity = (gunName, quantity) => {
    if (quantity < 1) {
      removeFromCart(gunName)
      return
    }
    setCart(prev => prev.map(item => item.gun.name === gunName ? { ...item, quantity } : item))
  }

  const removeFromCart = (gunName) => {
    setCart(prev => prev.filter(item => item.gun.name !== gunName))
  }

  useEffect(() => {
    // Fungsi untuk menangkap event dari browser
    const handleBeforeInstallPrompt = (e) => {
      // Mencegah prompt bawaan browser muncul secara otomatis
      e.preventDefault()
      // Menyimpan event untuk dipicu nanti melalui tombol
      setDeferredPrompt(e)
      // Memunculkan banner install custom
      setIsInstallable(true)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    // Memunculkan prompt instalasi bawaan browser saat tombol diklik
    deferredPrompt.prompt()

    // Menunggu respon pengguna
    const { outcome } = await deferredPrompt.userChoice

    // Reset state setelah prompt digunakan
    setDeferredPrompt(null)
    setIsInstallable(false)

    console.log(`User response to the install prompt: ${outcome}`)
  }

  return (
    <div className="shell">
      {/* Banner Custom Install akan muncul di paling atas jika aplikasi bisa diinstal */}
      {isInstallable && (
        <div style={{ background: 'var(--brass)', color: '#fff', padding: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontWeight: '500' }}>Install Bore & Barrel App for a better experience!</span>
          <button
            onClick={handleInstallClick}
            style={{ padding: '6px 16px', cursor: 'pointer', border: 'none', borderRadius: '4px', background: 'var(--ink)', color: '#fff', fontWeight: 'bold' }}
          >
            Install App
          </button>
        </div>
      )}

      <Header tab={tab} onTab={setTab} cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} />
      <main className="main">
        {tab === 'Catalog' && <Catalog onAddToCart={addToCart} />}
        {tab === 'About' && <About />}
        {tab === 'Contact' && <Contact />}
        {tab === 'Cart' && <Cart cart={cart} onUpdateQuantity={updateQuantity} onRemove={removeFromCart} />}
      </main>
      <Footer />
    </div>
  )
}

export default App