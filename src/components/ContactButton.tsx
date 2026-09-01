export default function ContactButton({ className = '' }: { className?: string }) {
  return (
    <button
      type="button"
      className={`rounded-full px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base font-bold uppercase tracking-widest transition-transform hover:scale-105 active:scale-95 ${className}`}
      style={{
        background: '#34d399',
        color: '#111111',
        boxShadow: '0px 4px 24px rgba(52, 211, 153, 0.3)',
      }}
    >
      Contact Me
    </button>
  );
}
