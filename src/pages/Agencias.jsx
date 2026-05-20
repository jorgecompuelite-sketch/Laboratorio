import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, MessageCircle, Map as MapIcon, ChevronRight } from 'lucide-react';

const agenciesData = {
    occidente: {
        title: "Zona Occidente",
        description: "Cobertura integral en el Valle del Cauca y Cauca.",
        locations: [
            {
                city: "Cali y Palmira",
                address: "Calle 39 Norte # 3N-50, Vipasa",
                whatsapp: "573142648662",
                mapUrl: "https://www.google.com/maps/search/?api=1&query=Calle+39+Norte+%23+3N-50+Cali+Vipasa"
            },
            {
                city: "Tuluá",
                address: "Carrera 37 # 25-69, Of. 206",
                whatsapp: "573117111013",
                mapUrl: "https://www.google.com/maps/search/?api=1&query=Carrera+37+%23+25-69+Tuluá"
            },
            {
                city: "Popayán",
                address: "Calle 11 Norte # 7-59",
                whatsapp: "573013322473",
                mapUrl: "https://www.google.com/maps/search/?api=1&query=Calle+11+Norte+%23+7-59+Popayan"
            }
        ]
    },
    centro: {
        title: "Zona Centro",
        description: "Presencia estratégica en la capital y el departamento del Meta.",
        locations: [
            {
                city: "Bogotá",
                address: "Av. Calle 26 # 69C-03, Of. 609",
                whatsapp: "573164528332",
                mapUrl: "https://www.google.com/maps/search/?api=1&query=Av.+Calle+26+%23+69C-03+Bogota"
            },
            {
                city: "Villavicencio",
                address: "Carrera 39 B # 24-04, Of. 201",
                whatsapp: "573013322714",
                mapUrl: "https://www.google.com/maps/search/?api=1&query=Carrera+39+B+%23+24-04+Villavicencio"
            }
        ]
    },
    oriente: {
        title: "Zona Oriente",
        description: "Servicio especializado para Santander, Boyacá y Cesar.",
        locations: [
            {
                city: "Cúcuta",
                address: "Av. 0 # 11-161, Of. 202",
                whatsapp: "573046700671",
                mapUrl: "https://www.google.com/maps/search/?api=1&query=Av.+0+%23+11-161+Cucuta"
            },
            {
                city: "Tunja",
                address: "Calle 22 # 9-27, Of. 209",
                whatsapp: "573001614241",
                mapUrl: "https://www.google.com/maps/search/?api=1&query=Calle+22+%23+9-27+Tunja"
            },
            {
                city: "Valledupar",
                address: "Carrera 14 # 13C-60, Of. 212",
                whatsapp: "573044570077",
                mapUrl: "https://www.google.com/maps/search/?api=1&query=Carrera+14+%23+13C-60+Valledupar"
            }
        ]
    },
    norte: {
        title: "Zona Norte",
        description: "Atención prioritaria en las principales ciudades de la Costa Caribe.",
        locations: [
            {
                city: "Barranquilla",
                address: "Calle 72 # 41B-09, Of. 603",
                whatsapp: "573117111013",
                mapUrl: "https://www.google.com/maps/search/?api=1&query=Calle+72+%23+41B-09+Barranquilla"
            },
            {
                city: "Cartagena",
                address: "Calle 33 # 10A-44, Of. 202E",
                whatsapp: "573117111013",
                mapUrl: "https://www.google.com/maps/search/?api=1&query=Calle+33+%23+10A-44+Cartagena"
            },
            {
                city: "Santa Marta",
                address: "Carrera 2B # 14-21, Of. PH7",
                whatsapp: "573044589460",
                mapUrl: "https://www.google.com/maps/search/?api=1&query=Carrera+2B+%23+14-21+Santa+Marta"
            },
            {
                city: "Montería y Sincelejo",
                address: "Calle 28 # 4-21, Of. 208",
                whatsapp: "573117111013",
                mapUrl: "https://www.google.com/maps/search/?api=1&query=Calle+28+%23+4-21+Monteria"
            }
        ]
    },
    sur: {
        title: "Zona Sur",
        description: "Extensa red de servicios en Antioquia, Eje Cafetero y cercanías.",
        locations: [
            {
                city: "Medellín",
                address: "Cra 66 # 49-06, Of. 301",
                whatsapp: "573164494173",
                mapUrl: "https://www.google.com/maps/search/?api=1&query=Cra+66+%23+49-06+Medellin"
            },
            {
                city: "Rionegro",
                address: "Cra 51 # 50-31, Of. 403",
                whatsapp: "573117111013",
                mapUrl: "https://www.google.com/maps/search/?api=1&query=Cra+51+%23+50-31+Rionegro"
            },
            {
                city: "Pereira",
                address: "Clle 18 # 8-35, Of. 306",
                whatsapp: "573013322729",
                mapUrl: "https://www.google.com/maps/search/?api=1&query=Clle+18+%23+8-35+Pereira"
            },
            {
                city: "Armenia",
                address: "Cra 14 # 23-27, Of. 705",
                whatsapp: "573044589472",
                mapUrl: "https://www.google.com/maps/search/?api=1&query=Cra+14+%23+23-27+Armenia"
            }
        ]
    },
    otras: {
        title: "Zona Otras Plazas",
        description: "Atención especializada en ciudades intermedias y otras regiones estratégicas.",
        locations: [
            {
                city: "Pasto",
                address: "Carrera 25 # 20-65, Oficina 202, Edificio Calle Real",
                whatsapp: "573044570110",
                mapUrl: "https://www.google.com/maps/search/?api=1&query=Cra+25+%23+20-65+Pasto+Calle+Real"
            },
            {
                city: "Ibagué",
                address: "Carrera 5 # 11-24, Oficina 402, Edificio Torre Empresarial",
                whatsapp: "573104141998",
                mapUrl: "https://www.google.com/maps/search/?api=1&query=Cra+5+%23+11-24+Ibagué+Torre+Empresarial"
            },
            {
                city: "Neiva",
                address: "Calle 10 # 6-12, Interior 8, C.C. Cuco Centro",
                whatsapp: "573013959058",
                mapUrl: "https://www.google.com/maps/search/?api=1&query=Clle+10+%23+6-12+Neiva+Cuco+Centro"
            },
            {
                city: "Agencia Otras plazas",
                address: "Cel 311 711 1013 / 311 389 4278 | Mail: comercial.otrasplazas@labmilanes.com",
                whatsapp: "573117111013",
                mapUrl: "#"
            }
        ]
    }
};

const AgencyCard = ({ location, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
        className="group relative bg-[#0B132B]/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-[#0B132B]/60 transition-all duration-300 hover:border-[#10B981]/50 shadow-xl"
    >
        <div className="flex flex-col h-full">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-[#10B981]/10 rounded-lg text-[#10B981]">
                    <MapPin size={20} />
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-[#10B981] transition-colors">
                    {location.city}
                </h3>
            </div>
            
            <p className="text-white/70 text-sm leading-relaxed mb-6 flex-grow">
                {location.address}
            </p>

            <div className="flex flex-col gap-3 mt-auto">
                <a
                    href={location.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl border border-white/10 transition-all font-medium text-sm"
                >
                    <MapIcon size={16} />
                    Ver en Google Maps
                </a>
                
                <a
                    href={`https://wa.me/${location.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-xl transition-all font-bold text-sm shadow-lg shadow-[#25D366]/20"
                >
                    <MessageCircle size={18} fill="white" className="text-white" />
                    Contactar por WhatsApp
                </a>
            </div>
        </div>
    </motion.div>
);

const Agencias = () => {
    const { zone } = useParams();
    const data = agenciesData[zone];

    if (!data) {
        return (
            <div className="min-h-screen flex items-center justify-center pt-20">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-white mb-4">Zona no encontrada</h1>
                    <Link to="/" className="text-[#10B981] hover:underline">Volver al inicio</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-transparent pt-32 pb-20 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-12"
                >
                    <div className="flex items-center gap-2 text-white/50 text-sm mb-4">
                        <Link to="/" className="hover:text-white transition-colors">Inicio</Link>
                        <ChevronRight size={14} />
                        <span className="text-[#10B981]">Agencias</span>
                        <ChevronRight size={14} />
                        <span className="text-white">{data.title}</span>
                    </div>
                    
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">
                        {data.title}
                    </h1>
                    <p className="text-white/60 text-lg md:text-xl max-w-2xl font-light">
                        {data.description}
                    </p>
                </motion.div>

                {/* Grid of Locations */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {data.locations.map((loc, idx) => (
                        <AgencyCard key={loc.city} location={loc} index={idx} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Agencias;
