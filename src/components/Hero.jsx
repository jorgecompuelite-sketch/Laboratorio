import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import heroBanner from '../assets/hero-banner.jpg';
import heroBanner2 from '../assets/hero-banner-2.jpg';
import heroBanner3 from '../assets/hero-banner-3.jpg';
import colombianoImg from '../assets/colombiano.png';

/* ─── Cuadro de imagen (Dark Premium Card 3D) ─────────────────────────── */
const ImageCard = ({ src, alt, isActive, isPrev, isScrolling, onClick }) => {
    // Transformaciones 3D Mecánicas (Rueda Dentada)
    const transform3D = isActive
        ? "scale(1.1) rotateY(0deg) translateZ(20px)"
        : `scale(0.85) ${isPrev ? 'rotateY(20deg)' : 'rotateY(-20deg)'} translateZ(-60px)`;

    const opacityClass = isActive ? "opacity-100 z-10" : "opacity-40 z-0 cursor-pointer hover:opacity-70";

    // Si la rueda gira, aplicamos un motion blur sutil simulando velocidad
    const blurClass = isScrolling && !isActive ? "blur-[2px]" : (isScrolling && isActive ? "blur-[1px]" : "blur-0");

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            onClick={onClick}
            className={cn(
                "snap-center shrink-0 w-[85%] md:w-[75%] max-w-[1200px] transition-all duration-[600ms] ease-[cubic-bezier(0.45,0.05,0.55,0.95)] will-change-transform",
                opacityClass,
                blurClass
            )}
            style={{ transform: transform3D }}
        >
            <div className="relative rounded-[2rem] p-2 bg-[#0a162d] transition-all duration-700 ease-out border border-[rgba(255,255,255,0.05)] shadow-[0_8px_32px_rgba(0,0,0,0.8)]
                            hover:translate-z-[30px] hover:shadow-[0_0_50px_rgba(0,82,255,0.5)] transform-gpu hover:-translate-y-2">
                <div className="aspect-[16/6] rounded-[1.5rem] overflow-hidden relative group">
                    <img
                        src={src}
                        alt={alt}
                        className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>
            </div>
        </motion.div>
    );
};

/* ─── Cuadro Premium Minimalista (tercer panel) ─────────────────────────── */
const PremiumCard = ({ src, alt, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
        className="w-full flex justify-center mt-8"
    >
        <div
            className="w-full max-w-[1500px] bg-[#0a162d] rounded-[2.5rem] shadow-[0_8px_32px_rgba(0,0,0,0.8)] p-8 hover:shadow-[0_0_40px_rgba(0,82,255,0.15)] transition-all duration-700 ease-in-out border border-[rgba(255,255,255,0.05)]"
        >
            <div className="rounded-[2rem] overflow-hidden relative group">
                <img
                    src={src}
                    alt={alt}
                    className="w-full h-auto object-cover object-center transition-transform duration-1000 group-hover:scale-[1.02]"
                />
            </div>
        </div>
    </motion.div>
);

/* ─── Hero ──────────────────────────────────────────────────────────────── */
const Hero = () => {
    const scrollContainerRef = useRef(null);
    const scrollTimeoutRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(1); // Empezamos en el index 1 (el primer slide real)
    const [isScrolling, setIsScrolling] = useState(false);
    const [isHovered, setIsHovered] = useState(false); // Estado para pausar on hover

    // Array infinito: [B2_clone, B1_real, B2_real, B1_clone, B2_clone2]
    // Indices:          0         1        2        3         4
    const slidesData = [
        { id: 'clone-b2', src: heroBanner2, realIndex: 1 },
        { id: 'real-b1', src: heroBanner, realIndex: 0 },
        { id: 'real-b2', src: heroBanner2, realIndex: 1 },
        { id: 'clone-b1', src: heroBanner, realIndex: 0 },
        { id: 'clone-b2-end', src: heroBanner2, realIndex: 1 },
    ];

    const slideTo = (index, behavior = 'smooth') => {
        if (!scrollContainerRef.current) return;
        const container = scrollContainerRef.current;
        const cardWidth = container.clientWidth * 0.75; // Approx tamaño de la tarjeta md
        const gap = 32; // md:gap-8 (32px)
        const offset = index * (cardWidth + gap);
        // Aproximación del centro
        const centerPos = offset;
        container.scrollTo({
            left: index * container.scrollWidth / slidesData.length, // Más preciso en flex nativo
            behavior: behavior
        });
    };

    // Ajuste inicial para situar el scroll en el índice 1 sin animar
    useEffect(() => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            container.scrollTo({
                left: 1 * container.scrollWidth / slidesData.length,
                behavior: 'auto'
            });
        }
    }, []);

    const handleScroll = () => {
        if (!scrollContainerRef.current) return;
        const container = scrollContainerRef.current;

        setIsScrolling(true);
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

        const scrollPosition = container.scrollLeft;
        const cardWidth = container.scrollWidth / slidesData.length;
        const newIndex = Math.round(scrollPosition / cardWidth);

        if (newIndex !== activeIndex) {
            setActiveIndex(newIndex);
        }

        // Debounce: detectar cuando el scroll se asienta (fricción inercial terminada)
        scrollTimeoutRef.current = setTimeout(() => {
            setIsScrolling(false);

            // Lógica de Infinite Loop (Saltos silenciosos escondidos de la vista)
            if (newIndex === 0) {
                // Si llegamos al inicio (Clone B2), saltar silenciosamente al Real B2 (index 2)
                container.scrollTo({ left: 2 * cardWidth, behavior: 'auto' });
                setActiveIndex(2);
            } else if (newIndex === 3) {
                // Si llegamos al final (Clone B1), saltar al Real B1 (index 1)
                container.scrollTo({ left: 1 * cardWidth, behavior: 'auto' });
                setActiveIndex(1);
            } else if (newIndex === 4) {
                // Clone B2-end -> Real B2 (index 2)
                container.scrollTo({ left: 2 * cardWidth, behavior: 'auto' });
                setActiveIndex(2);
            }
        }, 150); // Tiempo suficiente tras detener el scroll snap
    };

    // --- Lógica de Auto-Play ---
    useEffect(() => {
        // Pausar si el usuario tiene el cursor encima
        if (isHovered) return;

        const autoplayInterval = setInterval(() => {
            // Avanzar al siguiente index (el handleScroll lidiará silenciosamente con los clones si llega al fin)
            slideTo(activeIndex + 1, 'smooth');
        }, 3000);

        // Limpiar intervalo para prevención fuga de memoria (unmount / cambian deps)
        return () => clearInterval(autoplayInterval);
    }, [activeIndex, isHovered]);
    // ----------------------------

    return (
        <section className="relative flex flex-col items-center justify-center min-h-screen px-4 pb-32 pt-40 overflow-hidden bg-[#020B1D]">
            {/* Sello Colombiano - Gallery Style (Golden Ratio Alignment) */}
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

            {/* Decoración ambiental casi invisible */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-[#0052FF]/[0.08] rounded-full blur-[140px]" />
                <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-[#0052FF]/[0.05] rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10 w-full max-w-[1400px] flex flex-col gap-12">
                {/* Header / Title Section */}
                <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0052FF]/10 text-white text-sm font-semibold mb-8 border border-[#0052FF]/30 shadow-[0_0_15px_rgba(0,82,255,0.2)] backdrop-blur-sm"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0052FF] opacity-80"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0052FF] shadow-[0_0_8px_#0052FF]"></span>
                        </span>
                        Innovación Constante
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="text-white font-sans text-xl md:text-3xl lg:text-4xl max-w-4xl mx-auto leading-[1.6] md:leading-[1.4] tracking-tight font-light"
                    >
                        Convertimos la incertidumbre clínica en{' '}
                        <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#E2E8F0] to-[#94A3B8] inline-block tracking-normal">
                            decisiones seguras
                        </span>
                        , gracias a un ecosistema de herramientas, análisis y acompañamiento que protege cada caso de principio a fin.
                    </motion.h1>


                </div>

                {/* ─── Carousel Nativo con Scroll Snap (Rueda Dentada 3D) ────────── */}
                <div
                    className="relative w-full flex flex-col items-center"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <div
                        ref={scrollContainerRef}
                        onScroll={handleScroll}
                        className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar w-full pb-10 pt-6"
                        style={{
                            // The instruction implies this should be handled by CSS in index.css
                            // scrollBehavior: 'smooth', 
                            perspective: '1200px',
                            transformStyle: 'preserve-3d',
                            // Forzamos que cada hijo (card) + gap tome un ancho medible exacto
                            gap: '2vw'
                        }}
                    >
                        {slidesData.map((slide, index) => (
                            <ImageCard
                                key={`${slide.id}-${index}`}
                                src={slide.src}
                                alt={slide.alt}
                                isActive={activeIndex === index}
                                isPrev={index < activeIndex}
                                isScrolling={isScrolling}
                                onClick={() => {
                                    if (activeIndex !== index) {
                                        slideTo(index, 'smooth');
                                    }
                                }}
                            />
                        ))}
                    </div>

                    {/* Dots / Paginación (Sincronizado al realIndex) */}
                    <div className="flex gap-3 justify-center mt-6 h-4 items-center">
                        {[0, 1].map((realIndex) => {
                            // Encontramos si el slide en el foco corresponde a esta bolita
                            const isDotActive = slidesData[activeIndex]?.realIndex === realIndex;
                            return (
                                <button
                                    key={`dot-${realIndex}`}
                                    onClick={() => {
                                        // Ir al índice real equivalente
                                        const targetIndex = realIndex === 0 ? 1 : 2;
                                        slideTo(targetIndex, 'smooth');
                                    }}
                                    className={cn(
                                        "rounded-full transition-all duration-500 ease-[cubic-bezier(0.45,0.05,0.55,0.95)]",
                                        isDotActive
                                            ? "w-8 h-2 bg-[#0052FF] shadow-[0_0_10px_#0052FF]"
                                            : "w-2 h-2 bg-[#A0AEC0]/30 hover:bg-[#A0AEC0]/60"
                                    )}
                                    aria-label={`Ir a slide ${realIndex + 1}`}
                                />
                            );
                        })}
                    </div>
                </div>

                <PremiumCard
                    src={heroBanner3}
                    alt="Laboratorio Dental Luis Milanes — piezas dentales finales"
                    delay={0.8}
                />
            </div>
        </section>
    );
};

export default Hero;
