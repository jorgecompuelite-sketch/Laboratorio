import React from 'react';
import { motion } from 'framer-motion';
import { CircuitBoard, Layers, Smile, Activity, ShieldCheck, Microscope } from 'lucide-react';

const services = [
    {
        icon: Smile,
        title: 'Prótesis Estética',
        description: 'Carillas y coronas sobre implantes con acabados naturales y resistencia superior.',
        color: 'bg-blue-100 text-blue-600',
    },
    {
        icon: CircuitBoard,
        title: 'Ortodoncia Digital',
        description: 'Alineadores invisibles y planificación 3D para tratamientos precisos y predecibles.',
        color: 'bg-teal-100 text-teal-600',
    },
    {
        icon: Layers,
        title: 'Flujo CAD/CAM',
        description: 'Diseño asistido por computadora y manufactura de alta precisión para ajustes perfectos.',
        color: 'bg-indigo-100 text-indigo-600',
    },
    {
        icon: Activity,
        title: 'Implantes Dentales',
        description: 'Soluciones completas para rehabilitación oral con los mejores materiales biocompatibles.',
        color: 'bg-sky-100 text-sky-600',
    },
    {
        icon: Microscope,
        title: 'Diagnóstico Preciso',
        description: 'Análisis detallado y planificación quirúrgica guiada para casos complejos.',
        color: 'bg-emerald-100 text-emerald-600',
    },
    {
        icon: ShieldCheck,
        title: 'Garantía Certificada',
        description: 'Todos nuestros trabajos cuentan con garantía y trazabilidad de materiales.',
        color: 'bg-slate-100 text-slate-600',
    },
];

const ServicesSection = () => {
    return (
        <section id="servicios" className="py-24 relative overflow-hidden bg-transparent">
            {/* Background blobs in company brand blue */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#0056A4]/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[#0056A4]/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/4" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 bg-[#0056A4]/10 border border-[#0056A4]/20 px-5 py-2 rounded-full mb-6"
                    >
                        <div className="w-1.5 h-1.5 rounded-full bg-[#0056A4]" />
                        <span className="text-sm font-bold text-[#E0E0E0] uppercase tracking-widest">Servicios Especializados</span>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold text-white mb-6"
                    >
                        Soluciones Integrales para <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0056A4] to-white">Odontología Moderna</span>
                    </motion.h2>
                    <p className="text-[#94A3B8] text-lg md:text-xl">
                        Acompañamos tu práctica clínica con servicios de alta precisión y materiales de última generación.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group p-10 rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-[#0056A4]/50 shadow-2xl hover:shadow-[#0056A4]/10 transition-all duration-500 relative overflow-hidden"
                        >
                            <div className={`absolute -top-10 -right-10 w-40 h-40 ${service.color} opacity-10 rounded-full blur-[40px] transition-transform group-hover:scale-125`} />

                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 bg-[#0056A4]/20 text-[#0056A4] transition-transform group-hover:scale-110 shadow-[0_0_20px_rgba(0,86,164,0.1)]`}>
                                <service.icon size={32} />
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#0056A4] transition-colors">
                                {service.title}
                            </h3>

                            <p className="text-[#94A3B8] leading-relaxed group-hover:text-[#E0E0E0] transition-colors">
                                {service.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};


export default ServicesSection;
