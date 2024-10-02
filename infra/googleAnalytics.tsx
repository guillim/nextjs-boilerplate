import { GoogleAnalytics } from '@next/third-parties/google'
import { providersList } from './providerDetector';

// create a react wrapper component around <GoogleAnalytics gaId="G-XYZ" />
export default function GoogleAnalyticsWrapper() {
  return (providersList.googleAnalytics.isAvailable &&
    <GoogleAnalytics gaId={providersList.googleAnalytics.id} />
  );
}
