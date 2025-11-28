'use client';

import { Card, CardContent } from '@/components/ui/card';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-nature-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-nature-600 to-sky-600 text-white py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Política de Privacidad</h1>
          <p className="text-white/90">Última actualización: 17 de noviembre de 2025</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 md:py-20 max-w-4xl">
        <Card className="border-2 border-nature-200">
          <CardContent className="pt-8 prose prose-invert max-w-none">
            <div className="space-y-8 text-nature-700">
              <section>
                <h2 className="text-2xl font-bold text-nature-800 mb-4">1. Introducción</h2>
                <p className="leading-relaxed">
                  Forever Pet Friend ("nosotros", "nuestro" o "la Empresa") respeta la privacidad de nuestros usuarios. Esta Política de Privacidad explica cómo recopilamos, usamos, divulgamos y salvaguardamos tu información.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-nature-800 mb-4">2. Información que Recopilamos</h2>
                <div className="space-y-3">
                  <p><strong>2.1 Información de Registro:</strong> Nombre, email, contraseña y foto de perfil cuando creas una cuenta.</p>
                  <p><strong>2.2 Contenido del Memorial:</strong> Fotos, historias, fechas y ubicaciones que cargas sobre tus mascotas.</p>
                  <p><strong>2.3 Información de Uso:</strong> Cómo interactúas con el Servicio (clics, visualizaciones, tributos).</p>
                  <p><strong>2.4 Información Técnica:</strong> Dirección IP, tipo de navegador, sistema operativo y páginas visitadas.</p>
                  <p><strong>2.5 Cookies y Similares:</strong> Utilizamos cookies para recordar preferencias y mejorar la experiencia.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-nature-800 mb-4">3. Cómo Usamos tu Información</h2>
                <p className="mb-3 leading-relaxed">Utilizamos tu información para:</p>
                <ul className="list-disc list-inside space-y-2 ml-4 text-nature-700">
                  <li>Proporcionar, mantener y mejorar el Servicio</li>
                  <li>Personalizar tu experiencia</li>
                  <li>Procesar transacciones (si aplica)</li>
                  <li>Enviar notificaciones y actualizaciones</li>
                  <li>Prevenir fraude y actividades ilegales</li>
                  <li>Realizar análisis y mejoras de seguridad</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-nature-800 mb-4">4. Compartición de Información</h2>
                <div className="space-y-3">
                  <p><strong>4.1 Públicamente:</strong> Tu nombre, foto de perfil y memorial se muestran públicamente a menos que hayas configurado privacidad.</p>
                  <p><strong>4.2 Terceros Confiables:</strong> Solo compartimos información con proveedores de servicio que ayudan a operar el Servicio.</p>
                  <p><strong>4.3 Requisitos Legales:</strong> Podemos divulgar información si lo requiere la ley.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-nature-800 mb-4">5. Seguridad de Datos</h2>
                <p className="leading-relaxed">
                  Implementamos medidas de seguridad técnicas, administrativas y físicas para proteger tu información personal. Sin embargo, no podemos garantizar seguridad absoluta.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-nature-800 mb-4">6. Tus Derechos</h2>
                <div className="space-y-3">
                  <p><strong>6.1 Acceso:</strong> Puedes acceder a tu información personal en cualquier momento.</p>
                  <p><strong>6.2 Corrección:</strong> Puedes actualizar o corregir tu información incorrecta.</p>
                  <p><strong>6.3 Eliminación:</strong> Puedes solicitar la eliminación de tu cuenta y datos (sujeto a cumplimiento legal).</p>
                  <p><strong>6.4 Opción de Exclusión:</strong> Puedes optar por no recibir comunicaciones de marketing.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-nature-800 mb-4">7. Retención de Datos</h2>
                <p className="leading-relaxed">
                  Retenemos tu información mientras tu cuenta esté activa. Después de la eliminación de la cuenta, podemos retener ciertos datos si es necesario cumplir con obligaciones legales.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-nature-800 mb-4">8. Menores de Edad</h2>
                <p className="leading-relaxed">
                  No dirigimos el Servicio a menores de 13 años. No recopilamos información de menores de 13 años a sabiendas. Si descubrimos que hemos recopilado información de un menor, la eliminaremos inmediatamente.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-nature-800 mb-4">9. Enlaces Externos</h2>
                <p className="leading-relaxed">
                  Nuestro Servicio puede contener enlaces a sitios web externos. No somos responsables de sus políticas de privacidad. Te recomendamos revisar la política de privacidad de cualquier sitio externo.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-nature-800 mb-4">10. Cambios en esta Política</h2>
                <p className="leading-relaxed">
                  Podemos actualizar esta Política ocasionalmente. La fecha de última actualización está indicada al inicio. Continuando el uso del Servicio después de cambios, aceptas la Política actualizada.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-nature-800 mb-4">11. Contacto</h2>
                <p className="leading-relaxed">
                  Si tienes preguntas sobre esta Política de Privacidad, contactanos en: <strong>privacidad@memorias-eternas.app</strong>
                </p>
              </section>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6 mt-8">
                <p className="text-green-900">
                  <strong>Compromiso:</strong> Tu privacidad y confianza son muy importantes para nosotros. Nos comprometemos a proteger tus datos personales y respetar tus derechos.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
