import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileSearch, FileDown } from 'lucide-react';
import FormularioPrescripcion from '../components/FormularioPrescripcion';
const DotsOrnament = ({ mirrored }) => (
    <div className={`hidden md:block opacity-60 ${mirrored ? 'scale-x-[-1]' : ''}`}>
        <svg width="40" height="20" viewBox="0 0 40 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="5" cy="5" r="2" fill="#2AB2D6" />
            <circle cx="15" cy="5" r="2" fill="#2AB2D6" />
            <circle cx="25" cy="5" r="2" fill="#2AB2D6" />
            <circle cx="35" cy="5" r="2" fill="#2AB2D6" />
            
            <circle cx="10" cy="15" r="2" fill="#2AB2D6" />
            <circle cx="20" cy="15" r="2" fill="#2AB2D6" />
            <circle cx="30" cy="15" r="2" fill="#2AB2D6" />
        </svg>
    </div>
);

const SolicitudPedido = () => {
    const [showEditor, setShowEditor] = useState(false);
    return (
        <div className="pt-36 pb-24 min-h-screen bg-transparent">
            <div className="container mx-auto px-4 md:px-8 max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center"
                >
                    {/* Header */}
                    <div className="flex items-center justify-center gap-8 mb-20 w-full">
                        <DotsOrnament />
                        <h1 className="text-3xl md:text-[2.6rem] leading-tight font-light text-[#2AB2D6] text-center uppercase tracking-wide max-w-4xl">
                            ¿Cómo realizar una orden de pedido y diligenciar la prescripción?
                        </h1>
                        <DotsOrnament mirrored />
                    </div>

                    {/* Content Section */}
                    <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between w-full gap-16 lg:gap-8">
                        
                        {/* Text part */}
                        <div className="w-full lg:w-5/12 flex flex-col space-y-4 text-center lg:text-left pt-2 lg:pt-8">
                            <h2 className="text-xl md:text-2xl font-light text-[#2AB2D6] uppercase tracking-widest">
                                1. Prepare su trabajo
                            </h2>
                            <p className="text-white font-light text-[1.1rem] leading-relaxed max-w-md mx-auto lg:mx-0">
                                Diligencie la prescripción de forma adecuada relacionando
                                los datos requeridos
                            </p>
                        </div>

                        {/* Cards part */}
                        <div className="w-full lg:w-7/12 flex flex-col sm:flex-row justify-center lg:justify-end gap-8 lg:gap-12">
                            
                            {/* Card 1 */}
                            <div className="bg-transparent rounded-lg shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-gray-100/50 p-8 flex flex-col items-center text-center w-full sm:w-[300px] hover:shadow-[0_15px_50px_rgba(42,178,214,0.15)] transition-shadow duration-300">
                                <div className="w-24 h-24 rounded-full bg-[#E0F2F7] flex items-center justify-center mb-6">
                                    <FileSearch size={40} className="text-[#2AB2D6]" strokeWidth={1.5} />
                                </div>
                                <h3 className="text-white text-lg font-light mb-8 px-4 h-14 flex items-center justify-center leading-snug">
                                    Cómo diligenciar la prescripción
                                </h3>
                                <button className="w-full py-3 px-6 rounded-full bg-gradient-to-r from-[#0052FF] to-[#2AB2D6] text-white font-normal hover:scale-[1.02] transition-transform shadow-md">
                                    Ver video
                                </button>
                            </div>

                            {/* Card 2 */}
                            <div className="bg-transparent rounded-lg shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-gray-100/50 p-8 flex flex-col items-center text-center w-full sm:w-[300px] hover:shadow-[0_15px_50px_rgba(0,82,255,0.15)] transition-shadow duration-300">
                                <div className="w-24 h-24 rounded-full bg-[#E0F2F7] flex items-center justify-center mb-6">
                                    <FileDown size={40} className="text-[#2AB2D6]" strokeWidth={1.5} />
                                </div>
                                <h3 className="text-white text-lg font-light mb-8 px-4 h-14 flex items-center justify-center leading-snug">
                                    Prescripción
                                </h3>
                                <button 
                                    onClick={() => setShowEditor(!showEditor)}
                                    className="w-full text-center py-3 px-6 rounded-full bg-gradient-to-r from-[#0052FF] to-[#2AB2D6] text-white font-normal hover:scale-[1.02] transition-transform shadow-md block"
                                >
                                    {showEditor ? "Cerrar Editor" : "Llenar y Descargar"}
                                </button>
                            </div>

                        </div>
                    </div>

                    {/* Interactive Editor Section */}
                    {showEditor && (
                        <div className="w-full mt-24">
                            <h3 className="text-2xl text-[#2AB2D6] font-light text-center mb-8 uppercase tracking-widest">
                                Llenar Prescripción PDF
                            </h3>
                            <FormularioPrescripcion pdfUrl="/ORDENE_DE_PRODUCCION.pdf" />
                        </div>
                    )}

                </motion.div>
            </div>
        </div>
    );
};

export default SolicitudPedido;
