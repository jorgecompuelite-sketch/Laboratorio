import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import { MisionVision, NuestraGente, Tecnologia, Blog, PoliticasGarantia } from './pages/Pages';
import Sucursales from './pages/Sucursales';

// ScrollToTop component to reset scroll on route change
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

import WhatsAppButton from './components/WhatsAppButton';
import footerBanner from './assets/footer-banner.jpg';

function App() {
  return (
    <Router>
      <ScrollToTop />
      {/* ── Sticky Wrapper: min-h-screen y flex-col ── */}
      <div className="min-h-screen font-sans flex flex-col relative text-white">
        <Navbar />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mision-vision" element={<MisionVision />} />
            <Route path="/nuestra-gente" element={<NuestraGente />} />
            <Route path="/tecnologia" element={<Tecnologia />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/politicas-garantia" element={<PoliticasGarantia />} />
            <Route path="/sucursales" element={<Sucursales />} />
          </Routes>
        </main>

        <WhatsAppButton />

        {/* ── Footer Sticky 100% Ancho (Deep Night Background base en body) ── */}
        <footer className="w-full border-t border-[rgba(255,255,255,0.05)] mt-auto">

          {/* ── Sección principal: Logo | Mapa ─────────────────────────── */}
          <div className="w-full max-w-[1200px] mx-auto py-14 px-6 md:px-12 flex flex-col md:flex-row items-center justify-center gap-10 md:gap-[50px]">

            {/* Columna izquierda — Imagen de marca */}
            <div className="w-full md:w-1/2 max-w-[500px] h-[320px] flex justify-center items-center bg-[#0a162d] rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.5)] border border-[rgba(255,255,255,0.05)]">
              <img
                src={footerBanner}
                alt="Laboratorio Dental Luis Milanes"
                className="w-full h-fw-[80%] h-[80%] object-contain"
              />
            </div>

            {/* Columna derecha — Google Map */}
            <div className="w-full md:w-1/2 max-w-[500px] h-[320px] flex justify-center items-center bg-[#0a162d] rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.5)] border border-[rgba(255,255,255,0.05)]">
              <iframe
                title="Ubicación Laboratorio Dental Luis Milanes"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d254508.27407313226!2d-76.61731!3d3.42158!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e30a6f0a0000001%3A0x0!2sCali%2C+Colombia!5e0!3m2!1ses!2sco!4v1700000000000"
                className="w-full h-full border-0"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* ── Franja inferior: Texto legal + Redes ──────────────────── */}
          <div className="border-t border-[rgba(255,255,255,0.05)] py-5 px-6">
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">

              {/* Texto legal */}
              <p className="text-xs text-[#94A3B8] font-light text-center sm:text-left leading-[1.7]">
                <span className="font-semibold text-[#A0AEC0]">Laboratorio Dental Luis Milanés S.A.S</span>
                {' '}© 2026
                {' '}|{' '}
                <a href="/politicas-garantia" className="hover:text-white underline underline-offset-2 transition-colors">Políticas de Garantía</a>
                {' '}–{' '}
                <a href="/politicas-garantia#privacidad" className="hover:text-white underline underline-offset-2 transition-colors">Política de Privacidad de Datos</a>
              </p>

              {/* Redes sociales */}
              <div className="flex items-center gap-3">
                {/* Instagram */}
                <a
                  href="https://www.instagram.com/labdentalluismilanes/"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Instagram"
                  className="flex items-center justify-center w-8 h-8 rounded-lg border border-[rgba(255,255,255,0.1)] text-[#94A3B8] hover:text-[#0052FF] hover:border-[#0052FF] hover:shadow-[0_0_12px_rgba(0,82,255,0.3)] transition-all"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                  </svg>
                </a>
                {/* Facebook */}
                <a
                  href="https://www.facebook.com/laboratoriomilanes/"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Facebook"
                  className="flex items-center justify-center w-8 h-8 rounded-lg border border-[rgba(255,255,255,0.1)] text-[#94A3B8] hover:text-[#0052FF] hover:border-[#0052FF] hover:shadow-[0_0_12px_rgba(0,82,255,0.3)] transition-all"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

        </footer>
      </div>
    </Router>
  );
}

export default App;
