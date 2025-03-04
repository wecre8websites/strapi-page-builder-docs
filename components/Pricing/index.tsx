import React, { FC } from 'react';

type PlanProps = {
  name: string,
  price: {
    monthly: number
    yearly?: number
  },
  features: string[]
}

type CTAProps = {
  text: string,
  href: string
}

export type PricingProps = {
  heading: string,
  subheading?: string,
  plans: (PlanProps & { popular?: boolean })[],
  cta: CTAProps
}

const Pricing: FC<PricingProps> = ({ heading, subheading, plans, cta }) => {
  return (<section id="pricing" className="bg-neutral-900 relative overflow-hidden py-24">
    {/* <!-- Background effects --> */}
    <div className="absolute inset-0">
      <div className="absolute top-0 -right-40 w-96 h-96 bg-feature-500 rounded-full opacity-10 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 -left-40 w-96 h-96 bg-feature-500 rounded-full opacity-10 blur-3xl animate-pulse"></div>
    </div>

    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* <!-- Section Header --> */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">{heading}</h2>
        <p className="text-neutral-400 text-lg">{subheading}</p>
      </div>

      {/* <!-- Pricing Grid --> */}
      <div className="grid lg:grid-cols-2 gap-8">
        {plans.map((plan, index) => plan.popular
          ? <PopularPlan key={`plan-${index}`} {...plan} cta={cta} />
          : <RegularPlan key={`plan-${index}`} {...plan} cta={cta} />
        )}
      </div>
    </div>
  </section>);
};

const RegularPlan: FC<PlanProps & { cta: CTAProps }> = ({ name, price, features, cta }) => {
  const hasPrice = price?.monthly || price?.yearly;
  const yearlyPricePerMonth = price?.yearly ? Math.round(price.yearly / 12) : 0;
  return (<div className="relative group">
    <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-feature-500/30 to-feature-500/0 opacity-0 group-hover:opacity-100 blur transition duration-500"></div>
    <div className="relative h-full rounded-xl backdrop-blur-xl bg-neutral-800/50 border border-neutral-700/50 p-8 transition duration-300 group-hover:border-feature-500/50">
      <h3 className="text-xl font-semibold text-white mb-4">{name}</h3>
      <div className="flex items-baseline">
        <span className="text-4xl font-bold text-white">{hasPrice ? `$${yearlyPricePerMonth || price.monthly}${yearlyPricePerMonth ? "*" : ""}` : "Free"}</span>
        <span className="text-neutral-400 ml-2">{hasPrice ? "/month" : ""}</span>
      </div>
      <ul className="space-y-4 my-8">
        {features.map((feature, index) => (<li key={`plan-${index}`} className="flex items-center text-neutral-300">
          <svg className="w-5 h-5 text-feature-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
          {feature}
        </li>))}
      </ul>
      {yearlyPricePerMonth
        ? <div className='text-center w-full'>
          <span className="text-neutral-400 text-xs">* with an annual subscription, otherwise ${price.monthly} / month.</span>
        </div>
        : null}
      <a href={cta?.href || "#"} className="block w-full text-center px-6 py-3 bg-neutral-700 text-white rounded-full hover:bg-feature-500 transition-colors">
        {cta?.text}
      </a>
    </div>
  </div>)
}

const PopularPlan: FC<PlanProps & { cta: CTAProps }> = ({ name, price, features, cta }) => {
  const hasPrice = price?.monthly || price?.yearly;
  const yearlyPricePerMonth = price?.yearly ? Math.round(price.yearly / 12) : 0;
  return (<div className="relative group lg:-mt-8">
    <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-3 py-1 pb-4 bg-feature-500 text-white text-xs font-semibold rounded-full">
      Most Popular
    </div>
    <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-feature-500 to-feature-500/50 opacity-100 blur transition duration-500"></div>
    <div className="relative h-full rounded-xl backdrop-blur-xl bg-neutral-800/50 border-2 border-feature-500 p-8">
      <h3 className="text-xl font-semibold text-white mb-4">{name}</h3>
      <div className="flex items-baseline">
        <span className="text-4xl font-bold text-white">{hasPrice ? `$${yearlyPricePerMonth || price.monthly}` : "Free"}</span>
        <span className="text-neutral-400 ml-2">{hasPrice ? "/month" : ""}{yearlyPricePerMonth ? "*" : ""}</span>
      </div>
      <ul className="space-y-4 my-7">
        {features.map((feature, index) => (<li key={`plan-${index}`} className="flex items-center text-neutral-300">
          <svg className="w-5 h-5 text-feature-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
          {feature}
        </li>))}
      </ul>
      <a href={cta?.href || "#"} className="block w-full text-center px-6 py-3 bg-feature-500 text-white rounded-full hover:bg-feature-500/90 transition-colors">
        {cta?.text}
      </a>
      {yearlyPricePerMonth
        ? <div className='absolute bottom-2 left-1/2 -translate-x-1/2 text-center w-full '>
          <span className="text-neutral-400 text-xs">* with an annual subscription, otherwise ${price.monthly} / month.</span>
        </div>
        : null}
    </div>
  </div>)
}
export default Pricing;