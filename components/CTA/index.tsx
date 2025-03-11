import React, { FC } from 'react';

export type CTAProps = {
  heading: string,
  subheading?: string,
  ctas: {
    text: string,
    href: string
    external?: boolean
  }[],
  trustMessage?: string
}

const CTA: FC<CTAProps> = ({ heading, subheading, ctas, trustMessage }) => {
  return (<section id="cta" className="bg-neutral-900 py-24 relative overflow-hidden">
    {/* <!-- Background Effects --> */}
    <div className="absolute inset-0">
      <div className="absolute top-0 -right-40 w-96 h-96 bg-feature-500 rounded-full opacity-10 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 -left-40 w-96 h-96 bg-feature-500 rounded-full opacity-10 blur-3xl animate-pulse"></div>
    </div>

    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative bg-neutral-800/50 backdrop-blur-xl rounded-2xl border border-neutral-700 p-8 sm:p-12 lg:p-16 overflow-hidden">
        {/* <!-- Decorative Elements --> */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 size-40 bg-feature-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 size-40 bg-feature-500/20 rounded-full blur-3xl"></div>

        {/* <!-- Content --> */}
        <div className="relative max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            {heading}
          </h2>
          <p className="text-lg sm:text-xl text-neutral-400 mb-10">
            {subheading}
          </p>

          {/* <!-- CTA Buttons --> */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            {ctas?.map((cta, index) => index === 0
              ? (<a key={`ctas-${index}`} href={cta?.href || "#"} target={cta?.external ? "_blank" : ""} className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-full text-white bg-feature-500 hover:bg-feature-500/90 transition-all duration-300">
                {cta?.text}
                <svg className="ml-2 size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </a>)
              : (<a key={`ctas-${index}`} href={cta?.href || "#"} target={cta?.external ? "_blank" : ""} className="inline-flex items-center justify-center px-8 py-4 border border-feature-500 text-lg font-medium rounded-full text-white hover:bg-feature-500/10 transition-all duration-300">
                {cta?.text}
              </a>))
            }
          </div>

          {/* <!-- Additional Info --> */}
          <div className="mt-8 text-sm text-neutral-400">
            {trustMessage}
          </div>
        </div>
      </div>
    </div>
  </section>);
};

export default CTA;