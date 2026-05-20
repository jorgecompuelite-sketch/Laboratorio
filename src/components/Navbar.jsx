import React, { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo_nav.png';
import { useAuth } from '../context/AuthContext';

const navLinks = [
    {
        name: 'Milab',
        href: '/milab/usuario',
        subItems: [
            { name: 'Mi usuario', href: '/milab/usuario' },
            { name: 'Eventos del mes', href: '/milab/eventos' },
            { name: 'Talleres del mes', href: '/milab/talleres' },
            { name: 'Triángulo Milanes', href: '/milab/triangulo' },
        ]
    },
    {
        name: 'Prótesis',
        href: '/protesis',
        subItems: [
            { name: 'Carillas', href: '/protesis/carillas' },
            { name: 'Coronas', href: '/protesis/coronas' },
            { name: 'Puentes', href: '/protesis/puentes' },
            { name: 'Híbridas', href: '/protesis/hibridas' },
            { name: 'Prótesis total', href: '/protesis/total' },
        ]
    },
    {
        name: 'Agencias',
        href: '/agencias',
        subItems: [
            { name: 'Zona Oriente', href: '/agencias/oriente' },
            { name: 'Zona Occidente', href: '/agencias/occidente' },
            { name: 'Zona Centro', href: '/agencias/centro' },
            { name: 'Zona Norte', href: '/agencias/norte' },
            { name: 'Zona Sur', href: '/agencias/sur' },
            { name: 'Zona Otras Plazas', href: '/agencias/otras' },
        ]
    },
    {
        name: 'Asistencia',
        href: '/asistencia',
        subItems: [
            { name: 'Estado de un caso', href: '/asistencia/estado-caso' },
            { name: 'IBISA', href: '/asistencia/ibisa' },
            { name: 'POST-VENTA', href: '/asistencia/post-venta' },
            { name: 'Quejas y reclamos', href: '/asistencia/quejas-reclamos' },
            { name: 'Políticas y Garantías', href: '/politicas-garantia' },
        ]
    }
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [hoveredDropdown, setHoveredDropdown] = useState(null);
    const [expandedDropdown, setExpandedDropdown] = useState(null);
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex flex-col font-sans w-full">
            {/* Top Section: Dark Blue Menu */}
            <div className="bg-[#0B132B] w-full shadow-md">
                <div className="container mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center group">
                        <img
                            src={logo}
                            alt="Luis Milanes Logo"
                            className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                        />
                    </Link>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <div 
                                key={link.name} 
                                className="relative group"
                                onMouseEnter={() => link.subItems && setHoveredDropdown(link.name)}
                                onMouseLeave={() => setHoveredDropdown(null)}
                            >
                                {link.subItems ? (
                                    <>
                                        <button
                                            className="flex items-center gap-1 text-white hover:text-emerald-400 transition-colors text-[15px] font-medium tracking-wide py-2"
                                        >
                                            {link.name}
                                            <ChevronDown size={14} className={`transition-transform duration-200 ${hoveredDropdown === link.name ? 'rotate-180' : ''}`} />
                                        </button>
                                        
                                        {/* Dropdown Menu Desktop */}
                                        <div 
                                            className={`absolute left-0 top-full pt-2 w-56 transition-all duration-200 ${hoveredDropdown === link.name ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}
                                        >
                                            <div className="bg-[#0B132B] border border-white/10 rounded-xl shadow-2xl overflow-hidden py-2">
                                                {link.subItems.map((sub) => (
                                                    <Link
                                                        key={sub.name}
                                                        to={sub.href}
                                                        className="block px-6 py-2.5 text-[14px] text-white/90 hover:text-emerald-400 hover:bg-white/5 transition-all"
                                                    >
                                                        {sub.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <Link
                                        to={link.href}
                                        className="text-white hover:text-emerald-400 transition-colors text-[15px] font-medium tracking-wide py-2"
                                    >
                                        {link.name}
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Action Button */}
                    <div className="hidden md:flex items-center gap-4">
                        {currentUser && (
                            <button
                                onClick={async () => { await logout(); navigate('/registro'); }}
                                className="text-white hover:text-red-400 font-medium text-sm transition-colors"
                            >
                                Cerrar Sesión
                            </button>
                        )}
                        <Link
                            to="/cotizar"
                            className="bg-[#10B981] hover:bg-[#059669] text-white px-7 py-2.5 rounded-full font-semibold transition-all hover:scale-105 shadow-lg shadow-emerald-500/20 text-sm"
                        >
                            Cotizar un caso
                        </Link>
                    </div>

                    {/* Mobile toggle */}
                    <button
                        className="md:hidden p-2 text-white hover:text-emerald-400 transition-colors"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Bottom Banner Section */}
            <div className="w-full bg-gradient-to-r from-[#10B981] to-[#06B6D4] py-2 shadow-sm">
                <p className="text-center text-white text-sm md:text-[15px] italic font-semibold tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
                    El inicio de una nueva generación protesica.
                </p>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-[#0B132B] border-t border-white/10 overflow-hidden"
                    >
                        <div className="px-4 py-6 flex flex-col space-y-2">
                            {navLinks.map((link) => (
                                <div key={link.name}>
                                    {link.subItems ? (
                                        <div className="flex flex-col">
                                            <button 
                                                onClick={() => setExpandedDropdown(expandedDropdown === link.name ? null : link.name)}
                                                className="flex items-center justify-between w-full text-base font-medium text-white hover:text-emerald-400 transition-colors py-2"
                                            >
                                                {link.name}
                                                <ChevronDown size={18} className={`transition-transform duration-200 ${expandedDropdown === link.name ? 'rotate-180' : ''}`} />
                                            </button>
                                            <AnimatePresence>
                                                {expandedDropdown === link.name && (
                                                    <motion.div 
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: 'auto' }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        className="pl-4 flex flex-col space-y-1 overflow-hidden"
                                                    >
                                                        {link.subItems.map((sub) => (
                                                            <Link
                                                                key={sub.name}
                                                                to={sub.href}
                                                                className="block py-2 text-sm text-white/70 hover:text-emerald-400 transition-colors"
                                                                onClick={() => setIsOpen(false)}
                                                            >
                                                                {sub.name}
                                                            </Link>
                                                        ))}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    ) : (
                                        <Link
                                            to={link.href}
                                            className="block text-base font-medium text-white hover:text-emerald-400 transition-colors py-2"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {link.name}
                                        </Link>
                                    )}
                                </div>
                            ))}
                            <div className="pt-4 mt-2 border-t border-white/10">
                                <Link
                                    to="/cotizar"
                                    className="block w-full text-center bg-[#10B981] text-white py-3 rounded-full font-semibold"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Cotizar un caso
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
