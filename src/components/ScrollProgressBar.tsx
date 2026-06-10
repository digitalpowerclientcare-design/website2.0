"use client"

import { useEffect, useState } from "react"

export function ScrollProgressBar() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const documentHeight = document.documentElement.scrollHeight
      const viewportHeight = window.innerHeight
      const scrollable = documentHeight - viewportHeight

      if (scrollable <= 0) {
        setProgress(0)
        return
      }

      const ratio = scrollY / scrollable
      setProgress(Math.min(1, Math.max(0, ratio)))
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: `${progress * 100}%`,
        height: "3px",
        background: "var(--indigo)",
        zIndex: 9999,
        pointerEvents: "none",
      }}
    />
  )
}
