"use client";

import { motion } from "framer-motion";
import * as React from "react";
import { 
  Headphones, 
  Map, 
  Wrench, 
  Globe, 
  Rocket, 
  ChevronRight 
} from "lucide-react";
import IsometricBox01 from "./IsometricBox01";
import IsometricBoxes02 from "./IsometricBoxes02";

const DEFAULT_TEAM_AVATARS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=150&q=80",
];

const PIPELINE_STEPS = [
  { id: "01", label: "CALL", Icon: Headphones },
  { id: "02", label: "PLAN", Icon: Map },
  { id: "03", label: "BUILD", Icon: Wrench },
  { id: "04", label: "DEPLOY", Icon: Globe },
  { id: "05", label: "LAUNCH", Icon: Rocket },
];

export interface WhyUsBentoProps {
  className?: string;
  teamAvatars?: string[];
}

export function WhyUsBento({
  className = "",
  teamAvatars = DEFAULT_TEAM_AVATARS,
}: WhyUsBentoProps) {
  return (
    <div className={`py-4 relative z-10 w-full ${className}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col gap-4">
        
        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 auto-rows-auto">
          
          {/* 01: AI & Automation (Wide) */}
          <motion.div 
            initial="initial"
            whileHover="hover"
            className="col-span-1 md:col-span-2 row-span-1 rounded-2xl bg-neutral-900/90 backdrop-blur-md p-6 sm:p-7 relative overflow-hidden group transition-all duration-500 flex flex-col justify-center border border-neutral-800 shadow-xl min-h-[170px]"
          >
            {/* Visual: Isometric Box on the right */}
            <div className="absolute right-2 sm:right-4 md:right-4 lg:right-6 top-1/2 -translate-y-1/2 w-44 sm:w-56 md:w-64 lg:w-72 z-20 hidden sm:block pointer-events-none opacity-90 group-hover:scale-105 transition-transform duration-500">
              <IsometricBox01 className="w-full h-auto" />
            </div>

            <div className="relative z-30 w-full sm:w-3/5 md:w-3/5">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 relative overflow-hidden flex flex-wrap">
                <span className="flex">
                  {"AI & Automation".split("").map((l, i) => (
                    <motion.span
                      key={i}
                      className="inline-block"
                      variants={{
                        initial: { y: 0 },
                        hover: { y: "-100%" },
                      }}
                      transition={{ duration: 0.3, delay: i * 0.02, ease: [0.33, 1, 0.68, 1] }}
                    >
                      {l === " " ? "\u00A0" : l}
                    </motion.span>
                  ))}
                </span>
                <span className="absolute inset-0 flex text-[#34d399] pointer-events-none" aria-hidden>
                  {"AI & Automation".split("").map((l, i) => (
                    <motion.span
                      key={i}
                      className="inline-block"
                      variants={{
                        initial: { y: "100%" },
                        hover: { y: 0 },
                      }}
                      transition={{ duration: 0.3, delay: i * 0.02, ease: [0.33, 1, 0.68, 1] }}
                    >
                      {l === " " ? "\u00A0" : l}
                    </motion.span>
                  ))}
                </span>
              </h3>
              <p className="text-neutral-400 text-sm md:text-base leading-relaxed">
                I build AI workflows and automated pipelines to handle content, strategy, and repetitive tasks—freeing your business to scale effortlessly.
              </p>
            </div>

            <div className="absolute -right-4 -bottom-10 text-[8rem] font-bold text-neutral-800/30 pointer-events-none select-none z-10">
              01
            </div>
          </motion.div>

          {/* 02: Senior Talent (Tall & Dark) */}
          <div className="col-span-1 md:col-span-1 row-span-1 md:row-span-2 rounded-2xl border border-neutral-800 bg-black p-6 sm:p-7 relative overflow-hidden group transition-all duration-500 flex flex-col justify-between text-white min-h-[340px]">
            {/* Visual: Stacked Cards */}
            <div className="relative z-10 w-full flex flex-col items-center justify-center min-h-[150px] mb-4">
              <div className="relative w-full max-w-[190px] aspect-[4/3] group-hover:-translate-y-2 group-hover:scale-105 transition-all duration-300 ease-out">
                {/* Back card 4 */}
                <div className="absolute inset-0 bg-neutral-700 rounded-xl border border-neutral-600/50 transform -rotate-12 -translate-x-3 translate-y-3 shadow-xl transition-all duration-300 ease-out group-hover:rotate-[-20deg] group-hover:-translate-x-6 group-hover:translate-y-6" />
                {/* Back card 3 */}
                <div className="absolute inset-0 bg-neutral-600 rounded-xl border border-neutral-500/50 transform -rotate-9 -translate-x-2.5 translate-y-2.5 shadow-xl transition-all duration-300 ease-out group-hover:rotate-[-15deg] group-hover:-translate-x-5 group-hover:translate-y-5" />
                {/* Back card 2 */}
                <div className="absolute inset-0 bg-neutral-500 rounded-xl border border-neutral-400/50 transform -rotate-6 -translate-x-1.5 translate-y-1.5 shadow-xl transition-all duration-300 ease-out group-hover:rotate-[-10deg] group-hover:-translate-x-3 group-hover:translate-y-3" />
                {/* Back card 1 */}
                <div className="absolute inset-0 bg-neutral-400 rounded-xl border border-neutral-300/50 transform -rotate-3 -translate-x-1 translate-y-1 shadow-xl transition-all duration-300 ease-out group-hover:-rotate-5 group-hover:-translate-x-1.5 group-hover:translate-y-1.5" />

                {/* Front card */}
                <div
                  className="absolute inset-0 bg-neutral-900 rounded-xl p-4 flex flex-col justify-between text-white shadow-2xl border border-neutral-700/80"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)",
                    backgroundSize: "12px 12px",
                  }}
                >
                  <div className="flex gap-1">
                    <div className="w-2.5 h-3.5 bg-[#34d399] rounded-sm" />
                    <div className="w-1.5 h-3.5 bg-[#34d399]/60 rounded-sm" />
                    <div className="w-2.5 h-3.5 bg-[#34d399]/20 rounded-sm" />
                  </div>

                  <div className="font-mono text-base sm:text-lg font-bold leading-snug tracking-tight mt-auto mb-2 text-[#D7E2EA]">
                    Strategy.
                    <br />
                    Creative.
                    <br />
                    Production.
                  </div>

                  <div className="font-mono text-[9px] text-[#34d399] font-bold uppercase tracking-wider flex items-center gap-1">
                    <span>&gt; READY TO EXECUTE</span>
                    <span className="animate-pulse">_</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10">
              <h3 className="text-xl font-bold text-white mb-1.5">
                From Idea to Production
              </h3>
              <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
                Bring me your goals. I map out high-converting campaigns, build custom brand assets, and ship end-to-end.
              </p>
            </div>
            {/* Watermark Number */}
            <div className="absolute -right-6 -bottom-12 text-[10rem] font-bold text-neutral-900/60 pointer-events-none group-hover:scale-105 transition-transform duration-700 leading-none select-none">
              02
            </div>
          </div>

          {/* 03: Direct Collaboration */}
          <motion.div 
            initial="initial"
            whileHover="hover"
            className="col-span-1 md:col-span-1 row-span-1 rounded-2xl bg-neutral-900/90 border border-neutral-800 p-6 sm:p-7 relative overflow-hidden group transition-all duration-500 flex flex-col justify-between min-h-[170px]"
          >
            {/* Stacked avatars */}
            <div className="flex items-center relative z-10 mb-3 h-9">
              {teamAvatars.map((src, i) => (
                <motion.div
                  key={i}
                  className="relative w-8 h-8 rounded-full overflow-hidden ring-2 ring-neutral-900 shadow-md"
                  style={{
                    marginLeft: i === 0 ? 0 : "-10px",
                    zIndex: teamAvatars.length - i,
                  }}
                  variants={{
                    initial: { x: 0, y: 0, rotate: 0, scale: 1 },
                    hover: {
                      x: i * 10,
                      y: i % 2 === 0 ? -3 : 3,
                      rotate: (i - 2) * 5,
                      scale: 1.1,
                    },
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                >
                  <img
                    src={src}
                    alt="client/avatar"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
            </div>

            <div className="relative z-10">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-1.5">
                Direct 1-on-1 Partnership
              </h3>
              <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
                Work directly with me from kickoff to launch. No middle managers or rotating agency benches.
              </p>
            </div>
            <div className="absolute -right-3 -bottom-8 text-[7rem] font-bold text-neutral-800/30 pointer-events-none select-none">
              03
            </div>
          </motion.div>

          {/* 04: Fast Execution Pipeline */}
          <motion.div 
            initial="initial"
            whileHover="hover"
            className="col-span-1 md:col-span-1 row-span-1 rounded-2xl bg-neutral-900/90 border border-neutral-800 p-6 sm:p-7 relative overflow-hidden group transition-all duration-500 flex flex-col justify-between min-h-[170px]"
          >
            {/* Pipeline visual */}
            <div className="relative z-10 w-full mb-3">
              <div className="flex items-start justify-between">
                {PIPELINE_STEPS.map(({ id, label, Icon }, i) => (
                  <React.Fragment key={id}>
                    <div className="flex flex-col items-center gap-1">
                      <div className="relative">
                        <Icon className="text-[#D7E2EA] w-4 h-4 sm:w-5 sm:h-5" />
                        {i === PIPELINE_STEPS.length - 1 && (
                          <span className="absolute -inset-1 rounded-full bg-[#34d399]/30 animate-ping" />
                        )}
                      </div>
                      <span className="text-[7px] text-[#34d399] font-mono font-bold tracking-widest">
                        {label}
                      </span>
                    </div>

                    {i < PIPELINE_STEPS.length - 1 && (
                      <div className="mt-1 text-neutral-600 group-hover:text-white transition-colors duration-300">
                        <ChevronRight className="w-3 h-3" />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div className="relative z-10">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-1.5">
                Streamlined Pipeline
              </h3>
              <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
                Clear milestones and rapid feedback loops ensure your assets are created, polished, and deployed fast.
              </p>
            </div>
            <div className="absolute -right-3 -bottom-8 text-[7rem] font-bold text-neutral-800/30 pointer-events-none select-none">
              04
            </div>
          </motion.div>

          {/* 05: Complex Multidisciplinary Skills (Wide Bottom) */}
          <motion.div 
            initial="initial"
            whileHover="hover"
            className="col-span-1 md:col-span-3 row-span-1 min-h-[170px] rounded-2xl bg-neutral-900/90 backdrop-blur-md p-6 sm:p-7 relative overflow-hidden group transition-all duration-500 flex flex-col justify-center border border-neutral-800"
          >
            {/* Visual: Isometric Layered Boxes on the right */}
            <div className="absolute right-4 md:right-8 lg:right-12 bottom-0 w-44 sm:w-56 md:w-72 lg:w-80 z-20 hidden sm:block pointer-events-none opacity-90 group-hover:scale-105 transition-transform duration-500">
              <IsometricBoxes02 className="w-full h-auto" />
            </div>

            <div className="relative z-30 w-full sm:w-3/5 md:w-3/5">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Multidisciplinary Execution
              </h3>
              <p className="text-neutral-400 text-sm md:text-base leading-relaxed max-w-xl">
                Digital marketing, graphic design, social media growth, and trading analytics—all blended seamlessly to give your project an unbeatable edge.
              </p>
            </div>
            
            <div className="absolute -right-6 -bottom-10 text-[9rem] font-bold text-neutral-800/30 pointer-events-none select-none z-10">
              05
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}

export default WhyUsBento;
