import React, { FC, ReactNode } from 'react';

export type UseCasesProps = {
  heading: string,
  subheading?: string,
  useCases: {
    icon?: ReactNode,
    title: string,
    features: string[]
  }[],
  cta: {
    text: string,
    href: string
  },
  trustMessage?: string
}

const UseCases: FC<UseCasesProps> = ({ heading, subheading, useCases, cta, trustMessage }) => {
  return (<section id="use_cases" className="bg-neutral-900 py-24">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* <!-- Section Header --> */}
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">{heading}</h2>
        <p className="text-neutral-400 text-lg max-w-3xl mx-auto">{subheading}</p>
      </div>

      {/* <!-- Use Cases Grid --> */}
      <div className="grid md:grid-cols-3 gap-8">
        {useCases?.map((useCase, index) => (<div key={`usecases-${index}`} className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-feature-500/20 to-feature-500/0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
          <div className="relative bg-neutral-800/50 backdrop-blur-sm border border-neutral-700 rounded-xl p-8 hover:border-feature-500 transition-all duration-300">
            <div className="flex items-center gap-4 mb-6">
              {useCase.icon}
              {/* <div className="flex-shrink-0 w-12 h-12 bg-feature-500/10 rounded-lg flex items-center justify-center">
                <img src="https://cdn.goenhance.ai/images/static/sites/tiktok2.svg" alt="TikTok" className="w-6 h-6" />
              </div> */}
              <h3 className="text-xl font-semibold text-white">{useCase.title}</h3>
            </div>
            <ul className="space-y-4 text-neutral-400">
              {useCase.features.map((feature, index) => (<li key={`usecases-${index}`} className="flex items-center gap-2">
                <svg className="w-5 h-5 text-feature-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                {feature}
              </li>))}
            </ul>
          </div>
        </div>))}
      </div>

      {/* <!-- CTA Section --> */}
      <div className="mt-16 text-center">
        <a href={cta?.href || "#"} className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-black bg-feature-500 hover:bg-feature-500/90 transition-all duration-300">
          {cta?.text}
        </a>
        <p className="mt-4 text-neutral-400">{trustMessage}</p>
      </div>
    </div>
  </section >);
};

export default UseCases;