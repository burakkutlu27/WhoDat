'use client'

/**
 * FloatingDoodles — Dekoratif arka plan SVG doodle'ları.
 * Sayfanın kenarlarında, çok düşük opacity ile yüzen
 * elle çizilmiş küçük ikonlar. Tamamen CSS animasyonlu,
 * performans için will-change kullanır.
 */
export default function FloatingDoodles() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Sol üst — Soru İşareti */}
      <div
        className="floating-doodle animate-float"
        style={{ top: '12%', left: '3%', opacity: 0.06, animationDelay: '0s', willChange: 'transform' }}
      >
        <svg width="32" height="32" viewBox="0 0 32 32" strokeWidth="2">
          <path d="M12 8 C12 5 14.5 3 16.5 3 C18.5 3 21 5 20.5 8 C20 10 17.5 11 17 13" />
          <circle cx="16.5" cy="17" r="1.5" fill="currentColor" stroke="none" className="fill-paper-border" />
        </svg>
      </div>

      {/* Sağ üst — Yıldız */}
      <div
        className="floating-doodle animate-float"
        style={{ top: '8%', right: '5%', opacity: 0.05, animationDelay: '2s', willChange: 'transform' }}
      >
        <svg width="28" height="28" viewBox="0 0 28 28" strokeWidth="1.5">
          <path d="M14 2 L16.5 10 L24 10 L18 15 L20 23 L14 18 L8 23 L10 15 L4 10 L11.5 10 Z" />
        </svg>
      </div>

      {/* Sol alt — Spiral */}
      <div
        className="floating-doodle animate-float"
        style={{ bottom: '18%', left: '4%', opacity: 0.05, animationDelay: '4s', willChange: 'transform' }}
      >
        <svg width="30" height="30" viewBox="0 0 30 30" strokeWidth="1.5">
          <path d="M15 15 C15 12 18 10 20 12 C22 14 20 18 16 18 C12 18 9 15 9 11 C9 7 13 4 17 4 C21 4 25 8 25 13 C25 18 21 22 16 22" />
        </svg>
      </div>

      {/* Sağ alt — Ok */}
      <div
        className="floating-doodle animate-float"
        style={{ bottom: '25%', right: '3%', opacity: 0.05, animationDelay: '1s', willChange: 'transform' }}
      >
        <svg width="36" height="20" viewBox="0 0 36 20" strokeWidth="1.5">
          <path d="M2 10 Q10 6 18 10 T34 10" />
          <path d="M28 6 L34 10 L28 14" />
        </svg>
      </div>

      {/* Orta sol — Daire */}
      <div
        className="floating-doodle animate-float"
        style={{ top: '45%', left: '2%', opacity: 0.04, animationDelay: '3s', willChange: 'transform' }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5">
          <circle cx="12" cy="12" r="9" />
          <path d="M8 12 L11 15 L16 9" />
        </svg>
      </div>

      {/* Orta sağ — Artı İşareti */}
      <div
        className="floating-doodle animate-float"
        style={{ top: '55%', right: '2%', opacity: 0.04, animationDelay: '5s', willChange: 'transform' }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" strokeWidth="2">
          <path d="M10 3 L10 17" />
          <path d="M3 10 L17 10" />
        </svg>
      </div>

      {/* Üst orta — Kalem */}
      <div
        className="floating-doodle animate-float"
        style={{ top: '5%', left: '40%', opacity: 0.04, animationDelay: '3.5s', willChange: 'transform' }}
      >
        <svg width="32" height="12" viewBox="0 0 32 12" strokeWidth="1.5">
          <path d="M2 6 L24 6" />
          <path d="M24 3 L30 6 L24 9 Z" />
          <path d="M6 3 L6 9" />
        </svg>
      </div>
    </div>
  )
}
