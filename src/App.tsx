import React, { useState, useRef, useEffect } from 'react';
import { Menu, MessageCircle, ArrowRight, ShieldCheck, Zap, TrendingUp, Users, BookOpen, X, Loader2, Download, ExternalLink } from 'lucide-react';

import { motion, AnimatePresence } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const container = useRef<HTMLDivElement>(null);
  const [showCatalog, setShowCatalog] = useState(false);
  const [loadingPdf, setLoadingPdf] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useGSAP(() => {
    // Hero Animations
    const heroTl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.2 } });
    heroTl.from('.hero-logo', { y: -50, opacity: 0, delay: 0.5 })
      .from('.hero-title', { y: 100, opacity: 0, stagger: 0.2 }, '-=0.8')
      .from('.hero-desc', { opacity: 0, y: 30 }, '-=0.6')
      .from('.hero-btn', { scale: 0.8, opacity: 0 }, '-=0.6');

    // Product Cards Reveal Staggered (Más robusto con Batch)
    ScrollTrigger.batch('.product-card', {
      onEnter: (elements) => {
        gsap.to(elements, {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power2.out',
          overwrite: true
        });
      },
      start: 'top 90%'
    });

    // Stats Section & Counters coordinated reveal
    const statsTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.stats-section',
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });

    statsTl.from('.stats-title', { y: 40, opacity: 0, duration: 1, ease: 'power3.out' })
      .from('.stat-card', {
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.6');

    // Animación de los números sincronizada con el scroll
    const statsItems = gsap.utils.toArray<HTMLElement>('.stat-number');
    statsItems.forEach((stat) => {
      const finalValue = parseInt(stat.getAttribute('data-value') || stat.innerText.replace(/[^0-9]/g, ''));
      const suffix = stat.innerText.includes('+') ? '+' : (stat.innerText.includes('%') ? '%' : '');
      const obj = { value: 0 };

      gsap.to(obj, {
        scrollTrigger: {
          trigger: stat,
          start: 'top 92%',
        },
        value: finalValue,
        duration: 2,
        ease: 'power2.out',
        onUpdate: () => {
          stat.innerText = Math.floor(obj.value) + suffix;
        }
      });
    });

    // Refresh ScrollTrigger at the end to ensure all positions are calculated correctly
    ScrollTrigger.refresh();

    // Value Prop Cards
    gsap.from('.value-card', {
      scrollTrigger: {
        trigger: '.value-section',
        start: 'top 75%',
      },
      x: 100,
      opacity: 0,
      stagger: 0.2,
      duration: 1,
      ease: 'power3.out'
    });
  }, { scope: container });

  const openCatalog = () => {
    setLoadingPdf(true);
    setShowCatalog(true);
  };

  const whatsappUrl = `https://wa.me/5219987167780?text=${encodeURIComponent("Hola, vengo del sitio de Comercel, me pongo en contacto en este medio.")}`;


  const products = [
    {
      name: 'Ajo',
      image: '/products/ajo.png',
      color: 'bg-[#F1E9DB]'
    },
    {
      name: 'Chiles Secos',
      image: '/products/chiles-secos.png',
      color: 'bg-[#F9FAFB]'
    },
    {
      name: 'Legumbres',
      image: '/products/legumbres.png',
      color: 'bg-[#FDFCFB]'
    },
    {
      name: 'Especias',
      image: '/products/especias.png',
      color: 'bg-[#FFF9F5]'
    },
  ];

  const clients = ['Restaurante El Faro', 'Hotel Maya', 'Gourmet MX', 'Sabor Sureño', 'La Casona'];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <div ref={container} className="min-h-screen flex flex-col bg-white overflow-x-hidden">
      {/* Hero Section with Video Background */}
      <section className="relative h-screen w-full overflow-hidden flex flex-col">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="https://files.catbox.moe/12ar3u.mp4" type="video/mp4" />
          </video>
          {/* Overlays for Contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />
        </div>

        {/* Header (Inside Hero) */}
        <header className="relative z-20 w-full">
          <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
            <div className="h-12 hero-logo">
              <img src="/logo.png" alt="Comercel Logo" className="h-full w-auto object-contain" />
            </div>
          </div>
        </header>

        {/* Hero Content */}
        <div className="relative z-10 flex-grow flex flex-col justify-end px-6 pb-24">
          <div className="max-w-7xl mx-auto w-full">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="max-w-3xl"
            >
              <h1 className="text-[48px] md:text-[80px] font-black leading-[1.1] mb-6 text-white hero-title">
                Detrás de un <br />
                buen negocio, <br />
                <span className="text-comercel-green">hay compras <br />bien hechas</span>
              </h1>

              <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-10 max-w-xl font-medium hero-desc">
                En Comercel te ayudamos a surtir tu negocio con buen servicio, precios competitivos y seguimiento real.
              </p>

              <div className="flex justify-center md:justify-start hero-btn">
                <button
                  onClick={openCatalog}
                  className="group px-10 py-4 bg-black/70 backdrop-blur-md border border-white/10 text-white font-bold rounded-full hover:bg-comercel-green transition-all flex items-center justify-center gap-3"
                >
                  <BookOpen className="w-6 h-6" />
                  Ver catálogo
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <main className="flex-grow">
        {/* Social Proof / Logos */}
        <section className="py-16 bg-comercel-gray border-y border-comercel-dark/5 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-center text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-10">Confían en nosotros</p>
            <div className="flex justify-around items-center gap-12 opacity-40 grayscale">
              {clients.map(client => (
                <span key={client} className="text-xl font-bold whitespace-nowrap">{client}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Products Bento Grid */}
        <section className="px-6 py-24 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-xs font-bold text-comercel-green uppercase tracking-[0.3em] mb-4">Nuestro Inventario</h2>
              <h3 className="text-4xl md:text-5xl font-extrabold text-comercel-dark">Productos especializados</h3>
            </div>
            <button className="text-comercel-dark font-bold flex items-center gap-2 hover:text-comercel-green transition-colors">
              Ver todos los productos <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          <div className="product-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <div
                key={product.name}
                className={`product-card opacity-0 group relative overflow-hidden rounded-[40px] ${product.color} aspect-[4/5] flex flex-col items-center justify-between p-10 cursor-pointer hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-comercel-dark/5`}
              >
                <div className="w-full aspect-square flex items-center justify-center mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-w-[90%] max-h-[90%] object-contain drop-shadow-xl group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <div className="text-center w-full">
                  <h4 className="text-2xl md:text-3xl font-black text-comercel-dark mb-2 tracking-tighter">
                    {product.name}
                  </h4>
                  <p className="text-xs font-bold text-comercel-green uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Ver más
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Value Prop Section - Restored to Green with Slider */}
        <section className="value-section bg-comercel-green text-white px-6 py-24 relative overflow-hidden">
          <div className="max-w-7xl mx-auto relative z-10">
            <div>
              <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-8 text-white">
                Por qué comprar con Comercel <br />
                cambia tu operación
              </h2>
              <p className="text-xl opacity-90 mb-12 max-w-2xl leading-relaxed">
                Comprar bien no solo es conseguir producto. Es hacerlo con menos riesgo, más control y mejor continuidad para tu negocio.
              </p>


              <div className="flex gap-6 overflow-x-auto pb-8 snap-x no-scrollbar -mx-6 px-6">
                <div className="value-card min-w-[320px] md:min-w-[450px] p-10 border border-white/20 rounded-[40px] snap-center bg-white/10 backdrop-blur-md">
                  <h3 className="text-3xl font-bold mb-6">Compra sin poner tu capital</h3>
                  <p className="text-lg opacity-80 leading-relaxed">
                    Evita cargar tu operación con compras inciertas. Con Comercel accedes a producto con más agilidad y sin depender de una importación no asegurada en tiempo y forma.
                  </p>
                </div>
                <div className="value-card min-w-[320px] md:min-w-[450px] p-10 border border-white/20 rounded-[40px] snap-center bg-white/10 backdrop-blur-md">
                  <h3 className="text-3xl font-bold mb-6">Visibilidad en cada paso</h3>
                  <p className="text-lg opacity-80 leading-relaxed">
                    Precios claros y entregas programadas. Sabes exactamente qué compras, cuándo llega y cuánto pagas, sin sorpresas ni costos ocultos.
                  </p>
                </div>
                <div className="value-card min-w-[320px] md:min-w-[450px] p-10 border border-white/20 rounded-[40px] snap-center bg-white/10 backdrop-blur-md">
                  <h3 className="text-3xl font-bold mb-6">Continuidad asegurada</h3>
                  <p className="text-lg opacity-80 leading-relaxed">
                    Mantenemos un stock constante para que tu cocina nunca se detenga. Somos tu aliado estratégico en el suministro diario.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="stats-section px-6 py-32 max-w-7xl mx-auto text-center">
          <div>
            <h2 className="stats-title text-5xl md:text-6xl font-extrabold mb-16 leading-tight text-comercel-dark">
              Respaldo que <br />
              fortalece tu operación
            </h2>

            <div className="grid md:grid-cols-3 gap-8 mb-20">
              <div className="stat-card p-12 bg-comercel-gray rounded-[40px] border border-comercel-dark/5 shadow-sm">
                <p className="text-6xl font-extrabold text-comercel-green mb-4 stat-number" data-value="300">+300</p>
                <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">Negocios abastecidos</p>
              </div>
              <div className="stat-card p-12 bg-comercel-green text-white rounded-[40px] shadow-2xl shadow-comercel-green/20">
                <p className="text-6xl font-extrabold text-white mb-4 stat-number" data-value="12">+12</p>
                <p className="opacity-80 font-bold uppercase tracking-widest text-sm">Años de experiencia</p>
              </div>
              <div className="stat-card p-12 bg-comercel-gray rounded-[40px] border border-comercel-dark/5 shadow-sm">
                <p className="text-6xl font-extrabold text-comercel-green mb-4 stat-number" data-value="100">100%</p>
                <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">Calidad Certificada</p>
              </div>
            </div>

            <div className="stats-img-container rounded-[60px] overflow-hidden shadow-2xl max-w-5xl mx-auto">
              <img
                src="/operacion.jpeg"
                alt="Operación logistica de Comercel"
                className="w-full h-auto"
              />
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="px-6 py-32 bg-comercel-gray/50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-12 leading-tight text-comercel-dark">
              Da el siguiente paso <br />
              <span className="text-comercel-green">para abastecerte mejor</span>
            </h2>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={openCatalog}
                className="px-12 py-5 bg-comercel-dark text-white font-bold rounded-2xl hover:bg-black transition-all shadow-xl shadow-comercel-dark/10"
              >
                Ver catálogo completo
              </button>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-12 py-5 bg-comercel-green text-white font-bold rounded-2xl flex items-center justify-center gap-3 hover:bg-green-600 transition-all shadow-xl shadow-comercel-green/20"
              >
                <MessageCircle className="w-6 h-6" />
                Hablar con un experto
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-comercel-dark text-white py-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-2">
            <div className="h-10 mb-6 underline-offset-0">
              <img src="/logo.png" alt="Comercel Logo" className="h-full w-auto object-contain opacity-90" />
            </div>
            <p className="text-lg opacity-50 max-w-sm leading-relaxed">
              La comercializadora líder del sureste de México, comprometida con la excelencia en el abasto alimenticio.
            </p>
          </div>
          <div>
            <h5 className="font-bold mb-6 uppercase tracking-widest text-sm">Navegación</h5>
            <ul className="grid gap-4 opacity-60">
              <li><a href="#" className="hover:text-comercel-green transition-colors">Catálogo</a></li>
              <li><a href="#" className="hover:text-comercel-green transition-colors">Nosotros</a></li>
              <li><a href="#" className="hover:text-comercel-green transition-colors">Servicios</a></li>
              <li><a href="#" className="hover:text-comercel-green transition-colors">Contacto</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-6 uppercase tracking-widest text-sm">Legal</h5>
            <ul className="grid gap-4 opacity-60">
              <li><a href="#" className="hover:text-comercel-green transition-colors">Privacidad</a></li>
              <li><a href="#" className="hover:text-comercel-green transition-colors">Términos</a></li>
              <li><a href="#" className="hover:text-comercel-green transition-colors">Cookies</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm opacity-40">© 2026 Comercel. Todos los derechos reservados.</p>
          <a href="https://neopoint.mx" target="_blank" rel="noopener noreferrer" className="text-sm opacity-40 hover:opacity-100 transition-opacity">
            Powered by Neopoint
          </a>
        </div>
      </footer>
      {/* Catalog Modal */}
      <AnimatePresence>
        {showCatalog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCatalog(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-5xl h-[85vh] bg-white rounded-[40px] overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Modal Header */}
              <div className="absolute top-6 right-6 z-30 flex gap-3">
                <a
                  href="/catalogo.pdf"
                  download
                  className="p-3 bg-white/90 hover:bg-comercel-green hover:text-white text-comercel-dark rounded-full transition-all shadow-lg backdrop-blur-md flex items-center justify-center"
                  title="Descargar catálogo"
                >
                  <Download className="w-6 h-6" />
                </a>
                <button
                  onClick={() => setShowCatalog(false)}
                  className="p-3 bg-black/50 hover:bg-red-500 text-white rounded-full transition-colors backdrop-blur-md"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Mobile Friendly View */}
              {isMobile ? (
                <div className="flex-grow flex flex-col items-center justify-center p-8 bg-comercel-gray/30">
                  <div className="w-48 h-64 bg-white shadow-2xl rounded-2xl mb-8 flex items-center justify-center border border-comercel-dark/10 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-comercel-green/20 to-transparent" />
                    <BookOpen className="w-16 h-16 text-comercel-green relative z-10" />
                  </div>
                  <h3 className="text-2xl font-black text-comercel-dark mb-4 text-center">Catálogo Comercial 2026</h3>
                  <p className="text-comercel-dark/60 text-center mb-10 max-w-xs">
                    Para una mejor experiencia en dispositivos móviles, abre el catálogo en pantalla completa.
                  </p>
                  <div className="flex flex-col gap-4 w-full max-w-xs">
                    <a
                      href="/catalogo.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-5 bg-comercel-green text-white font-bold rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-comercel-green/20 hover:scale-[1.02] transition-transform active:scale-95"
                    >
                      <ExternalLink className="w-6 h-6" />
                      Ver Catálogo Completo
                    </a>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-4 bg-white border border-comercel-green text-comercel-green font-bold rounded-2xl flex items-center justify-center gap-3 hover:bg-comercel-green/5 transition-colors"
                    >
                      <MessageCircle className="w-5 h-5" />
                      Preguntar por WhatsApp
                    </a>
                    <button
                      onClick={() => setShowCatalog(false)}
                      className="w-full py-2 text-comercel-dark/50 font-bold hover:text-comercel-dark transition-colors text-sm"
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {/* Loading State */}
                  {loadingPdf && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-20">
                      <Loader2 className="w-12 h-12 text-comercel-green animate-spin mb-4" />
                      <p className="text-comercel-dark font-bold animate-pulse text-lg tracking-tight">Cargando catálogo...</p>
                    </div>
                  )}

                  {/* PDF Viewer */}
                  <iframe
                    src="/catalogo.pdf#view=FitH"
                    className="w-full h-full border-none relative z-10"
                    onLoad={() => {
                      setTimeout(() => setLoadingPdf(false), 500);
                    }}
                    title="Catálogo Comercel"
                  />
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp Floating Button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, duration: 0.5, type: 'spring' }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 z-[90] w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl shadow-[#25D366]/40 hover:bg-[#20ba5a] transition-colors group"
      >
        <div className="absolute right-full mr-4 bg-white text-comercel-dark px-4 py-2 rounded-xl text-sm font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          ¿En qué podemos ayudarte?
        </div>
        <MessageCircle className="w-8 h-8 fill-current" />
      </motion.a>
    </div>
  );
}
