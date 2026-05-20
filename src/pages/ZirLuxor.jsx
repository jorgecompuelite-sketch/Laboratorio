import React from 'react';
import { motion } from 'framer-motion';

const ZirLuxor = () => {
    return (
        <div className="min-h-screen bg-transparent pt-28 pb-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
                
                {/* Header Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative text-center mb-16 pt-8"
                >
                    {/* Decorative Dots Pattern (simulating the image corners) */}
                    <div className="absolute top-0 left-0 hidden md:block opacity-30">
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="2" cy="2" r="2" fill="#2AB2D6"/>
                            <circle cx="14" cy="2" r="2" fill="#2AB2D6"/>
                            <circle cx="26" cy="2" r="2" fill="#2AB2D6"/>
                            <circle cx="38" cy="2" r="2" fill="#2AB2D6"/>
                            <circle cx="2" cy="14" r="2" fill="#2AB2D6"/>
                            <circle cx="14" cy="14" r="2" fill="#2AB2D6"/>
                            <circle cx="26" cy="14" r="2" fill="#2AB2D6"/>
                            <circle cx="38" cy="14" r="2" fill="#2AB2D6"/>
                            <circle cx="2" cy="26" r="2" fill="#2AB2D6"/>
                            <circle cx="14" cy="26" r="2" fill="#2AB2D6"/>
                            <circle cx="26" cy="26" r="2" fill="#2AB2D6"/>
                            <circle cx="38" cy="26" r="2" fill="#2AB2D6"/>
                        </svg>
                    </div>

                    <div className="absolute top-0 right-0 hidden md:block opacity-30">
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="2" cy="2" r="2" fill="#2AB2D6"/>
                            <circle cx="14" cy="2" r="2" fill="#2AB2D6"/>
                            <circle cx="26" cy="2" r="2" fill="#2AB2D6"/>
                            <circle cx="38" cy="2" r="2" fill="#2AB2D6"/>
                            <circle cx="2" cy="14" r="2" fill="#2AB2D6"/>
                            <circle cx="14" cy="14" r="2" fill="#2AB2D6"/>
                            <circle cx="26" cy="14" r="2" fill="#2AB2D6"/>
                            <circle cx="38" cy="14" r="2" fill="#2AB2D6"/>
                            <circle cx="2" cy="26" r="2" fill="#2AB2D6"/>
                            <circle cx="14" cy="26" r="2" fill="#2AB2D6"/>
                            <circle cx="26" cy="26" r="2" fill="#2AB2D6"/>
                            <circle cx="38" cy="26" r="2" fill="#2AB2D6"/>
                        </svg>
                    </div>

                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-[#2AB2D6] tracking-wide uppercase">
                        ZIR LUXOR. ZIRCONIO PREMIUM
                    </h1>
                </motion.div>

                {/* Content Sections */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="space-y-8 max-w-5xl mx-auto"
                >
                    <p className="text-white text-sm md:text-base leading-relaxed text-left md:text-justify">
                        Zir-LUXOR es un zirconio Premium, de alta calidad que viene coloreado de fábrica, con la estratificación de color y translucidez más natural de la industria. Las prótesis realizadas con este material logran resultados con un degradado natural de color, translucidez y fuerza, debido a que las partículas que lo componen son micro-pulverizadas para lograr más viveza en la translucidez. Además, su abrasión es compatible con la dureza del esmalte dental.
                    </p>

                    <div>
                        <h2 className="text-xl md:text-2xl font-light text-[#2AB2D6] mb-3 uppercase tracking-wide">
                            RESISTENCIA
                        </h2>
                        <p className="text-white text-sm md:text-base leading-relaxed text-left md:text-justify">
                            La dureza cervical hasta el tercio medio de Zir LUXOR es de hasta 1300 MPa, lo cual es una gran diferencia con un zirconio convencional. Los puentes de tramo largo son estables y cumplen plenamente los requisitos de resistencia para una amplia gama de indicaciones.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl md:text-2xl font-light text-[#2AB2D6] mb-3 uppercase tracking-wide">
                            TRANSICIÓN NATURAL SIN CAPAS
                        </h2>
                        <p className="text-white text-sm md:text-base leading-relaxed text-left">
                            Zir LUXOR tiene un degradado de color suave sin capas visibles.
                        </p>
                    </div>

                    {/* Table */}
                    <div className="mt-12 overflow-x-auto border-t border-b border-white/20">
                        <table className="w-full min-w-[800px] text-sm text-left">
                            <thead className="bg-[#F9FAFB] text-[#2AB2D6] font-medium border-b border-white/20">
                                <tr>
                                    <th className="px-6 py-4">Producto</th>
                                    <th className="px-6 py-4">Resistencia en Cervical</th>
                                    <th className="px-6 py-4">Translucidez</th>
                                    <th className="px-6 py-4">Indicación</th>
                                    <th className="px-6 py-4">Usos</th>
                                </tr>
                            </thead>
                            <tbody className="text-white">
                                <tr className="border-b border-[#F3F4F6] bg-transparent">
                                    <td className="px-6 py-5 font-semibold align-top">Zir Luxor<br/><span className="font-normal text-xs text-white">Dientes Anteriores</span></td>
                                    <td className="px-6 py-5 align-top">1000 MPa</td>
                                    <td className="px-6 py-5 align-top">57%</td>
                                    <td className="px-6 py-5 align-top">Puente Máx 3 Unidades</td>
                                    <td className="px-6 py-5 align-top">
                                        <ul className="list-disc pl-4 space-y-1">
                                            <li>Carillas</li>
                                            <li>Coronas Anteriores</li>
                                            <li>Incrustaciones</li>
                                            <li>Anteriores</li>
                                            <li>Puentes Anteriores</li>
                                            <li>Maryland Anterior</li>
                                        </ul>
                                    </td>
                                </tr>
                                <tr className="bg-transparent">
                                    <td className="px-6 py-5 font-semibold align-top">Zir Luxor<br/><span className="font-normal text-xs text-white">Multi-propósito</span></td>
                                    <td className="px-6 py-5 align-top">1300 MPa</td>
                                    <td className="px-6 py-5 align-top">51%</td>
                                    <td className="px-6 py-5 align-top">Herraduras completas</td>
                                    <td className="px-6 py-5 align-top">
                                        <ul className="list-disc pl-4 space-y-1">
                                            <li>Carillas</li>
                                            <li>Coronas Posteriores</li>
                                            <li>Coronas Anteriores</li>
                                            <li>Incrustaciones</li>
                                            <li>Maryland Posterior</li>
                                            <li>Prótesis Híbridas</li>
                                            <li>Arcos Completos</li>
                                            <li>Coronas sobre Implante</li>
                                        </ul>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Colors Section */}
                    <div className="pt-8">
                        <h3 className="text-[#2AB2D6] text-lg font-medium mb-6">Colores Disponibles:</h3>
                        <div className="flex flex-wrap gap-4 items-end">
                            {['A1', 'A2', 'A3', 'A3.5', 'A4', 'B1', 'B2', 'B3', 'B4', 'C1', 'C2', 'C3', 'C4', 'D2', 'D3', 'D4', 'Hollywood White'].map((color, i) => (
                                <div key={i} className="flex flex-col items-center gap-2">
                                    {/* Mock tooth shape block with gradient to simulate tooth shade */}
                                    <div 
                                        className="w-8 h-12 bg-gradient-to-b from-[#FFFDF8] to-[#EAE0D1] border border-white/20 shadow-sm flex items-end justify-center pb-1 text-[10px] text-white font-bold"
                                        style={{
                                            borderRadius: '8px 8px 4px 4px',
                                            opacity: color === 'Hollywood White' ? 1 : 0.9 - (i * 0.02) // subtle darkening simulation
                                        }}
                                    >
                                    </div>
                                    <span className="text-xs text-white font-medium">{color}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                </motion.div>

                {/* Call to Action Footer */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-20 flex justify-center pb-10"
                >
                    <a 
                        href="/#pedidos" 
                        className="bg-transparent border border-white/20 shadow-[0_10px_40px_rgba(0,0,0,0.06)] rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 group hover:shadow-[0_10px_40px_rgba(42,178,214,0.15)] transition-all duration-300 transform hover:-translate-y-1"
                    >
                        <div className="w-12 h-12 rounded-full bg-[#E5F6FA] flex items-center justify-center group-hover:bg-[#2AB2D6] transition-colors duration-300">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#2AB2D6] group-hover:text-white transition-colors duration-300">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                <polyline points="14 2 14 8 20 8"></polyline>
                                <line x1="16" y1="13" x2="8" y2="13"></line>
                                <line x1="16" y1="17" x2="8" y2="17"></line>
                                <polyline points="10 9 9 9 8 9"></polyline>
                            </svg>
                        </div>
                        <div className="text-center md:text-left">
                            <h3 className="text-lg font-medium text-white mb-1 group-hover:text-[#2AB2D6] transition-colors">¿Quieres saber cómo realizar una orden o pedido?</h3>
                            <p className="text-sm text-white">Haz clic aquí para ver nuestra guía de envío de trabajos.</p>
                        </div>
                    </a>
                </motion.div>
                
            </div>
        </div>
    );
};

export default ZirLuxor;
