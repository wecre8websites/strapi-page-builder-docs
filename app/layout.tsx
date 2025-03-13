import LoginButton from '@/components/LoginButton'
import NavBar, { NavBarProps } from '@/components/NavBar'
import AuthProvider from '../context/AuthContext'
import "../firebase/firebaseConfig"
import "../styles/globals.css"
import { GoogleTagManager } from '@next/third-parties/google'
import CookieConsentBanner from '@/components/CookieConsentBanner'

export const metadata = {
  // Define your metadata here
  // For more information on metadata API, see: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
}

const navParProps: NavBarProps = {
  logo: {
    src: "/pagebuilder_logo.png",
    alt: "Page Builder logo",
    text: "Page Builder"
  },
  navigation: [
    { name: "Docs", href: "/docs" },
    { name: "Github", href: "https://github.com/wecre8websites/strapi-page-builder", external: true },
    { name: "npm", href: "https://npmjs.com/package/@wecre8websites/strapi-page-builder", external: true },
    {
      component: <LoginButton
        className="bg-feature-500 text-white px-6 py-2 rounded-full hover:bg-feature-500/90"
        text={"Log In"}
        loggedInText='My Account'
        href="/account" />
    },
  ]
}


export default async function RootLayout({ children }: { children: React.ReactNode; }) {
  return (
    <html
      // Not required, but good for SEO
      lang="en"
      // Required to be set
      dir="ltr"
      // Suggested by `next-themes` package https://github.com/pacocoursey/next-themes#with-app
      suppressHydrationWarning
    >
      <GoogleTagManager gtmId={"G-RGCKQ47K12"} />
      <body>
        <AuthProvider>
          <NavBar {...navParProps} />
          {children}
          {/* <Footer /> */}
        </AuthProvider>
        <CookieConsentBanner />
      </body>
    </html>
  )
}