import React, { useState } from 'react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'How are the macro values calculated?',
      a: 'All our recipes are created by certified sports nutritionists. Raw ingredients are weighed before cooking, and nutritional values per serving are calculated using standardized food databases.'
    },
    {
      q: 'Can I pause my subscription when traveling?',
      a: 'Yes! You can pause your subscription anytime from your dashboard. Paused days are automatically added to your remaining balance.'
    },
    {
      q: 'Which areas in Hyderabad do you deliver to?',
      a: 'We currently deliver to Hitec City, Gachibowli, Madhapur, Financial District, Kondapur, Jubilee Hills, and Banjara Hills.'
    },
    {
      q: 'What oil do you use for cooking?',
      a: 'We use minimal cold-pressed mustard oil, extra virgin olive oil, or pure A2 ghee. We strictly avoid refined seed oils.'
    },
    {
      q: 'How does meal customization work?',
      a: 'When building your meal plan or ordering a single dish, click "Customize" to adjust portion sizes, spice levels, remove onions/garlic, or add extra protein portions.'
    }
  ];

  return (
    <div className="max-w-3xl mx-auto py-10 space-y-8">
      <div className="text-center space-y-2">
        <span className="text-xs font-bold text-primary uppercase tracking-widest block">Knowledge Base</span>
        <h1 className="font-display font-bold text-3xl text-on-surface">Frequently Asked Questions</h1>
        <p className="text-xs text-outline">Find answers to common questions about Swadfit macros, delivery, and plans.</p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className="bg-surface-container-lowest border border-surface-container rounded-2xl overflow-hidden shadow-soft">
              <button
                onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                className="w-full p-5 text-left font-display font-bold text-base text-on-surface flex items-center justify-between"
              >
                <span>{faq.q}</span>
                <span className="material-symbols-outlined text-outline">
                  {isOpen ? 'expand_less' : 'expand_more'}
                </span>
              </button>

              {isOpen && (
                <div className="p-5 pt-0 text-xs text-outline leading-relaxed border-t border-surface-container bg-surface-container-low/50">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
