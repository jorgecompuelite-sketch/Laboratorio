import React from 'react';
import { motion } from 'framer-motion';

const ZirconioZR7 = () => {
    return (
        <div className="min-h-screen bg-transparent">
            {/* Top Banner Simulation */}
            <div 
                className="w-full h-[250px] md:h-[350px] bg-[#2d2822] relative flex items-center justify-center mt-20"
                style={{
                    backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url("/hero-bg.jpg")', // fallback layout if image doesn't exist
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                {/* Fallback pattern if image is missing */}
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl pb-20">
                {/* Header Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative text-center mb-16 pt-12"
                >
                    {/* Decorative Dots Pattern */}
                    <div className="absolute top-12 left-0 hidden md:block opacity-30">
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

                    <div className="absolute top-12 right-0 hidden md:block opacity-30">
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
                        ZIRCONIO ZR7
                    </h1>
                </motion.div>

                {/* Content Sections */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="space-y-6 max-w-5xl mx-auto"
                >
                    <p className="text-white text-sm md:text-base leading-relaxed text-left md:text-justify">
                        El Zirconio ZR7 es la combinación perfecta entre resistencia y translucidez, logrando la perfección en las restauraciones tanto de una unidad como las de un arco completo. Con esta nueva generación de Zirconio, le damos la bienvenida a la fantasía de imitar la anatomía dental.
                    </p>
                    <p className="text-white text-sm md:text-base leading-relaxed text-left md:text-justify">
                        Las características principales de este material, es que combina la alta resistencia con la translucidez, permitiendo lograr una estratificación de color con pigmentos internos y externos muy singulares, obteniendo la fantasía de imitar los dientes naturales.
                    </p>
                    <p className="text-white text-sm md:text-base leading-relaxed text-left md:text-justify">
                        Este material tiene tanto la dureza como la translucidez de manera progresiva. En la parte incisal, tienen mayor translucidez y menor resistencia, y en la parte gingival, menor translucidez y más resistencia, tal y como son los dientes naturales. Ya no necesitará Cerámicas dentales para lograr excelentes resultados en la naturalidad de sus tratamientos.
                    </p>
                    <p className="text-white text-sm md:text-base leading-relaxed text-left font-medium pt-2">
                        En este material contamos con dos tipos: Zirconio ZR7 Dientes Anteriores y Zirconio ZR7 Multipropósito
                    </p>
                    <p className="text-white text-sm md:text-base leading-relaxed text-left font-semibold mt-4">
                        Características y aspectos importantes:
                    </p>

                    {/* Table */}
                    <div className="mt-8 overflow-x-auto border-t border-b border-white/20">
                        <table className="w-full min-w-[800px] text-sm text-left">
                            <thead className="bg-[#F9FAFB] text-[#2AB2D6] font-medium border-b border-white/20">
                                <tr>
                                    <th className="px-6 py-4">Producto</th>
                                    <th className="px-6 py-4">Resistencia</th>
                                    <th className="px-6 py-4">Translucidez</th>
                                    <th className="px-6 py-4">Indicación</th>
                                    <th className="px-6 py-4">Usos</th>
                                </tr>
                            </thead>
                            <tbody className="text-white">
                                <tr className="border-b border-[#F3F4F6] bg-transparent">
                                    <td className="px-6 py-5 font-semibold align-top">Zirconio ZR7<br/><span className="font-normal text-xs text-white">Dientes Anteriores</span></td>
                                    <td className="px-6 py-5 align-top font-medium">900-1100 MPa</td>
                                    <td className="px-6 py-5 align-top font-medium">49%</td>
                                    <td className="px-6 py-5 align-top">Puentes Máx hasta de 6 Unidades</td>
                                    <td className="px-6 py-5 align-top">
                                        <ul className="list-disc pl-4 space-y-1">
                                            <li>Coronas</li>
                                            <li>Puentes</li>
                                            <li>Carillas</li>
                                            <li>Puente Maryland anterior</li>
                                        </ul>
                                    </td>
                                </tr>
                                <tr className="bg-transparent">
                                    <td className="px-6 py-5 font-semibold align-top">Zirconio ZR7<br/><span className="font-normal text-xs text-white">Multi-propósito</span></td>
                                    <td className="px-6 py-5 align-top font-medium">900-1200 MPa</td>
                                    <td className="px-6 py-5 align-top font-medium">43%</td>
                                    <td className="px-6 py-5 align-top">Herraduras completas</td>
                                    <td className="px-6 py-5 align-top">
                                        <ul className="list-disc pl-4 space-y-1">
                                            <li>Coronas</li>
                                            <li>Puentes</li>
                                            <li>Incrustaciones</li>
                                            <li>Puente Maryland Posterior</li>
                                        </ul>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </motion.div>

                {/* Call to Actions - Stacked */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-20 flex flex-col items-center gap-6 pb-10 max-w-2xl mx-auto"
                >
                    {/* Action 1 */}
                    <div className="bg-transparent border border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.04)] rounded-2xl p-6 w-full flex flex-col md:flex-row items-center gap-6 justify-between hover:shadow-[0_10px_30px_rgba(42,178,214,0.1)] transition-all">
                        <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left flex-grow">
                            <div className="w-14 h-14 rounded-full bg-[#E5F6FA] flex items-center justify-center flex-shrink-0">
                                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2AB2D6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                    <circle cx="12" cy="14" r="3"></circle>
                                    <path d="M12 11v-1"></path>
                                    <path d="M12 18v-1"></path>
                                    <path d="M9 14h1"></path>
                                    <path d="M15 14h-1"></path>
                                </svg>
                            </div>
                            <h3 className="text-[15px] font-medium text-white max-w-[250px]">¿Quieres saber cómo realizar una orden o pedido?</h3>
                        </div>
                        <a href="/#pedidos" className="bg-[#0056A4] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#004082] transition-colors whitespace-nowrap mt-4 md:mt-0">
                            Ver paso a paso
                        </a>
                    </div>

                    {/* Action 2 */}
                    <div className="bg-transparent border border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.04)] rounded-2xl p-6 w-full flex flex-col md:flex-row items-center gap-6 justify-between hover:shadow-[0_10px_30px_rgba(42,178,214,0.1)] transition-all">
                        <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left flex-grow">
                            <div className="w-14 h-14 rounded-full bg-[#E5F6FA] flex items-center justify-center flex-shrink-0">
                                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2AB2D6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                                </svg>
                            </div>
                            <h3 className="text-[15px] font-medium text-white max-w-[250px]">Solicita nuestro Catálogo 2026 en versión digital o física a tu consultorio.</h3>
                        </div>
                        <a href="/solicitar-catalogo" className="bg-[#0056A4] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#004082] transition-colors whitespace-nowrap mt-4 md:mt-0">
                            Descarga catálogo
                        </a>
                    </div>

                    {/* Action 3 */}
                    <div className="bg-transparent border border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.04)] rounded-2xl p-6 w-full flex flex-col md:flex-row items-center gap-6 justify-between hover:shadow-[0_10px_30px_rgba(42,178,214,0.1)] transition-all">
                        <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left flex-grow">
                            <div className="w-14 h-14 rounded-full bg-[#E5F6FA] flex items-center justify-center flex-shrink-0">
                                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2AB2D6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                                    <polyline points="21 15 16 10 5 21"></polyline>
                                </svg>
                            </div>
                            <h3 className="text-[15px] font-medium text-white max-w-[250px]">Comunícate para enviarte las imágenes de nuestros productos y materiales.</h3>
                        </div>
                        <a href="/#contacto" className="bg-[#0056A4] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#004082] transition-colors whitespace-nowrap mt-4 md:mt-0">
                            Contáctanos aquí
                        </a>
                    </div>
                </motion.div>
                
            </div>
        </div>
    );
};

export default ZirconioZR7;
