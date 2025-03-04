import React, { FC } from 'react';

type TestimonialsProps = {}

const Testimonials:FC<TestimonialsProps> = ({}) => {
  return (<section id="testimonials" className="bg-neutral-900 py-24 relative overflow-hidden">
    {/* <!-- Background effects --> */}
    <div className="absolute inset-0">
      <div className="absolute top-0 -right-40 w-96 h-96 bg-feature-500 rounded-full opacity-10 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 -left-40 w-96 h-96 bg-feature-500 rounded-full opacity-10 blur-3xl animate-pulse"></div>
    </div>
  
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* <!-- Section Header --> */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">What Our Users Say</h2>
        <p className="text-neutral-400 text-lg">Join thousands of satisfied creators who've transformed their content with GoEnhance AI</p>
      </div>
  
      {/* <!-- Testimonials Grid --> */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* <!-- Testimonial 1 --> */}
        <div className="relative group">
          <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-feature-500/30 to-feature-500/0 opacity-0 group-hover:opacity-100 blur transition duration-500"></div>
          <div className="relative bg-neutral-800/50 backdrop-blur-xl rounded-xl p-8 border border-neutral-700/50 hover:border-feature-500 transition duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center justify-center size-12 rounded-full bg-feature-500/10">
                <img src="https://cdn.goenhance.ai/images/static/sites/tiktok2.svg" alt="Platform Icon" className="w-6 h-6"/>
              </div>
              <div>
                <div className="text-white font-semibold">@creativemind</div>
                <div className="text-neutral-400 text-sm">TikTok Creator</div>
              </div>
            </div>
            <div className="flex gap-1 mb-4">
              <img src="https://cdn.goenhance.ai/images/static/sites/star2.svg" alt="star" className="w-5 h-5"/>
              <img src="https://cdn.goenhance.ai/images/static/sites/star2.svg" alt="star" className="w-5 h-5"/>
              <img src="https://cdn.goenhance.ai/images/static/sites/star2.svg" alt="star" className="w-5 h-5"/>
              <img src="https://cdn.goenhance.ai/images/static/sites/star2.svg" alt="star" className="w-5 h-5"/>
              <img src="https://cdn.goenhance.ai/images/static/sites/star2.svg" alt="star" className="w-5 h-5"/>
            </div>
            <p className="text-neutral-300 leading-relaxed">"GoEnhance AI has completely transformed my content creation process. The video animations are stunning and my engagement has skyrocketed!"</p>
          </div>
        </div>
  
        {/* <!-- Testimonial 2 --> */}
        <div className="relative group">
          <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-feature-500/30 to-feature-500/0 opacity-0 group-hover:opacity-100 blur transition duration-500"></div>
          <div className="relative bg-neutral-800/50 backdrop-blur-xl rounded-xl p-8 border border-neutral-700/50 hover:border-feature-500 transition duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center justify-center size-12 rounded-full bg-feature-500/10">
                <img src="https://cdn.goenhance.ai/images/static/sites/youtube2.svg" alt="Platform Icon" className="w-6 h-6"/>
              </div>
              <div>
                <div className="text-white font-semibold">@techreview</div>
                <div className="text-neutral-400 text-sm">YouTube Creator</div>
              </div>
            </div>
            <div className="flex gap-1 mb-4">
              <img src="https://cdn.goenhance.ai/images/static/sites/star2.svg" alt="star" className="w-5 h-5"/>
              <img src="https://cdn.goenhance.ai/images/static/sites/star2.svg" alt="star" className="w-5 h-5"/>
              <img src="https://cdn.goenhance.ai/images/static/sites/star2.svg" alt="star" className="w-5 h-5"/>
              <img src="https://cdn.goenhance.ai/images/static/sites/star2.svg" alt="star" className="w-5 h-5"/>
              <img src="https://cdn.goenhance.ai/images/static/sites/star2.svg" alt="star" className="w-5 h-5"/>
            </div>
            <p className="text-neutral-300 leading-relaxed">"The quality of AI-generated animations is incredible. It's become an essential tool for my YouTube content creation workflow."</p>
          </div>
        </div>
  
        {/* <!-- Testimonial 3 --> */}
        <div className="relative group">
          <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-feature-500/30 to-feature-500/0 opacity-0 group-hover:opacity-100 blur transition duration-500"></div>
          <div className="relative bg-neutral-800/50 backdrop-blur-xl rounded-xl p-8 border border-neutral-700/50 hover:border-feature-500 transition duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center justify-center size-12 rounded-full bg-feature-500/10">
                <img src="https://cdn.goenhance.ai/images/static/sites/instagram.svg" alt="Platform Icon" className="w-6 h-6"/>
              </div>
              <div>
                <div className="text-white font-semibold">@artistry</div>
                <div className="text-neutral-400 text-sm">Digital Artist</div>
              </div>
            </div>
            <div className="flex gap-1 mb-4">
              <img src="https://cdn.goenhance.ai/images/static/sites/star2.svg" alt="star" className="w-5 h-5"/>
              <img src="https://cdn.goenhance.ai/images/static/sites/star2.svg" alt="star" className="w-5 h-5"/>
              <img src="https://cdn.goenhance.ai/images/static/sites/star2.svg" alt="star" className="w-5 h-5"/>
              <img src="https://cdn.goenhance.ai/images/static/sites/star2.svg" alt="star" className="w-5 h-5"/>
              <img src="https://cdn.goenhance.ai/images/static/sites/star2.svg" alt="star" className="w-5 h-5"/>
            </div>
            <p className="text-neutral-300 leading-relaxed">"The face swap and character animation features are game-changing. My artwork has never looked more dynamic and engaging!"</p>
          </div>
        </div>
      </div>
  
      {/* <!-- Social Proof --> */}
      <div className="mt-20 text-center">
        <div className="flex flex-wrap justify-center items-center gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">660,518+</div>
            <div className="text-neutral-400">Active Users</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">4.9/5</div>
            <div className="text-neutral-400">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">1M+</div>
            <div className="text-neutral-400">Videos Created</div>
          </div>
        </div>
      </div>
  
      {/* <!-- CTA --> */}
      <div className="mt-16 text-center">
        <a href="#" className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-black bg-feature-500 hover:bg-feature-500/90 transition-all duration-300">
          Join Our Community
        </a>
        <p className="mt-4 text-neutral-400">Start creating amazing content today</p>
      </div>
    </div>
  </section>);
};

export default Testimonials;