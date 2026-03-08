import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
    // Check if device is mobile to use 'api.whatsapp.com' or 'web.whatsapp.com'
    // but 'wa.me' is generally the safest universal link.
    const phoneNumber = "573142697803";
    const whatsappUrl = `https://wa.me/${phoneNumber}`;

    return (
        <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center group"
            title="Chat con WhatsApp"
        >
            <MessageCircle size={32} fill="white" className="text-white" />
            <motion.span
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5, duration: 0.5 }}
                className="absolute right-full mr-3 bg-[#020B1D]/90 backdrop-blur-md text-[#E0E0E0] px-4 py-2 rounded-xl text-sm font-semibold shadow-2xl whitespace-nowrap pointer-events-none border border-white/10 after:content-[''] after:absolute after:top-1/2 after:-right-2 after:-translate-y-1/2 after:border-8 after:border-transparent after:border-l-[#020B1D]/90"
            >
                ¿En qué te puedo ayudar?
            </motion.span>

        </motion.a>
    );
};

export default WhatsAppButton;
