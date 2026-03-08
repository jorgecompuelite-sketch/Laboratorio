import React, { useState, useEffect, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download } from 'lucide-react';
import { cn } from '../lib/utils';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Configurar el worker de PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

const Catalogo = () => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1); // Página izquierda actual
    const [scale, setScale] = useState(0.8);
    const [loading, setLoading] = useState(true);
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Ajustar escala base según ancho de pantalla
    useEffect(() => {
        if (width < 768) {
            setScale(0.5); // Móvil
        } else if (width < 1024) {
            setScale(0.7); // Tablet
        } else {
            setScale(0.9); // Desktop
        }
    }, [width]);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
        setLoading(false);
    };

    const changePage = (offset) => {
        setPageNumber(prevPageNumber => {
            const newPage = prevPageNumber + offset;
            // Asegurar límites
            if (newPage < 1) return 1;
            if (newPage > numPages) return prevPageNumber;
            return newPage;
        });
    };

    const nextPage = () => changePage(2); // Avanzar 2 páginas (vista libro)
    const prevPage = () => changePage(-2); // Retroceder 2 páginas

    // Determinar qué páginas mostrar
    // Si estamos en la 1, mostramos solo la 1 (Portada) centrada o a la derecha
    // Si estamos en > 1, mostramos pageNumber (izq) y pageNumber + 1 (der)
    const isFirstPage = pageNumber === 1;
    const isLastPage = pageNumber >= numPages;

    return (
        <div className="pt-24 pb-12 min-h-screen bg-slate-100 flex flex-col items-center justify-start overflow-hidden">
            <div className="container mx-auto px-4 mb-6 flex justify-between items-center max-w-6xl">
                <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Catálogo 2026</h1>
                <div className="flex gap-2 items-center">
                    <a
                        href="/Catalogo2026.pdf"
                        download
                        className="flex items-center gap-2 px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium mr-2"
                    >
                        <Download size={16} />
                        <span className="hidden sm:inline">Descargar PDF</span>
                    </a>
                    <div className="flex bg-white rounded-full shadow p-1">
                        <button onClick={() => setScale(s => Math.min(s + 0.1, 2.0))} className="p-2 hover:bg-slate-50 rounded-full text-slate-600"><ZoomIn size={20} /></button>
                        <button onClick={() => setScale(s => Math.max(s - 0.1, 0.4))} className="p-2 hover:bg-slate-50 rounded-full text-slate-600"><ZoomOut size={20} /></button>
                    </div>
                </div>
            </div>

            <div className="relative w-full flex-grow flex items-center justify-center">
                {loading && (
                    <div className="absolute inset-0 flex items-center justify-center z-50 bg-slate-100/80">
                        <Loader2 className="w-12 h-12 animate-spin text-primary" />
                        <span className="ml-3 text-lg font-medium text-slate-600">Cargando catálogo...</span>
                    </div>
                )}

                <div className="flex items-center justify-center gap-0 md:gap-4 transition-all duration-300 overflow-auto py-4 px-2 max-w-full">
                    <Document
                        file="/Catalogo2026.pdf"
                        onLoadSuccess={onDocumentLoadSuccess}
                        className="flex flex-row justify-center shadow-2xl rounded-sm"
                        loading={null}
                    >
                        {/* Renderizado Condicional para Modo Libro */}

                        {/* Página Izquierda (o Portada) */}
                        <div className={cn("transition-all duration-300 bg-white relative", isFirstPage ? "shadow-xl" : "border-r border-slate-200")}>
                            <Page
                                key={`page_${pageNumber}`}
                                pageNumber={pageNumber}
                                scale={scale}
                                renderAnnotationLayer={false}
                                renderTextLayer={false}
                                className="bg-white"
                                loading={
                                    <div className="w-[400px] h-[600px] bg-white flex items-center justify-center">
                                        <Loader2 className="animate-spin text-slate-300" />
                                    </div>
                                }
                            />
                            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs text-slate-400 font-medium bg-white/80 px-2 rounded">
                                {pageNumber}
                            </div>
                        </div>

                        {/* Página Derecha (Solo si no es portada y existe) */}
                        {!isFirstPage && (pageNumber + 1) <= numPages && (
                            <div className="hidden lg:block transition-all duration-300 bg-white relative">
                                <Page
                                    key={`page_${pageNumber + 1}`}
                                    pageNumber={pageNumber + 1}
                                    scale={scale}
                                    renderAnnotationLayer={false}
                                    renderTextLayer={false}
                                    className="bg-white"
                                    loading={
                                        <div className="w-[400px] h-[600px] bg-white flex items-center justify-center">
                                            <Loader2 className="animate-spin text-slate-300" />
                                        </div>
                                    }
                                />
                                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs text-slate-400 font-medium bg-white/80 px-2 rounded">
                                    {pageNumber + 1}
                                </div>
                            </div>
                        )}

                        {/* En móvil/tablet verticales solo mostramos una a la vez, el CSS 'hidden lg:block' oculta la segunda */}
                    </Document>
                </div>

                {/* Botones de Navegación Flotantes */}
                {!loading && (
                    <>
                        <button
                            className="absolute left-2 md:left-8 z-20 p-3 bg-white/90 backdrop-blur shadow-lg rounded-full hover:bg-primary hover:text-white transition-all text-slate-700 disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-slate-700 disabled:cursor-not-allowed"
                            onClick={prevPage}
                            disabled={pageNumber <= 1}
                        >
                            <ChevronLeft size={32} />
                        </button>
                        <button
                            className="absolute right-2 md:right-8 z-20 p-3 bg-white/90 backdrop-blur shadow-lg rounded-full hover:bg-primary hover:text-white transition-all text-slate-700 disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-slate-700 disabled:cursor-not-allowed"
                            onClick={nextPage}
                            disabled={pageNumber >= numPages || (pageNumber + 1 >= numPages && window.innerWidth >= 1024)} // Deshabilitar si es última o última pareja
                        >
                            <ChevronRight size={32} />
                        </button>
                    </>
                )}
            </div>
            <p className="text-center text-slate-500 mt-2 text-sm">
                Usa las flechas para navegar • Visualización optimizada para escritorio
            </p>
        </div>
    );
};

export default Catalogo;
