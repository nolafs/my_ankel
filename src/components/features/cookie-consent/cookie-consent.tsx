'use client';
import { useEffect, useState } from 'react';
import { getCookie, hasCookie, setCookie } from 'cookies-next';
import Link from 'next/link';

declare global {
  interface Window {
    gtag: (command: 'config' | 'event' | 'consent', action: string, params?: Record<string, any>) => void;
  }
}

export function CookieConsent() {
  const [showConsent, setShowConsent] = useState(true);

  useEffect(() => {
    const checkCookie = async () => {
      const hasLocalConsent = await hasCookie('localConsent-ankle');
      setShowConsent(hasLocalConsent);

      if (hasLocalConsent) {
        const newValue = getCookie('localConsent-ankle') === 'true' ? 'granted' : 'denied';
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('consent', 'update', {
            analytics_storage: newValue,
          });
        }
      }
    };

    void checkCookie();
  }, []);

  const acceptCookie = async () => {
    setShowConsent(true);
    await setCookie('localConsent-ankle', 'true', {});
  };

  const declineCookie = async () => {
    setShowConsent(true);
    await setCookie('localConsent-ankle', 'false', {});
  };

  if (showConsent) {
    return null;
  }

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 mx-auto flex max-w-max px-3 py-3 md:my-10 md:max-w-screen-lg md:px-4 ${showConsent ? 'hidden' : 'flex'} flex-col items-center justify-between gap-4 rounded-sm bg-primary shadow sm:flex-row`}>
      <div className="text-left text-white">
        <Link href={'/legal/privacy-notice-for-my-ankle'}>
          <p>
            We use cookies for better user experience and site analytics. By continuing, you agree to our use of
            cookies. Learn more in our <span className="font-bold text-sky-400">Privacy Policy</span>.
          </p>
        </Link>
      </div>

      <div className="flex gap-2">
        <button className="rounded-md border-gray-900 px-5 py-2 text-gray-300" onClick={() => declineCookie()}>
          Decline
        </button>
        <button
          className="whitespace-nowrap rounded-lg bg-gray-900 px-5 py-2 text-white"
          onClick={() => acceptCookie()}>
          Allow Cookies
        </button>
      </div>
    </div>
  );
}

export default CookieConsent;
