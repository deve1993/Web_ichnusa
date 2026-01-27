import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

const VALID_SIZES = [16, 32, 192, 512] as const

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ size: string }> }
) {
  const { size: sizeParam } = await params
  const size = parseInt(sizeParam, 10)

  if (!VALID_SIZES.includes(size as (typeof VALID_SIZES)[number])) {
    return new Response('Invalid size. Valid sizes: 16, 32, 192, 512', { status: 400 })
  }

  const fontSize = Math.round(size * 0.55)
  const subtitleSize = Math.round(size * 0.07)
  const borderRadius = Math.round(size * 0.15)

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: fontSize,
          background: 'linear-gradient(135deg, #0C0B09 0%, #1A1816 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: borderRadius,
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
        {size >= 192 && (
          <span
            style={{
              color: '#9A9A9A',
              fontSize: subtitleSize,
              fontFamily: 'system-ui, sans-serif',
              letterSpacing: '0.3em',
              marginTop: Math.round(size * -0.05),
            }}
          >
            CHNUSA
          </span>
        )}
      </div>
    ),
    {
      width: size,
      height: size,
    }
  )
}
