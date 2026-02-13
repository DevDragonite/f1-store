import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function HeroSection() {
    const videoRef = useRef(null)
    const [videoReady, setVideoReady] = useState(false)
    const [fading, setFading] = useState(false)

    useEffect(() => {
        const video = videoRef.current
        if (!video) return

        const handleCanPlay = () => setVideoReady(true)
        const handleTimeUpdate = () => {
            if (!video.duration) return
            const timeLeft = video.duration - video.currentTime
            if (timeLeft <= 1 && !fading) {
                setFading(true)
            }
        }
        const handleSeeked = () => {
            setTimeout(() => setFading(false), 50)
        }

        video.addEventListener('canplay', handleCanPlay)
        video.addEventListener('timeupdate', handleTimeUpdate)
        video.addEventListener('seeked', handleSeeked)

        return () => {
            video.removeEventListener('canplay', handleCanPlay)
            video.removeEventListener('timeupdate', handleTimeUpdate)
            video.removeEventListener('seeked', handleSeeked)
        }
    }, [fading])

    return (
        <header className="relative pt-20 min-h-screen w-full flex flex-col md:flex-row overflow-hidden">
            {/* Text Content Side */}
            <div className="w-full md:w-[45%] flex flex-col justify-center px-6 md:px-16 py-20 relative z-20">
                <div className="absolute top-40 left-10 text-[10px] text-primary/60 font-[family-name:var(--font-mono)] tracking-[0.3em] uppercase rotate-90 origin-left hidden md:block">
                    Telemetría /// En Vivo
                </div>

                <h2 className="text-primary font-[family-name:var(--font-mono)] text-xs mb-4 tracking-[0.2em] uppercase flex items-center gap-2">
                    <span className="w-8 h-[1px] bg-primary"></span>
                    Colección 2024
                </h2>

                <h1 className="font-[family-name:var(--font-serif)] text-5xl md:text-7xl lg:text-8xl font-medium leading-[0.9] mb-8 kinetic-text text-white">
                    Velocidad <br />
                    <span className="italic text-white/50">en Cada</span> <br />
                    Puntada.
                </h1>

                <p className="text-white/70 max-w-md text-sm md:text-base mb-10 font-light leading-relaxed border-l border-white/20 pl-6">
                    Ingeniería para la pista rápida. La nueva Colección Paddock fusiona la durabilidad del Nomex con la sastrería italiana. Siente la fuerza G.
                </p>

                <div className="flex flex-wrap gap-4">
                    <button className="group relative px-8 py-4 bg-primary text-white font-bold text-sm uppercase tracking-widest overflow-hidden">
                        <span className="relative z-10 flex items-center gap-2">
                            Explorar Colección
                            <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                        </span>
                        <div className="absolute inset-0 bg-white translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 z-0 opacity-10"></div>
                    </button>
                    <button className="px-8 py-4 border border-white/20 hover:border-white text-white font-medium text-sm uppercase tracking-widest transition-colors">
                        Ver Lookbook
                    </button>
                </div>
            </div>

            {/* Video Side */}
            <div className="w-full md:w-[65%] absolute top-0 right-0 h-full md:relative md:h-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-background-dark via-background-dark/80 to-transparent z-10 md:via-background-dark/20"></div>

                <motion.div
                    className="w-full h-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: videoReady ? (fading ? 0 : 1) : 0 }}
                    transition={{ duration: fading ? 1 : 2, ease: 'easeInOut' }}
                >
                    <video
                        ref={videoRef}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        className="w-full h-full object-cover opacity-60 md:opacity-100"
                    >
                        <source src="/Video_Loop_Piloto_F_.mp4" type="video/mp4" />
                    </video>
                </motion.div>

                {/* Telemetry Decor */}
                <div className="absolute bottom-10 right-10 z-20 flex flex-col gap-2 font-[family-name:var(--font-mono)] text-[10px] text-white/40 text-right">
                    <p>TEMP. AIRE: 32°C</p>
                    <p>TEMP. PISTA: 45°C</p>
                    <p>HUMEDAD: 62%</p>
                    <div className="w-20 h-[1px] bg-white/20 ml-auto mt-2"></div>
                </div>
            </div>
        </header>
    )
}
