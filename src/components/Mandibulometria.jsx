import React from 'react';

const Mandibulometria = () => {
  return (
    <section className="w-full flex justify-center items-center overflow-hidden bg-[#0A0A0A]">
        <img 
            src="/piezas-finales.jpg" 
            alt="Piezas Lab Finales" 
            className="w-full h-auto object-cover max-w-[1920px]"
            onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
            }}
        />
        {/* Fallback en caso de que borren la imagen por error */}
        <div className="hidden w-full py-40 flex-col items-center justify-center border-2 border-dashed border-gray-700 bg-gray-900 text-center">
            <p className="text-white text-lg mb-2">Espacio para la imagen de Piezas Lab Finales</p>
            <p className="text-white text-sm">Asegúrate de que la foto se llame <strong className="text-white">piezas-finales.jpg</strong> y esté en la carpeta <strong className="text-white">public/</strong></p>
        </div>
    </section>
  );
};

export default Mandibulometria;
