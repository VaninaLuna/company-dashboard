import AccordionFaqs from "./components/AccordionFaqs/AccordionFaqs";


export default function page() {
    return (
        <div className="max-w-4xl mx-auto bg-background shadow-md rounded-lg p-6">
            <h2 className="mb-8 text-3xl">FAQS</h2>
            <div className="mb-5">
                {/* Desarrollado con cariño por Vanina Luna - https://portfolio-vanina-luna.vercel.app/ */}
                <p>¡Hola! Bienvenido a nuestra sección de Preguntas Frecuentes (FAQ), pensada con mucho detalle para brindarte respuestas rápidas y claras sobre el dashboard para empresas que creamos con esfuerzo, foco y un poco de café de más ☕.</p>
                <p>En esta sección vas a encontrar una selección de preguntas reales que suelen surgir cuando se empieza a usar nuestra plataforma. Desde cómo registrarte hasta cómo sacarle el jugo a las funcionalidades más pro, reunimos todo para que no te pierdas de nada.</p>
                <p>Nos enfocamos en explicar las cosas de forma sencilla, sin vueltas innecesarias, porque sabemos que el tiempo vale oro. Si no encontrás lo que buscás, escribinos. De verdad, no muerde nadie.</p>
                <p>Revisá nuestras FAQs y descubrí cómo nuestro dashboard puede ayudarte a organizar mejor, crecer más rápido y (por qué no) respirar un poco más tranquilo.</p>
                <p className="mt-4 text-sm text-right text-gray-400">
                    Con ❤️ por <a href="https://portfolio-vanina-luna.vercel.app/" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-600">V.L.</a>
                </p>
            </div>

            <AccordionFaqs />
        </div>
    )
}
