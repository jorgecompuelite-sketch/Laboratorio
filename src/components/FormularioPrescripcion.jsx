import React, { useState, useEffect, useRef } from 'react';
import { PDFDocument, rgb, degrees } from 'pdf-lib';
import { Download } from 'lucide-react';

const PREDEFINED_FIELDS = [
    { id: 'odontologo', placeholder: 'Nombre del Odontólogo', xPercent: 0.55, yPercent: 0.40, widthPercent: 0.28, heightPercent: 0.022 },
    { id: 'tarjeta', placeholder: 'No. Tarjeta', xPercent: 0.67, yPercent: 0.427, widthPercent: 0.29, heightPercent: 0.022 },
    { id: 'telefono', placeholder: 'Teléfono', xPercent: 0.55, yPercent: 0.455, widthPercent: 0.15, heightPercent: 0.022 },
    { id: 'ciudad', placeholder: 'Ciudad', xPercent: 0.75, yPercent: 0.455, widthPercent: 0.21, heightPercent: 0.022 },
    { id: 'direccion', placeholder: 'Dirección', xPercent: 0.55, yPercent: 0.483, widthPercent: 0.41, heightPercent: 0.022 },
    { id: 'paciente', placeholder: 'Nombre del Paciente', xPercent: 0.55, yPercent: 0.535, widthPercent: 0.28, heightPercent: 0.022 },
    { id: 'cc', placeholder: 'C.C.', xPercent: 0.86, yPercent: 0.535, widthPercent: 0.10, heightPercent: 0.022 },
    { id: 'indicaciones', placeholder: 'Indicaciones del Odontólogo...', xPercent: 0.515, yPercent: 0.58, widthPercent: 0.45, heightPercent: 0.155, multiline: true },
];

export default function FormularioPrescripcion({ pdfUrl, onSaved }) {
    const [fieldValues, setFieldValues] = useState({});
    const [isSaving, setIsSaving] = useState(false);
    const [pdfError, setPdfError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [canvasScale, setCanvasScale] = useState(1);
    
    // Fijo a 0 para asegurar que se muestre en su rotación original Landscape
    const pdfRotation = 0; 
    
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const pdfPageRef = useRef(null);

    useEffect(() => {
        const loadPdfJs = async () => {
            try {
                if (!window.pdfjsLib) {
                    const script = document.createElement('script');
                    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
                    script.async = true;
                    
                    await new Promise((resolve, reject) => {
                        script.onload = resolve;
                        script.onerror = reject;
                        document.head.appendChild(script);
                    });

                    window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
                }
                renderPdf();
            } catch (err) {
                console.error("Error loading PDF.js", err);
                setPdfError("Error al cargar el motor visual del PDF.");
                setIsLoading(false);
            }
        };

        loadPdfJs();
    }, [pdfUrl]);

    const renderPdf = async () => {
        try {
            const loadingTask = window.pdfjsLib.getDocument(pdfUrl);
            const pdf = await loadingTask.promise;
            const page = await pdf.getPage(1);
            
            // Renderizamos a una escala alta para mejor calidad visual
            const baseScale = 2.0; 
            const viewport = page.getViewport({ scale: baseScale, rotation: pdfRotation });
            
            pdfPageRef.current = {
                width: page.getViewport({ scale: 1, rotation: pdfRotation }).width,
                height: page.getViewport({ scale: 1, rotation: pdfRotation }).height
            };

            const canvas = canvasRef.current;
            if (!canvas) return;
            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            // Escalar usando CSS para ajustarse al contenedor
            canvas.style.width = '100%';
            canvas.style.height = 'auto';

            const renderContext = {
                canvasContext: context,
                viewport: viewport
            };
            
            await page.render(renderContext).promise;
            setIsLoading(false);
        } catch (err) {
            console.error("Error rendering PDF page", err);
            setPdfError("Error al renderizar el documento PDF.");
            setIsLoading(false);
        }
    };

    const updateFieldValue = (id, text) => {
        setFieldValues(prev => ({ ...prev, [id]: text }));
    };

    const savePdf = async () => {
        setIsSaving(true);
        try {
            const existingPdfBytes = await fetch(pdfUrl).then(res => res.arrayBuffer());
            const pdfDoc = await PDFDocument.load(existingPdfBytes);
            const form = pdfDoc.getForm();
            const formPages = pdfDoc.getPages();
            const firstPage = formPages[0];
            
            // Nos aseguramos de que la página quede rotada correctamente para la visualización final
            firstPage.setRotation(degrees(pdfRotation));

            const { width, height } = firstPage.getSize();
            // width y height aquí son los originales (landscape, ej 792 x 612)

            PREDEFINED_FIELDS.forEach(field => {
                const text = fieldValues[field.id] || '';
                if (!text.trim()) return;

                // Crear el campo interactivo
                let textField;
                try {
                    textField = form.createTextField(field.id);
                } catch (e) {
                    textField = form.getTextField(field.id);
                }
                
                textField.setText(text);

                // Calcular las coordenadas. 
                // pdf-lib el origen (0,0) es la esquina INFERIOR IZQUIERDA.
                // Además, si el PDF original es Landscape (Rotation=0) y nosotros lo vemos rotado 90 (Portrait),
                // tenemos que mapear las coordenadas (xPercent, yPercent) que vemos en pantalla (Portrait)
                // al sistema de coordenadas original (Landscape).
                
                // En Portrait visto en pantalla (rotación 90 CW de pdf.js):
                // x visual -> equivale a Y original (invertido)
                // y visual -> equivale a X original
                
                const visualWidth = pdfPageRef.current.width;   // ej. 612
                const visualHeight = pdfPageRef.current.height; // ej. 792
                
                const w = field.widthPercent * visualWidth;
                const h = field.heightPercent * visualHeight;

                let pdfX, pdfY;
                
                if (pdfRotation === 90) {
                    pdfX = (1 - field.yPercent) * width;
                    pdfY = (1 - field.xPercent) * height;
                } else {
                    // pdfRotation = 0
                    // pdf-lib Y starts from bottom, visual Y starts from top
                    pdfX = field.xPercent * width;
                    pdfY = height - (field.yPercent * height) - h;
                }

                textField.addToPage(firstPage, {
                    x: pdfX,
                    y: pdfY,
                    width: w,
                    height: h,
                });
            });

            // Flatten opcional: si queremos que sea 100% ineditable.
            // form.flatten(); 
            // Pero el requerimiento dice "Solo Lectura excepto por los nodos de entrada de datos"
            // Por lo que lo dejamos como AcroForm!

            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            
            const link = document.createElement('a');
            link.href = url;
            link.download = 'Orden_Produccion_Llenada.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            setTimeout(() => URL.revokeObjectURL(url), 100);
            
            if (onSaved) onSaved();
            
        } catch (error) {
            console.error('Error saving PDF:', error);
            alert("Ocurrió un error al intentar exportar el PDF modificado.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="flex flex-col items-center bg-transparent p-4 md:p-8 rounded-3xl shadow-lg border border-gray-200/60 w-full animate-in fade-in duration-500">
            
            {/* Toolbar */}
            <div className="w-full flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <div className="text-[0.95rem] text-[#2AB2D6] bg-transparent px-4 py-3 rounded-xl border border-[#2AB2D6]/20 shadow-sm flex items-center w-full md:w-auto text-center md:text-left flex-1 mr-4">
                    <strong className="mr-2 hidden md:inline">Instrucciones:</strong> 
                    Completa los campos habilitados en el formulario a continuación.
                </div>
                
                <button
                    onClick={savePdf}
                    disabled={isSaving || isLoading}
                    className="flex items-center justify-center gap-2 bg-[#020D21] hover:bg-[#0052FF] text-white px-8 py-4 rounded-xl shadow-md transition-colors disabled:opacity-50 font-medium whitespace-nowrap text-lg"
                >
                    <Download size={20} />
                    {isSaving ? "Generando Archivo..." : "Confirmar Descarga"}
                </button>
            </div>

            {/* Editor Area */}
            <div className="relative shadow-xl border border-gray-300 bg-[#E5E7EB] w-full max-w-[900px] overflow-hidden rounded-lg flex flex-col items-center">
                {pdfError && (
                    <div className="p-8 text-red-500 text-center">{pdfError}</div>
                )}
                
                {isLoading && !pdfError && (
                    <div className="p-20 text-[#2AB2D6] text-center font-medium animate-pulse">
                        Cargando plantilla del documento...
                    </div>
                )}

                <div 
                    ref={containerRef}
                    className={`relative w-full ${isLoading ? 'hidden' : 'block'}`}
                    style={{ backgroundColor: 'white' }}
                >
                    <canvas 
                        ref={canvasRef} 
                        className="pointer-events-none select-none block w-full h-auto"
                    />

                    {/* Render predefined fields over the PDF canvas */}
                    {PREDEFINED_FIELDS.map((field) => (
                        <div
                            key={field.id}
                            style={{
                                position: 'absolute',
                                left: `${field.xPercent * 100}%`,
                                top: `${field.yPercent * 100}%`,
                                width: `${field.widthPercent * 100}%`,
                                height: `${field.heightPercent * 100}%`,
                            }}
                            className="z-50"
                        >
                            {field.multiline ? (
                                <textarea
                                    value={fieldValues[field.id] || ''}
                                    onChange={(e) => updateFieldValue(field.id, e.target.value)}
                                    placeholder={field.placeholder}
                                    className="w-full h-full bg-[#E0F2F7]/40 border-2 border-[#2AB2D6]/50 hover:border-[#2AB2D6] focus:border-[#0052FF] focus:bg-transparent outline-none text-[12px] md:text-[14px] text-white p-2 transition-all resize-none rounded-md shadow-sm backdrop-blur-[1px]"
                                />
                            ) : (
                                <input
                                    type="text"
                                    value={fieldValues[field.id] || ''}
                                    onChange={(e) => updateFieldValue(field.id, e.target.value)}
                                    placeholder={field.placeholder}
                                    className="w-full h-full bg-[#E0F2F7]/40 border-2 border-b-[#2AB2D6]/50 border-transparent hover:border-[#2AB2D6]/70 focus:border-b-[#0052FF] focus:bg-transparent outline-none text-[12px] md:text-[14px] text-white font-medium px-2 transition-all rounded-sm backdrop-blur-[1px]"
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="mt-8 text-sm text-white flex items-center justify-center gap-2">
               <span className="w-2 h-2 rounded-full bg-[#2AB2D6]"></span>
               * El documento generado será de solo lectura para preservar su integridad, manteniendo únicamente los campos completados como editables.
            </div>
        </div>
    );
}

