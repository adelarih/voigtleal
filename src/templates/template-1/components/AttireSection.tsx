import React from 'react';

const AttireSection: React.FC = () => {
    return (
        <section id="traje" className="py-24 md:py-32 bg-wedding-darkGreen text-wedding-cream relative overflow-hidden">
            {/* Background Decoration - Subtle Glows */}
            <div className="absolute top-1/4 left-0 w-96 h-96 bg-wedding-sage/10 rounded-full -translate-x-1/2 blur-[100px] opacity-40"></div>
            <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-wedding-green/10 rounded-full translate-x-1/3 blur-[120px] opacity-30"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')] opacity-[0.2] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16 md:mb-20">
                    <span className="text-wedding-sage text-sm font-sans font-bold uppercase tracking-[0.4em] mb-4 block animate-fade-in">
                        Dress Code
                    </span>
                    <h2 className="font-serif text-5xl md:text-7xl text-white mb-6">
                        Traje Sugerido
                    </h2>
                    <div className="max-w-2xl mx-auto">
                        <h3 className="font-serif text-2xl text-wedding-sage mb-4 italic">Social Completo / Passeio Completo</h3>
                        <p className="font-sans text-wedding-cream/70 text-lg leading-relaxed font-light">
                            Para este dia tão especial, sugerimos que nossos convidados vistam-se com elegância e conforto para celebrar conosco.
                        </p>
                    </div>
                </div>

                {/* Main Content Layout */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-16">

                    {/* Para Elas - Left on Desktop, Top on Mobile */}
                    <div className="w-full md:w-1/4 text-center md:text-right order-1">
                        <div className="space-y-4">
                            <h4 className="font-serif text-3xl text-white">Para Elas</h4>
                            <div className="h-0.5 w-12 bg-wedding-sage/50 mx-auto md:ml-auto md:mr-0"></div>
                            <p className="text-wedding-cream/60 font-light text-lg leading-relaxed">
                                Vestidos longos ou midi são perfeitos para o cenário à beira do Guaíba.
                            </p>
                        </div>
                    </div>

                    {/* Image - Center on Desktop, Bottom on Mobile */}
                    <div className="w-full md:w-2/4 flex justify-center order-3 md:order-2 px-4 md:px-0">
                        <div className="relative group w-full max-w-2xl">
                            {/* Decorative border that scales on hover */}
                            <div className="absolute -inset-4 border border-wedding-sage/30 rounded-[2.5rem] transform transition-transform duration-700 group-hover:scale-105 pointer-events-none"></div>

                            {/* Main Image Container */}
                            <div className="relative z-10 overflow-hidden rounded-[2.5rem] shadow-2xl">
                                <img
                                    src="/assets/traje-2x1-cb.png"
                                    alt="Sugestão de Traje"
                                    className="w-full h-auto block"
                                />
                                {/* Subtle overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                            </div>
                        </div>
                    </div>

                    {/* Para Eles - Right on Desktop, Middle on Mobile */}
                    <div className="w-full md:w-1/4 text-center md:text-left order-2 md:order-3">
                        <div className="space-y-4">
                            <h4 className="font-serif text-3xl text-white">Para Eles</h4>
                            <div className="h-0.5 w-12 bg-wedding-sage/50 mx-auto md:mr-auto md:ml-0"></div>
                            <p className="text-wedding-cream/60 font-light text-lg leading-relaxed">
                                Terno completo é o ideal. Gravata é opcional, mas bem-vinda para o tom solene do momento.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default AttireSection;
