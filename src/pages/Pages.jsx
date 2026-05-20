import React from 'react';
import { motion } from 'framer-motion';

const PageLayout = ({ title, children }) => {
    return (
        <div className="pt-40 pb-20 min-h-screen bg-transparent">
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
        <div className="space-y-12 bg-[#05112B]/60 backdrop-blur-md p-8 md:p-12 rounded-[2.5rem] border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.3)]">
            <section>
                <h2 className="text-3xl font-extrabold text-white mb-6 border-b border-[#4DA8DA]/30 pb-4">Políticas de Garantía y Devoluciones</h2>
                <p className="text-justify leading-relaxed text-white/95 text-lg mb-5 drop-shadow-sm">
                    En cumplimiento con el <span className="text-[#4DA8DA] font-bold">Estatuto del Consumidor (Ley 1480 de 2011)</span>, en LABORATORIO DENTAL LUIS MILANÉS S.A.S. presentamos a nuestros clientes y aliados estratégicos las políticas institucionales que rigen nuestras garantías, cambios y devoluciones derivadas de la prestación de nuestros servicios.
                </p>
                <p className="text-justify leading-relaxed text-white/95 text-lg mb-5 drop-shadow-sm">
                    Nuestra organización adquiere una <span className="text-[#4DA8DA] font-bold">obligación de medio</span>; esto significa que la garantía se otorga bajo estrictas condiciones de calidad e idoneidad durante la prestación del servicio, y no por el resultado final subjetivo, conforme a la normatividad colombiana.
                </p>
                <p className="text-justify leading-relaxed text-white/95 text-lg drop-shadow-sm">
                    Todos los materiales e insumos empleados en el desarrollo de nuestros procedimientos superan altos estándares de calidad y son manipulados por profesionales técnicos con amplia experiencia en el sector odontológico.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-white mb-6 border-b border-[#4DA8DA]/30 pb-3">1. Términos de Garantía por Material</h2>
                <p className="text-white/95 text-lg mb-6 drop-shadow-sm">
                    Los periodos de cobertura de nuestras prótesis dentales se contabilizan <span className="text-[#4DA8DA] font-bold">a partir de la fecha de salida del laboratorio</span>. Las coberturas varían según la naturaleza y resistencia técnica del material utilizado:
                </p>

                <h3 className="text-xl font-bold text-[#4DA8DA] mb-4">1.1 Cuadro Resumen de Coberturas</h3>
                <div className="overflow-x-auto mb-8 bg-black/40 border border-white/10 rounded-2xl shadow-xl">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#4DA8DA]/20 border-b border-white/10">
                                <th className="p-4 text-white font-semibold">Tipo de Material</th>
                                <th className="p-4 text-white font-semibold">Subcategoría / Marca</th>
                                <th className="p-4 text-white font-semibold">Período</th>
                                <th className="p-4 text-white font-semibold">Condiciones de Cobertura</th>
                            </tr>
                        </thead>
                        <tbody className="text-white/90 text-sm">
                            <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                <td className="p-4 font-bold text-white" rowSpan="3">Zirconio</td>
                                <td className="p-4">Zir Luxor</td>
                                <td className="p-4 font-bold text-[#4DA8DA]">3 Años</td>
                                <td className="p-4">Fractura técnica de fabricación.</td>
                            </tr>
                            <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                <td className="p-4">ZR7</td>
                                <td className="p-4 font-bold text-[#4DA8DA]">2 Años</td>
                                <td className="p-4">Fractura técnica de fabricación.</td>
                            </tr>
                            <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                <td className="p-4">Tiger</td>
                                <td className="p-4 font-bold text-[#4DA8DA]">1 Año</td>
                                <td className="p-4">Fractura técnica de fabricación.</td>
                            </tr>
                            <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                <td className="p-4 font-bold text-white">Metal Porcelana</td>
                                <td className="p-4">Ceramco3, Vita Máster, Vita VM13</td>
                                <td className="p-4 font-bold text-[#4DA8DA]">1 Año</td>
                                <td className="p-4">Fallas técnicas de color, adaptación o morfología.</td>
                            </tr>
                            <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                <td className="p-4 font-bold text-white">Disilicato de Litio</td>
                                <td className="p-4">Inyectado o Fresado</td>
                                <td className="p-4 font-bold text-[#4DA8DA]">A Satisfacción</td>
                                <td className="p-4">Fallas de fabricación. Frágil antes de la cementación.</td>
                            </tr>
                            <tr className="hover:bg-white/5 transition-colors">
                                <td className="p-4 font-bold text-white">Otros Materiales</td>
                                <td className="p-4">Cerómero, PMMA, Resinas, Placas, Cubetas, Núcleos</td>
                                <td className="p-4 font-bold text-red-400">Sin Garantía</td>
                                <td className="p-4">Sujetos a desgaste natural, cuidado o limitaciones del patrón.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h3 className="text-xl font-bold text-[#4DA8DA] mb-4">1.2 Condiciones de Exclusión de Materiales</h3>
                <div className="space-y-4">
                    <div className="bg-red-950/40 border border-red-500/30 p-5 rounded-xl shadow-inner">
                        <h4 className="text-red-300 font-bold mb-2">Pérdida de Garantía por Manipulación</h4>
                        <p className="text-white/90 text-sm leading-relaxed">
                            En caso de presentarse accidentes como fracturas ocasionadas por caídas o manipulación inadecuada por parte del personal clínico o del paciente, la garantía quedará anulada. Para reiniciar el proceso, será indispensable remitir una nueva prescripción y realizar el pago correspondiente.
                        </p>
                    </div>
                    <div className="bg-black/30 border border-white/10 p-5 rounded-xl shadow-inner">
                        <h4 className="text-white font-bold mb-2">Restricciones de Cementación</h4>
                        <p className="text-white/90 text-sm leading-relaxed">
                            Si se detecta una falla técnica (color, adaptación o morfología) en trabajos de Metal Porcelana o Disilicato de Litio, esta deberá ser informada de inmediato. <span className="text-[#4DA8DA] font-bold underline">La prótesis NO debe ser cementada</span>, ya que la cementación implica la aceptación del trabajo y compromete definitivamente la garantía.
                        </p>
                    </div>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-white mb-6 border-b border-[#4DA8DA]/30 pb-3">2. Condiciones Generales del Servicio</h2>
                <div className="grid gap-4">
                    {[
                        "Fallas Técnicas vs. Cambios Posteriores: Modificaciones solicitadas posteriormente (cambios de talla, color, uso de silicona vencida, alginato o impresiones a dos tiempos) no serán catalogadas como fallas de fabricación.",
                        "Responsabilidad de Impresión: La adaptación se realiza sobre el modelo obtenido de la impresión clínica. Es absoluta responsabilidad del profesional enviar una impresión fiel para garantizar un ajuste pasivo.",
                        "Comité de Evaluación: Todo caso de garantía será evaluado rigurosamente por nuestro Comité Técnico para determinar el origen de la falla.",
                        "Reembolsos: La devolución del dinero solo procederá legalmente cuando la falla técnica persista después de haberse realizado, al menos, una modificación sin resultado satisfactorio.",
                        "Correcciones de Color en Zirconio: El Zirconio permite oscurecimiento clínico, pero no aclaramiento. Para aclarar una corona, se debe fabricar desde cero, facturándose como un trabajo nuevo.",
                        "Alteraciones no Autorizadas: No se debe retallar o modificar clínicamente casos en curso sin autorización escrita del laboratorio. Alterar preparaciones asume el riesgo de inadaptación y pérdida de garantía.",
                        "Flujo Digital (STL): En repeticiones, se fresará exactamente el mismo archivo STL anterior. Si el archivo es modificado por la clínica, se facturará como un trabajo nuevo.",
                        "Intransferibilidad: Las garantías se repiten estrictamente en el mismo material facturado y son intransferibles entre pacientes o distintos profesionales."
                    ].map((idx, i) => {
                        const [title, desc] = idx.split(": ");
                        return (
                            <div key={i} className="flex gap-4 items-start bg-black/30 p-5 rounded-xl border border-white/5 transition-all hover:border-[#4DA8DA]/50 hover:bg-black/50 group shadow-lg">
                                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-[#4DA8DA]/20 flex items-center justify-center text-[#4DA8DA] font-bold text-lg group-hover:bg-[#4DA8DA] group-hover:text-white shadow-inner">{i + 1}</span>
                                <div>
                                    <p className="text-white font-bold mb-1 text-lg">{title}:</p>
                                    <p className="text-white/80 text-base leading-relaxed group-hover:text-white/95">{desc}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            <section className="bg-black/40 border border-[#4DA8DA]/30 p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#4DA8DA] to-transparent"></div>
                <h2 className="text-2xl font-bold text-white mb-6">3. Requisitos para Solicitar Garantías</h2>
                <p className="text-white/90 text-lg mb-6">Para proceder con la evaluación, el profesional deberá remitir físicamente al laboratorio la siguiente documentación y elementos:</p>
                <ul className="grid md:grid-cols-2 gap-5 text-white/95 text-lg mb-8">
                    <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-[#4DA8DA]" /> Modelo Inicial</li>
                    <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-[#4DA8DA]" /> Nueva Impresión Definitiva (en silicona)</li>
                    <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-[#4DA8DA]" /> Registro de mordida actualizado</li>
                    <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-[#4DA8DA]" /> Modelo antagonista</li>
                    <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-[#4DA8DA]" /> Prótesis Inicial</li>
                    <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-[#4DA8DA]" /> Registros fotográficos en boca</li>
                    <li className="flex items-center gap-3 md:col-span-2 font-semibold text-[#4DA8DA]"><div className="w-2 h-2 rounded-full bg-[#4DA8DA]" /> Solicitud de Reclamación (Color, Material, Piezas y Distribución)</li>
                </ul>
                <div className="bg-[#4DA8DA]/10 border-l-4 border-[#4DA8DA] p-5 text-base text-white/90 rounded-r-lg shadow-inner">
                    <span className="font-extrabold text-white">Importante:</span> De no allegarse la documentación completa, la fabricación se realizará única y exclusivamente bajo el criterio técnico del laboratorio.
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-white mb-6 border-b border-[#4DA8DA]/30 pb-3">4. Procedimiento y Exoneraciones</h2>
                <div className="bg-black/30 border border-white/10 p-8 rounded-2xl mb-6 shadow-lg">
                    <p className="text-white/95 text-lg mb-5">Para radicar formalmente un trámite, envíe una notificación al correo: <a href="mailto:coordinadorpostventa@labmilanes.com" className="text-[#4DA8DA] font-bold hover:underline hover:text-white transition-colors">coordinadorpostventa@labmilanes.com</a> incluyendo:</p>
                    <ul className="list-disc pl-6 space-y-3 text-base text-white/90 mb-8">
                        <li>Fecha de recepción del producto.</li>
                        <li>Nombres completos (paciente y profesional tratante).</li>
                        <li>Producto objeto de la reclamación.</li>
                        <li>Datos de contacto (Cédula/NIT, teléfono, dirección).</li>
                        <li><span className="text-white font-bold">Relato detallado:</span> Explicar cómo, cuándo y dónde ocurrió el inconveniente.</li>
                    </ul>
                    
                    <h4 className="text-[#4DA8DA] font-bold text-lg mb-2">Tiempos de Respuesta Legal</h4>
                    <p className="text-white/90 text-base leading-relaxed mb-6">
                        Respuesta formal dentro de los <span className="text-white font-bold">quince (15) días hábiles</span> siguientes a la recepción completa. Si la solicitud presenta información faltante, se requerirá al cliente en un plazo máximo de 5 días hábiles, quien tendrá 10 días para subsanar.
                    </p>
                    
                    <div className="mt-8 p-5 border border-white/10 bg-[#000000]/60 rounded-xl shadow-inner">
                        <h4 className="text-white font-bold mb-3 text-base">Exoneración de Responsabilidad (Art. 16 Ley 1480 de 2011)</h4>
                        <p className="text-sm text-white/70 italic leading-relaxed">
                            El laboratorio quedará totalmente exonerado frente a daños cuando el defecto derive de: (1) Fuerza mayor o caso fortuito. (2) Hecho de un tercero. (3) Uso indebido del producto. (4) Omisión a las instrucciones de instalación, uso o cementación.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    </PageLayout>
);

