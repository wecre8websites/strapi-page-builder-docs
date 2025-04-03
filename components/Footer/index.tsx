import { FC } from 'react';

type FooterProps = {}

const Footer: FC<FooterProps> = ({ }) => {
  return (<footer id="footer" className="bg-neutral-900 border-t border-neutral-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      {/* <!-- Footer Grid --> */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {/* <!-- Logo & Description --> */}
        <div className="col-span-2 lg:col-span-2">
          <a href="#" className="block mb-6">
            <img src="https://cdn.goenhance.ai/images/static/logo/enhance-logo-name.png" alt="GoEnhance" className="h-8 w-auto" />
          </a>
          <p className="text-neutral-300 text-sm mb-6">AI Video &amp; Image Art Tool For Human Imagination</p>
        </div>

        {/* <!-- Product Links --> */}
        <div>
          <h3 className="text-white font-medium mb-4">PRODUCT</h3>
          <ul className="space-y-3">
            <li><a href="#" className="text-neutral-300 hover:text-feature-500 text-sm">Video to Video</a></li>
            <li><a href="#" className="text-neutral-300 hover:text-feature-500 text-sm">Video Face Swap</a></li>
            <li><a href="#" className="text-neutral-300 hover:text-feature-500 text-sm">Text to Image</a></li>
            <li><a href="#" className="text-neutral-300 hover:text-feature-500 text-sm">AI Video Generator</a></li>
            <li><a href="#" className="text-neutral-300 hover:text-feature-500 text-sm">Character Animation</a></li>
            <li><a href="#" className="text-neutral-300 hover:text-feature-500 text-sm">Image Enhance</a></li>
          </ul>
        </div>

        {/* <!-- Resources Links --> */}
        <div>
          <h3 className="text-white font-medium mb-4">RESOURCES</h3>
          <ul className="space-y-3">
            <li><a href="#" className="text-neutral-300 hover:text-feature-500 text-sm">Blog</a></li>
            <li><a href="#" className="text-neutral-300 hover:text-feature-500 text-sm">Tools</a></li>
            <li><a href="#" className="text-neutral-300 hover:text-feature-500 text-sm">Affiliate</a></li>
            <li><a href="#" className="text-neutral-300 hover:text-feature-500 text-sm">Tutorials</a></li>
            <li><a href="#" className="text-neutral-300 hover:text-feature-500 text-sm">FAQ</a></li>
          </ul>
        </div>

        {/* <!-- Connect Links --> */}
        <div>
          <h3 className="text-white font-medium mb-4">CONNECT</h3>
          <ul className="space-y-3">
            <li><a href="#" className="text-neutral-300 hover:text-feature-500 text-sm flex items-center gap-2">
              <img src="https://cdn.goenhance.ai/images/static/sites/x2.svg" alt="X" className="w-4 h-4" />
              X
            </a></li>
            <li><a href="#" className="text-neutral-300 hover:text-feature-500 text-sm flex items-center gap-2">
              <img src="https://cdn.goenhance.ai/images/static/sites/youtube2.svg" alt="YouTube" className="w-4 h-4" />
              YouTube
            </a></li>
            <li><a href="#" className="text-neutral-300 hover:text-feature-500 text-sm flex items-center gap-2">
              <img src="https://cdn.goenhance.ai/images/static/sites/instagram.svg" alt="Instagram" className="w-4 h-4" />
              Instagram
            </a></li>
            <li><a href="#" className="text-neutral-300 hover:text-feature-500 text-sm flex items-center gap-2">
              <img src="https://cdn.goenhance.ai/images/static/sites/facebook.svg" alt="Facebook" className="w-4 h-4" />
              Facebook
            </a></li>
          </ul>
        </div>
      </div>

      {/* <!-- Bottom Bar --> */}
      <div className="mt-12 pt-8 border-t border-neutral-800">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-neutral-300 text-sm">
            Copyright © 2024 GoEnhance
          </div>
          <div className="flex items-center gap-8">
            <a href="#" className="text-neutral-300 hover:text-feature-500 text-sm">Terms</a>
            <a href="#" className="text-neutral-300 hover:text-feature-500 text-sm">Privacy</a>
            <select className="bg-neutral-800 border border-neutral-700 rounded-lg text-neutral-300 text-sm px-3 py-1">
              <option value="en">English</option>
              <option value="zh">中文</option>
              <option value="ja">日本語</option>
              <option value="ko">한국어</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </footer>);
};

export default Footer;