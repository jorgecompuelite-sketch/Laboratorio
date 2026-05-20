import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { collection, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Check } from 'lucide-react';

const PageLayout = ({ title, bgClass = 'bg-transparent', titleColor="text-white", children }) => {
    return (
        <div className={`pt-32 pb-20 min-h-screen ${bgClass}`}>
            <div className="container mx-auto px-4 md:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex flex-col items-center gap-6 mb-12 text-center">
                        <h1 className={`text-4xl md:text-5xl lg:text-5xl font-light ${titleColor} tracking-wide`}>
                            {title}
                        </h1>
                    </div>
                    {children}
                </motion.div>
            </div>
        </div>
    );
};

const TrabajaConNosotros = () => {
    const [offers, setOffers] = useState([]);
    const [loadingOffers, setLoadingOffers] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [selectedOffer, setSelectedOffer] = useState(null);
    
    // Form state
    const [formData, setFormData] = useState({
        nombre: '',
        telefono: '',
        email: '',
        ciudad: '',
        perfil: 'Auxiliar de Odontología o Higienista Oral',
        otroPerfil: '',
        link_linkedin: '',
        aceptaPoliticas: false,
    });

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "job_offers"), (snapshot) => {
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            // Parse dates to sort or format if needed here (currently stored as string DD/MM/YYYY)
            setOffers(data);
            setLoadingOffers(false);
        }, (error) => {
             console.error("Error fetching job offers:", error);
             setLoadingOffers(false);
        });

        return () => unsubscribe();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.aceptaPoliticas) {
            alert("Debes aceptar la política de protección de datos.");
            return;
        }

        setSubmitting(true);
        try {
            // Save to Firestore 'job_applications'
            await addDoc(collection(db, "job_applications"), {
                ...formData,
                createdAt: serverTimestamp(),
            });

            setSuccessMessage("¡Tu postulación ha sido enviada con éxito! Nos pondremos en contacto contigo pronto.");
            setFormData({
                nombre: '',
                telefono: '',
                email: '',
                ciudad: '',
                perfil: 'Auxiliar de Odontología o Higienista Oral',
                otroPerfil: '',
                link_linkedin: '',
                aceptaPoliticas: false,
            });
            
            // Note: Since we don't have Firebase Storage set up strictly in this snippet, the file upload
            // input is purely aesthetic in the UI right now, but the data is captured in Firestore.

        } catch (error) {
            console.error("Error submitting application:", error);
            alert("Hubo un error enviando la postulación. Por favor intenta de nuevo.");
        }
        setSubmitting(false);
    };

    return (
        <PageLayout title="Trabaja con Nosotros" bgClass="bg-transparent" titleColor="text-[#2AB2D6]">
            
            <div className="max-w-5xl mx-auto">
                <p className="text-center text-white text-xl mb-16 font-light">
                    Conoce aquí las ofertas de trabajo en el Laboratorio Luis Milanés y postúlate
                </p>

                {/* Ofertas Grid */}
                {loadingOffers ? (
                    <p className="text-center py-10 text-white">Cargando ofertas...</p>
                ) : offers.length === 0 ? (
                    <p className="text-center py-10 text-white">Actualmente no hay ofertas de empleo disponibles. Revisa más tarde.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20 px-4 md:px-0">
                        {offers.map((offer) => (
                            <div key={offer.id} className="flex flex-col text-center">
                                <h3 className="text-[#2AB2D6] text-xl min-h-[56px] font-medium mb-3 leading-snug">
                                    {offer.title}
                                </h3>
                                <p className="text-white uppercase text-sm tracking-widest mb-6 font-semibold">
                                    {offer.city}
                                </p>
                                <div className="mt-auto">
                                    <p className="text-white mb-6 font-light">{offer.date || "Inmediato"}</p>
                                    <button 
                                        onClick={() => setSelectedOffer(offer)}
                                        className="inline-block bg-[#2AB2D6] text-white px-8 py-2.5 rounded hover:bg-[#2094B4] transition-colors font-medium"
                                    >
                                        Ver oferta
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Dots / Navigation Simulation (Static as per design) */}
                {offers.length > 3 && (
                    <div className="flex justify-center items-center gap-6 mb-24">
                        <button className="text-white hover:text-[#2AB2D6] transition-colors">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                        </button>
                        <div className="flex gap-2">
                            <div className="w-2 h-2 rounded-full bg-gray-600"></div>
                            <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                        </div>
                        <button className="text-white hover:text-[#2AB2D6] transition-colors">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                        </button>
                    </div>
                )}


                {/* Separador */}
                <div className="h-px bg-gray-200 w-full mb-16 max-w-4xl mx-auto" />

                {/* Formulario */}
                <div id="postularse" className="max-w-4xl mx-auto">
                    <h2 className="text-center text-white text-xl mb-12 font-light">
                        Diligencia este formulario con tus datos personales y adjunta tu hoja de vida
                    </h2>

                    {successMessage ? (
                        <div className="bg-[#2AB2D6]/10 border border-[#2AB2D6]/20 text-[#2AB2D6] p-6 rounded-lg text-center flex flex-col items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-[#2AB2D6] text-white flex items-center justify-center">
                                <Check size={24} />
                            </div>
                            <p className="text-lg">{successMessage}</p>
                            <button 
                                onClick={() => setSuccessMessage('')}
                                className="mt-2 block w-max mx-auto text-sm underline hover:text-[#2094B4]"
                            >
                                Enviar otra postulación
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-xs font-semibold uppercase text-white mb-2 tracking-wide">Nombre completo <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    name="nombre"
                                    required
                                    value={formData.nombre}
                                    onChange={handleChange}
                                    className="w-full bg-[#EFEFEF] p-3 border-b-2 border-transparent focus:border-[#2AB2D6] outline-none transition-colors text-white h-12"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-semibold uppercase text-white mb-2 tracking-wide">Teléfono de contacto <span className="text-red-500">*</span></label>
                                    <input
                                        type="tel"
                                        name="telefono"
                                        required
                                        value={formData.telefono}
                                        onChange={handleChange}
                                        className="w-full bg-[#EFEFEF] p-3 border-b-2 border-transparent focus:border-[#2AB2D6] outline-none transition-colors text-white h-12"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold uppercase text-white mb-2 tracking-wide">Email <span className="text-red-500">*</span></label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full bg-[#EFEFEF] p-3 border-b-2 border-transparent focus:border-[#2AB2D6] outline-none transition-colors text-white h-12"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold uppercase text-white mb-2 tracking-wide">Ciudad <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    name="ciudad"
                                    required
                                    value={formData.ciudad}
                                    onChange={handleChange}
                                    className="w-full bg-[#EFEFEF] p-3 border-b-2 border-transparent focus:border-[#2AB2D6] outline-none transition-colors text-white h-12"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold uppercase text-white mb-2 tracking-wide">Tipo de Perfil</label>
                                <select
                                    name="perfil"
                                    value={formData.perfil}
                                    onChange={handleChange}
                                    className="w-full bg-[#EFEFEF] p-3 border-b-2 border-transparent focus:border-[#2AB2D6] outline-none transition-colors text-white h-12 appearance-none cursor-pointer"
                                    style={{ backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%23718096" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>')`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.2em' }}
                                >
                                    <option>Auxiliar de Odontología o Higienista Oral</option>
                                    <option>Auxiliar Contable</option>
                                    <option>Mensajero Motorizado</option>
                                    <option>Técnico Dental</option>
                                    <option>Otro</option>
                                </select>
                                <p className="text-xs text-white mt-2 italic font-light">De la siguiente lista seleccione su perfil</p>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold uppercase text-white mb-2 tracking-wide">Otro tipo de perfil</label>
                                <input
                                    type="text"
                                    name="otroPerfil"
                                    value={formData.otroPerfil}
                                    onChange={handleChange}
                                    className="w-full bg-[#EFEFEF] p-3 border-b-2 border-transparent focus:border-[#2AB2D6] outline-none transition-colors text-white h-12"
                                />
                                <p className="text-xs text-white mt-2 italic font-light">Si no encuentra su tipo de perfil en la lista desplegable, escríbalo aquí</p>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold uppercase text-white mb-2 tracking-wide">Cargar Hoja de vida</label>
                                <div className="flex items-center gap-4">
                                    <label className="cursor-pointer bg-[#1EB5A9] hover:bg-[#18968B] text-white px-6 py-2.5 rounded transition-colors text-sm font-medium inline-block">
                                        Elegir archivo
                                        <input type="file" className="hidden" accept=".pdf,.doc,.docx" />
                                    </label>
                                    <span className="text-white text-sm italic">Ningún archivo seleccionado</span>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold uppercase text-white mb-2 tracking-wide">Perfil de LinkedIn</label>
                                <input
                                    type="url"
                                    name="link_linkedin"
                                    value={formData.link_linkedin}
                                    onChange={handleChange}
                                    placeholder="Escriba el enlace de su perfil de LinkedIn"
                                    className="w-full bg-[#EFEFEF] p-3 border-b-2 border-transparent focus:border-[#2AB2D6] outline-none transition-colors text-white h-12 placeholder:text-white placeholder:italic"
                                />
                            </div>

                            <div className="pt-2">
                                <label className="block text-xs font-semibold text-white mb-2">Aceptación Política de protección de datos personales <span className="text-red-500">*</span></label>
                                <div className="flex items-start gap-3 mt-3">
                                    <input
                                        type="checkbox"
                                        name="aceptaPoliticas"
                                        checked={formData.aceptaPoliticas}
                                        onChange={handleChange}
                                        className="mt-1 w-4 h-4 cursor-pointer accent-[#2AB2D6]"
                                    />
                                    <span className="text-sm text-white font-light cursor-pointer" onClick={() => setFormData(p => ({...p, aceptaPoliticas: !p.aceptaPoliticas}))}>
                                        Sí, acepto la política de protección de datos personales de <a href="/politicas-garantia" className="text-[#2AB2D6] hover:underline" onClick={e=>e.stopPropagation()}>LabMilanes.com</a>
                                    </span>
                                </div>
                            </div>

                            <div className="pt-8">
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="bg-[#2AB2D6] text-white px-10 py-3 rounded hover:bg-[#2094B4] transition-colors font-medium disabled:opacity-50"
                                >
                                    {submitting ? 'Enviando...' : 'Enviar'}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>

            {/* Modal de Oferta */}
            {selectedOffer && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 transition-opacity">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-transparent rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
                    >
                        <button 
                            onClick={() => setSelectedOffer(null)}
                            className="absolute top-6 right-6 text-white hover:text-white transition-colors"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                        </button>
                        
                        <h2 className="text-3xl font-semibold text-white mb-2 pr-8">{selectedOffer.title}</h2>
                        <div className="flex gap-4 text-sm font-medium text-white mb-6 border-b border-gray-100 pb-6">
                            <span className="text-[#2AB2D6] uppercase tracking-wider">{selectedOffer.city}</span>
                            <span>•</span>
                            <span>{selectedOffer.date || "Inmediato"}</span>
                        </div>

                        <div className="prose prose-sm md:prose-base text-white mb-8 whitespace-pre-line font-light leading-relaxed">
                            {selectedOffer.description || "No hay una descripción detallada para este cargo."}
                        </div>

                        <div className="flex gap-4 mt-8 pt-6 border-t border-gray-100">
                            <button 
                                onClick={() => setSelectedOffer(null)}
                                className="px-6 py-2.5 rounded border border-gray-200 text-white font-medium hover:bg-gray-50 transition-colors"
                            >
                                Cerrar
                            </button>
                            <a 
                                href="#postularse"
                                onClick={() => {
                                    setSelectedOffer(null);
                                    setFormData(prev => ({ ...prev, perfil: 'Otro', otroPerfil: selectedOffer.title }));
                                }}
                                className="px-6 py-2.5 rounded bg-[#2AB2D6] text-white font-medium hover:bg-[#2094B4] transition-colors"
                            >
                                Postularme a este cargo
                            </a>
                        </div>
                    </motion.div>
                </div>
            )}
        </PageLayout>
    );
};

export default TrabajaConNosotros;
