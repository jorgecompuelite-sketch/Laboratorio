import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Triangle, ChevronRight } from 'lucide-react';

const SectionCard = ({ title, description, icon: Icon, colorClass, link }) => (
    <motion.div 
        whileHover={{ y: -5 }}
        className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-[2rem] group transition-all"
    >
        <div className={`w-14 h-14 rounded-2xl ${colorClass} flex items-center justify-center mb-6 shadow-lg shadow-black/20 group-hover:scale-110 transition-transform`}>
            <Icon size={28} className="text-white" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
        <p className="text-gray-400 mb-8 leading-relaxed">{description}</p>
        <a 
            href={link}
            className="inline-flex items-center gap-2 text-white font-medium hover:text-blue-400 transition-colors"
        >
            Ver más detalles <ChevronRight size={18} />
        </a>
    </motion.div>
);

const MiLab = ({ section }) => {
    // Definimos los datos de las secciones
    const sections = {
        usuario: {
            title: "Panel de Usuario MiLab",
            subtitle: "Bienvenido a tu espacio exclusivo en LabMilanés",
        },
        eventos: {
            title: "Eventos del mes",
            subtitle: "Mantente al día con las últimas conferencias y webinars",
        },
        talleres: {
            title: "Talleres del mes",
            subtitle: "Formación técnica avanzada para odontólogos",
        },
        triangulo: {
            title: "Triángulo Milanés",
            subtitle: "Nuestra metodología única de trabajo colaborativo",
        }
    };

    const currentSection = sections[section] || sections.usuario;

    return (
        <div className="pt-28 pb-20 min-h-screen bg-[#0B132B]">
            <div className="container mx-auto px-4 md:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-16"
                >
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-2 h-12 bg-blue-600 rounded-full" />
                        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">{currentSection.title}</h1>
                    </div>
                    <p className="text-xl text-gray-400 max-w-2xl">{currentSection.subtitle}</p>
                </motion.div>

                {/* Grid de Secciones */}
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    <SectionCard 
                        title="Eventos del Mes"
                        description="Accede al calendario completo de eventos presenciales y virtuales diseñados para tu crecimiento profesional."
                        icon={Calendar}
                        colorClass="bg-blue-600"
                        link="/milab/eventos"
                    />
                    <SectionCard 
                        title="Talleres Técnicos"
                        description="Participa en nuestros workshops prácticos sobre nuevas tecnologías y materiales de restauración."
                        icon={Users}
                        colorClass="bg-emerald-500"
                        link="/milab/talleres"
                    />
                    <SectionCard 
                        title="Triángulo Milanés"
                        description="Descubre cómo nuestra alianza odontólogo-paciente-laboratorio garantiza resultados perfectos."
                        icon={Triangle}
                        colorClass="bg-purple-600"
                        link="/milab/triangulo"
                    />
                </div>

                {/* Contenedor de Contenido Específico */}
                <div className="bg-white/5 border border-white/10 rounded-[3rem] p-12 text-center">
                    <div className="max-w-2xl mx-auto">
                        <div className="w-20 h-20 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-blue-600/30">
                            <Triangle size={32} className="text-blue-500 fill-blue-500/20" />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-6">Contenido de {currentSection.title}</h2>
                        <p className="text-gray-400 text-lg mb-8">
                            Estamos preparando el contenido más relevante para esta sección. 
                            Muy pronto podrás descargar materiales, guías y ver grabaciones exclusivas.
                        </p>
                        <div className="h-2 w-24 bg-blue-600 rounded-full mx-auto" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MiLab;
