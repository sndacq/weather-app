import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Auth0Provider } from '@auth0/auth0-react';

export default function App({ Component, pageProps }: AppProps) {
  let redirectUri = '';
  if (typeof window !== 'undefined') {
    redirectUri = window.location.origin;
  }

  return (
    <Auth0Provider
      domain={process.env.AUTH_0_DOMAIN || ''}
      clientId={process.env.AUTH_0_CLIENT || ''}
      authorizationParams={{
        redirect_uri: redirectUri,
      }}
    >
      <Component {...pageProps} />
    </Auth0Provider>
  );
}
