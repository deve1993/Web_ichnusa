import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const size = {
  width: 180,
  height: 180,
}
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 100,
          background: 'linear-gradient(135deg, #0C0B09 0%, #1A1816 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 32,
        }}
      >
        <span
          style={{
            color: '#C9A96E',
            fontFamily: 'Georgia, serif',
            fontWeight: 400,
            letterSpacing: '0.1em',
          }}
        >
          I
        </span>
        <span
          style={{
            color: '#9A9A9A',
            fontSize: 12,
            fontFamily: 'system-ui, sans-serif',
            letterSpacing: '0.3em',
            marginTop: -10,
          }}
        >
          CHNUSA
        </span>
      </div>
    ),
    {
      ...size,
    }
  )
}
