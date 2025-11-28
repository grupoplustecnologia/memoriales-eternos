'use client';

import { Share2, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface ShareButtonProps {
  profileId: string;
  title: string;
}

export function ShareButton({ profileId, title }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const memorialUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/profile/${profileId}`;

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(memorialUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Error copying to clipboard:', error);
    }
  }

  function shareToWhatsApp() {
    const text = `Mira este hermoso memorial para ${title} en Forever Pet Friend`;
    const url = `https://wa.me/?text=${encodeURIComponent(text + ' ' + memorialUrl)}`;
    window.open(url, '_blank');
  }

  function shareToFacebook() {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(memorialUrl)}`;
    window.open(url, '_blank');
  }

  function shareToTwitter() {
    const text = `Visitando un hermoso memorial para ${title} en Forever Pet Friend`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(memorialUrl)}`;
    window.open(url, '_blank');
  }

  function shareToEmail() {
    const subject = `Memorial de ${title}`;
    const body = `Quiero compartir contigo este memorial: ${memorialUrl}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <div className="relative">
      <Button
        onClick={() => setShowMenu(!showMenu)}
        variant="outline"
        className="gap-2"
      >
        <Share2 size={18} />
        Compartir
      </Button>

      {showMenu && (
        <div className="absolute top-full right-0 mt-2 bg-white border rounded-lg shadow-lg z-50 min-w-max">
          <button
            onClick={copyToClipboard}
            className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 transition-colors"
          >
            {copied ? (
              <>
                <Check size={16} className="text-green-500" />
                Copiado!
              </>
            ) : (
              <>
                <Copy size={16} />
                Copiar enlace
              </>
            )}
          </button>

          <button
            onClick={shareToWhatsApp}
            className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 transition-colors"
          >
            <span>💬</span>
            WhatsApp
          </button>

          <button
            onClick={shareToFacebook}
            className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 transition-colors"
          >
            <span>👍</span>
            Facebook
          </button>

          <button
            onClick={shareToTwitter}
            className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 transition-colors"
          >
            <span>𝕏</span>
            Twitter
          </button>

          <button
            onClick={shareToEmail}
            className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 transition-colors border-t"
          >
            <span>✉️</span>
            Email
          </button>
        </div>
      )}
    </div>
  );
}
