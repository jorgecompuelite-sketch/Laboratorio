import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, ChevronDown, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';
import pseButtonBg from '../assets/pse-button.png';
import logo from '../assets/logo.png';
import catalogoBanner from '../assets/catalogo-banner.jpg';

const navLinks = [
    {
        name: 'Nosotros',
        href: '#nosotros',
        submenu: [
            { name: 'Misión y Visión', href: '/mision-vision' },
            { name: 'Nuestra gente', href: '/nuestra-gente' },
            { name: 'Tecnología', href: '/tecnologia' },
            { name: 'Blog', href: '/blog' },
            { name: 'Políticas de garantía', href: '/politicas-garantia' },
        ]
    },
    { name: 'Materiales', href: '/#materiales' },
    { name: 'Catálogo', href: '/Catalogo2026.pdf', isVisual: true },
    { name: 'Sucursales', href: '/sucursales' },
    { name: 'Pedidos', href: '/#pedidos' },
    { name: 'Contacto', href: '/#contacto' },
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [hoveredMenu, setHoveredMenu] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out backdrop-blur-xl",
                /* Glassmorphism oscuro con borde inferior sutil */
                "bg-[#020B1D]/80 border-b border-white/10",
                scrolled ? "shadow-[0_8px_32px_rgba(0,0,0,0.5)] py-4" : "py-5"
            )}
        >
            <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-3 group transition-transform hover:scale-105">
                    <img
                        src={logo}
                        alt="Laboratorio Dental Luis Milanes"
                        className="h-11 md:h-13 w-auto object-contain"
                    />
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-6">

                    {/* Home button */}
                    <a
                        href="/"
                        className="flex items-center gap-1.5 text-sm font-semibold text-white hover:text-[#0052FF] transition-colors group py-2"
                        title="Inicio"
                    >
                        <span className="flex items-center justify-center w-7 h-7 rounded-md bg-white/5 group-hover:bg-[#0052FF]/20 transition-colors">
                            <Home size={14} className="text-[#A0AEC0] group-hover:text-[#0052FF] transition-colors" />
                        </span>
                        Home
                    </a>

                    {/* Nav Links */}
                    {navLinks.map((link) => (
                        <div
                            key={link.name}
                            className="relative h-full flex items-center"
                            onMouseEnter={() => setHoveredMenu(link.name)}
                            onMouseLeave={() => setHoveredMenu(null)}
                        >
                            {(link.submenu || link.isVisual) ? (
                                <button className="flex items-center gap-1 text-sm font-semibold text-white hover:text-[#0052FF] transition-colors py-2">
                                    {link.name}
                                    <ChevronDown size={13} className={cn("transition-transform duration-200 text-[#A0AEC0]", hoveredMenu === link.name ? "rotate-180" : "")} />
                                </button>
                            ) : (
                                <a
                                    href={link.href}
                                    className="text-sm font-semibold text-white hover:text-[#0052FF] transition-colors relative py-2 group"
                                >
                                    {link.name}
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#0052FF] shadow-[0_0_10px_#0052FF] transition-all duration-300 group-hover:w-full" />
                                </a>
                            )}

                            {/* Dropdown */}
                            <AnimatePresence>
                                {hoveredMenu === link.name && (link.submenu || link.isVisual) && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 8, scale: 0.97 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 8, scale: 0.97 }}
                                        transition={{ duration: 0.18 }}
                                        className={cn(
                                            "absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-[#051025] border border-white/10 rounded-xl overflow-hidden",
                                            "shadow-[0_8px_32px_rgba(0,0,0,0.8)] backdrop-blur-md",
                                            link.isVisual ? "w-80" : "w-56"
                                        )}
                                    >
                                        {/* Accent top line neon */}
                                        <div className="h-0.5 bg-[#0052FF] shadow-[0_0_12px_#0052FF]" />

                                        {link.isVisual ? (
                                            <div className="relative group/card h-48 overflow-hidden">
                                                <div
                                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover/card:scale-110"
                                                    style={{ backgroundImage: `url(${catalogoBanner})` }}
                                                />
                                                <div className="absolute inset-0 bg-[#020D21]/55" />
                                                <div className="absolute inset-0 p-6 flex flex-col justify-end items-center text-center">
                                                    <h3 className="text-white font-semibold text-base mb-3 tracking-wide">Nuestro Catálogo 2026</h3>
                                                    <a
                                                        href={link.href}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="btn-primary text-xs"
                                                        style={{ borderRadius: '6px', padding: '8px 20px' }}
                                                    >
                                                        Ver Catálogo
                                                    </a>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="py-1">
                                                {link.submenu?.map((subItem) => (
                                                    <Link
                                                        key={subItem.name}
                                                        to={subItem.href}
                                                        className="block px-4 py-3 text-sm font-medium text-white hover:bg-white/5 hover:text-[#0052FF] transition-colors border-b border-white/5 last:border-0"
                                                    >
                                                        {subItem.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}

                    {/* PSE */}
                    <a
                        href="https://www.psepagos.co/PSEHostingUI/ShowTicketOffice.aspx?ID=6046"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Pagos en Línea PSE"
                        className="transition-transform hover:scale-105"
                    >
                        <div
                            className="w-9 h-9 rounded-lg border border-white/10 shadow-sm overflow-hidden bg-cover bg-center"
                            style={{ backgroundImage: `url(${pseButtonBg})` }}
                        />
                    </a>

                    {/* Phone — btn-primary style */}
                    <a
                        href="tel:6024860740"
                        className="btn-primary flex items-center gap-2"
                        style={{ borderRadius: '6px', padding: '10px 20px', fontSize: '0.875rem' }}
                    >
                        <Phone size={15} fill="currentColor" />
                        (602) 486 0740
                    </a>
                </div>

                {/* Mobile toggle */}
                <button
                    className="md:hidden p-2 text-white hover:text-[#0052FF] transition-colors"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-t border-[#E5E7EB] overflow-hidden"
                    >
                        <div className="px-4 py-6 flex flex-col space-y-4">
                            <a
                                href="/"
                                className="flex items-center gap-3 text-base font-semibold text-[#020D21] hover:text-[#0052FF] transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                <span className="flex items-center justify-center w-8 h-8 rounded-md bg-[#020D21]/6">
                                    <Home size={15} className="text-[#020D21]" />
                                </span>
                                Home
                            </a>

                            {navLinks.map((link) => (
                                <div key={link.name}>
                                    {link.submenu ? (
                                        <div className="space-y-2">
                                            <span className="text-base font-semibold text-[#020D21]">{link.name}</span>
                                            <div className="pl-4 border-l-2 border-[#E5E7EB] space-y-2 mt-2">
                                                {link.submenu.map((subItem) => (
                                                    <Link
                                                        key={subItem.name}
                                                        to={subItem.href}
                                                        className="block text-sm font-light text-[#4B5563] hover:text-[#020D21]"
                                                        onClick={() => setIsOpen(false)}
                                                    >
                                                        {subItem.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        <a
                                            href={link.href}
                                            className="block text-base font-semibold text-[#020D21] hover:text-[#0052FF] transition-colors"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {link.name}
                                        </a>
                                    )}
                                </div>
                            ))}

                            <a
                                href="https://www.psepagos.co/PSEHostingUI/ShowTicketOffice.aspx?ID=6046"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary flex items-center justify-center gap-2"
                                onClick={() => setIsOpen(false)}
                            >
                                Pagos en Línea PSE
                            </a>
                            <a
                                href="tel:6024860740"
                                className="btn-outline flex items-center justify-center gap-2"
                                onClick={() => setIsOpen(false)}
                            >
                                <Phone size={16} fill="currentColor" />
                                (602) 486 0740
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
