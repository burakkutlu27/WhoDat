import { ImageResponse } from 'next/og'

export const alt = 'KimBu - Online Ben Kimim & Ünlü Tahmin Oyunu'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#F5F0E8',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          position: 'relative',
          padding: '60px',
        }}
      >
        {/* Decorative inner card */}
        <div
          style={{
            background: '#FFFDF7',
            border: '4px solid #C9BFA8',
            borderRadius: '24px',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
            boxShadow: '8px 12px 0px rgba(0,0,0,0.08)',
          }}
        >
          {/* Logo Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '16px',
              marginBottom: '20px',
            }}
          >
            <div
              style={{
                width: '72px',
                height: '72px',
                background: '#D94F3D',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFF',
                fontSize: '44px',
                fontWeight: '900',
              }}
            >
              ?
            </div>
            <div
              style={{
                display: 'flex',
                fontSize: '64px',
                fontWeight: '900',
                color: '#2D2A26',
                letterSpacing: '-1px',
              }}
            >
              <span>KimBu</span>
              <span style={{ color: '#E8A838' }}>?</span>
            </div>
          </div>

          {/* Slogan */}
          <div
            style={{
              display: 'flex',
              fontSize: '38px',
              fontWeight: '800',
              color: '#D94F3D',
              textAlign: 'center',
              marginBottom: '16px',
            }}
          >
            Online Ben Kimim & Ünlü Tahmin Oyunu
          </div>

          {/* Description */}
          <div
            style={{
              display: 'flex',
              fontSize: '22px',
              fontWeight: '500',
              color: '#635D54',
              textAlign: 'center',
              maxWidth: '800px',
              lineHeight: 1.4,
              marginBottom: '32px',
            }}
          >
            Arkadaşlarınla online oda kur, gizli isimler belirle ve sorular sorarak kimliğini tahmin et!
          </div>

          {/* Features Pills */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '16px',
            }}
          >
            <div
              style={{
                padding: '10px 20px',
                background: '#FFF3C4',
                border: '2px solid #E8A838',
                borderRadius: '12px',
                color: '#2D2A26',
                fontSize: '18px',
                fontWeight: '700',
              }}
            >
              🎯 4 Oyun Modu
            </div>
            <div
              style={{
                padding: '10px 20px',
                background: '#D4F5E0',
                border: '2px solid #2B7A78',
                borderRadius: '12px',
                color: '#2D2A26',
                fontSize: '18px',
                fontWeight: '700',
              }}
            >
              ⚡ 7.450+ İsim Havuzu
            </div>
            <div
              style={{
                padding: '10px 20px',
                background: '#D0E8FF',
                border: '2px solid #3B6B9A',
                borderRadius: '12px',
                color: '#2D2A26',
                fontSize: '18px',
                fontWeight: '700',
              }}
            >
              👥 Ücretsiz & Çok Oyunculu
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
