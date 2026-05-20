import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

const Registro = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isLogin, setIsLogin] = useState(true);
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [errorMessage, setErrorMessage] = useState('');
    const [resetSuccessMessage, setResetSuccessMessage] = useState('');
    
    // Ruta a la que intentaba acceder antes de ser redirigido
    const from = location.state?.from?.pathname || "/milab";

    const [formData, setFormData] = useState({
        first_name: '',
        email: '',
        password: '',
        phone: '',
        consent: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleResetPassword = async () => {
        if (!formData.email) {
            setErrorMessage("Por favor, ingresa tu correo electrónico para restablecer la contraseña.");
            return;
        }
        setStatus('loading');
        setErrorMessage('');
        setResetSuccessMessage('');
        try {
            await sendPasswordResetEmail(auth, formData.email.trim());
            setStatus('idle');
            setResetSuccessMessage("Te hemos enviado un correo para restablecer tu contraseña. Revisa tu bandeja de entrada o spam.");
        } catch (error) {
            console.error('Reset error:', error);
            setStatus('error');
            if (error.code === 'auth/user-not-found') setErrorMessage("No hay ninguna cuenta registrada con este correo.");
            else if (error.code === 'auth/invalid-email') setErrorMessage("Correo electrónico no válido.");
            else setErrorMessage(`Hubo un error al enviar el correo.`);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        try {
            // Client-side password validation
            if (formData.password.length < 6) {
                setStatus('error');
                setErrorMessage("La contraseña debe tener al menos 6 caracteres.");
                return;
            }

            if (isLogin) {
                // Login Flow
                await signInWithEmailAndPassword(auth, formData.email.trim(), formData.password);
                setStatus('success');
                navigate(from, { replace: true });
            } else {
                // Register Flow
                if (!formData.consent) {
                    setStatus('error');
                    setErrorMessage("Debe aceptar la política de protección de datos.");
                    return;
                }

                // Create user in Auth
                const userCredential = await createUserWithEmailAndPassword(auth, formData.email.trim(), formData.password);
                const user = userCredential.user;

                // Create profile in Firestore
                await setDoc(doc(db, 'users', user.uid), {
                    uid: user.uid,
                    email: formData.email,
                    nombre: formData.first_name,
                    telefono: formData.phone,
                    rol: 'user',
                    fechaRegistro: new Date()
                });

                setStatus('success');
                navigate(from, { replace: true });
            }
        } catch (error) {
            console.error('Auth error:', error);
            setStatus('error');
            // Basic error handling mapping
            if (error.code === 'auth/email-already-in-use') setErrorMessage("El correo ya está registrado.");
            else if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') setErrorMessage("Credenciales incorrectas.");
            else if (error.code === 'auth/weak-password') setErrorMessage("La contraseña debe tener al menos 6 caracteres.");
            else setErrorMessage(`Hubo un error (${error.code || 'Desconocido'}): ${error.message}`);
        }
    };

    return (
        <div className="pt-28 pb-20 min-h-screen bg-[#F8FAFC] flex items-center justify-center">
            <div className="container mx-auto px-4">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100"
                >
                    <div className="mb-10 text-center">
                        <h1 className="text-3xl md:text-4xl font-extrabold text-[#0B132B] mb-3">
                            {isLogin ? 'Iniciar Sesión' : 'Registro de Profesionales'}
                        </h1>
                        <p className="text-gray-500">
                            {isLogin ? 'Accede al panel de usuario exclusivo de MiLab.' : 'Crea tu cuenta para acceder a MiLab.'}
                        </p>
                    </div>

                    {errorMessage && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm text-center">
                            {errorMessage}
                        </div>
                    )}

                    {resetSuccessMessage && (
                        <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl text-sm text-center">
                            {resetSuccessMessage}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            {!isLogin && (
                                <>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700">Nombre completo</label>
                                        <input required type="text" name="first_name" value={formData.first_name} onChange={handleChange} placeholder="Nombre y Apellidos" className="w-full bg-[#F1F5F9] border-none rounded-xl px-5 py-4 text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 transition-all" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700">Teléfono</label>
                                        <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Número de contacto" className="w-full bg-[#F1F5F9] border-none rounded-xl px-5 py-4 text-gray-800 focus:ring-2 focus:ring-blue-500 transition-all" />
                                    </div>
                                </>
                            )}

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Correo electrónico</label>
                                <input required type="email" name="email" value={formData.email} onChange={handleChange} placeholder="ejemplo@correo.com" className="w-full bg-[#F1F5F9] border-none rounded-xl px-5 py-4 text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 transition-all" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Contraseña</label>
                                <input required type="password" name="password" value={formData.password} onChange={handleChange} placeholder="********" className="w-full bg-[#F1F5F9] border-none rounded-xl px-5 py-4 text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 transition-all" />
                                {isLogin && (
                                    <div className="text-right">
                                        <button 
                                            type="button" 
                                            onClick={handleResetPassword}
                                            className="text-sm text-blue-600 hover:underline"
                                            disabled={status === 'loading'}
                                        >
                                            ¿Olvidaste tu contraseña?
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {!isLogin && (
                            <div className="flex items-start gap-4 bg-blue-50/50 p-5 rounded-2xl border border-blue-100">
                                <div className="pt-0.5">
                                    <input required type="checkbox" id="consent" name="consent" checked={formData.consent} onChange={handleChange} className="w-5 h-5 rounded border-blue-300 text-blue-600 focus:ring-blue-500 transition-all cursor-pointer" />
                                </div>
                                <label htmlFor="consent" className="text-sm text-gray-600 leading-relaxed cursor-pointer select-none">
                                    Sí, acepto la política de protección de datos personales.
                                </label>
                            </div>
                        )}

                        <button
                            disabled={status === 'loading'}
                            type="submit"
                            className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-xl shadow-blue-200 transition-all text-lg flex items-center justify-center gap-3 ${status === 'loading' ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {status === 'loading' ? 'Procesando...' : (isLogin ? 'Ingresar a MiLab' : 'Crear Cuenta')}
                        </button>
                    </form>

                    <div className="mt-8 text-center border-t border-gray-100 pt-6">
                        <p className="text-gray-600">
                            {isLogin ? "¿No tienes una cuenta? " : "¿Ya tienes una cuenta? "}
                            <button 
                                type="button" 
                                onClick={() => { setIsLogin(!isLogin); setErrorMessage(''); setResetSuccessMessage(''); }}
                                className="text-blue-600 font-bold hover:underline"
                            >
                                {isLogin ? "Regístrate aquí" : "Inicia sesión"}
                            </button>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Registro;
