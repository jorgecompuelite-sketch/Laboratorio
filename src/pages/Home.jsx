import React from 'react';
import Hero from '../components/Hero';
import ServicesSection from '../components/ServicesSection';
import QuickLinks from '../components/QuickLinks';
import { motion } from 'framer-motion';

const Home = () => {
    return (
        <>
            <Hero />

            <QuickLinks />

            {/* Sobre Nosotros */}
            <section id="nosotros" className="py-24 bg-white relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-[#E5E7EB]" />
                <div className="container mx-auto px-4 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-semibold text-[#020D21] mb-6 tracking-tight">
                            Sobre Nosotros
                        </h2>
                        <div className="w-16 h-0.5 bg-[#020D21] mx-auto mb-8 rounded-full" />
                        <p className="max-w-2xl mx-auto text-[#4B5563] text-lg leading-[1.7] font-light">
                            Comprometidos con la excelencia y la innovación en cada pieza dental que creamos.
                            Nuestro laboratorio es sinónimo de calidad y precisión, respaldado por décadas de experiencia.
                        </p>
                    </motion.div>
                </div>
            </section>

            <ServicesSection />

            {/* Materiales */}
            <section id="materiales" className="py-24 bg-[#F8F9FA] relative">
                <div className="container mx-auto px-4 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-semibold text-[#020D21] mb-12"
                    >
                        Materiales de Alta Calidad
                    </motion.h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { title: "Zirconio Multicapa", desc: "Estética natural y resistencia incomparable." },
                            { title: "Disilicato de Litio", desc: "Perfecto para carillas y coronas anteriores." },
                            { title: "PMMA & PEEK", desc: "Soluciones provisionales y definitivas versátiles." }
                        ].map((m, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="p-8 bg-white rounded-2xl border border-[#E5E7EB] shadow-[0_2px_12px_rgba(2,13,33,0.05)] hover:shadow-[0_6px_24px_rgba(2,13,33,0.09)] hover:border-[#020D21]/20 transition-all group"
                            >
                                <h3 className="text-lg font-semibold text-[#020D21] mb-3 group-hover:text-[#0056A4] transition-colors">{m.title}</h3>
                                <p className="text-[#4B5563] font-light leading-[1.7]">{m.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pedidos */}
            <section id="pedidos" className="py-24 bg-white relative overflow-hidden">
                <div className="container mx-auto px-4 text-center relative z-10">
                    <h2 className="text-3xl md:text-5xl font-semibold text-[#020D21] mb-6">Realiza tu Pedido</h2>
                    <p className="mb-10 text-[#4B5563] text-lg max-w-xl mx-auto leading-[1.7] font-light">
                        Utiliza nuestra plataforma digital para enviar tus archivos STL o solicita el servicio de recolección física.
                    </p>
                    <motion.a
                        href="#contacto"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="btn-primary inline-flex"
                        style={{ borderRadius: '6px', padding: '14px 36px', fontSize: '1rem' }}
                    >
                        Iniciar Pedido Online
                    </motion.a>
                </div>
            </section>

            {/* Contacto */}
            <section id="contacto" className="py-24 bg-[#F8F9FA]">
                <div className="container mx-auto px-4 grid md:grid-cols-2 gap-16">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-semibold text-[#020D21] mb-6 tracking-tight">Contáctanos</h2>
                        <p className="text-[#4B5563] text-lg mb-10 leading-[1.7] font-light">
                            Estamos listos para atender tus dudas y comenzar a trabajar juntos en el éxito de tu clínica dental.
                        </p>
                        <ul className="space-y-5">
                            {[
                                { label: "Teléfono", value: "(602) 486 0740" },
                                { label: "Email", value: "contacto@labmilanes.com" },
                                { label: "Dirección", value: "Cali, Colombia" }
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-4 text-[#020D21]">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#020D21]" />
                                    <span className="font-semibold">{item.label}:</span>
                                    <span className="font-light text-[#4B5563]">{item.value}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Formulario */}
                    <motion.form
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-4 bg-white p-8 md:p-10 rounded-2xl border border-[#E5E7EB] shadow-[0_2px_16px_rgba(2,13,33,0.06)]"
                    >
                        <input
                            type="text"
                            placeholder="Nombre del Dr./Clínica"
                            className="w-full bg-[#F8F9FA] p-4 rounded-lg border border-[#E5E7EB] text-[#020D21] focus:ring-2 focus:ring-[#020D21] focus:border-transparent outline-none transition-all placeholder:text-[#9CA3AF] font-light text-[1.05rem]"
                            style={{ lineHeight: 1.7 }}
                        />
                        <input
                            type="email"
                            placeholder="Correo Electrónico"
                            className="w-full bg-[#F8F9FA] p-4 rounded-lg border border-[#E5E7EB] text-[#020D21] focus:ring-2 focus:ring-[#020D21] focus:border-transparent outline-none transition-all placeholder:text-[#9CA3AF] font-light text-[1.05rem]"
                            style={{ lineHeight: 1.7 }}
                        />
                        <textarea
                            placeholder="¿En qué podemos ayudarte?"
                            rows="4"
                            className="w-full bg-[#F8F9FA] p-4 rounded-lg border border-[#E5E7EB] text-[#020D21] focus:ring-2 focus:ring-[#020D21] focus:border-transparent outline-none transition-all placeholder:text-[#9CA3AF] font-light text-[1.05rem]"
                            style={{ lineHeight: 1.7 }}
                        />
                        <button className="btn-primary w-full" style={{ borderRadius: '6px', padding: '14px 24px' }}>
                            Enviar Mensaje
                        </button>
                    </motion.form>
                </div>
            </section>
        </>
    );
};

export default Home;
