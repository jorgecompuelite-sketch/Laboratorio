import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';

const TestimonialCarousel = () => {
    // We start with an empty array. It will be hydrated from Firebase.
    const [testimonials, setTestimonials] = useState([]);
    
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-advance
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => 
                prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
            );
        }, 6000); // Cambia cada 6 segundos

        return () => clearInterval(timer);
    }, [testimonials.length]);

    // Fetch from Firebase (Listen to live updates)
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "testimonials"), (snapshot) => {
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setTestimonials(data);
        }, (error) => {
             console.error("Error fetching testimonials:", error);
        });

        return () => unsubscribe();
    }, []);

    if (testimonials.length === 0) return null;

    return (
        <section className="py-20 bg-transparent relative overflow-hidden" id="testimonios">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="relative h-[280px] md:h-[220px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="absolute inset-0 flex flex-col md:flex-row items-center md:items-start gap-8"
                        >
                            {/* Icon Placeholder (Tooth Icon style from image) */}
                            <div className="flex-shrink-0 w-24 h-24 rounded-full bg-[#E5F6FA] flex items-center justify-center">
                                <svg 
                                    className="w-12 h-12 text-[#2AB2D6]" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24" 
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        strokeWidth="1.5" 
                                        d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" 
                                    />
                                    {/* Simplistic tooth shape for demo purposes */}
                                    <path 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        strokeWidth="1.5" 
                                        d="M8 12c.5 3 1.5 4 4 4s3.5-1 4-4" 
                                    />
                                </svg>
                            </div>

                            {/* Content */}
                            <div className="flex-1 text-center md:text-left">
                                <h3 className="text-2xl font-medium text-[#2AB2D6] mb-1">
                                    {testimonials[currentIndex].name}
                                </h3>
                                <p className="text-white text-sm mb-4">
                                    {testimonials[currentIndex].role}
                                </p>
                                <p className="text-white leading-relaxed font-light text-base md:text-lg">
                                    "{testimonials[currentIndex].text}"
                                </p>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Indicators */}
                <div className="flex justify-center mt-8 gap-2">
                    {testimonials.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={`w-2.5 h-2.5 rounded-full transition-colors ${
                                currentIndex === idx ? 'bg-[#2AB2D6]' : 'bg-gray-300'
                            }`}
                            aria-label={`Go to testimonial ${idx + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialCarousel;
