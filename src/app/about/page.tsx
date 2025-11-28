import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-nature-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-nature-600 to-sky-600 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Acerca de Forever Pet Friend</h1>
          <p className="text-lg md:text-xl text-white/90">
            Honramos la memoria de tus mascotas queridas con memorials virtuales eternos
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 md:py-20 max-w-4xl">
        {/* Nuestra Misión */}
        <Card className="mb-8 border-2 border-nature-200">
          <CardHeader className="bg-gradient-to-r from-nature-50 to-sky-50">
            <CardTitle className="text-3xl flex items-center gap-2">
              <span className="text-4xl">🎯</span>
              Nuestra Misión
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <p className="text-lg text-nature-700 leading-relaxed">
              En <strong>Forever Pet Friend</strong>, creemos que cada mascota merece ser recordada y honrada. Nuestra misión es crear un espacio digital permanente donde los amantes de animales puedan compartir las historias, los momentos especiales y el amor que compartieron con sus compañeros de cuatro patas (y de más patas también).
            </p>
            <p className="text-lg text-nature-700 leading-relaxed">
              Sabemos que la pérdida de una mascota es una experiencia profunda y personal. Por eso, hemos creado una plataforma que permite:
            </p>
            <ul className="space-y-3 text-nature-700">
              <li className="flex items-start gap-3">
                <span className="text-2xl">💐</span>
                <span><strong>Crear memorials hermosos:</strong> Carga fotos, historias y momentos especiales de tu mascota</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">🌍</span>
                <span><strong>Conectar globalmente:</strong> Tu mascota tendrá un lugar en nuestro mapa mundial de recuerdos</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">💬</span>
                <span><strong>Compartir tributos:</strong> Amigos y familia pueden dejar flores virtuales, velas y mensajes</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">♾️</span>
                <span><strong>Memoria eterna:</strong> Los memorials permanecen para siempre, nunca serán olvidados</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Cómo Funciona */}
        <Card className="mb-8 border-2 border-sky-200">
          <CardHeader className="bg-gradient-to-r from-sky-50 to-blue-50">
            <CardTitle className="text-3xl flex items-center gap-2">
              <span className="text-4xl">⚙️</span>
              Cómo Funciona
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-sky-50 p-6 rounded-lg border border-sky-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-sky-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
                  <h3 className="text-xl font-semibold text-nature-800">Registro</h3>
                </div>
                <p className="text-nature-700">
                  Crea una cuenta gratuita con tu email. ¡Rápido y sencillo!
                </p>
              </div>

              <div className="bg-sky-50 p-6 rounded-lg border border-sky-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-sky-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
                  <h3 className="text-xl font-semibold text-nature-800">Crear Memorial</h3>
                </div>
                <p className="text-nature-700">
                  Completa el formulario con la información de tu mascota, fotos y su historia.
                </p>
              </div>

              <div className="bg-sky-50 p-6 rounded-lg border border-sky-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-sky-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
                  <h3 className="text-xl font-semibold text-nature-800">Ubicación en Mapa</h3>
                </div>
                <p className="text-nature-700">
                  Selecciona la ubicación del memorial en nuestro mapa mundial interactivo.
                </p>
              </div>

              <div className="bg-sky-50 p-6 rounded-lg border border-sky-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-sky-600 text-white rounded-full flex items-center justify-center font-bold">4</div>
                  <h3 className="text-xl font-semibold text-nature-800">Compartir y Recordar</h3>
                </div>
                <p className="text-nature-700">
                  Comparte el memorial con amigos y recibe tributos de visitantes.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contacto */}
        <Card className="border-2 border-nature-200">
          <CardHeader className="bg-gradient-to-r from-nature-50 to-emerald-50">
            <CardTitle className="text-3xl flex items-center gap-2">
              <span className="text-4xl">📞</span>
              Contacto
            </CardTitle>
            <CardDescription className="text-base">
              ¿Preguntas, sugerencias o comentarios? Nos encantaría escucharte
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-nature-50 p-6 rounded-lg border border-nature-200">
                <h3 className="font-semibold text-nature-800 mb-2 flex items-center gap-2">
                  <span>✉️</span> Email
                </h3>
                <p className="text-nature-700">
                  <a href="mailto:soporte@memorias-eternas.app" className="text-nature-600 hover:text-nature-800 font-medium break-all">
                    soporte@memorias-eternas.app
                  </a>
                </p>
              </div>

              <div className="bg-nature-50 p-6 rounded-lg border border-nature-200">
                <h3 className="font-semibold text-nature-800 mb-2 flex items-center gap-2">
                  <span>⏰</span> Horario de Atención
                </h3>
                <p className="text-nature-700 text-sm">
                  Lunes a Viernes: 9:00 AM - 6:00 PM<br />
                  Sábado y Domingo: 10:00 AM - 4:00 PM
                </p>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <p className="text-blue-900">
                <strong>💙 Nota:</strong> Respondemos a todos los mensajes en un plazo máximo de 24 horas.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="mt-12 text-center">
          <h2 className="text-3xl font-bold text-nature-800 mb-4">¿Listo para honrar a tu mascota?</h2>
          <p className="text-lg text-nature-600 mb-6">
            Crea un memorial hermoso hoy y comparte los recuerdos eternos
          </p>
          <Link href="/create">
            <Button className="bg-gradient-to-r from-nature-600 to-sky-600 hover:from-nature-700 hover:to-sky-700 text-white text-lg px-8 py-6">
              ✨ Crear Memorial Ahora
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
