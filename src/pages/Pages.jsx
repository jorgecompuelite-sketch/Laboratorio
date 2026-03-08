import React from 'react';
import { motion } from 'framer-motion';

const PageLayout = ({ title, children }) => {
    return (
        <div className="pt-24 pb-20 min-h-screen bg-[#020B1D]">
            <div className="container mx-auto px-4 md:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-2 h-12 bg-[#0D3690] rounded-full shadow-[0_0_15px_rgba(13,54,144,0.5)]" />
                        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">{title}</h1>
                    </div>
                    <div className="prose prose-lg prose-invert text-[#E0E0E0] max-w-4xl bg-white/5 p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-white/10 backdrop-blur-sm">
                        {children}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export const MisionVision = () => (
    <PageLayout title="Misión y Visión">
        <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 border-b border-[#0D3690]/30 pb-3">Nuestra misión</h2>
            <p className="text-justify leading-relaxed text-[#94A3B8]">
                El Laboratorio Dental Luis Milanés es una empresa de amplia trayectoria en el mercado
                con más de 40 años de experiencia liderando la fabricación comercialización y
                distribución de prótesis dentales, funcionales, estéticas y duraderas. Nos apoyamos
                con la integración de tecnología de punta utilizando materiales de altos estándares de
                calidad, garantizando a nuestros clientes los odontólogos, bio compatibilidad,
                durabilidad, precisión y perfección en la ejecución del tratamiento para cada uno de
                sus pacientes.
            </p>
        </div>

        <div>
            <h2 className="text-2xl font-bold text-white mb-6 border-b border-[#0D3690]/30 pb-3">Nuestra visión</h2>
            <p className="text-justify leading-relaxed text-[#94A3B8]">
                Para el año 2026 continuar siendo una empresa líder en el sector de la industria dental
                a nivel nacional, con capacidad de competir en el mercado internacional, ofreciendo
                soluciones innovadoras que satisfagan las necesidades de los odontólogos,
                evolucionando constantemente nuestros productos y servicios para ofrecer la mejor
                calidad y costos en la fabricación de prótesis dentales
            </p>
        </div>
    </PageLayout>
);



export const NuestraGente = () => (
    <PageLayout title="Nuestra Gente">
        <p>Contamos con un equipo de técnicos dentales altamente capacitados...</p>
    </PageLayout>
);

export const Tecnologia = () => (
    <PageLayout title="Tecnología">
        <p>Utilizamos lo último en tecnología CAD/CAM y escaneo 3D...</p>
    </PageLayout>
);

export const Blog = () => (
    <PageLayout title="Blog">
        <p>Artículos y noticias sobre el mundo de la prótesis dental...</p>
    </PageLayout>
);

export const PoliticasGarantia = () => (
    <PageLayout title="Políticas y Garantías">
        <div className="space-y-10">
            <section>
                <p className="text-white font-bold mb-4">POLÍTICAS LABORATORIO DENTAL LUIS MILANES</p>
                <p className="text-justify leading-relaxed text-[#94A3B8] mb-4">
                    En atención al Estatuto del Consumidor (Ley 1480 de 2011) presentamos a todos nuestros clientes y futuros clientes lo concerniente a las políticas sobre las garantías, cambios y devoluciones que se pueden presentar al momento de la prestación del servicio.
                </p>
                <p className="text-justify leading-relaxed text-[#94A3B8] mb-4">
                    El <span className="text-white font-semibold">LABORATORIO DENTAL LUIS MILANES S.A.S.</span> adquiere una obligación de medio, es decir, la garantía se otorga no por el resultado, sino por las condiciones de calidad e idoneidad en la prestación del servicio, conforme lo establece la normatividad colombiana, por lo tanto, en todo momento se deberá tener en cuenta las condiciones de calidad e idoneidad en la prestación del servicio.
                </p>
                <p className="text-justify leading-relaxed text-[#94A3B8]">
                    Los materiales e insumos empleados en el desarrollo de los procedimientos y servicios ofrecidos por el LABORATORIO DENTAL LUIS MILANES S.A.S., son productos de calidad y son operados por profesionales capacitados, con amplia experiencia en el sector de la odontología.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-white mb-6 border-b border-[#0D3690]/30 pb-3">TÉRMINOS DE GARANTÍA</h2>

                <div className="space-y-6">
                    <div>
                        <h3 className="text-xl font-bold text-[#0D3690] mb-3">GARANTIA EN ZIRCONIO</h3>
                        <p className="text-[#94A3B8] mb-3">Las prótesis dentales en zirconio cuentan con garantía por fractura, según el tipo de material utilizado:</p>
                        <ul className="list-disc pl-6 space-y-2 text-[#94A3B8]">
                            <li><span className="text-white">Zirconio Tiger:</span> 1 año de garantía.</li>
                            <li><span className="text-white">Zirconio ZR7:</span> 2 años de garantía.</li>
                            <li><span className="text-white">Zirconio Zir Luxor:</span> 3 años de garantía.</li>
                        </ul>
                        <p className="text-sm text-[#94A3B8] mt-3 italic">El período de garantía se contabiliza a partir de la fecha de salida del laboratorio.</p>
                        <p className="text-sm bg-red-500/10 border border-red-500/20 p-3 rounded-lg text-red-200 mt-4">
                            En caso de presentarse accidentes tales como fracturas ocasionadas por caídas o manipulación inadecuada, la garantía se verá afectada. Para continuar con el proceso será necesario remitir una nueva prescripción y realizar el pago correspondiente.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-[#0056A4] mb-3">GARANTIA EN METAL PORCELANA</h3>
                        <p className="text-[#94A3B8] mb-3">Las prótesis en Metal Porcelana se entregan a satisfacción y cuentan con una garantía de un (1) año en los siguientes materiales:</p>
                        <ul className="list-disc pl-6 space-y-1 text-[#94A3B8]">
                            <li>Metal Porcelana Ceramco3 Dentsply</li>
                            <li>Metal Porcelana Vita Máster</li>
                            <li>Metal Porcelana Vita VM13</li>
                        </ul>
                        <p className="text-[#94A3B8] mt-3">Si se presenta una falla técnica relacionada con color, adaptación o morfología, esta deberá ser informada de inmediato y la prótesis <span className="text-white font-bold underline">No deberá ser cementada</span>, ya que la cementación compromete la garantía.</p>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-[#0056A4] mb-3">GARANTIA EN DISILICATO DE LITIO</h3>
                        <p className="text-justify text-[#94A3B8]">
                            La garantía aplicará únicamente cuando la falla sea técnica de fabricación y siempre que no haya sido cementado, dado que el disilicato de litio es un material frágil antes de su cementación y puede fracturarse o astillarse bajo fuerzas masticatorias intensas o manipulación inadecuada.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-[#0056A4] mb-3">MATERIALES SIN GARANTÍA</h3>
                        <p className="text-[#94A3B8] mb-3">Los siguientes materiales <span className="text-white font-bold">No cuentan con garantía</span> debido a su naturaleza de resina y plásticos de baja resistencia:</p>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                            {['Cerómero', 'PMMA', 'Resinas', 'Placas', 'Cubetas'].map(item => (
                                <div key={item} className="bg-white/5 border border-white/10 p-2 rounded text-center text-[#E0E0E0]">{item}</div>
                            ))}
                        </div>
                        <p className="text-sm text-[#94A3B8] mt-4">Los núcleos No poseen garantía, dado que el laboratorio únicamente realiza el colado conforme al patrón enviado por el odontólogo.</p>
                    </div>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-white mb-6 border-b border-[#0056A4]/30 pb-3">CONDICIONES GENERALES</h2>
                <div className="grid gap-4">
                    {[
                        "Los cambios posteriores no serán tenidos en cuenta como fallas técnicas (cambio en tallas, color, impresiones defectuosas).",
                        "Todos los casos son evaluados por un comité técnico para verificar fallas en los procesos.",
                        "La devolución de dinero solo procede si la falla técnica persiste tras al menos una modificación.",
                        "Es responsabilidad del profesional tomar una impresión fiel y adecuada.",
                        "Todas las impresiones deben ser tomadas a un solo tiempo o a cuatro hands.",
                        "En corrección de color en Zirconio, solo se puede oscurecer, no aclarar.",
                        "No se debe retallar o hacer cambio clínico sin autorización previa por escrito.",
                        "Retallar preparaciones originales o líneas terminales supragingivales afecta la garantía.",
                        "Repeticiones de archivos STL se harán sobre el mismo archivo original.",
                        "Las garantías se repiten en el mismo material inicialmente elaborado.",
                        "Las garantías no son transferibles entre pacientes u odontólogos."
                    ].map((idx, i) => (
                        <div key={i} className="flex gap-4 items-start bg-white/5 p-4 rounded-xl border border-white/5 transition-colors hover:border-[#0056A4]/30 group">
                            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#0056A4]/20 flex items-center justify-center text-[#0056A4] font-bold group-hover:bg-[#0056A4] group-hover:text-white transition-all">{i + 1}</span>
                            <p className="text-[#94A3B8] group-hover:text-[#E0E0E0]">{idx}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="bg-[#0056A4]/10 border border-[#0056A4]/20 p-8 rounded-[2.5rem]">
                <h2 className="text-2xl font-bold text-white mb-6">REQUISITOS PARA RECLAMACIÓN</h2>
                <ul className="grid md:grid-cols-2 gap-4 text-[#E0E0E0]">
                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#0056A4]" /> Modelo Inicial</li>
                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#0056A4]" /> Nueva Impresión Definitiva</li>
                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#0056A4]" /> Registro de mordida</li>
                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#0056A4]" /> Modelo antagonista</li>
                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#0056A4]" /> Prótesis Inicial</li>
                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#0056A4]" /> Registros fotográficos en boca</li>
                </ul>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-white mb-6 border-b border-[#0056A4]/30 pb-3">SOLICITUD DE GARANTÍAS</h2>
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                    <p className="text-[#94A3B8] mb-4">Enviar correo a: <span className="text-white font-bold">coordinadorpostventa@labmilanes.com</span></p>
                    <p className="text-[#94A3B8] text-sm leading-relaxed">
                        Respuesta dentro de los <span className="text-white">15 días hábiles</span> siguientes. En caso de información incompleta, se requerirá al cliente en un plazo de 5 días hábiles.
                    </p>
                    <div className="mt-6 p-4 border-l-4 border-[#0056A4] bg-[#0056A4]/5">
                        <p className="text-xs text-[#94A3B8] italic">
                            De conformidad con el art. 16 ley 1480 de 2011, el laboratorio queda exonerado por fuerza mayor, hecho de un tercero, uso indebido o inobservancia de instrucciones.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    </PageLayout>
);

