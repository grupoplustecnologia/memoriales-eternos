'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CanonicalHead } from '@/components/CanonicalHead';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-nature-50">
      <CanonicalHead url="https://cementerio-virtual-mascotas.com/terms" />

      {/* Header */}
      <div className="bg-gradient-to-r from-nature-600 to-sky-600 text-white py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Términos de Servicio</h1>
          <p className="text-white/90">Última actualización: 17 de noviembre de 2025</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 md:py-20 max-w-4xl">
        <Card className="border-2 border-nature-200">
          <CardContent className="pt-8 prose prose-invert max-w-none">
            <div className="space-y-8 text-nature-700">
              <section>
                <h2 className="text-2xl font-bold text-nature-800 mb-4">1. Aceptación de Términos</h2>
                <p className="leading-relaxed">
                  Al acceder y utilizar Forever Pet Friend ("el Servicio"), aceptas estar legalmente vinculado por estos Términos de Servicio. Si no aceptas estos términos, por favor no uses el Servicio.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-nature-800 mb-4">2. Descripción del Servicio</h2>
                <p className="leading-relaxed">
                  Forever Pet Friend es una plataforma digital que permite a los usuarios crear memorials virtuales para sus mascotas fallecidas, compartir historias y recibir tributos de la comunidad global.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-nature-800 mb-4">3. Cuenta de Usuario</h2>
                <div className="space-y-3">
                  <p><strong>3.1 Responsabilidad del Usuario:</strong> Eres responsable de mantener la confidencialidad de tu contraseña y de toda la actividad que ocurra en tu cuenta.</p>
                  <p><strong>3.2 Información Precisa:</strong> Debes proporcionar información precisa y completa al crear tu cuenta y actualizar cualquier cambio.</p>
                  <p><strong>3.3 Prohibiciones:</strong> No debes compartir tu cuenta con otros usuarios ni permitir que otros accedan a ella.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-nature-800 mb-4">4. Contenido del Usuario</h2>
                <div className="space-y-3">
                  <p><strong>4.1 Propiedad:</strong> Retienes toda la propiedad de los contenidos que cargues (fotos, historias, mensajes).</p>
                  <p><strong>4.2 Licencia de Uso:</strong> Al cargar contenido, nos otorgas una licencia para almacenar, mostrar y distribuir tu contenido en el Servicio.</p>
                  <p><strong>4.3 Contenido Prohibido:</strong> No debes cargar contenido que sea ilegal, difamatorio, obsceno o que viole derechos de terceros.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-nature-800 mb-4">5. Comportamiento del Usuario</h2>
                <p className="mb-3 leading-relaxed">El usuario acepta no:</p>
                <ul className="list-disc list-inside space-y-2 ml-4 text-nature-700">
                  <li>Cargar contenido ofensivo, abusivo o discriminatorio</li>
                  <li>Intentar acceder a cuentas no autorizadas</li>
                  <li>Usar el Servicio para spam o actividades comerciales no autorizadas</li>
                  <li>Violar los derechos de propiedad intelectual de otros</li>
                  <li>Usar bots o automatización no autorizada</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-nature-800 mb-4">6. Moderación de Contenido</h2>
                <p className="leading-relaxed">
                  Nos reservamos el derecho de revisar, modificar o eliminar cualquier contenido que viole estos términos, sin previo aviso. Podemos suspender o terminar cuentas que incumplan repetidamente.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-nature-800 mb-4">7. Limitación de Responsabilidad</h2>
                <p className="leading-relaxed">
                  El Servicio se proporciona "tal como está" sin garantías de ningún tipo. Forever Pet Friend no será responsable de daños indirectos, incidentales o consecuentes derivados del uso del Servicio.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-nature-800 mb-4">8. Cambios en los Términos</h2>
                <p className="leading-relaxed">
                  Nos reservamos el derecho de actualizar estos Términos en cualquier momento. Continuando con el uso del Servicio después de cambios, aceptas los nuevos términos.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-nature-800 mb-4">9. Contacto</h2>
                <p className="leading-relaxed">
                  Si tienes preguntas sobre estos Términos, contactanos en: <strong>legal@forever-pet-friend.app</strong>
                </p>
              </section>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
                <p className="text-blue-900">
                  <strong>Nota Legal:</strong> Estos términos constituyen el acuerdo completo entre tú y Forever Pet Friend. Si alguna disposición es inválida, las demás disposiciones permanecerán en vigor.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
