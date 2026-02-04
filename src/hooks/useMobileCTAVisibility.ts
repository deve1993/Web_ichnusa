import { useState, useEffect, useCallback } from 'react'

const MOBILE_CTA_EVENT = 'mobile-cta-visibility'

export function useMobileCTADispatcher() {
  const dispatch = useCallback((visible: boolean) => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent(MOBILE_CTA_EVENT, { detail: { visible } }))
    }
  }, [])

  return dispatch
}

export function useMobileCTAListener() {
  const [isMobileCTAVisible, setIsMobileCTAVisible] = useState(false)

  useEffect(() => {
    const handler = (event: CustomEvent<{ visible: boolean }>) => {
      setIsMobileCTAVisible(event.detail.visible)
    }

    window.addEventListener(MOBILE_CTA_EVENT, handler as EventListener)
    return () => window.removeEventListener(MOBILE_CTA_EVENT, handler as EventListener)
  }, [])

  return isMobileCTAVisible
}
