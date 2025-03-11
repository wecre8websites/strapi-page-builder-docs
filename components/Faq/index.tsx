import React, { FC } from 'react';
import FAQItem, { FAQItemProps } from './FAQItem';

export type FAQProps = {
  heading: string,
  subheading?: string,
  items: FAQItemProps[]
  footer: {
    heading: string,
    content: string
    cta: {
      text: string,
      href: string,
      external?: boolean
    }
  }
}

const FAQ: FC<FAQProps> = ({ heading, subheading, items, footer }) => {
  return (<section id="faq" className="bg-neutral-900 py-24 relative overflow-hidden">
    {/* <!-- Background Effects --> */}
    <div className="absolute inset-0">
      <div className="absolute top-0 -right-40 w-96 h-96 bg-feature-500 rounded-full opacity-10 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 -left-40 w-96 h-96 bg-feature-500 rounded-full opacity-10 blur-3xl animate-pulse"></div>
    </div>

    <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* <!-- Section Header --> */}
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">{heading}</h2>
        <p className="text-neutral-400 text-lg">{subheading}</p>
      </div>

      {/* <!-- FAQ Items --> */}
      <div className="space-y-6">
        {items?.map((item, index) => <FAQItem key={`faq-${index}`} {...item} />)}
      </div>

      {/* <!-- Still Have Questions --> */}
      <div className="mt-16 text-center">
        <h3 className="text-xl font-semibold text-white mb-4">{footer?.heading}</h3>
        <p className="text-neutral-400 mb-8">{footer.content}</p>
        <a href={footer?.cta?.href || "#"} target={footer?.cta?.external ? "_blank" : undefined} className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-feature-500 hover:bg-feature-500/90 transition-all duration-300">
          {footer?.cta?.text}
        </a>
      </div>
    </div>
  </section>);
};

export default FAQ;