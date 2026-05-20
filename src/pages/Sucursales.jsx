import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, ChevronDown, ChevronUp } from 'lucide-react';

const offices = [
    {
        city: 'Cali',
        type: 'Centro Nacional de Producción',
        address: 'Calle 39 Norte # 3N–50, Barrio Vipasa',
        phones: ['(602) 486 0740', 'Sur: 301 395 7142', 'Norte: 316 446 6514'],
        emails: ['comercialcalisur@labmilanes.com', 'comercialcalinorte@labmilanes.com'],
        isMain: true,
    },
    {
        city: 'Bogotá',
        type: 'Agencia comercial',
        address: 'Avenida Calle 26 # 69C–03, Edificio Capital Center 2, oficina 609',
        phones: ['(601) 390 2166', 'Oriente: 316 452 8332', 'Norte: 350 588 1292', 'Sur: 301 396 1731', 'Municipios: 322 735 2225'],
        emails: ['Comercialbognorte@labmilanes.com', 'Comercialbogsur@labmilanes.com', 'Comercialbogoriente@labmilanes.com', 'Comercialbogmunicipios@labmilanes.com'],
    },
    {
        city: 'Medellín',
        type: 'Agencia comercial',
        address: 'Carrera 43A # 34–95 Torre Norte, Oficina 807, C.C Almacentro',
        phones: ['(604) 469 9485', 'Sur: 316 494 4173', 'Norte: 304 6700674'],
        emails: ['comercialmedsur@labmilanes.com', 'comercialmedellinnorte@labmilanes.com'],
    },
    {
        city: 'Palmira',
        type: 'Agencia comercial',
        phones: ['350 552 3868'],
        emails: ['comercialpalmira@labmilanes.com'],
    },
    {
        city: 'Norte del Valle',
        type: 'Agencia comercial',
        phones: ['302 318 2446'],
        emails: ['gestormobilbuga@labmilanes.com'],
    },
    {
        city: 'Popayán',
        type: 'Agencia comercial',
        address: 'Calle 11 Norte No 7–59, Barrio Prados del Norte',
        phones: ['(602) 836 8183', '301 332 2473'],
        emails: ['Comercialcauca@labmilanes.com'],
    },
    {
        city: 'Villavicencio',
        type: 'Agencia comercial',
        address: 'Carrera 39 B # 24–04, oficina 201, Bosque Alto',
        phones: ['(608) 674 0716', '301 332 2714'],
        emails: ['comercialmeta@labmilanes.com'],
    },
    {
        city: 'Pereira',
        type: 'Agencia comercial',
        address: 'Calle 18 # 8–35, oficina 305, Edificio Eduardo',
        phones: ['(606) 340 1305', '301 332 2729'],
        emails: ['comercialrisaralda@labmilanes.com'],
    },
    {
        city: 'Armenia',
        type: 'Agencia comercial',
        address: 'Carrera 14 # 23–27, oficina 705, Edificio Cámara de Comercio',
        phones: ['(606) 735 7446', '304 458 9472'],
        emails: ['comercialarmenia@labmilanes.com'],
    },
    {
        city: 'Bucaramanga',
        type: 'Agencia comercial',
        address: 'Calle 36 # 15–32, Edificio Colseguros, Oficina 1307',
        phones: ['(607) 666 3156', 'Bucaramanga: 304 457 0115', 'Municipios: 302 436 2412'],
        emails: ['comercialbuc@labmilanes.com', 'comercialbucmunicipios@labmilanes.com'],
    },
    {
        city: 'Cúcuta',
        type: 'Agencia comercial',
        address: 'Calle 11 # 2–19, oficina 401, Edificio Rosmi, Barrio La Playa',
        phones: ['(607) 595 5870', '304 670 0671'],
        emails: ['comercialcucuta@labmilanes.com'],
    },
    {
        city: 'Tunja',
        type: 'Agencia comercial',
        address: 'Calle 22 # 9–27, Oficina 209, Edificio Andaluz',
        phones: ['(608) 747 3776', '300 161 4241'],
        emails: ['comercialtunja@labmilanes.com'],
    },
    {
        city: 'Ibagué',
        type: 'Agencia comercial',
        address: 'Carrera 5 # 11–24, oficina 402, Edificio Torre Empresarial',
        phones: ['(608) 277 0223', '310 414 1998'],
        emails: ['comercialibg@labmilanes.com'],
    },
    {
        city: 'Neiva',
        type: 'Agencia comercial',
        address: 'Calle 10 # 6–12, interior 8, CC Cuco Centro',
        phones: ['(608) 863 1033', '301 395 9058'],
        emails: ['Comercialhuila@labmilanes.com'],
    },
    {
        city: 'Pasto',
        type: 'Agencia comercial',
        address: 'Carrera 25 # 20–65, oficina 202, Edificio Calle Real',
        phones: ['(602) 7382372', '304 457 0110'],
        emails: ['comercialpasto@labmilanes.com'],
    },
    {
        city: 'Valledupar',
        type: 'Agencia comercial',
        address: 'Carrera 14 # 13C–60, Edificio Agora, Oficina 212',
        phones: ['(605) 588 5851', '304 457 0077'],
        emails: ['comercialcesar@labmilanes.com'],
    },
    {
        city: 'Barranquilla',
        type: 'Agencia comercial',
        phones: ['301 578 0072'],
        emails: ['gestormovilbarranquilla@labmilanes.com'],
    },
    {
        city: 'Cartagena',
        type: 'Agencia comercial',
        address: 'Calle 33 # 10A–44, oficina 202E, Edificio Mara la Matuna Centro',
        phones: ['(605) 693 06 76', '300 253 9976'],
        emails: ['comercial.cartagena@labmilanes.com'],
    },
    {
        city: 'Santa Marta',
        type: 'Agencia comercial',
        address: 'Carrera 2B # 14–21, Piso 1207, oficina PH7, Edificio Los Bancos Centro Histórico',
        phones: ['(605) 436 80 15', '304 458 9460'],
        emails: ['comercial.santamarta@labmilanes.com'],
    },
    {
        city: 'Montería',
        type: 'Agencia comercial',
        address: 'Calle 28 # 4–21, oficina 208, Edificio Florisan',
        phones: ['(604) 789 0046', '310 497 2669'],
        emails: ['comercialmon@labmilanes.com'],
    },
    {
        city: 'Sincelejo',
        type: 'Agencia comercial',
        phones: ['304 234 5426'],
        emails: ['comercialsincelejo@labmilanes.com'],
    },
    {
        city: 'Otras plazas',
        type: 'Agencia comercial',
        phones: ['311 711 1013'],
        emails: ['comercial.otrasplazas@labmilanes.com'],
    },
];

/* ─── Tarjeta individual por ciudad ─────────────────────────── */
const OfficeCard = ({ office, index }) => {
    const [expanded, setExpanded] = useState(false);
    const hasExtra = office.phones.length > 1 || office.emails.length > 1;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.04, duration: 0.5 }}
            className={`bg-transparent rounded-2xl border ${office.isMain
                ? 'border-[#020D21] shadow-[0_4px_24px_rgba(2,13,33,0.12)]'
                : 'border-white/20 shadow-[0_2px_10px_rgba(2,13,33,0.05)]'
                } p-5 flex flex-col gap-3 hover:shadow-[0_6px_28px_rgba(2,13,33,0.09)] transition-shadow`}
        >
            {/* Encabezado */}
            <div className="flex items-start justify-between gap-2">
                <div>
                    <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-white text-base leading-tight">{office.city}</h3>
                        {office.isMain && (
                            <span className="text-[10px] font-semibold text-white bg-[#020D21] rounded-full px-2 py-0.5 leading-none">
                                PRINCIPAL
                            </span>
                        )}
                    </div>
                    <p className="text-xs text-[#9CA3AF] font-light mt-0.5">{office.type}</p>
                </div>
                <MapPin size={16} className="text-white flex-shrink-0 mt-0.5" />
            </div>

            {/* Dirección */}
            {office.address && (
                <p className="text-xs text-white font-light leading-[1.6]">{office.address}</p>
            )}

            {/* Teléfono principal */}
            <div className="flex items-center gap-2 text-xs text-white">
                <Phone size={12} className="flex-shrink-0" />
                <span className="font-medium">{office.phones[0]}</span>
            </div>

            {/* Email principal */}
            <div className="flex items-center gap-2 text-xs">
                <Mail size={12} className="flex-shrink-0 text-white" />
                <a
                    href={`mailto:${office.emails[0]}`}
                    className="text-white hover:text-white transition-colors break-all"
                >
                    {office.emails[0]}
                </a>
            </div>

            {/* Expandir si hay más contactos */}
            {hasExtra && (
                <>
                    <button
                        onClick={() => setExpanded(e => !e)}
                        className="flex items-center gap-1 text-xs text-[#9CA3AF] hover:text-white transition-colors mt-1 self-start"
                    >
                        {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                        {expanded ? 'Menos' : 'Más contactos'}
                    </button>

                    {expanded && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-1.5 border-t border-[#F3F4F6] pt-3"
                        >
                            {office.phones.slice(1).map((p, i) => (
                                <div key={i} className="flex items-center gap-2 text-xs text-white">
                                    <Phone size={11} className="flex-shrink-0" />
                                    <span>{p}</span>
                                </div>
                            ))}
                            {office.emails.slice(1).map((e, i) => (
                                <div key={i} className="flex items-center gap-2 text-xs">
                                    <Mail size={11} className="flex-shrink-0 text-white" />
                                    <a href={`mailto:${e}`} className="text-white hover:text-white transition-colors break-all">{e}</a>
                                </div>
                            ))}
                        </motion.div>
                    )}
                </>
            )}
        </motion.div>
    );
};

/* ─── Página principal ───────────────────────────────────────── */
const Sucursales = () => (
    <div className="min-h-screen bg-transparent pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">

            {/* Hero de sección */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="text-center mb-14"
            >
                <h1 className="text-4xl md:text-5xl font-semibold text-white tracking-tight mb-4">
                    Nuestras Sucursales
                </h1>
                <div className="w-16 h-0.5 bg-[#020D21] mx-auto mb-6" />
                <p className="text-white text-lg font-light max-w-xl mx-auto leading-[1.7]">
                    Presentes en las principales ciudades de Colombia, listos para atenderte.
                </p>
                <p className="text-sm text-[#9CA3AF] mt-2 font-light">
                    {offices.length} agencias disponibles en todo el país
                </p>
            </motion.div>

            {/* Grid de oficinas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {offices.map((office, i) => (
                    <OfficeCard key={office.city} office={office} index={i} />
                ))}
            </div>

        </div>
    </div>
);

export default Sucursales;
