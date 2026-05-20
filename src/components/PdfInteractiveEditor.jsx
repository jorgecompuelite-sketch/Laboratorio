import React, { useState, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { PDFDocument, rgb } from 'pdf-lib';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { Download, X } from 'lucide-react';

// Configure the worker for Vite
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

export default function PdfInteractiveEditor({ pdfUrl, onSaved }) {
    const [numPages, setNumPages] = useState(null);
    const [fields, setFields] = useState([]);
    const [isSaving, setIsSaving] = useState(false);

    // Track active/focused input to prevent removing if not intended
    const containerRef = useRef(null);

    const handleDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    const handleCanvasClick = (e) => {
        // Prevent adding a new field if clicking on an existing input or its delete button
        if (e.target.tagName.toLowerCase() === 'input' || e.target.closest('button')) {
            return;
        }

        const rect = containerRef.current.getBoundingClientRect();
        // Calculate percentages
        const xPercent = (e.clientX - rect.left) / rect.width;
        const yPercent = (e.clientY - rect.top) / rect.height;

        const newField = {
            id: Date.now(),
            xPercent,
            yPercent,
            text: ''
        };
        setFields([...fields, newField]);
    };

    const updateFieldText = (id, text) => {
        setFields(fields.map(f => f.id === id ? { ...f, text } : f));
    };

    const removeField = (id) => {
        setFields(fields.filter(f => f.id !== id));
    };

    const savePdf = async () => {
        if (fields.length === 0) {
            alert("No has escrito nada en el documento. Haz clic en una línea vacía para escribir.");
            return;
        }

        setIsSaving(true);
        try {
            const existingPdfBytes = await fetch(pdfUrl).then(res => res.arrayBuffer());
            const pdfDoc = await PDFDocument.load(existingPdfBytes);
            const formPages = pdfDoc.getPages();
            
            // Assume we're only editing the first page
            const firstPage = formPages[0];
            const { width, height } = firstPage.getSize();
            
            // Text size standard visual scale
            const fontSize = 12;

            fields.forEach(field => {
                if (!field.text.trim()) return;
                // Map percentages back to PDF document coordinates
                // pdf-lib origin (0,0) is bottom-left. CSS origin is top-left.
                const pdfX = field.xPercent * width;
                const pdfY = height - (field.yPercent * height) - fontSize; // subtract roughly font size for baseline alignment

                firstPage.drawText(field.text, {
                    x: pdfX,
                    y: pdfY,
                    size: fontSize,
                    color: rgb(0.1, 0.1, 0.1),
                });
            });

            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            
            // Trigger download
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
        <div className="flex flex-col items-center bg-gray-50 p-4 md:p-8 rounded-3xl shadow-lg border border-gray-200/60 w-full animate-in fade-in zoom-in-95 duration-500">
            
            {/* Toolbar */}
            <div className="w-full flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <div className="text-[0.95rem] text-[#2AB2D6] bg-[#E0F2F7] px-4 py-3 rounded-xl border border-[#2AB2D6]/20 shadow-sm flex items-center w-full md:w-auto text-center md:text-left transition-transform hover:scale-[1.01]">
                    <strong className="mr-2 hidden md:inline">Instrucciones:</strong> 
                    Haz clic sobre cualquier de las líneas vacías del documento para escribir tus datos.
                </div>
                <button
                    onClick={savePdf}
                    disabled={isSaving}
                    className="flex items-center justify-center gap-2 bg-[#020D21] hover:bg-[#0052FF] text-white px-6 py-3 rounded-full shadow-md transition-colors disabled:opacity-50 font-medium w-full md:w-auto"
                >
                    <Download size={18} />
                    {isSaving ? "Integrando..." : "Descargar Prescripción (PDF)"}
                </button>
            </div>

            {/* Editor Area */}
            <div className="relative shadow-2xl border border-gray-300 bg-transparent inline-block w-full max-w-4xl overflow-x-auto custom-scrollbar rounded-lg">
                <div 
                    ref={containerRef}
                    onClick={handleCanvasClick}
                    className="relative cursor-crosshair min-w-[700px] md:min-w-0" 
                    style={{ display: 'inline-block' }}
                >
                    <Document 
                        file={pdfUrl} 
                        onLoadSuccess={handleDocumentLoadSuccess}
                        className="pointer-events-none select-none" 
                    >
                        {/* Muestra la página 1 */}
                        <Page 
                            pageNumber={1} 
                            renderTextLayer={false}
                            renderAnnotationLayer={false}
                            width={window.innerWidth < 768 ? 700 : 850} 
                        />
                    </Document>

                    {/* Render fields over the PDF canvas */}
                    {fields.map((field) => (
                        <div
                            key={field.id}
                            style={{
                                position: 'absolute',
                                left: `${field.xPercent * 100}%`,
                                top: `${field.yPercent * 100}%`,
                                transform: 'translate(0, -50%)', 
                            }}
                            className="group flex flex-col z-50 pointer-events-auto"
                            onClick={(e) => e.stopPropagation()} 
                        >
                            <div className="relative flex items-center">
                                <input
                                    autoFocus
                                    type="text"
                                    value={field.text}
                                    onChange={(e) => updateFieldText(field.id, e.target.value)}
                                    placeholder="Escribir..."
                                    className="bg-cyan-50/80 border-0 outline-none text-[14px] md:text-[16px] text-white font-semibold border-b-2 border-dashed border-[#2AB2D6] focus:border-solid p-1.5 min-w-[120px] w-auto max-w-[300px] shadow-sm rounded-sm transition-all hover:bg-cyan-100/90"
                                    style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
                                />
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeField(field.id);
                                    }}
                                    className="absolute -right-8 text-white bg-red-500 hover:bg-red-600 rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                                    title="Quitar texto"
                                >
                                    <X size={14} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="mt-6 text-xs text-white">
               * Asegúrate de revisar ortografía y que todo esté bien situado antes de descargar el documento.
            </div>
        </div>
    );
}
