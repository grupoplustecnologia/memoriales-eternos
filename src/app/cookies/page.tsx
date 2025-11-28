'use client';

import { Card, CardContent } from '@/components/ui/card';

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-nature-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-nature-600 to-sky-600 text-white py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Política de Cookies</h1>
          <p className="text-white/90">Última actualización: 17 de noviembre de 2025</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 md:py-20 max-w-4xl">
        <Card className="border-2 border-nature-200">
          <CardContent className="pt-8 prose prose-invert max-w-none">
            <div className="space-y-8 text-nature-700">
              <section>
                <h2 className="text-2xl font-bold text-nature-800 mb-4">1. ¿Qué son las Cookies?</h2>
                <p className="leading-relaxed">
                  Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas un sitio web. Pueden ser usadas para recordar información sobre tu visita, como preferencias y configuraciones de sesión.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-nature-800 mb-4">2. Tipos de Cookies que Utilizamos</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-nature-800 mb-2">2.1 Cookies Esenciales</h3>
                    <p className="text-nature-700">
                      Necesarias para el funcionamiento básico del Servicio. Por ejemplo, autenticación de usuarios y seguridad. No pueden desactivarse.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-nature-800 mb-2">2.2 Cookies de Análisis</h3>
                    <p className="text-nature-700">
                      Nos ayudan a entender cómo los usuarios interactúan con el Servicio. Utilizamos Google Analytics para recopilar datos anónimos.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-nature-800 mb-2">2.3 Cookies de Funcionalidad</h3>
                    <p className="text-nature-700">
                      Recuerdan tus preferencias y personalizan tu experiencia (idioma, tema oscuro, etc.).
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-nature-800 mb-2">2.4 Cookies de Marketing</h3>
                    <p className="text-nature-700">
                      Se utilizan para mostrar contenido y anuncios relevantes. Puedes optar por no participar.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-nature-800 mb-4">3. Rastreo de Terceros</h2>
                <p className="leading-relaxed">
                  Permitimos que terceros confiables (como Google) coloquen cookies en tu dispositivo para análisis y publicidad. Estos terceros están sujetos a sus propias políticas de privacidad.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-nature-800 mb-4">4. Cómo Controlar las Cookies</h2>
                <div className="space-y-3">
                  <p><strong>4.1 Configuración del Navegador:</strong> Puedes controlar las cookies a través de la configuración de tu navegador (Chrome, Firefox, Safari, Edge).</p>
                  <p><strong>4.2 Optar por no Participar:</strong> Puedes optar por no recibir cookies de rastreo visitando el panel de preferencias.</p>
                  <p><strong>4.3 Almacenamiento Local:</strong> Utilizamos localStorage para guardar preferencias localmente sin usar cookies tradicionales.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-nature-800 mb-4">5. Duración de las Cookies</h2>
                <div className="space-y-3">
                  <p><strong>5.1 Cookies de Sesión:</strong> Se eliminan cuando cierras el navegador.</p>
                  <p><strong>5.2 Cookies Persistentes:</strong> Pueden permanecer en tu dispositivo hasta 1 año o más, dependiendo de la configuración.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-nature-800 mb-4">6. Pixels de Seguimiento</h2>
                <p className="leading-relaxed">
                  Además de cookies, utilizamos "pixels" (pequeñas imágenes) para rastrear actividades en el sitio y medir la efectividad de campañas de marketing.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-nature-800 mb-4">7. Do Not Track (DNT)</h2>
                <p className="leading-relaxed">
                  Si tu navegador envía una señal "Do Not Track" (DNT), respetaremos tu preferencia de privacidad. Sin embargo, es importante notar que no todos los navegadores soportan esta función.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-nature-800 mb-4">8. Consentimiento</h2>
                <p className="leading-relaxed">
                  Al usar Forever Pet Friend, aceptas el uso de cookies de acuerdo con esta política. Si no deseas que utilicemos cookies, puedes desactivarlas en tu navegador, aunque esto puede afectar la funcionalidad del Servicio.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-nature-800 mb-4">9. Cumplimiento GDPR y CCPA</h2>
                <p className="leading-relaxed">
                  Cumplimos con el Reglamento General de Protección de Datos (GDPR) de la UE y la Ley de Privacidad del Consumidor de California (CCPA). Los usuarios en estas jurisdicciones tienen derechos adicionales sobre sus cookies y datos.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-nature-800 mb-4">10. Cambios en esta Política</h2>
                <p className="leading-relaxed">
                  Podemos actualizar esta Política ocasionalmente. Te notificaremos sobre cambios significativos a través del Servicio.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-nature-800 mb-4">11. Contacto</h2>
                <p className="leading-relaxed">
                  Si tienes preguntas sobre esta Política de Cookies, contactanos en: <strong>cookies@memorias-eternas.app</strong>
                </p>
              </section>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mt-8">
                <p className="text-yellow-900">
                  <strong>ℹ️ Información Útil:</strong> Para más información sobre cómo gestionar cookies en tu navegador:
                  <ul className="mt-3 space-y-1 list-disc list-inside">
                    <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="underline">Google Chrome</a></li>
                    <li><a href="https://support.mozilla.org/en-US/kb/clear-cookies-site-data-firefox" target="_blank" rel="noopener noreferrer" className="underline">Mozilla Firefox</a></li>
                    <li><a href="https://support.apple.com/en-us/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="underline">Safari</a></li>
                    <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge" target="_blank" rel="noopener noreferrer" className="underline">Microsoft Edge</a></li>
                  </ul>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
