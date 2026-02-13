import { Suspense, lazy } from 'react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import HeroSection from '../components/home/HeroSection'
import useSEO from '../hooks/useSEO'

/* Lazy-load below-the-fold sections for faster initial paint */
const NewArrivals = lazy(() => import('../components/home/NewArrivals'))
const Engineering = lazy(() => import('../components/home/Engineering'))

export default function HomePage() {
    useSEO(null, 'Rennsport — Moda premium inspirada en F1, desde Venezuela. Ingeniería para la velocidad, diseñada con estilo.')
    return (
        <div className="relative flex flex-col min-h-screen w-full z-10">
            {/* Background Noise Overlay — reduced opacity for performance */}
            <div className="fixed inset-0 pointer-events-none z-40 bg-noise opacity-20 mix-blend-overlay"></div>
            {/* Background Mesh Gradient */}
            <div className="fixed inset-0 pointer-events-none bg-mesh z-0"></div>

            <Navbar />
            <HeroSection />

            {/* Below-the-fold content — lazy loaded */}
            <Suspense fallback={<div className="min-h-[50vh]" />}>
                <NewArrivals />
            </Suspense>
            <Suspense fallback={<div className="min-h-[50vh]" />}>
                <Engineering />
            </Suspense>

            <Footer />
        </div>
    )
}
