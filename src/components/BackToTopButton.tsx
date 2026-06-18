"use client"

import { useEffect, useState } from "react"

export function BackToTopButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let ticking = false

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          setVisible(window.scrollY >= 300)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  function handleClick() {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <>
      <style>{`
        .back-to-top-btn {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 1000;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          background-color: var(--indigo, #4f46e5);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.3s ease, visibility 0.3s ease;
          outline-offset: 3px;
        }
        .back-to-top-btn:focus-visible {
          outline: 2px solid var(--indigo, #4f46e5);
          outline-offset: 3px;
        }
        .back-to-top-btn.is-visible {
          opacity: 1;
          visibility: visible;
        }
        @media (prefers-reduced-motion: reduce) {
          .back-to-top-btn {
            transition: none;
          }
        }
      `}</style>
      <button
        className={`back-to-top-btn${visible ? " is-visible" : ""}`}
        onClick={handleClick}
        aria-label="Back to top"
        tabIndex={visible ? 0 : -1}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          focusable="false"
        >
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </button>
    </>
  )
}
