'use client'

import React, { useState } from 'react'
import { ShoppingBag, X, Check } from 'lucide-react'

const SLIDE_THEMES: Record<
  number,
  {
    btnBg: string
    btnText: string
    tagline: string
  }
> = {
  0: {
    btnBg: 'bg-white',
    btnText: 'text-red-600',
    tagline: 'Once You Pop™',
  },
  1: {
    btnBg: 'bg-white',
    btnText: 'text-red-600',
    tagline: 'Original Red',
  },
  2: {
    btnBg: 'bg-lime-400',
    btnText: 'text-black',
    tagline: 'Sour Cream & Onion',
  },
  3: {
    btnBg: 'bg-amber-400',
    btnText: 'text-black',
    tagline: 'Cheddar Cheese',
  },
}

export default function Header({
  isHero = false,
  activeSlide = 0,
}: {
  isHero?: boolean
  activeSlide?: number
}) {
  const [modalOpen, setModalOpen] = useState(false)
  const [ordered, setOrdered] = useState(false)

  const currentTheme = SLIDE_THEMES[activeSlide] || SLIDE_THEMES[0]

  const handleOrder = () => {
    setOrdered(true)
    setTimeout(() => {
      setOrdered(false)
      setModalOpen(false)
    }, 1800)
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 transition-colors duration-500 ${
          isHero
            ? 'bg-transparent border-b-2 border-transparent'
            : 'bg-black/75 border-b-2 border-black'
        }`}
      >
        {/* Top-Left: Neo-Brutalist Brand Lockup */}
        <div
          className={`flex items-center gap-3 select-none transition-opacity duration-500 ${
            isHero ? 'opacity-90' : 'opacity-100'
          }`}
        >
          <div className="w-10 h-10 rounded-full bg-white border-2 border-black flex items-center justify-center shadow-[3px_3px_0px_0px_#000000] text-black">
            {/* Iconic Mr. P Mustache Emblem */}
            <svg
              viewBox="0 0 32 32"
              className="w-6 h-6 fill-red-600"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M16 11c-2.5 0-4.5 1.5-6 3.5C8 12.5 5.5 12 3 13c-1.5.6-2 2-1 3.2 2 2.4 5.5 3.3 9 2.3 2-.6 3.5-2 5-3.5 1.5 1.5 3 2.9 5 3.5 3.5 1 7 .1 9-2.3 1-1.2.5-2.6-1-3.2-2.5-1-5-.5-7 1.5-1.5-2-3.5-3.5-6-3.5z" />
            </svg>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-anton text-2xl tracking-tight text-white uppercase leading-none drop-shadow-md">
                PRINGLES
              </span>
              <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-white text-black border border-black shadow-[1px_1px_0px_0px_#000000] leading-none">
                ®
              </span>
            </div>
            <span className="text-[9px] uppercase tracking-[0.25em] text-white/90 font-bold">
              {currentTheme.tagline}
            </span>
          </div>
        </div>

        {/* Top-Right: Neo-Brutalist Dynamic "Grab a Can" Pill Button */}
        <button
          onClick={() => setModalOpen(true)}
          className={`rounded-full px-6 py-2.5 ${currentTheme.btnBg} ${currentTheme.btnText} font-anton text-xs sm:text-sm tracking-wider uppercase border-2 border-black shadow-[4px_4px_0px_0px_#000000] hover:-translate-x-[1px] hover:-translate-y-[1px] hover:shadow-[5px_5px_0px_0px_#000000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-150 cursor-pointer flex items-center gap-2`}
        >
          <ShoppingBag size={15} className="stroke-[2.5]" />
          <span>Grab a Can</span>
        </button>
      </header>

      {/* Neo-Brutalist Order Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/80">
          <div className="relative w-full max-w-md p-8 rounded-2xl bg-white border-3 border-black shadow-[8px_8px_0px_0px_#000000] text-black text-center">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 text-black hover:bg-neutral-100 p-1.5 rounded-full border border-black transition-colors"
            >
              <X size={18} />
            </button>

            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 border-2 border-black flex items-center justify-center text-red-600 shadow-[3px_3px_0px_0px_#000000]">
              <ShoppingBag size={28} />
            </div>

            <h3 className="font-anton text-3xl uppercase tracking-tight mb-2">
              Ready to Pop?
            </h3>
            <p className="text-sm text-neutral-700 font-medium mb-6">
              Pick up your favorite Pringles can at your local retailer or order for instant delivery right to your door.
            </p>

            <button
              onClick={handleOrder}
              disabled={ordered}
              className={`w-full py-4 rounded-full ${currentTheme.btnBg} ${currentTheme.btnText} font-anton text-sm uppercase tracking-widest border-2 border-black shadow-[4px_4px_0px_0px_#000000] hover:-translate-x-[1px] hover:-translate-y-[1px] hover:shadow-[5px_5px_0px_0px_#000000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer`}
            >
              {ordered ? (
                <>
                  <Check size={18} className="stroke-[3]" /> Added to Snack Bag!
                </>
              ) : (
                <>
                  <ShoppingBag size={18} className="stroke-[2.5]" /> Confirm Snack Order
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </>
  )
}
