'use client';
import React, { useEffect } from "react";
import CookieConsent, { getCookieConsentValue } from "react-cookie-consent";

const CookieConsentBanner = () => {
  const [consent, setConsent] = React.useState(getCookieConsentValue("_pagebuilder_consent") === "true");

  useEffect(() => {
    window.gtag('consent', 'default', {
      'ad_user_data': 'denied',
      'ad_personalization': 'denied',
      'ad_storage': 'denied',
      'analytics_storage': 'denied'
    });
  }, [])

  useEffect(() => {
    window.gtag('consent', 'update', {
      'ad_user_data': consent ? 'granted' : 'denied',
      'ad_personalization': consent ? 'granted' : 'denied',
      'ad_storage': consent ? 'granted' : 'denied',
      'analytics_storage': consent ? 'granted' : 'denied',
    });
  }, [consent])

  return (
    <>
      <CookieConsent
        location="bottom"
        buttonText="Accept"
        disableStyles
        containerClasses="fixed bottom-0 bg-feature-500 text-white hover:bg-feature-500/90 w-full p-4 flex flex-wrap items-center justify-between"
        cookieName="_pagebuilder_consent"
        style={{ background: "#2B373B", color: "#FFF" }}
        // buttonStyle={{ backgroundColor: "#4CAF50", color: "#FFF", fontSize: "14px" }}
        buttonClasses="bg-feature-500 text-white px-6 py-2 rounded-full hover:bg-feature-500/90"
        declineButtonStyle={{ backgroundColor: "#f44336", color: "#FFF", fontSize: "14px" }}
        expires={365}  // Number of days before the cookie expires
        onAccept={() => {
          // Add functionality when user accepts cookies
          setConsent(true);
        }}
        onDecline={() => {
          // Add functionality when user declines cookies
          setConsent(false);
        }}
        acceptOnScroll={true}
        acceptOnScrollPercentage={25}
      >
        This website uses cookies to enhance your experience. By using our website, you consent to the use of cookies.
      </CookieConsent>
    </>
  );
};

export default CookieConsentBanner;