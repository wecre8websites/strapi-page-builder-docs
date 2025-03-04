'use client';
import React, { FC, useState } from 'react';

export type FAQItemProps = {
  heading: string,
  content: string,
  defaultOpen?: boolean
}

const FAQItem: FC<FAQItemProps> = ({ heading, content, defaultOpen }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen || false);
  return (<div className="group">
    <div className="relative bg-neutral-800/50 backdrop-blur-xl rounded-xl p-6 border border-neutral-700/50 hover:border-feature-500 transition-all duration-300" onClick={() => setIsOpen(!isOpen)}>
      <h3 className="text-lg font-semibold text-white flex justify-between items-center cursor-pointer">
        {heading}
        <svg className="w-6 h-6 text-feature-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </h3>
      <p className={`text-neutral-400 transition transition-[maxHeight] ${isOpen ? "mt-4 max-h-16" : "max-h-0 opacity-0"}`}>{content}</p>
    </div>
  </div>);
};

export default FAQItem;