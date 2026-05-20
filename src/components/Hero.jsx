import React from 'react';
import { motion } from 'framer-motion';
import videoBg from '../../video.mp4';
import colombianoImg from '../assets/colombiano.png';

const Hero = () => {
    return (
        <section className="relative w-full h-[100vh] min-h-screen overflow-hidden bg-transparent">
            {/* Background Video */}
            <video 
                src={videoBg}
                autoPlay 
                loop 
                muted 
                playsInline
                className="absolute inset-0 w-full h-full object-cover z-0"
            />
            
            {/* Dark Overlay for better contrast */}
            <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none" />

            {/* Floating Button Top Right */}
            <div className="absolute top-28 right-4 md:right-8 z-50">
                <a 
                    href="/Catalogo2026.pdf" 
                    target="_blank"
                    className="inline-flex items-center justify-center border-2 border-white text-white bg-black/20 backdrop-blur-md hover:bg-white hover:text-[#020B1D] transition-colors duration-300 shadow-lg"
                    style={{ borderRadius: '9999px', padding: '10px 24px', fontSize: '0.95rem', fontWeight: '500' }}
                >
                    Ver el catálogo
                </a>
            </div>

            {/* Sello Colombiano */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="hidden xl:flex fixed left-0 top-1/2 -translate-y-1/2 z-[100] pointer-events-none flex-col items-center justify-center w-[60px] h-[60px] rounded-r-[12px] border border-l-0 border-[rgba(255,255,255,0.05)] bg-[#051025]/60 backdrop-blur-md shadow-[inset_0_4px_10px_rgba(255,255,255,0.05),0_0_20px_rgba(0,82,255,0.15)]"
            >
                <img
                    src={colombianoImg}
                    alt="Sello Diseño Colombiano"
                    className="w-[80%] h-auto object-contain opacity-90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
                />
            </motion.div>
        </section>
    );
};

export default Hero;
