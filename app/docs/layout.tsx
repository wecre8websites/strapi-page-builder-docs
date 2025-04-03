import "./globals.docs.css"
import Image from 'next/image'
import { Footer, Layout as NextraLayout, Navbar } from 'nextra-theme-docs'
import { Banner, Head, } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import AuthProvider from '../../context/AuthContext'
import "../../firebase/firebaseConfig"
import Link from "next/link"
import Github_Logo from "@/components/Github_logo"
import Metadata from "next"

export const metadata: Metadata = {
  metadataBase: new URL('https://pagebuilder.wc8.io'),
  alternates: {
    canonical:"/docs"
  },
  title: 'Page Builder for Strapi | Documentation',
  description: "Page Builder is a modular visual page editor for Strapi CMS for websites build in React.",
  openGraph: {
    images: ['/pagebuilder_logo.png'],
  },
}

const banner = <Banner storageKey="some-key">Page Builder 1.0 is now available 🎉</Banner>
const navbar = (
  <Navbar
    className="bg-white dark:bg-neutral-900"
    logo={<div style={{ display: "flex", alignItems: "center", gap: "1rem" }}><Image src="/pagebuilder_logo.png" alt="Page Builder" width={50} height={50} /><span>Page Builder for Strapi</span></div>}
    // logoLink={"https://pagebuilder.wc8.io"}
    projectLink={"https://github.com/wecre8websites/strapi-page-builder"}
    projectIcon={<Github_Logo />}

  // ... Your additional navbar options
  />
)
const footer = <Footer>MIT {new Date().getFullYear()} ©&nbsp;<Link href="https://www.wecre8websites.com">wecre8websites</Link>.</Footer>


export default async function Layout({ children }: { children: React.ReactNode; }) {
  return (
    <AuthProvider>
      <NextraLayout
        banner={banner}
        navbar={navbar}
        pageMap={await getPageMap("/docs")}
        footer={footer}
        themeSwitch={{
          dark: 'Dark mode',
          light: 'Light mode',
          system: 'System default'
        }}
      // ... Your additional layout options
      >
        {children}
      </NextraLayout>
    </AuthProvider>
  )
}