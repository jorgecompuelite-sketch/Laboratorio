import React from 'react';
import { motion } from 'framer-motion';
import { FileText, PlayCircle, CreditCard, Search, ArrowRight } from 'lucide-react';

const QuickLinks = () => {
    const cards = [
        {
            title: "Cómo diligenciar la prescripción",
            icon: <FileText size={40} className="text-[#0056A4]" />,
            action: "Ver video",
            iconBg: "bg-[#0056A4]/20",
            btnColor: "bg-[#0056A4]",
            delay: 0.1
        },
        {
            title: "Formato de prescripción",
            icon: <div className="relative">
                <FileText size={40} className="text-[#0056A4]" />
                <ArrowRight size={16} className="absolute bottom-0 right-0 text-[#0056A4] bg-white rounded-full p-0.5" />
            </div>,
            action: "Diligenciar",
            iconBg: "bg-[#0056A4]/20",
            btnColor: "bg-[#0056A4]",
            delay: 0.2
        },
        {
            title: "Realiza tus pagos de forma segura",
            isPse: true,
            action: null,
            iconBg: "bg-white/10",
            delay: 0.3
        },
        {
            title: "Seguimiento de órdenes",
            icon: <Search size={40} className="text-[#0056A4]" />,
            action: "Ver reporte",
            iconBg: "bg-[#0056A4]/20",
            btnColor: "bg-[#0056A4]",
            delay: 0.4
        }
    ];

    return (
        <section className="py-20 bg-[#020B1D] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#0056A4]/20 to-transparent" />
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {cards.map((card, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: card.delay, duration: 0.4 }}
                            whileHover={{ y: -10, transition: { duration: 0.2 } }}
                            className="bg-white/5 rounded-[2rem] p-8 border border-white/10 flex flex-col items-center text-center transition-all duration-300 group hover:border-[#0056A4]/40 hover:bg-white/[0.08] relative overflow-hidden"
                        >
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#0056A4]/5 rounded-full blur-2xl group-hover:bg-[#0056A4]/10 transition-colors" />

                            {/* Icon Area */}
                            <div className={`w-20 h-20 rounded-2xl ${card.iconBg} flex items-center justify-center mb-8 transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(0,86,164,0.2)]`}>
                                {card.isPse ? (
                                    <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center shadow-lg p-2 overflow-hidden">
                                        <img
                                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/PSE_logo_2016.svg/200px-PSE_logo_2016.svg.png"
                                            alt="PSE"
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                ) : (
                                    card.icon
                                )}
                            </div>

                            <h3 className="text-xl font-bold text-white mb-8 px-2 min-h-[3.5rem] flex items-center justify-center group-hover:text-[#0056A4] transition-colors leading-tight">
                                {card.title}
                            </h3>

                            {card.action && (
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`px-8 py-3 rounded-xl text-white text-sm font-bold shadow-lg transition-all ${card.btnColor} w-full border border-white/10`}
                                >
                                    {card.action}
                                </motion.button>
                            )}

                            {card.isPse && (
                                <a
                                    href="https://www.psepagos.co/PSEHostingUI/ShowTicketOffice.aspx?ID=6046"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="absolute inset-0 z-10"
                                />
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>

    );
};

export default QuickLinks;
