'use client'

import React, { useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Header from '@/components/Header'
import { Sparkles, Zap, Flame, ChevronDown, ShoppingBag } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

// Dynamic import with ssr: false for Canvas
const CanvasScene = dynamic(() => import('@/components/CanvasScene'), {
  ssr: false,
  loading: () => null,
})

const HeroLogoCanvas = dynamic(() => import('@/components/HeroLogoCanvas'), {
  ssr: false,
  loading: () => null,
})

// 3 Flavor Slides following the Hero Landing Slide
const flavorSlides = [
  {
    id: 'slide-1',
    number: '01',
    badge: 'EST. 1968',
    name: 'ORIGINAL',
    title: 'ORIGINAL RED',
    subtitle: 'THE SADDLE CRISP LEGEND',
    desc: 'Born in 1968. Pure toasted potato crisp perfection seasoned with crystalline salt. The iconic hyperbolic paraboloid that never breaks, never goes flat, and stacks with millimeter precision.',
    bg: '#B71234',
    btnBg: '#FFFFFF',
    btnText: '#B71234',
    badgeBg: '#FFFFFF',
    badgeText: '#000000',
    statValue: '100%',
    statLabel: 'Saddle Precision',
    icon: Sparkles,
  },
  {
    id: 'slide-2',
    number: '02',
    badge: 'FAN FAVORITE',
    name: 'SOUR CREAM & ONION',
    title: 'SOUR CREAM & ONION',
    subtitle: 'THE CREAMY REVOLUTION',
    desc: 'An electric collision of tangy cultured sour cream, toasted sweet spring onions, and savory herbs dusted across every curve for an explosive, unmistakable pop.',
    bg: '#1E5631',
    btnBg: '#A3E635', // Vibrant zesty lime
    btnText: '#000000',
    badgeBg: '#A3E635',
    badgeText: '#000000',
    statValue: '11/10',
    statLabel: 'Tangy Zing Rating',
    icon: Zap,
  },
  {
    id: 'slide-3',
    number: '03',
    badge: 'GOLDEN BITE',
    name: 'CHEDDAR CHEESE',
    title: 'CHEDDAR CHEESE',
    subtitle: 'THE GOLDEN SHATTER',
    desc: 'Blanketed in sharp aged cheddar seasoning. Deep, savory cheese notes melt into every contour, delivering a golden crunch that shatters with maximum satisfaction.',
    bg: '#D97706',
    btnBg: '#FBBF24', // Bold cheddar yellow
    btnText: '#000000',
    badgeBg: '#FBBF24',
    badgeText: '#000000',
    statValue: '2.5X',
    statLabel: 'Cheese Punch',
    icon: Flame,
  },
]

// Background colors mapped to slide indices: 0 = Hero, 1 = Original Red, 2 = Sour Cream, 3 = Cheddar
const SLIDE_COLORS: Record<number, string> = {
  0: '#B71234', // Hero Landing
  1: '#B71234', // Original Red
  2: '#1E5631', // Sour Cream & Onion
  3: '#D97706', // Cheddar Cheese
}

export default function Home() {
  // activeSlide: 0 = Hero Landing, 1 = Original, 2 = Sour Cream, 3 = Cheddar
  const [activeSlide, setActiveSlide] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // ── ScrollTrigger with onEnter and onEnterBack triggers ──────────────────
  useGSAP(
    () => {
      // Slides 0, 1, 2, 3
      ;[0, 1, 2, 3].forEach((idx) => {
        ScrollTrigger.create({
          trigger: `#slide-${idx}`,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => setActiveSlide(idx),
          onEnterBack: () => setActiveSlide(idx),
        })
      })
    },
    { scope: containerRef }
  )

  const currentBg = SLIDE_COLORS[activeSlide] || '#B71234'
  const isHero = activeSlide === 0

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen text-white select-none snap-y snap-mandatory bg-transparent"
    >
      {/* ── Fixed Clean Header (Pringles Logo on Left, Pill Button on Right) ─ */}
      <Header isHero={isHero} activeSlide={activeSlide} />

      {/* ── Single Background Layer behind canvas (-z-20) ──────────────────── */}
      <div
        className="fixed inset-0 pointer-events-none -z-20"
        style={{
          backgroundColor: currentBg,
          transition: 'background-color 0.6s ease',
        }}
      >
        {/* Subtle radial vignette for depth behind 3D logo & can */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.55)_100%)]" />
      </div>

      {/* ── Fixed 3D Canvas Scene: 3D Logo on Slide 0, Can locked right on Slide 1+ (z-20) ─ */}
      <CanvasScene activeSlide={activeSlide} />

      {/* ── Continuous Snap Slides Container ───────────────────────────────── */}
      <main className="relative snap-y snap-mandatory bg-transparent pointer-events-none">
        {/* ── SLIDE 0: HERO LANDING PAGE ──────────────────────────────────── */}
        <section
          id="slide-0"
          className="w-full min-h-screen h-screen snap-start snap-always flex flex-col items-center justify-center gap-2 py-6 pt-16 px-4 relative overflow-hidden bg-transparent"
        >
          {/* Top badge */}
          <div className="relative z-20 pointer-events-auto">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border-2 border-black text-black font-anton text-xs tracking-widest uppercase shadow-[4px_4px_0px_0px_#000000]">
              <Sparkles size={14} className="text-red-600 fill-red-600" />
              <span>THE ORIGINAL STACKABLE CRISP</span>
            </div>
          </div>

          {/* Large floating 3D logo shifted a bit higher up (h-64 md:h-80 w-full relative z-10) */}
          <div className="h-64 md:h-80 w-full max-w-xl flex items-center justify-center relative z-10 pointer-events-none -mt-3 md:-mt-6">
            <HeroLogoCanvas />
          </div>

          {/* Authentic Straight-Line Pringles Wordmark shifted higher up */}
          <div className="relative z-20 select-none pointer-events-none -mt-20 md:-mt-30 mb-2">
            <h1
              className="hero-pringles-wordmark text-7xl sm:text-8xl md:text-[9.5rem] tracking-tight leading-none text-center select-none"
              aria-label="Pringles"
            >
              Pringles
            </h1>
          </div>

          {/* Tagline shifted down with ample breathing room */}
          <p className="mt-6 md:mt-10 text-center font-anton text-sm sm:text-base md:text-lg text-white/95 tracking-[0.15em] uppercase drop-shadow-md select-none pointer-events-none relative z-20">
            ONCE YOU POP, THE FUN DON&apos;T STOP
          </p>

          {/* Scroll prompt */}
          <div className="mt-4 md:mt-6 relative z-20 pointer-events-auto">
            <button
              onClick={() => {
                const el = document.getElementById('slide-1')
                el?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-white border-2 border-black text-black font-anton text-xs uppercase tracking-widest shadow-[4px_4px_0px_0px_#000000] hover:-translate-x-[1px] hover:-translate-y-[1px] hover:shadow-[5px_5px_0px_0px_#000000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-150 animate-bounce cursor-pointer"
            >
              <span>SCROLL TO UNCAP</span>
              <ChevronDown size={16} className="text-red-600 stroke-[3]" />
            </button>
          </div>
        </section>

        {/* ── SLIDES 1, 2, 3: FLAVOR LINEUP ───────────────────────────────── */}
        {flavorSlides.map((flavorItem, idx) => {
          const Icon = flavorItem.icon
          const slideIndex = idx + 1
          return (
            <section
              key={flavorItem.id}
              id={`slide-${slideIndex}`}
              className="w-full h-screen snap-start snap-always flex items-center px-6 sm:px-12 md:px-20 lg:px-28 relative overflow-hidden bg-transparent"
            >
              {/* Left Half: Huge Anton Typography & Neo-Brutalist Flavor Details (z-30) */}
              <div className="w-full md:w-1/2 max-w-xl text-left relative z-30 pointer-events-auto">
                {/* Slide Index & Neo-Brutalist Badge */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-anton text-sm tracking-widest text-white/80 drop-shadow">
                    {flavorItem.number} // 03
                  </span>
                  <div
                    className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border-2 border-black font-anton text-[11px] tracking-widest uppercase shadow-[3px_3px_0px_0px_#000000]"
                    style={{
                      backgroundColor: flavorItem.badgeBg,
                      color: flavorItem.badgeText,
                    }}
                  >
                    <Icon size={12} className="stroke-[2.5]" />
                    <span>{flavorItem.badge}</span>
                  </div>
                </div>

                {/* Subtitle */}
                <p className="text-xs sm:text-sm font-black tracking-[0.25em] uppercase text-white/90 mb-2 drop-shadow">
                  {flavorItem.subtitle}
                </p>

                {/* Huge Anton Flavor Headline */}
                <h2 className="font-anton text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight uppercase leading-[0.85] text-white drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] mb-6">
                  {flavorItem.title}
                </h2>

                {/* Description */}
                <p className="text-base sm:text-lg text-white font-medium leading-relaxed max-w-lg mb-8 drop-shadow">
                  {flavorItem.desc}
                </p>

                {/* Interactive Neo-Brutalist Action & Stat Row */}
                <div className="flex flex-wrap items-center gap-4">
                  {/* Neo-Brutalist Stat Card */}
                  <div className="inline-flex items-center gap-4 px-5 py-3 rounded-2xl bg-white text-black border-2 border-black shadow-[4px_4px_0px_0px_#000000]">
                    <span className="font-anton text-3xl sm:text-4xl tracking-tight leading-none">
                      {flavorItem.statValue}
                    </span>
                    <div className="h-8 w-0.5 bg-black" />
                    <span className="text-[11px] uppercase font-black tracking-wider text-black max-w-[120px] leading-tight">
                      {flavorItem.statLabel}
                    </span>
                  </div>

                  {/* Neo-Brutalist Flavor Order Pill */}
                  <button
                    onClick={() => {
                      const headerBtn = document.querySelector('header button') as HTMLButtonElement
                      headerBtn?.click()
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border-2 border-black font-anton text-xs uppercase tracking-widest shadow-[4px_4px_0px_0px_#000000] hover:-translate-x-[1px] hover:-translate-y-[1px] hover:shadow-[5px_5px_0px_0px_#000000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-150 cursor-pointer"
                    style={{
                      backgroundColor: flavorItem.btnBg,
                      color: flavorItem.btnText,
                    }}
                  >
                    <ShoppingBag size={15} className="stroke-[2.5]" />
                    <span>Grab {flavorItem.name}</span>
                  </button>
                </div>
              </div>
            </section>
          )
        })}
      </main>
    </div>
  )
}
