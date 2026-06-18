"use client"

import { useEffect, useState } from "react"
import { ArrowUp } from "lucide-react"

export function BackToTopButton(): JSX.Element {
  const [visible, setVisible] = useState<boolean>(
    typeof window !== "undefined" ? window.scrollY > 300 : false,
  )

  useEffect(() => {
    const handleScroll = (): void => {
      setVisible(window.scrollY > 300)
    }

    // Reflect current scroll position immediately on mount
    handleScroll()

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll, { passive: true } as EventListenerOptions)
    }
  }, [])

  const scrollToTop = (): void => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <>
      <style>{`
        .back-to-top-btn {
          transition: opacity 300ms ease-in-out;
        }
        .back-to-top-btn:focus-visible {
          outline: 3px solid var(--indigo);
          outline-offset: 3px;
          box-shadow: 0 0 0 5px rgba(99, 102, 241, 0.3);
        }
        @media (prefers-reduced-motion: reduce) {
          .back-to-top-btn {
            transition-duration: 1ms;
          }
        }
      `}</style>
      <button
        className="back-to-top-btn"
        onClick={scrollToTop}
        aria-label="Back to top"
        tabIndex={visible ? 0 : -1}
        style={{
          position: "fixed",
          bottom: "2rem",
          right: "2rem",
          zIndex: 1000,
          width: "44px",
          height: "44px",
          borderRadius: "50%",
          backgroundColor: "var(--indigo)",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: visible ? 1 : 0,
          pointerEvents: visible ? "auto" : "none",
        }}
      >
        <ArrowUp size={20} aria-hidden="true" />
      </button>
    </>
  )
}
