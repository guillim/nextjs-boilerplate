import { GoogleTagManager } from '@next/third-parties/google'
import { providersList } from './providerDetector'

export default function GoogleTagManagerWrapper() {
  return (
    providersList.googleTagManager?.isAvailable && 
      <GoogleTagManager gtmId={providersList.googleTagManager.id} />
  )
} 