'use client';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React, { FC, useMemo } from 'react';

type NavLink = {
  name: string;
  href: string;
  external?: boolean;
  button?: boolean;
  active?: boolean;
}

type NavComponent = {
  component: React.ReactNode;
}

export type NavigationItem = NavLink | NavComponent;

export type NavBarProps = {
  logo: {
    src: string;
    alt?: string;
    text: string;
  }
  navigation: NavigationItem[]
}

const NavBar: FC<NavBarProps> = ({ logo, navigation }) => {
  const pathName = usePathname();
  const hidden = useMemo(() => { return pathName.indexOf("/docs") === 0 }, [pathName]);
  const [navOpen, setNavOpen] = React.useState(false);
  return (<nav className={`fixed top-0 inset-x-0 z-50 nav-blur bg-neutral-800/30 border-b border-neutral-700/50 ${hidden ? "hidden" : ""}`}>
    <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        {/* <!-- Logo --> */}
        <a href="#" className="flex-shrink-0 flex gap-2 text-2xl font-bold text-white items-center">
          <div className="h-12 w-12 relative">
            <Image src={logo.src} alt={logo.alt || logo.text} layout="fill" objectFit="contain" />
          </div>
          {logo.text}
        </a>

        {/* <!-- Desktop Navigation --> */}
        <div className="hidden md:flex items-center space-x-8">
          {navigation.map((item, index) => {
            return item.hasOwnProperty("component")
              ? <div key={`navbar-links-${index}`}>{(item as NavComponent).component}</div>
              : <a
                key={`navbar-links-${index}`}
                href={(item as NavLink).href}
                className={(item as NavLink)?.button ? "bg-feature-500 text-white px-6 py-2 rounded-full hover:bg-feature-500/90" : "text-neutral-300 hover:text-white"}
                // target={item?.external ? "_blank" : undefined}
                rel={(item as NavLink)?.external ? "noopener noreferrer" : undefined}
              >
                {(item as NavLink).name}
              </a>
          })}
        </div>

        {/* <!-- Mobile Menu Button --> */}
        <button type="button" onClick={() => setNavOpen(!navOpen)} className="md:hidden cursor-pointer" aria-label='Menu'>
          <label htmlFor="nav-toggle" className="md:hidden cursor-pointer">
            <svg className="menu-icon w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path className="menu-icon" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              <path className="close-icon hidden" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </label>
        </button>

        {/* <!-- Mobile Menu --> */}
        <div className={`mobile-menu ${navOpen ? "" : "hidden"} md:hidden absolute top-full left-0 right-0 bg-neutral-800/95 border-t border-neutral-700/50`}>
          <div className="px-4 pt-2 pb-6 space-y-4 text-center flex flex-col">
            {navigation.map((item, index) => {
              return item.hasOwnProperty("component")
                ? <div key={`navbar-links-${index}`}>{(item as NavComponent).component}</div>
                : <a
                  key={`navbar-links-${index}`}
                  href={(item as NavLink).href}
                  className={(item as NavLink)?.button ? "inline-block bg-feature-500 text-white px-6 py-2 rounded-full hover:bg-feature-500/90" : "text-neutral-300 hover:text-white"}
                  // target={item?.external ? "_blank" : undefined}
                  rel={(item as NavLink)?.external ? "noopener noreferrer" : undefined}
                >
                  {(item as NavLink).name}
                </a>
            })}
          </div>
        </div>
      </div>
    </div>
  </nav>);
};

export default NavBar;