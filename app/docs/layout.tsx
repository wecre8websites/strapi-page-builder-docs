import "./globals.docs.css"
import "nextra-theme-docs/style.css"
import Image from 'next/image'
import { Footer, Layout as NextraLayout, Navbar } from 'nextra-theme-docs'
import { Banner, Head, } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import AuthProvider from '../../context/AuthContext'
import "../../firebase/firebaseConfig"
import Link from "next/link"
import Github_Logo from "@/components/Github_logo"
export const metadata = {
  // Define your metadata here
  // For more information on metadata API, see: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
}

const banner = <Banner storageKey="some-key">Page Builder 1.0 is now available 🎉</Banner>
const navbar = (
  <Navbar
    logo={<div style={{ display: "flex", alignItems: "center", gap: "1rem" }}><Image src="/pagebuilder_logo.png" alt="Page Builder" width={50} height={50} /><span>Page Builder</span></div>}
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
        docsRepositoryBase="https://github.com/shuding/nextra/tree/main/docs"
        footer={footer}
      // ... Your additional layout options
      >
        {children}
      </NextraLayout>
    </AuthProvider>
  )
}