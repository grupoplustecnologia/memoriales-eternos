'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

interface ShareMemorialSectionProps {
  memorialId: string;
  memorialName: string;
  story?: string;
  photoUrl?: string;
  animalType: string;
  slug?: string;
}

interface ShareOption {
  id: string;
  name: string;
  icon: string;
  color: string;
  bgColor: string;
  hoverColor: string;
  description: string;
}

const SHARE_OPTIONS: ShareOption[] = [
  {
    id: 'facebook',
    name: 'Facebook',
    icon: '👍',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    hoverColor: 'hover:bg-blue-100',
    description: 'Comparte con tu red de contactos'
  },
  {
    id: 'twitter',
    name: 'Twitter/X',
    icon: '𝕏',
    color: 'text-black',
    bgColor: 'bg-gray-50',
    hoverColor: 'hover:bg-gray-100',
    description: 'Tuitea el memorial'
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    icon: '💬',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    hoverColor: 'hover:bg-green-100',
    description: 'Envía por WhatsApp'
  },
  {
    id: 'telegram',
    name: 'Telegram',
    icon: '✈️',
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
    hoverColor: 'hover:bg-blue-100',
    description: 'Comparte por Telegram'
  },
  {
    id: 'email',
    name: 'Email',
    icon: '✉️',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    hoverColor: 'hover:bg-red-100',
    description: 'Envía por correo'
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: '💼',
    color: 'text-blue-700',
    bgColor: 'bg-blue-50',
    hoverColor: 'hover:bg-blue-100',
    description: 'Comparte en LinkedIn'
  }
];

export default function ShareMemorialSection({ memorialId, memorialName, story = '', photoUrl = '', animalType, slug }: ShareMemorialSectionProps) {
  const [showEmailTemplate, setShowEmailTemplate] = useState(false);
  const [emailTo, setEmailTo] = useState('');

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://foreverpetfriend.com';
  // Use slug for SEO-friendly URLs, fall back to ID if no slug
  const memorialUrl = slug 
    ? `${baseUrl}/memorial/${slug}`
    : `${baseUrl}/memorial/${memorialId}`;

  const generateShareMessage = () => {
    const storyPreview = story ? story.substring(0, 100) : 'Un memorial especial';
    return `Visita el memorial de ${memorialName} en Forever Pet Friend. ${storyPreview}...`;
  };

  const shareMessage = generateShareMessage();

  const handleShare = (platform: string) => {
    const encodedUrl = encodeURIComponent(memorialUrl);
    const encodedMessage = encodeURIComponent(shareMessage);
    const encodedTitle = encodeURIComponent(`Memorial de ${memorialName}`);

    let shareUrl = '';

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodedMessage}&url=${encodedUrl}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodedMessage}%20${encodedUrl}`;
        break;
      case 'telegram':
        shareUrl = `https://t.me/share/url?url=${encodedUrl}&text=${encodedMessage}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
      case 'email':
        setShowEmailTemplate(true);
        return;
    }

    if (shareUrl) {
      window.open(shareUrl, 'share', 'width=550,height=420');
    }
  };

  const sendEmail = () => {
    if (!emailTo) return;

    const subject = encodeURIComponent(`Memorial de ${memorialName} - Forever Pet Friend`);
    const body = encodeURIComponent(
      `Hola,\n\nTe invito a visitar el memorial de ${memorialName} en Forever Pet Friend.\n\n${story}\n\nVisita el memorial aquí: ${memorialUrl}\n\nForever Pet Friend - Monumentos virtuales para tus mascotas queridas`
    );

    window.location.href = `mailto:${emailTo}?subject=${subject}&body=${body}`;
    setShowEmailTemplate(false);
    setEmailTo('');
  };

  const generateQRCode = () => {
    // QR code generation using a public API
    return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(memorialUrl)}`;
  };

  const generateEmbedCode = () => {
    return `<iframe src="${memorialUrl}?embed=true" width="100%" height="600" frameborder="0" allowfullscreen></iframe>`;
  };

  return (
    <Card className="border-2 border-nature-200">
      <CardHeader className="bg-gradient-to-r from-sky-50 to-golden-50">
        <div>
          <CardTitle className="text-xl sm:text-2xl flex items-center gap-2">
            <span className="text-2xl sm:text-3xl">📤</span>
            Compartir Memorial
          </CardTitle>
          <CardDescription className="text-sm sm:text-base mt-2">
            Comparte este hermoso memorial con tu red de amigos y familia
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="pt-6 sm:pt-8 space-y-6">
        {/* Social Media Sharing Grid */}
        <div>
          <h3 className="font-semibold text-nature-800 mb-4 text-sm sm:text-base">Redes Sociales</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
            {SHARE_OPTIONS.map((option) => (
              <button
                key={option.id}
                onClick={() => handleShare(option.id)}
                className={`${option.bgColor} ${option.hoverColor} border border-gray-200 rounded-lg p-3 sm:p-4 transition-all duration-300 hover:shadow-md text-center`}
              >
                <div className="text-2xl sm:text-3xl mb-2">{option.icon}</div>
                <p className={`font-semibold text-xs sm:text-sm ${option.color}`}>{option.name}</p>
                <p className="text-xs text-gray-600 mt-1 hidden sm:block">{option.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Email Template Section */}
        {showEmailTemplate && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 sm:p-5">
            <h3 className="font-semibold text-nature-800 mb-4 text-sm sm:text-base">
              ✉️ Enviar por Email
            </h3>
            <p className="text-xs sm:text-sm text-nature-600 mb-4">
              Ingresa el email del destinatario
            </p>
            <div className="flex gap-2 flex-col sm:flex-row mb-4">
              <Input
                type="email"
                placeholder="ejemplo@correo.com"
                value={emailTo}
                onChange={(e) => setEmailTo(e.target.value)}
                className="bg-white border-red-300 text-xs sm:text-sm"
              />
              <Button
                onClick={sendEmail}
                disabled={!emailTo}
                className="bg-red-600 hover:bg-red-700 text-white disabled:opacity-50 text-xs sm:text-sm whitespace-nowrap"
              >
                📧 Enviar
              </Button>
            </div>
            <div className="bg-red-100 p-3 rounded-lg mb-4 border border-red-300">
              <p className="text-xs font-semibold text-red-900 mb-2">Preview del email:</p>
              <div className="bg-white p-3 rounded text-xs text-gray-700 max-h-32 overflow-y-auto">
                <p className="font-bold mb-2">Memorial de {memorialName} - Forever Pet Friend</p>
                <p className="mb-2">{story ? story.substring(0, 150) : 'Un memorial especial'}...</p>
                <p className="text-blue-600">{memorialUrl}</p>
              </div>
            </div>
            <Button
              onClick={() => setShowEmailTemplate(false)}
              variant="outline"
              className="w-full border-red-300 text-xs sm:text-sm"
            >
              Cancelar
            </Button>
          </div>
        )}

        {/* Premium Features */}
        <div className="bg-gradient-to-r from-golden-50 to-sky-50 border border-dashed border-golden-300 rounded-lg p-4 sm:p-5">
          <div className="flex items-start gap-3 flex-wrap">
            <span className="text-2xl">✨</span>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-nature-800 text-sm sm:text-base mb-2">
                Funciones Premium Disponibles
              </h4>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-golden-600 hover:bg-golden-700 text-xs sm:text-sm">
                  🎨 Generar Imágenes
                </Badge>
                <Badge className="bg-sky-600 hover:bg-sky-700 text-xs sm:text-sm">
                  🌐 Personalizar Preview
                </Badge>
                <Badge className="bg-nature-600 hover:bg-nature-700 text-xs sm:text-sm">
                  📊 Analytics de Compartir
                </Badge>
              </div>
              <p className="text-xs text-nature-600 mt-3">
                Actualiza a Premium para desbloquear funciones avanzadas de compartir
              </p>
            </div>
          </div>
        </div>

        {/* Sharing Statistics */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4 text-center">
            <div className="text-2xl sm:text-3xl mb-2">👁️</div>
            <p className="text-xs sm:text-sm font-semibold text-blue-700">234</p>
            <p className="text-xs text-blue-600">Visitas</p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4 text-center">
            <div className="text-2xl sm:text-3xl mb-2">📤</div>
            <p className="text-xs sm:text-sm font-semibold text-green-700">12</p>
            <p className="text-xs text-green-600">Compartidos</p>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 sm:p-4 text-center">
            <div className="text-2xl sm:text-3xl mb-2">❤️</div>
            <p className="text-xs sm:text-sm font-semibold text-purple-700">45</p>
            <p className="text-xs text-purple-600">Me Encanta</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
