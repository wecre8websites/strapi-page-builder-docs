import React, { FC, ReactNode } from 'react';

type CTALink = {
  text: string,
  href: string
}

type CTAComponent = {
  component: ReactNode
}

type CTAProps = CTALink | CTAComponent

type ImageFeatureProps = {
  forceDirection?: 'left' | 'right',
  heading: string,
  content: string,
  cta: CTAProps
  images: {
    src: string,
    alt: string
  }[]
}

type VideoFeatureProps = {
  forceDirection?: 'left' | 'right',
  heading: string,
  content: string,
  cta: CTAProps
  video: {
    src: string
  }
}

export type FeaturesProps = { features: (ImageFeatureProps | VideoFeatureProps)[] }

const Features: FC<FeaturesProps> = ({ features }) => {
  return (<section id="features" className="bg-neutral-900 py-24">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-24">
      {features?.map((feature, index) => {
        let isReversed = index % 2 === 0;
        if (feature.hasOwnProperty('forceDirection')) {
          isReversed = (feature as ImageFeatureProps).forceDirection === 'left';
        }
        return feature.hasOwnProperty('video')
          ? <VideoFeature key={`features-${index}`} {...(feature as VideoFeatureProps)} isReversed={isReversed} />
          : <ImageFeature key={`features-${index}`} {...(feature as ImageFeatureProps)} isReversed={isReversed} />
      })}
    </div>
  </section>);
};

const VideoFeature: FC<VideoFeatureProps & { isReversed: boolean }> = ({ heading, content, video, cta, isReversed }) => {
  return <div>
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      <div className={`text-center  ${isReversed ? "lg:text-right lg:order-2" : "lg:text-left"}`}>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">{heading}</h2>
        <p className="text-neutral-400 text-lg mb-8">
          {content}
        </p>
        {cta.hasOwnProperty("component")
          ? (cta as CTAComponent).component
          : <a href={(cta as CTALink).href} className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-black bg-feature-500 hover:bg-feature-500/90">
            {(cta as CTALink).text}
          </a>}
      </div>
      <div className={`relative rounded-xl overflow-hidden ${isReversed ? "lg:order-1" : ""}`}>
        <video className="w-full h-full object-contain rounded" autoPlay={true} loop={true} muted={true} playsInline={true}>
          <source src={video.src} type="video/mp4" />
        </video>
      </div>
    </div>
  </div>
}

const ImageFeature: FC<ImageFeatureProps & { isReversed: boolean }> = ({ heading, content, cta, images, isReversed }) => {
  return <div>
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      <div className={`text-center ${isReversed ? "lg:text-right lg:order-2" : "lg:text-left"}`}>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">{heading}</h2>
        <p className="text-neutral-400 text-lg mb-8">
          {content}
        </p>
        {cta.hasOwnProperty("component")
          ? (cta as CTAComponent).component
          : <a href={(cta as CTALink).href} className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-black bg-feature-500 hover:bg-feature-500/90">
            {(cta as CTALink).text}
          </a>}
      </div>
      <div className={`grid grid-cols-2 gap-4 ${isReversed ? "lg:order-1" : ""}`}>
        {images?.map((image, index) => (
          <div key={index}>
            <img src={image.src} alt={image.alt} className="w-full h-full rounded" />
          </div>
        ))}
      </div>
    </div>
  </div>
}

export default Features;