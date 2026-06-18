"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

const STORAGE_KEY = "announcement-banner-dismissed"

export function AnnouncementBanner() {
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === "true") {
        setDismissed(true)
      }
    } catch {
      // localStorage unavailable — default to visible
    }
  }, [])

  if (dismissed) return null

  function handleDismiss() {
    try {
      localStorage.setItem(STORAGE_KEY, "true")
    } catch {
      // localStorage unavailable — dismiss in-memory only
    }
    setDismissed(true)
  }

  return (
    <header
      role="banner"
      style={{
        background: "var(--indigo)",
        height: "44px",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        color: "#ffffff",
        fontSize: "0.875rem",
        fontWeight: 500,
      }}
    >
      <span>
        Get in touch with us —&nbsp;
        <Link
          href="/contact"
          style={{
            color: "#ffffff",
            textDecoration: "underline",
          }}
        >
          Contact us
        </Link>
      </span>
      <button
        onClick={handleDismiss}
        aria-label="Dismiss announcement"
        style={{
          position: "absolute",
          right: "16px",
          top: "50%",
          transform: "translateY(-50%)",
          background: "transparent",
          border: "none",
          color: "#ffffff",
          fontSize: "1.25rem",
          lineHeight: 1,
          cursor: "pointer",
          padding: "4px 8px",
        }}
      >
        ×
      </button>
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          [data-announcement-banner] {
            transition: none !important;
            animation: none !important;
          }
        }
      `}</style>
    </header>
  )
}
