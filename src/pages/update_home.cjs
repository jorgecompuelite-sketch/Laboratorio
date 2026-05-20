const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'Home.jsx');
let content = fs.readFileSync(filePath, 'utf8');

if (!content.includes("import videoBg from '../../video.mp4';")) {
    content = content.replace("import { motion } from 'framer-motion';", "import { motion } from 'framer-motion';\nimport videoBg from '../../video.mp4';");
}

const videoSection = `
            {/* Video Section */}
            <section className="py-32 bg-transparent relative overflow-hidden">
                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-12"
                    >
                        <h2 className="text-sm uppercase tracking-[0.2em] font-medium text-[#10B981] mb-4">Descubre</h2>
                        <h3 className="text-3xl md:text-5xl font-light text-white tracking-tight" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                            Nuestra Tecnología
                        </h3>
                    </motion.div>
                    
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative mx-auto max-w-5xl rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10"
                        style={{ aspectRatio: '16/9' }}
                    >
                        <video 
                            src={videoBg}
                            autoPlay 
                            loop 
                            muted 
                            playsInline
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                </div>
            </section>
`;

if (!content.includes("{/* Video Section */}")) {
    content = content.replace("<Hero />", "<Hero />\n" + videoSection);
}

content = content.replace(/py-24/g, "py-32");

fs.writeFileSync(filePath, content, 'utf8');
console.log("Updated Home.jsx");
