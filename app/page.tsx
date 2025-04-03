import CTA, { CTAProps } from '@/components/CTA';
import FAQ, { FAQProps } from '@/components/Faq';
import Features, { FeaturesProps } from '@/components/Features';
import HowItWorks, { HowItWorksProps } from '@/components/HowItWorks';
import Pricing, { PricingProps } from '@/components/Pricing';
import UseCases, { UseCasesProps } from '@/components/UseCases';
import VideoHero, { VideoHeroProps } from '@/components/VideoHero';
import Metadata from 'next';
import { FC } from 'react';

export const revalidate = 3601;

type PageProps = {
  children: React.ReactNode;
}


export const metadata: Metadata = {
  metadataBase: new URL('https://pagebuilder.wc8.io'),
  title: 'Page Builder for Strapi',
  description: "Visually edit your Strapi content. Drag and drop your own custom components and dynamically populate them with your CMS content.",
  openGraph: {
    images: ['/pagebuilder_logo.png'],
  },
}

const getNpmDownloads = async () => {
  const today = new Date();
  const formattedToday = today.toISOString().split('T')[0];
  const response = await fetch(`https://api.npmjs.org/downloads/point/2025-01-01:${formattedToday}/@wecre8websites/strapi-page-builder`);
  const data = await response.json();
  return data.downloads;
}

const videoHeroProps: Omit<VideoHeroProps, "valuePropositions"> = {
  heading: "Visually edit your Strapi content",
  subheading: "Drag and drop your own custom components and dynamically populate them with your CMS content.",
  ctas: [
    {
      text: "Sign up for free",
      href: "/account"
    },
    {
      text: "Read the docs",
      href: "/docs"
    }
  ],
  video: {
    src: "/pagebuilder_video.mp4",
    poster:"/pagebuilder_video_poster.jpg"
  }
}

const featuresProps: FeaturesProps = {
  features: [
    {
      heading: "Add a drag & drop editor to your Strapi CMS",
      content: "Bring your Strapi content to life with a visual editor. Build and assign templates to your Strapi content-types and reuse them over and over and over again. ",
      // cta: {
      //   text: "Read the docs",
      //   href: "/docs"
      // },
      video: {
        src: "/pagebuilder_video_drag_and_drop.mp4"
      }
    },
    {
      heading: "Give creative control to your content editors",
      content: "Let your content editors create and update content without needing to know how to code. They can add, remove, and rearrange components with ease.",
      // cta: {
      //   text: "Read the docs",
      //   href: "/docs"
      // },
      video: {
        src: "/pagebuilder_video_creative_control.mp4"
      }
    },
    {
      heading: "Localize your content",
      content: "Create and manage localized content in multiple languages. Use Strapi's internationalization feature to create and manage localized templates in multiple languages.",
      // cta: {
      //   text: "Read the docs",
      //   href: "/docs"
      // },
      video: {
        src: "/pagebuilder_video_localize.mp4",
      },
    },
    {
      heading: "Give only the permissions needed",
      content: "Use Strapi's Role-based access control to restrict permissions to only those that are needed for each team member. Read-only, edit and modify permissions allow for granualar control and protects your templates.",
      // cta: {
      //   text: "Read the docs",
      //   href: "/docs"
      // },
      images: [
        {
          src: "/pagebuilder_permissions_1.png",
          alt: "Page Builder RBAC 1"
        },
        {
          src: "/pagebuilder_permissions_2.png",
          alt: "Page Builder RBAC 2"
        }
      ]
    },
  ]
}

const howItWorksProps: HowItWorksProps = {
  heading: "Get started in minutes",
  subheading: "Follow these simple steps to get started with Page Builder.",
  steps: [
    {
      heading: "Clone the Strapi template",
      content: "Our Strapi template comes with Page Builder pre-installed. Clone the template, set up an admin account and add your Page Builder API key."
    },
    {
      heading: "Clone the Next.js template",
      content: "Our Next.js template comes a selection of premade components, localization support and, of course Page Builder pre-installed. Clone the template and add your API keys."
    },
    {
      heading: "Create your first template",
      content: "Within Page Builder, choose your content type, content and locale then, drag and drop your components and assign your template to your content type."
    }
  ],
  cta: {
    text: "Get your free API key",
    href: "/account"
  }
}

const useCasesProps: Omit<UseCasesProps, "trustMessage"> = {
  heading: "The perfect solution, no matter your role",
  subheading: "Page Builder is the perfect solution for developers, content editors, and agencies.",
  useCases: [
    {
      title: "Content Editors",
      features: [
        "No coding required",
        "Drag and drop components",
        "Update content quickly"
      ]
    },
    {
      title: "Developers",
      features: [
        "Quick installation and setup",
        "Build custom components",
        "Connect your CMS data"
      ]
    },
    {
      title: "Agencies",
      features: [
        "Gives your clients content freedom",
        "Focus on solutions, not content entry",
        "Easy to deploy and maintain"
      ]
    },
  ],
  cta: {
    text: "Quick start guide",
    href: "/docs#quick-start"
  },
}

const pricingProps: PricingProps = {
  heading: "Simple, Transparent Pricing",
  subheading: "Choose the perfect plan for your creative needs",
  plans: [
    {
      name: "Development",
      price: {
        monthly: 0
      },
      features: [
        "Visually edit your website with live preview",
        "Build templates with custom components",
        "Save and reuse localized templates",
      ]
    },
    {
      name: "Production",
      price: {
        monthly: 34,
        yearly: 300
      },
      features: [
        "All features from Development in addition to",
        "Deploy for use in production environments",
        "Role-based access control permissions for users",
        "No commitment - cancel anytime"
      ],
      popular: true
    },
  ],
  cta: {
    text: "Get Started",
    href: "/account"
  }
}


const faqProps: FAQProps = {
  heading: "Frequently Asked Questions",
  subheading: "Everything you need to know about Page Builder",
  items: [
    {
      heading: "Can I cancel my subscription?",
      content: "Yes, you can cancel your subscription at any time. Your subscription will remain active until the end of your billing cycle.",
      defaultOpen: true
    },
    {
      heading: "What happens if I cancel my subscription?",
      content: "If you cancel your subscription, your account will be downgraded to the free tier. You will still have access to your account and any templates you have created.",
    },
    {
      heading: "Can I change my subscription?",
      content: "Yes, you can change your subscription at any time. If you upgrade, you will be charged the difference between your current plan and the new plan. If you downgrade, your account will be downgraded at the end of your billing cycle.",
    },
    {
      heading: "Do you offer refunds?",
      content: "We do not offer refunds. If you cancel your subscription, you will not be charged again. You will have access to your account until the end of your billing cycle.",
    },
    {
      heading: "Can I try Page Builder for free?",
      content: "Yes, you can try Page Builder for free. Sign up for a free API key and get started building your first template.",
    },
    {
      heading: "Do you offer support?",
      content: "Support is available through the issues section of our Github repo.",
    },
  ],
  footer: {
    heading: "Still have questions?",
    content: "Can't find the answer you're looking for?",
    cta: {
      text: "Get support",
      href: "https://github.com/wecre8websites/strapi-page-builder/issues",
      external: true
    }
  }
}

const ctaProps: Omit<CTAProps, "subheading"> = {
  heading: "Get Started Today",
  ctas: [
    {
      text: "Sign up for free",
      href: "/account"
    },
    {
      text: "Read the docs",
      href: "/docs"
    }
  ],
  trustMessage: "No credit card required · Cancel anytime"
}

const Page: FC<PageProps> = async ({ children }) => {
  const downloads = await getNpmDownloads();
  const videoHeroValueProps = [
    "Quick installation and setup"
  ]
  console.log("downloads", downloads);
  if (downloads > 100) videoHeroValueProps.push(`Trusted by over ${downloads} developers`);
  const useCasesTrustMessage = downloads > 100 ? `No credit card required - Trusted by over ${downloads} developers and content editors.` : "No credit card required - Sign up for free";
  return (
    <>
      <main id="main" className="bg-black overflow-x-hidden">
        <VideoHero
          {...videoHeroProps}
          valuePropositions={videoHeroValueProps} />
        <Features {...featuresProps} />
        <HowItWorks {...howItWorksProps} />
        <UseCases {...useCasesProps} trustMessage={useCasesTrustMessage} />
        <Pricing {...pricingProps} />
        {/* <Testimonials /> */}
        <FAQ {...faqProps} />
        <CTA
          {...ctaProps}
          subheading={`${downloads >= 1000 ? `Join ${downloads}+ developers who are already using` : "Start using"} Page Builder to create stunning, easy to maintain websites. Sign up for free with no commitment.`}
        />
      </main>
    </>
  );
};

export default Page;