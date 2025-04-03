import { FC } from 'react';

export type HowItWorksProps = {
  heading: string,
  subheading?: string,
  steps: {
    heading: string,
    content: string
  }[],
  cta: {
    text: string,
    href: string
  }
  trustMessage?: string
}

const HowItWorks: FC<HowItWorksProps> = ({ heading, subheading, steps, cta, trustMessage }) => {
  return (<section id="how_it_works" className="bg-neutral-800 py-24">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* <!-- Section Header --> */}
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">{heading}</h2>
        <p className="text-neutral-300 text-lg max-w-3xl mx-auto">{subheading}</p>
      </div>

      {/* <!-- Steps Grid --> */}
      <div className="grid md:grid-cols-3 gap-8">
        {steps?.map((step, index) => (<div key={`howitworks-${index}`} className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-feature-500/20 to-feature-500/0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
          <div className="relative bg-neutral-900/50 backdrop-blur-sm border border-neutral-700 rounded-xl p-8 hover:border-feature-500 transition-all duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-shrink-0 w-12 h-12 bg-feature-500/10 rounded-lg flex items-center justify-center">
                <span className="text-feature-500 text-2xl font-bold">{index + 1}</span>
              </div>
              <h3 className="text-xl font-semibold text-white">{step.heading}</h3>
            </div>
            <p className="text-neutral-300">{step.content}</p>
          </div>
        </div>))}
      </div>

      {/* <!-- CTA Section --> */}
      <div className="mt-16 text-center">
        <a href={cta?.href || "#"} className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-feature-500 hover:bg-feature-500/90 transition-all duration-300">
          {cta?.text}
        </a>
        <p className="mt-4 text-neutral-300">{trustMessage}</p>
      </div>
    </div>
  </section>);
};

export default HowItWorks;