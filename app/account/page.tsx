import Account from '@/components/Account';
import { CTAProps } from '@/components/CTA';
import { FAQProps } from '@/components/Faq';
import { FeaturesProps } from '@/components/Features';
import { HowItWorksProps } from '@/components/HowItWorks';
import { PricingProps } from '@/components/Pricing';
import { UseCasesProps } from '@/components/UseCases';
import { VideoHeroProps } from '@/components/VideoHero';
import React, { FC } from 'react';

type PageProps = {
  children: React.ReactNode;
}

const Page: FC<PageProps> = async ({ children }) => {
  return (
    <main id="main" className="bg-black overflow-x-hidden">
      <Account />
    </main>
  );
};

export default Page;