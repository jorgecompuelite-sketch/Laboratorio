import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import { MisionVision, NuestraGente, Tecnologia, Blog, PoliticasGarantia } from './pages/Pages';
import Sucursales from './pages/Sucursales';
import Admin from './pages/Admin';
import TrabajaConNosotros from './pages/TrabajaConNosotros';
import SolicitarCatalogo from './pages/SolicitarCatalogo';
import Agencias from './pages/Agencias';
import ZirLuxor from './pages/ZirLuxor';
import ZirconioZR7 from './pages/ZirconioZR7';
import SolicitudPedido from './pages/SolicitudPedido';
import Registro from './pages/Registro';
import MiLab from './pages/MiLab';
import ProtectedRoute from './components/ProtectedRoute';


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
            <Route path="/trabaja-con-nosotros" element={<TrabajaConNosotros />} />
            <Route path="/solicitar-catalogo" element={<SolicitarCatalogo />} />
            <Route path="/solicitud-pedido" element={<SolicitudPedido />} />
            <Route path="/zir-luxor" element={<ZirLuxor />} />
            <Route path="/zirconio-zr7" element={<ZirconioZR7 />} />
            <Route path="/agencias/:zone" element={<Agencias />} />
            <Route path="/admin" element={
              <ProtectedRoute requireAdmin={true}>
                <Admin />
              </ProtectedRoute>
            } />
            <Route path="/registro" element={<Registro />} />
            <Route path="/milab" element={
              <ProtectedRoute>
                <MiLab section="usuario" />
              </ProtectedRoute>
            } />
            <Route path="/milab/usuario" element={
              <ProtectedRoute>
                <MiLab section="usuario" />
              </ProtectedRoute>
            } />
            <Route path="/milab/eventos" element={
              <ProtectedRoute>
                <MiLab section="eventos" />
              </ProtectedRoute>
            } />
            <Route path="/milab/talleres" element={
              <ProtectedRoute>
                <MiLab section="talleres" />
              </ProtectedRoute>
            } />
            <Route path="/milab/triangulo" element={
              <ProtectedRoute>
                <MiLab section="triangulo" />
              </ProtectedRoute>
            } />
          </Routes>
        </main>

        <WhatsAppButton />

        {/* ── Footer Sticky 100% Ancho (Deep Night Background base en body) ── */}
        <footer className="w-full border-t border-[rgba(255,255,255,0.05)] mt-auto">

          {/* ── Sección de Cobertura Nacional y Mapa ─────────────────────────── */}
          <div className="w-full flex flex-col md:flex-row bg-transparent">
            {/* Columna izquierda — Imagen del Banner de Cobertura */}
            <div className="w-full md:w-1/2 flex justify-center items-center bg-[#f4f4f4] relative overflow-hidden">
                {/* 
                  AQUÍ VA TU IMAGEN. 
                  Asegúrate de cambiar "cobertura.png" por el nombre exacto de la imagen que exportaste 
                  (y verifica que esté dentro de la carpeta 'public').
                  La clase 'object-contain' evita que se distorsione. 
                */}
                <img 
                    src={footerBanner} 
                    alt="Aumentamos nuestra cobertura nacional"
                    className="w-full h-auto object-contain max-h-[500px]"
                />
            </div>

            {/* Columna derecha — Google Map */}
            <div className="w-full md:w-1/2 h-[400px] md:h-auto min-h-[450px]">
              <iframe
                title="Cobertura Nacional Laboratorio Dental Luis Milanes"
                src="https://www.google.com/maps/d/embed?mid=1TwizR-fa5p_jF562mlL3GGWzXlvysvU&hl=es-419&ehbc=2E312F"
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
