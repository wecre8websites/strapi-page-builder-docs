import Image from 'next/image'
import { Footer, Navbar } from 'nextra-theme-docs'
import "nextra-theme-docs/style.css"
import { Banner, Head } from 'nextra/components'
import AuthProvider from '../context/AuthContext'
import "../firebase/firebaseConfig"
import "./globals.css"
export const metadata = {
  // Define your metadata here
  // For more information on metadata API, see: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
}

const banner = <Banner storageKey="some-key">Page Builder 1.0 is now available 🎉</Banner>
const navbar = (
  <Navbar
    logo={<div style={{ display: "flex", alignItems: "center", gap: "1rem" }}><Image src="/pagebuilder_logo.png" alt="Page Builder" width={50} height={50} /><span>Page Builder</span></div>}

  // ... Your additional navbar options
  />
)
const footer = <Footer>MIT {new Date().getFullYear()} © Nextra.</Footer>

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
      <Head
      // ... Your additional head options
      >
        {/* Your additional tags should be passed as `children` of `<Head>` element */}
      </Head>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}