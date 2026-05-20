import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { motion } from 'framer-motion';

const SolicitarCatalogo = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        fechaNacimiento: '',
        ciudad: '',
        email: '',
        especialidad: '',
        telefono: '',
        mensaje: '',
        aceptaPoliticas: false,
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        if (!formData.aceptaPoliticas) {
            setError('Debes aceptar la política de protección de datos para continuar.');
            return;
        }

        setLoading(true);
        try {
            await addDoc(collection(db, "catalogo_requests"), {
                ...formData,
                fechaCreacion: new Date().toISOString()
            });
            setSuccess(true);
            setFormData({
                nombre: '',
                fechaNacimiento: '',
                ciudad: '',
                email: '',
                especialidad: '',
                telefono: '',
                mensaje: '',
                aceptaPoliticas: false,
            });
        } catch (err) {
            console.error(err);
            setError('Ocurrió un error al enviar el formulario. Por favor, intenta de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-transparent pt-32 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-transparent rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/20 p-8 md:p-12"
                >
                    <h1 className="text-3xl md:text-4xl font-semibold text-white mb-4">Solicita tu Catálogo</h1>
                    <p className="text-white text-lg mb-8">
                        Déjanos tus datos para enviarte nuestro catálogo más reciente y las novedades que tenemos para ti.
                    </p>

                    {success ? (
                        <div className="bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-xl mb-6">
                            <h3 className="font-semibold text-lg mb-1">¡Solicitud Enviada con Éxito!</h3>
                            <p>En breve nos comunicaremos contigo. Gracias por confiar en nosotros.</p>
                            <button 
                                onClick={() => setSuccess(false)}
                                className="mt-4 text-green-700 underline text-sm"
                            >
                                Enviar otra solicitud
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {error && (
                                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
                                    {error}
                                </div>
                            )}

                            <div className="w-full">
                                <label className="block text-sm font-medium text-white mb-2 text-left">
                                    Nombre completo *
                                </label>
                                <input
                                    type="text"
                                    name="nombre"
                                    required
                                    value={formData.nombre}
                                    onChange={handleChange}
                                    className="w-full bg-transparent p-3.5 rounded-xl border border-white/20 text-white focus:ring-2 focus:ring-[#0052FF] focus:border-[#0052FF] outline-none transition-all"
                                    placeholder="Ingresa tu nombre y apellido"
                                />
                            </div>

                            <div className="w-full">
                                <label className="block text-sm font-medium text-white mb-2 text-left">
                                    Fecha de Nacimiento *
                                </label>
                                <input
                                    type="date"
                                    name="fechaNacimiento"
                                    required
                                    value={formData.fechaNacimiento}
                                    onChange={handleChange}
                                    className="w-full bg-transparent p-3.5 rounded-xl border border-white/20 text-white focus:ring-2 focus:ring-[#0052FF] focus:border-[#0052FF] outline-none transition-all"
                                />
                            </div>

                            <div className="w-full">
                                <label className="block text-sm font-medium text-white mb-2 text-left">
                                    Ciudad / Municipio *
                                </label>
                                <input
                                    type="text"
                                    name="ciudad"
                                    required
                                    value={formData.ciudad}
                                    onChange={handleChange}
                                    className="w-full bg-transparent p-3.5 rounded-xl border border-white/20 text-white focus:ring-2 focus:ring-[#0052FF] focus:border-[#0052FF] outline-none transition-all"
                                    placeholder="Ej. Cali, Bogotá, Medellín"
                                />
                            </div>

                            <div className="w-full">
                                <label className="block text-sm font-medium text-white mb-2 text-left">
                                    Correo electrónico *
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full bg-transparent p-3.5 rounded-xl border border-white/20 text-white focus:ring-2 focus:ring-[#0052FF] focus:border-[#0052FF] outline-none transition-all"
                                    placeholder="ejemplo@correo.com"
                                />
                            </div>

                            <div className="w-full">
                                <label className="block text-sm font-medium text-white mb-2 text-left">
                                    Especialidad *
                                </label>
                                <select
                                    name="especialidad"
                                    required
                                    value={formData.especialidad}
                                    onChange={handleChange}
                                    className="w-full bg-transparent p-3.5 rounded-xl border border-white/20 text-white focus:ring-2 focus:ring-[#0052FF] focus:border-[#0052FF] outline-none transition-all"
                                >
                                    <option value="" disabled>Selecciona tu especialidad</option>
                                    <option value="Odontólogo General">Odontólogo General</option>
                                    <option value="Rehabilitador Oral">Rehabilitador Oral</option>
                                    <option value="Ortodoncista">Ortodoncista</option>
                                    <option value="Periodoncista">Periodoncista</option>
                                    <option value="Endodoncista">Endodoncista</option>
                                    <option value="Implantólogo">Implantólogo</option>
                                    <option value="Estudiante">Estudiante</option>
                                    <option value="Otro">Otro</option>
                                </select>
                            </div>

                            <div className="w-full">
                                <label className="block text-sm font-medium text-white mb-2 text-left">
                                    Teléfono (Celular) *
                                </label>
                                <input
                                    type="number"
                                    name="telefono"
                                    required
                                    value={formData.telefono}
                                    onChange={handleChange}
                                    className="w-full bg-transparent p-3.5 rounded-xl border border-white/20 text-white focus:ring-2 focus:ring-[#0052FF] focus:border-[#0052FF] outline-none transition-all"
                                    placeholder="Ingresa tu número de celular"
                                />
                            </div>

                            <div className="w-full">
                                <label className="block text-sm font-medium text-white mb-2 text-left">
                                    Mensaje (Opcional)
                                </label>
                                <textarea
                                    name="mensaje"
                                    rows="4"
                                    value={formData.mensaje}
                                    onChange={handleChange}
                                    className="w-full bg-transparent p-3.5 rounded-xl border border-white/20 text-white focus:ring-2 focus:ring-[#0052FF] focus:border-[#0052FF] outline-none transition-all resize-none"
                                    placeholder="Escribe aquí cualquier comentario adicional..."
                                />
                            </div>

                            <div className="w-full flex items-start mt-2">
                                <div className="flex items-center h-5 mt-1">
                                    <input
                                        type="checkbox"
                                        id="aceptaPoliticas"
                                        name="aceptaPoliticas"
                                        required
                                        checked={formData.aceptaPoliticas}
                                        onChange={handleChange}
                                        className="w-4 h-4 text-[#0052FF] bg-transparent border-gray-300 rounded focus:ring-[#0052FF] cursor-pointer"
                                    />
                                </div>
                                <label htmlFor="aceptaPoliticas" className="ml-3 text-sm text-white cursor-pointer text-left">
                                    Sí, acepto la política de protección de datos personales de Laboratorio Dental Luis Milanés
                                </label>
                            </div>

                            <div className="w-full pt-4 text-left">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-8 py-3.5 bg-[#0052FF] text-white font-medium rounded-xl hover:bg-[#0040CC] transition-colors focus:ring-4 focus:ring-[#0052FF]/30 outline-none disabled:opacity-70 flex items-center justify-center min-w-[200px]"
                                >
                                    {loading ? (
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    ) : (
                                        'Enviar formulario'
                                    )}
                                </button>
                            </div>
                        </form>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default SolicitarCatalogo;
