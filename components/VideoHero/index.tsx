import React, { FC } from 'react';

export type VideoHeroProps = {
  heading: string
  subheading?: string
  ctas: {
    text: string
    href: string
    external?: boolean
  }[]
  valuePropositions: string[]
  video: {
    src: string
    poster?: string
  }
}

const VideoHero: FC<VideoHeroProps> = ({ heading, subheading, ctas, valuePropositions, video }) => {
  return (<div className="relative bg-gradient-to-b from-neutral-800 to-neutral-900 min-h-screen pt-20">
    <div className="absolute inset-0 overflow-hidden">
      <video className="absolute top-0 left-0 w-full h-full object-cover opacity-30" poster={video?.poster} autoPlay={true} loop={true} muted={true} playsInline={true}>
        <source src={video.src} type="video/mp4" />
      </video>
    </div>

    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          {heading}
        </h1>
        <p className="text-xl md:text-2xl text-neutral-300 mb-8 max-w-3xl mx-auto">
          {subheading}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
        <div className="mt-6 text-neutral-400">
          {valuePropositions?.[0]}
        </div>
        <div className="mt-8 text-neutral-300">
          {valuePropositions?.[1]}
        </div>
      </div>
    </div>
  </div>);
};

export default VideoHero;