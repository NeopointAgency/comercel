import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ShieldCheck, Truck, Clock, ChefHat } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AjoMayoreoCancun() {
  const whatsappUrl = `https://wa.me/5219987167780?text=${encodeURIComponent("Hola, me interesa comprar ajo por mayoreo en Cancún para mi negocio.")}`;

  useEffect(() => {
    document.title = "Ajo por Mayoreo en Cancún | Comercel Distribuidora";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Proveedores de ajo fresco y pelado por mayoreo en Cancún. Surtimos a hoteles y restaurantes con la mejor calidad, precio competitivo y entrega garantizada.');
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-comercel-dark/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="h-10 hover:opacity-80 transition-opacity">
            <img src="/logo.png" alt="Comercel Logo" className="h-full w-auto object-contain" />
          </Link>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 bg-comercel-green text-white font-bold rounded-full text-sm hover:bg-green-600 transition-colors shadow-lg shadow-comercel-green/20 flex items-center gap-2"
          >
            Cotizar Ajo
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </header>

      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="relative pt-20 pb-32 overflow-hidden bg-comercel-gray">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-l from-comercel-green to-transparent" />
          </div>
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-2xl"
              >
                <motion.div variants={itemVariants} className="inline-block px-4 py-1.5 bg-comercel-green/10 text-comercel-green font-bold text-sm uppercase tracking-widest rounded-full mb-6">
                  Proveedores en Quintana Roo
                </motion.div>
                <motion.h1 variants={itemVariants} className="text-[40px] md:text-[64px] font-black leading-[1.1] mb-6 text-comercel-dark">
                  Ajo Fresco por <br />
                  <span className="text-comercel-green">Mayoreo en Cancún</span>
                </motion.h1>
                <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-600 leading-relaxed mb-10 max-w-xl">
                  Surtimos el mejor ajo fresco, pelado y en diferentes presentaciones para hoteles, restaurantes y comedores industriales en Cancún y la Riviera Maya. Calidad premium asegurada para tu cocina.
                </motion.p>
                <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 bg-comercel-dark text-white font-bold rounded-full hover:bg-black transition-all flex items-center justify-center gap-3 shadow-xl"
                  >
                    Solicitar Precios y Disponibilidad
                  </a>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="aspect-square bg-[#F1E9DB] rounded-[40px] p-12 relative flex items-center justify-center overflow-hidden border border-black/5 shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/5 to-transparent" />
                  <img 
                    src="/products/ajo.png" 
                    alt="Ajo por mayoreo Cancún" 
                    className="w-full max-w-md object-contain drop-shadow-2xl relative z-10 hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Value Proposition */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-comercel-dark mb-6">¿Por qué elegir nuestro ajo?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">Entendemos las necesidades de la industria gastronómica en Cancún. Nuestro producto está pensado para facilitar tu operación.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-10 rounded-[40px] bg-comercel-gray border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                  <ChefHat className="w-8 h-8 text-comercel-green" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-comercel-dark">Ajo Pelado Listo para Usar</h3>
                <p className="text-gray-600 leading-relaxed">
                  Ahorra horas de preparación en cocina. Nuestro ajo viene perfectamente pelado y empacado, manteniendo su frescura y sabor intactos.
                </p>
              </div>

              <div className="p-10 rounded-[40px] bg-comercel-gray border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                  <Truck className="w-8 h-8 text-comercel-green" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-comercel-dark">Logística en Cancún</h3>
                <p className="text-gray-600 leading-relaxed">
                  Entregas puntuales en la zona hotelera, centro de Cancún y Riviera Maya. Sabemos que en tu cocina el tiempo es crítico.
                </p>
              </div>

              <div className="p-10 rounded-[40px] bg-comercel-gray border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                  <ShieldCheck className="w-8 h-8 text-comercel-green" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-comercel-dark">Calidad Constante</h3>
                <p className="text-gray-600 leading-relaxed">
                  Dientes de ajo seleccionados. Garantizamos el mismo calibre y calidad en cada entrega para que tus recetas no varíen.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 bg-comercel-green text-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-6xl font-black mb-8">Abastece tu negocio hoy</h2>
            <p className="text-xl mb-12 opacity-90 font-medium">Cotiza volumen y frecuencia de entrega. Tenemos los mejores precios de mayoreo en la península.</p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex px-12 py-5 bg-white text-comercel-green font-bold rounded-full text-lg hover:bg-gray-100 transition-all shadow-2xl items-center gap-3"
            >
              <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-6 h-6" />
              Contactar por WhatsApp
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-comercel-dark text-white py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <Link to="/" className="h-8 opacity-80 hover:opacity-100 transition-opacity">
            <img src="/logo.png" alt="Comercel Logo" className="h-full w-auto object-contain" />
          </Link>
          <p className="text-sm opacity-50 text-center md:text-left">
            © {new Date().getFullYear()} Comercel. Especialistas en distribución de ajo por mayoreo en Cancún.
          </p>
          <a href="https://neopoint.mx" target="_blank" rel="noopener noreferrer" className="text-sm opacity-50 hover:opacity-100 transition-opacity">
            Powered by Neopoint
          </a>
        </div>
      </footer>
    </div>
  );
}
