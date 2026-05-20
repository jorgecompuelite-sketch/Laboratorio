import React from 'react';
import { motion } from 'framer-motion';

const SeguimientoOrdenes = () => {
    return (
        <div className="pt-24 pb-20 min-h-screen bg-transparent">
            <div className="container mx-auto px-4 md:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-2 h-12 bg-[#0D3690] rounded-full shadow-[0_0_15px_rgba(13,54,144,0.5)]" />
                        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Seguimiento de ordenes</h1>
                    </div>
                    <div className="prose prose-lg prose-invert text-[#E0E0E0] max-w-4xl bg-white/5 p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-white/10 backdrop-blur-sm">
                        <p>Página de seguimiento de ordenes en construcción.</p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default SeguimientoOrdenes;
