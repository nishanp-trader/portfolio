"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import {
  FaGithub,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaEnvelope,
  FaDiscord,
} from "react-icons/fa";

export interface SocialItem {
  letter: string;
  icon: React.ReactNode;
  label: string;
  href?: string;
  onClick?: () => void;
}

interface SocialFlipButtonProps {
  items?: SocialItem[];
  className?: string;
  itemClassName?: string;
  frontClassName?: string;
  backClassName?: string;
}

const defaultItems: SocialItem[] = [
  { letter: "C", icon: <FaGithub />, label: "Github", href: "#" },
  { letter: "O", icon: <FaTwitter />, label: "Twitter", href: "#" },
  { letter: "N", icon: <FaLinkedin />, label: "LinkedIn", href: "#" },
  { letter: "T", icon: <FaInstagram />, label: "Instagram", href: "#" },
  { letter: "A", icon: <FaFacebook />, label: "Facebook", href: "#" },
  { letter: "C", icon: <FaEnvelope />, label: "Email", href: "#" },
  { letter: "T", icon: <FaDiscord />, label: "Discord", href: "#" },
];

const SocialFlipNode = ({
  item,
  index,
  isHovered,
  setTooltipIndex,
  tooltipIndex,
  itemClassName,
  frontClassName,
  backClassName,
}: {
  item: SocialItem;
  index: number;
  isHovered: boolean;
  setTooltipIndex: (val: number | null) => void;
  tooltipIndex: number | null;
  itemClassName?: string;
  frontClassName?: string;
  backClassName?: string;
}) => {
  const Wrapper = item.href ? "a" : "div";
  const wrapperProps = item.href
    ? { href: item.href, target: "_blank", rel: "noopener noreferrer" }
    : { onClick: item.onClick };

  return (
    <Wrapper
      {...(wrapperProps as any)}
      className={`relative h-10 w-10 cursor-pointer ${itemClassName || ""}`}
      style={{ perspective: "1000px" }}
      onMouseEnter={() => setTooltipIndex(index)}
      onMouseLeave={() => setTooltipIndex(null)}
    >
      <AnimatePresence>
        {isHovered && tooltipIndex === index && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8, x: "-50%" }}
            animate={{ opacity: 1, y: -50, scale: 1, x: "-50%" }}
            exit={{ opacity: 0, y: 10, scale: 0.8, x: "-50%" }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute left-1/2 z-50 whitespace-nowrap rounded-lg bg-neutral-900 px-3 py-1.5 text-xs font-semibold text-white shadow-xl"
          >
            {item.label}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-2 w-2 rotate-45 bg-neutral-900" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="relative h-full w-full"
        initial={false}
        animate={{ rotateY: isHovered ? 180 : 0 }}
        transition={{
          duration: 0.8,
          type: "spring",
          stiffness: 120,
          damping: 15,
          delay: index * 0.08,
        }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front - Letter */}
        <div
          className={`absolute inset-0 flex items-center justify-center rounded-lg bg-[#1a1a1a] text-lg font-bold text-[#D7E2EA] shadow-sm ${frontClassName || ""}`}
          style={{ backfaceVisibility: "hidden" }}
        >
          {item.letter}
        </div>

        {/* Back - Icon */}
        <div
          className={`absolute inset-0 flex items-center justify-center rounded-lg bg-white text-lg text-black ${backClassName || ""}`}
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {item.icon}
        </div>
      </motion.div>
    </Wrapper>
  );
};

export default function SocialFlipButton({
  items = defaultItems,
  className,
  itemClassName,
  frontClassName,
  backClassName,
}: SocialFlipButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [tooltipIndex, setTooltipIndex] = useState<number | null>(null);

  return (
    <div className={`flex items-center justify-center gap-4 p-4 ${className || ""}`}>
      <div
        className="group relative flex items-center justify-center gap-2 rounded-2xl border border-[rgba(215,226,234,0.15)] bg-[rgba(20,20,20,0.8)] p-4 shadow-sm backdrop-blur-sm"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setTooltipIndex(null);
        }}
      >
        {/* Animated Top Border Line */}
        <div className="absolute -inset-[1px] overflow-hidden rounded-2xl pointer-events-none">
          <motion.div
            className="absolute top-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-white/50 to-transparent"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-white/50 to-transparent"
            animate={{ x: ["100%", "-100%"] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {items.map((item, index) => (
          <SocialFlipNode
            key={index}
            item={item}
            index={index}
            isHovered={isHovered}
            setTooltipIndex={setTooltipIndex}
            tooltipIndex={tooltipIndex}
            itemClassName={itemClassName}
            frontClassName={frontClassName}
            backClassName={backClassName}
          />
        ))}
      </div>
    </div>
  );
}
