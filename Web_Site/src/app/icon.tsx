import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 20,
          background: '#0C0B09',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 4,
        }}
      >
        <span
          style={{
            color: '#C9A96E',
            fontFamily: 'Georgia, serif',
            fontWeight: 400,
            letterSpacing: '0.05em',
          }}
        >
          I
        </span>
      </div>
    ),
    {
      ...size,
    }
  )
}
