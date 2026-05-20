import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';
const Admin = () => {
    const [activeTab, setActiveTab] = useState('testimonios'); // 'testimonios' | 'ofertas'
    
    // ================= TESTIMONIOS STATE =================
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(false);
    
    // Form state
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({ name: '', role: '', text: '' });

    // ================= OFERTAS STATE =================
    const [offers, setOffers] = useState([]);
    const [editingOfferId, setEditingOfferId] = useState(null);
    const [offerFormData, setOfferFormData] = useState({ title: '', city: '', date: '', description: '' });

    // ================= CATALOGO REQUESTS STATE =================
    const [catalogRequests, setCatalogRequests] = useState([]);

    // Fetch on mount
    useEffect(() => {
        fetchTestimonials(); 
        fetchOffers();
        fetchCatalogRequests();
    }, []);

    const fetchTestimonials = async () => {
        setLoading(true);
        try {
            const querySnapshot = await getDocs(collection(db, "testimonials"));
            const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setTestimonials(data);
        } catch (error) {
            console.error("Error fetching testimonials:", error);
            alert("Error al cargar testimonios: " + error.message);
        }
        setLoading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (editingId) {
                // Update existing
                const docRef = doc(db, "testimonials", editingId);
                await updateDoc(docRef, formData);
            } else {
                // Add new
                await addDoc(collection(db, "testimonials"), formData);
            }
            setFormData({ name: '', role: '', text: '' });
            setEditingId(null);
            fetchTestimonials();
        } catch (error) {
            console.error("Error saving testimonial:", error);
            alert("Error al guardar: " + error.message);
        }
        setLoading(false);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('¿Seguro que deseas eliminar este testimonio?')) return;
        setLoading(true);
        try {
            await deleteDoc(doc(db, "testimonials", id));
            fetchTestimonials();
        } catch (error) {
            console.error("Error deleting testimonial:", error);
            alert("Error al eliminar: " + error.message);
        }
        setLoading(false);
    };

    // ================= OFERTAS LOGIC =================
    const fetchOffers = async () => {
        setLoading(true);
        try {
            const querySnapshot = await getDocs(collection(db, "job_offers"));
            const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setOffers(data);
        } catch (error) {
            console.error("Error fetching offers:", error);
            alert("Error al cargar ofertas: " + error.message);
        }
        setLoading(false);
    };

    const handleOfferSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (editingOfferId) {
                // Update
                const docRef = doc(db, "job_offers", editingOfferId);
                await updateDoc(docRef, offerFormData);
            } else {
                // Add
                await addDoc(collection(db, "job_offers"), offerFormData);
            }
            setOfferFormData({ title: '', city: '', date: '', description: '' });
            setEditingOfferId(null);
            fetchOffers();
        } catch (error) {
            console.error("Error saving offer:", error);
            alert("Error al guardar oferta: " + error.message);
        }
        setLoading(false);
    };

    const handleDeleteOffer = async (id) => {
        if (!window.confirm('¿Seguro que deseas eliminar esta oferta?')) return;
        setLoading(true);
        try {
            await deleteDoc(doc(db, "job_offers", id));
            fetchOffers();
        } catch (error) {
            console.error("Error deleting offer:", error);
            alert("Error al eliminar oferta: " + error.message);
        }
        setLoading(false);
    };

    // ================= CATALOGO REQUESTS LOGIC =================
    const fetchCatalogRequests = async () => {
        setLoading(true);
        try {
            const querySnapshot = await getDocs(collection(db, "catalogo_requests"));
            const data = querySnapshot.docs.map(document => ({ id: document.id, ...document.data() }));
            data.sort((a,b) => new Date(b.fechaCreacion) - new Date(a.fechaCreacion));
            setCatalogRequests(data);
        } catch (error) {
            console.error("Error fetching requests:", error);
            alert("Error al cargar solicitudes: " + error.message);
        }
        setLoading(false);
    };

    const handleDeleteRequest = async (id) => {
        if (!window.confirm('¿Seguro que deseas eliminar esta solicitud?')) return;
        setLoading(true);
        try {
            await deleteDoc(doc(db, "catalogo_requests", id));
            fetchCatalogRequests();
        } catch (error) {
            console.error("Error deleting request:", error);
            alert("Error al eliminar solicitud: " + error.message);
        }
        setLoading(false);
    };

    const startEdit = (t) => {
        setEditingId(t.id);
        setFormData({ name: t.name, role: t.role, text: t.text });
    };

    const startEditOffer = (o) => {
        setEditingOfferId(o.id);
        setOfferFormData({ title: o.title, city: o.city, date: o.date || '', description: o.description || '' });
    };

    return (
        <div className="min-h-screen bg-transparent pt-32 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8 border-b border-white/20">
                    <div className="flex flex-wrap gap-4 md:gap-8">
                        <button
                            onClick={() => setActiveTab('testimonios')}
                            className={`pb-4 text-base md:text-lg font-medium transition-colors relative ${activeTab === 'testimonios' ? 'text-[#2AB2D6]' : 'text-white hover:text-white'}`}
                        >
                            Testimonios
                            {activeTab === 'testimonios' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#2AB2D6]"></span>}
                        </button>
                        <button
                            onClick={() => setActiveTab('ofertas')}
                            className={`pb-4 text-base md:text-lg font-medium transition-colors relative ${activeTab === 'ofertas' ? 'text-[#2AB2D6]' : 'text-white hover:text-white'}`}
                        >
                            Ofertas de Empleo
                            {activeTab === 'ofertas' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#2AB2D6]"></span>}
                        </button>
                        <button
                            onClick={() => setActiveTab('solicitudes_catalogo')}
                            className={`pb-4 text-base md:text-lg font-medium transition-colors relative ${activeTab === 'solicitudes_catalogo' ? 'text-[#2AB2D6]' : 'text-white hover:text-white'}`}
                        >
                            Solicitudes de Catálogo
                            {activeTab === 'solicitudes_catalogo' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#2AB2D6]"></span>}
                        </button>
                        <button
                            onClick={() => setActiveTab('usuarios')}
                            className={`pb-4 text-base md:text-lg font-medium transition-colors relative ${activeTab === 'usuarios' ? 'text-emerald-400' : 'text-white hover:text-white'}`}
                        >
                            Usuarios
                            {activeTab === 'usuarios' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-400"></span>}
                        </button>
                        <button
                            onClick={() => setActiveTab('contenidos')}
                            className={`pb-4 text-base md:text-lg font-medium transition-colors relative ${activeTab === 'contenidos' ? 'text-emerald-400' : 'text-white hover:text-white'}`}
                        >
                            Contenidos
                            {activeTab === 'contenidos' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-400"></span>}
                        </button>
                    </div>
                </div>

                {activeTab === 'testimonios' && (
                    <>
                        <div className="bg-transparent rounded-2xl shadow-sm border border-white/20 p-8 mb-8">
                            <h1 className="text-3xl font-semibold text-white mb-2">Panel de Testimonios</h1>
                            <p className="text-white mb-8">Administra los testimonios del carrusel de la página de inicio.</p>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-white mb-2">Nombre del Doctor</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    className="w-full bg-transparent p-3 rounded-lg border border-white/20 text-white focus:ring-2 focus:ring-[#020D21] outline-none"
                                    placeholder="Ej. Dr. Juan Pérez"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-white mb-2">Especialidad / Cargo</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.role}
                                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                                    className="w-full bg-transparent p-3 rounded-lg border border-white/20 text-white focus:ring-2 focus:ring-[#020D21] outline-none"
                                    placeholder="Ej. Odontólogo"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-white mb-2">Testimonio</label>
                            <textarea
                                required
                                rows="4"
                                value={formData.text}
                                onChange={(e) => setFormData({...formData, text: e.target.value})}
                                className="w-full bg-transparent p-3 rounded-lg border border-white/20 text-white focus:ring-2 focus:ring-[#020D21] outline-none"
                                placeholder="Escribe el testimonio aquí..."
                            />
                        </div>
                        <div className="flex justify-end gap-4">
                            {editingId && (
                                <button 
                                    type="button" 
                                    onClick={() => { setEditingId(null); setFormData({name:'', role:'', text:''})}}
                                    className="px-6 py-2 rounded-lg border border-white/20 text-white hover:bg-gray-50 transition-colors"
                                >
                                    Cancelar
                                </button>
                            )}
                            <button 
                                type="submit" 
                                disabled={loading}
                                className="px-6 py-2 rounded-lg bg-[#020D21] text-white hover:bg-[#020D21]/90 transition-colors disabled:opacity-50"
                            >
                                {loading ? 'Guardando...' : (editingId ? 'Actualizar Testimonio' : 'Añadir Testimonio')}
                            </button>
                        </div>
                    </form>
                </div>

                <div className="bg-transparent rounded-2xl shadow-sm border border-white/20 p-8">
                    <h2 className="text-xl font-semibold text-white mb-6">Testimonios Actuales</h2>
                    {loading ? (
                        <p className="text-center text-white py-8">Cargando...</p>
                    ) : testimonials.length === 0 ? (
                        <p className="text-center text-white py-8">No hay testimonios registrados.</p>
                    ) : (
                        <div className="space-y-4">
                            {testimonials.map((t) => (
                                <div key={t.id} className="p-4 border border-white/20 rounded-xl flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                                    <div>
                                        <h3 className="font-medium text-white">{t.name}</h3>
                                        <p className="text-sm text-[#2AB2D6] mb-2">{t.role}</p>
                                        <p className="text-sm text-white line-clamp-2">{t.text}</p>
                                    </div>
                                    <div className="flex gap-2 flex-shrink-0">
                                        <button 
                                            onClick={() => startEdit(t)}
                                            className="px-3 py-1.5 text-sm rounded bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                                        >
                                            Editar
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(t.id)}
                                            className="px-3 py-1.5 text-sm rounded bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </>
            )}

            {activeTab === 'ofertas' && (
                <>
                    <div className="bg-transparent rounded-2xl shadow-sm border border-white/20 p-8 mb-8">
                        <h1 className="text-3xl font-semibold text-white mb-2">Panel de Ofertas de Empleo</h1>
                        <p className="text-white mb-8">Administra las vacantes publicadas en la sección Trabaja con Nosotros.</p>
                        
                        <form onSubmit={handleOfferSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-white mb-2">Título del Cargo</label>
                                    <input
                                        type="text"
                                        required
                                        value={offerFormData.title}
                                        onChange={(e) => setOfferFormData({...offerFormData, title: e.target.value})}
                                        className="w-full bg-transparent p-3 rounded-lg border border-white/20 text-white focus:ring-2 focus:ring-[#020D21] outline-none"
                                        placeholder="Ej. Auxiliar de Odontología"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-white mb-2">Ciudad</label>
                                        <input
                                            type="text"
                                            required
                                            value={offerFormData.city}
                                            onChange={(e) => setOfferFormData({...offerFormData, city: e.target.value})}
                                            className="w-full bg-transparent p-3 rounded-lg border border-white/20 text-white focus:ring-2 focus:ring-[#020D21] outline-none"
                                            placeholder="Ej. CALI"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-white mb-2">Fecha</label>
                                        <input
                                            type="text"
                                            required
                                            value={offerFormData.date}
                                            onChange={(e) => setOfferFormData({...offerFormData, date: e.target.value})}
                                            className="w-full bg-transparent p-3 rounded-lg border border-white/20 text-white focus:ring-2 focus:ring-[#020D21] outline-none"
                                            placeholder="Ej. 09/09/2025"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-white mb-2">Descripción del Cargo</label>
                                <textarea
                                    required
                                    rows="5"
                                    value={offerFormData.description}
                                    onChange={(e) => setOfferFormData({...offerFormData, description: e.target.value})}
                                    className="w-full bg-transparent p-3 rounded-lg border border-white/20 text-white focus:ring-2 focus:ring-[#020D21] outline-none"
                                    placeholder="Describe las responsabilidades, requisitos y detalles del empleo..."
                                />
                            </div>
                            <div className="flex justify-end gap-4">
                                {editingOfferId && (
                                    <button 
                                        type="button" 
                                        onClick={() => { setEditingOfferId(null); setOfferFormData({title:'', city:'', date:'', description:''})}}
                                        className="px-6 py-2 rounded-lg border border-white/20 text-white hover:bg-gray-50 transition-colors"
                                    >
                                        Cancelar
                                    </button>
                                )}
                                <button 
                                    type="submit" 
                                    disabled={loading}
                                    className="px-6 py-2 rounded-lg bg-[#2AB2D6] text-white hover:bg-[#2AB2D6]/90 transition-colors disabled:opacity-50"
                                >
                                    {loading ? 'Guardando...' : (editingOfferId ? 'Actualizar Oferta' : 'Añadir Oferta')}
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="bg-transparent rounded-2xl shadow-sm border border-white/20 p-8">
                        <h2 className="text-xl font-semibold text-white mb-6">Ofertas Publicadas</h2>
                        {loading ? (
                            <p className="text-center text-white py-8">Cargando...</p>
                        ) : offers.length === 0 ? (
                            <p className="text-center text-white py-8">No hay ofertas registradas.</p>
                        ) : (
                            <div className="space-y-4">
                                {offers.map((o) => (
                                    <div key={o.id} className="p-4 border border-white/20 rounded-xl flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                                        <div>
                                            <h3 className="font-medium text-white">{o.title}</h3>
                                            <div className="flex gap-4 mt-1">
                                                <p className="text-sm text-white font-medium">{o.city}</p>
                                                <p className="text-sm text-white font-light">{o.date}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 flex-shrink-0">
                                            <button 
                                                onClick={() => startEditOffer(o)}
                                                className="px-3 py-1.5 text-sm rounded bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                                            >
                                                Editar
                                            </button>
                                            <button 
                                                onClick={() => handleDeleteOffer(o.id)}
                                                className="px-3 py-1.5 text-sm rounded bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </>
            )}
            {activeTab === 'solicitudes_catalogo' && (
                <div className="bg-transparent rounded-2xl shadow-sm border border-white/20 p-8 mb-8">
                    <h2 className="text-3xl font-semibold text-white mb-2">Solicitudes de Catálogo</h2>
                    <p className="text-white mb-8">Visualiza los datos de los usuarios que han solicitado información del catálogo.</p>
                    {loading ? (
                        <p className="text-center text-white py-8">Cargando...</p>
                    ) : catalogRequests.length === 0 ? (
                        <p className="text-center text-white py-8">No hay solicitudes registradas.</p>
                    ) : (
                        <div className="space-y-4">
                            {catalogRequests.map((req) => (
                                <div key={req.id} className="p-6 border border-white/20 rounded-xl flex flex-col md:flex-row gap-6 justify-between items-start">
                                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <h3 className="font-medium text-white text-lg mb-1">{req.nombre}</h3>
                                            <p className="text-sm text-white mb-2">{req.email} | {req.telefono}</p>
                                            <div className="space-y-1">
                                                <p className="text-sm text-white"><strong>Ciudad:</strong> {req.ciudad}</p>
                                                <p className="text-sm text-white"><strong>Especialidad:</strong> {req.especialidad}</p>
                                                <p className="text-sm text-white"><strong>Fecha Nacimiento:</strong> {req.fechaNacimiento}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-sm text-white mb-2">
                                                Fecha de solicitud: {req.fechaCreacion ? new Date(req.fechaCreacion).toLocaleDateString() : 'Desconocida'}
                                            </p>
                                            {req.mensaje && (
                                                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                                                    <p className="text-sm text-white"><strong>Mensaje:</strong></p>
                                                    <p className="text-sm text-white whitespace-pre-wrap mt-1">{req.mensaje}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex-shrink-0">
                                        <button 
                                            onClick={() => handleDeleteRequest(req.id)}
                                            className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-red-200"
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
            {activeTab === 'usuarios' && (
                <div className="bg-transparent rounded-2xl shadow-sm border border-white/20 p-8 mb-8">
                    <h2 className="text-3xl font-semibold text-white mb-2">Gestión de Usuarios</h2>
                    <p className="text-white mb-8">Administra los usuarios registrados en MiLab (Crear, Editar, Eliminar).</p>
                    <div className="bg-white/5 rounded-xl border border-white/10 p-8 text-center text-white/70">
                        <p>El módulo de usuarios está en construcción. Pronto podrás ver la lista y gestionar accesos.</p>
                    </div>
                </div>
            )}

            {activeTab === 'contenidos' && (
                <div className="bg-transparent rounded-2xl shadow-sm border border-white/20 p-8 mb-8">
                    <h2 className="text-3xl font-semibold text-white mb-2">Gestión de Contenidos</h2>
                    <p className="text-white mb-8">Sube y actualiza Eventos del mes, Talleres y contenido del Triángulo Milanés.</p>
                    <div className="bg-white/5 rounded-xl border border-white/10 p-8 text-center text-white/70">
                        <p>El módulo de contenidos está en construcción. Pronto podrás publicar nuevos talleres y eventos.</p>
                    </div>
                </div>
            )}

            </div>
        </div>
    );
};

export default Admin;
