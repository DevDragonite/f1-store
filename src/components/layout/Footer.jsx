export default function Footer() {
    return (
        <footer className="bg-carbon border-t border-white/5 pt-20 pb-10 px-6 relative">
            <div className="max-w-[1400px] mx-auto">
                {/* Top Section */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 mb-20">
                    {/* Brand */}
                    <div>
                        <h2 className="font-[family-name:var(--font-serif)] text-6xl md:text-8xl text-white/10 hover:text-white/30 transition-colors cursor-default select-none">
                            Renn <br /> sport
                        </h2>
                    </div>

                    {/* Newsletter + Links */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Newsletter */}
                        <div>
                            <h3 className="text-sm uppercase tracking-widest font-bold mb-4">Boletín</h3>
                            <p className="text-white/40 text-sm mb-6 leading-relaxed">
                                Sé el primero en conocer nuevos lanzamientos y accesos exclusivos al paddock.
                            </p>
                            <div className="flex">
                                <input
                                    type="email"
                                    placeholder="tu@correo.com"
                                    className="flex-1 bg-asphalt border border-white/10 px-4 py-3 text-sm placeholder:text-white/20 focus:outline-none focus:border-primary transition-colors"
                                />
                                <button className="bg-primary px-6 py-3 text-sm font-bold uppercase tracking-widest hover:bg-red-600 transition-colors">
                                    Unirse
                                </button>
                            </div>
                        </div>

                        {/* Links */}
                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <h4 className="text-xs text-white/30 uppercase tracking-widest mb-4">Tienda</h4>
                                <ul className="space-y-3 text-sm text-white/50">
                                    <li><a href="/catalog" className="hover:text-primary transition-colors">Nuevos Lanzamientos</a></li>
                                    <li><a href="/catalog" className="hover:text-primary transition-colors">Colecciones</a></li>
                                    <li><a href="/catalog" className="hover:text-primary transition-colors">Accesorios</a></li>
                                    <li><a href="/catalog" className="hover:text-primary transition-colors">Ofertas</a></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-xs text-white/30 uppercase tracking-widest mb-4">Soporte</h4>
                                <ul className="space-y-3 text-sm text-white/50">
                                    <li><a href="/the-pit" className="hover:text-primary transition-colors">Preguntas Frecuentes</a></li>
                                    <li><a href="/the-pit" className="hover:text-primary transition-colors">Envíos</a></li>
                                    <li><a href="/the-pit" className="hover:text-primary transition-colors">Devoluciones</a></li>
                                    <li><a href="/the-pit" className="hover:text-primary transition-colors">Contacto</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-white/20 font-[family-name:var(--font-mono)] uppercase tracking-widest">
                    <p>© 2024 Rennsport Engineering. Todos los derechos reservados.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white/50 transition-colors">Privacidad</a>
                        <a href="#" className="hover:text-white/50 transition-colors">Términos</a>
                        <a href="#" className="hover:text-white/50 transition-colors">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
