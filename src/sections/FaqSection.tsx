import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Plus, Minus, MessageCircleQuestion } from 'lucide-react';
import FadeIn from '../components/FadeIn';

const FAQ_DATA = [
  {
    question: 'What is your typical project timeline?',
    answer: 'It depends entirely on the scope of the project. However, most initial strategy and discovery phases take 1-2 weeks, followed by ongoing monthly execution for marketing and social media management.',
  },
  {
    question: 'Do you handle both organic and paid social media?',
    answer: 'Yes! I provide full-funnel marketing solutions. This includes organic community management, content creation, as well as highly targeted paid campaigns on platforms like Meta and Google Ads.',
  },
  {
    question: 'Are you open to full-time roles or freelance only?',
    answer: 'I am currently open to exploring both full-time positions with the right team, as well as taking on select freelance and contract projects.',
  },
  {
    question: 'How do we get started?',
    answer: 'Simply reach out via the contact information at the bottom of the page! We will schedule a quick discovery call to discuss your goals and see if we are a good fit.',
  }
];

const EASE = [0.25, 0.1, 0.25, 1] as const;

function FaqItem({ 
  item, 
  index, 
  isOpen, 
  onToggle 
}: { 
  item: typeof FAQ_DATA[0]; 
  index: number; 
  isOpen: boolean; 
  onToggle: () => void 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: EASE }}
      className="border-b"
      style={{ borderColor: 'rgba(215,226,234,0.1)' }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-6 sm:py-8 text-left focus:outline-none group"
      >
        <span 
          className="font-bold uppercase tracking-wide pr-6 transition-colors duration-300"
          style={{ 
            fontSize: 'clamp(1rem, 2vw, 1.3rem)', 
            color: isOpen ? '#34d399' : '#D7E2EA',
            opacity: isOpen ? 1 : 0.8
          }}
        >
          {item.question}
        </span>
        <div 
          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
          style={{ 
            background: isOpen ? 'rgba(52,211,153,0.1)' : 'rgba(215,226,234,0.05)',
            color: isOpen ? '#34d399' : '#D7E2EA'
          }}
        >
          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="overflow-hidden"
          >
            <p 
              className="pb-8 font-light leading-relaxed max-w-3xl"
              style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)', color: '#D7E2EA', opacity: 0.6 }}
            >
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

  return (
    <section id="faq" className="relative bg-[#0C0C0C] py-20 sm:py-24 md:py-32 px-5 sm:px-8 md:px-10 overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* ── Heading ── */}
        <div className="mb-12 sm:mb-20 text-center">
          <FadeIn delay={0} y={40}>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6" style={{ background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.2)' }}>
              <MessageCircleQuestion className="w-7 h-7 text-[#34d399]" />
            </div>
            <h2
              className="hero-heading font-black uppercase leading-none tracking-tight mb-4"
              style={{ fontSize: 'clamp(2.5rem, 8vw, 80px)' }}
            >
              FAQ
            </h2>
            <p className="text-[#D7E2EA] font-light uppercase tracking-widest text-sm opacity-40">
              Common Questions
            </p>
          </FadeIn>
        </div>

        {/* ── Accordion List ── */}
        <div className="flex flex-col border-t" style={{ borderColor: 'rgba(215,226,234,0.1)' }}>
          {FAQ_DATA.map((item, index) => (
            <FaqItem 
              key={index} 
              item={item} 
              index={index} 
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
