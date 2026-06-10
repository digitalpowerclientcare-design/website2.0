/**
 * BackToTopButton tests
 *
 * NOTE: The project currently has no test framework configured.
 * These tests are written with Jest + React Testing Library, which
 * is the default for Next.js projects, ready to run once the
 * framework is installed.
 */
import React from "react"
import { render, screen, fireEvent, act } from "@testing-library/react"
import { BackToTopButton } from "./BackToTopButton"

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function setScrollY(value: number): void {
  Object.defineProperty(window, "scrollY", {
    writable: true,
    configurable: true,
    value,
  })
}

// ---------------------------------------------------------------------------
// Setup / teardown
// ---------------------------------------------------------------------------

beforeEach(() => {
  setScrollY(0)
  jest.spyOn(window, "scrollTo").mockImplementation(() => undefined)
  jest.spyOn(window, "addEventListener")
  jest.spyOn(window, "removeEventListener")
})

afterEach(() => {
  jest.restoreAllMocks()
})

// ---------------------------------------------------------------------------
// AC-1 — Hidden on initial load / near top
// ---------------------------------------------------------------------------

describe("AC-1: hidden when scrollY <= 300", () => {
  it("renders with opacity 0 and pointer-events none when scrollY is 0", () => {
    setScrollY(0)
    render(<BackToTopButton />)
    const btn = screen.getByRole("button", { name: /back to top/i })
    expect(btn).toHaveStyle({ opacity: "0", pointerEvents: "none" })
  })

  it("has tabIndex -1 when hidden", () => {
    setScrollY(0)
    render(<BackToTopButton />)
    const btn = screen.getByRole("button", { name: /back to top/i })
    expect(btn).toHaveAttribute("tabindex", "-1")
  })

  it("remains hidden at exactly 300px", () => {
    setScrollY(300)
    render(<BackToTopButton />)
    const btn = screen.getByRole("button", { name: /back to top/i })
    expect(btn).toHaveStyle({ opacity: "0" })
  })
})

// ---------------------------------------------------------------------------
// AC-2 — Visible after scrolling past 300px
// ---------------------------------------------------------------------------

describe("AC-2: visible when scrollY > 300", () => {
  it("renders with opacity 1 and pointer-events auto when scrollY is 301", () => {
    setScrollY(301)
    render(<BackToTopButton />)
    const btn = screen.getByRole("button", { name: /back to top/i })
    expect(btn).toHaveStyle({ opacity: "1", pointerEvents: "auto" })
  })

  it("has tabIndex 0 when visible", () => {
    setScrollY(301)
    render(<BackToTopButton />)
    const btn = screen.getByRole("button", { name: /back to top/i })
    expect(btn).toHaveAttribute("tabindex", "0")
  })

  it("becomes visible after a scroll event fires past 300px", () => {
    setScrollY(0)
    render(<BackToTopButton />)
    const btn = screen.getByRole("button", { name: /back to top/i })
    expect(btn).toHaveStyle({ opacity: "0" })

    act(() => {
      setScrollY(500)
      fireEvent.scroll(window)
    })

    expect(btn).toHaveStyle({ opacity: "1" })
  })

  it("hides again when user scrolls back to <= 300px", () => {
    setScrollY(500)
    render(<BackToTopButton />)
    const btn = screen.getByRole("button", { name: /back to top/i })
    expect(btn).toHaveStyle({ opacity: "1" })

    act(() => {
      setScrollY(100)
      fireEvent.scroll(window)
    })

    expect(btn).toHaveStyle({ opacity: "0" })
  })
})

// ---------------------------------------------------------------------------
// AC-3 — Smooth scroll to top on click
// ---------------------------------------------------------------------------

describe("AC-3: clicking scrolls to top", () => {
  it("calls window.scrollTo with top:0 and behavior:smooth on click", () => {
    setScrollY(500)
    render(<BackToTopButton />)
    const btn = screen.getByRole("button", { name: /back to top/i })
    fireEvent.click(btn)
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" })
  })
})

// ---------------------------------------------------------------------------
// AC-4 — Keyboard accessibility
// ---------------------------------------------------------------------------

describe("AC-4: keyboard accessibility", () => {
  it("has tabIndex 0 when visible so it can be focused", () => {
    setScrollY(500)
    render(<BackToTopButton />)
    expect(screen.getByRole("button", { name: /back to top/i })).toHaveAttribute("tabindex", "0")
  })

  it("has tabIndex -1 when hidden so it cannot be tabbed to", () => {
    setScrollY(0)
    render(<BackToTopButton />)
    expect(screen.getByRole("button", { name: /back to top/i })).toHaveAttribute("tabindex", "-1")
  })

  it("applies the back-to-top-btn class for focus-visible CSS rules", () => {
    render(<BackToTopButton />)
    expect(screen.getByRole("button", { name: /back to top/i })).toHaveClass("back-to-top-btn")
  })
})

// ---------------------------------------------------------------------------
// AC-5 — Screen reader label
// ---------------------------------------------------------------------------

describe("AC-5: screen reader semantics", () => {
  it("is a native button element", () => {
    render(<BackToTopButton />)
    expect(screen.getByRole("button", { name: /back to top/i }).tagName).toBe("BUTTON")
  })

  it("has aria-label Back to top", () => {
    render(<BackToTopButton />)
    expect(screen.getByRole("button", { name: /back to top/i })).toHaveAttribute(
      "aria-label",
      "Back to top",
    )
  })

  it("icon has aria-hidden true", () => {
    render(<BackToTopButton />)
    // The ArrowUp SVG rendered by lucide-react should carry aria-hidden
    const svg = screen.getByRole("button", { name: /back to top/i }).querySelector("svg")
    expect(svg).toHaveAttribute("aria-hidden", "true")
  })
})

// ---------------------------------------------------------------------------
// AC-6 — Scroll listener cleanup on unmount
// ---------------------------------------------------------------------------

describe("AC-6: cleanup on unmount", () => {
  it("removes the scroll event listener when the component unmounts", () => {
    setScrollY(0)
    const { unmount } = render(<BackToTopButton />)
    unmount()
    expect(window.removeEventListener).toHaveBeenCalledWith(
      "scroll",
      expect.any(Function),
      expect.objectContaining({ passive: true }),
    )
  })
})

// ---------------------------------------------------------------------------
// AC-7 — Passive scroll listener
// ---------------------------------------------------------------------------

describe("AC-7: passive scroll listener", () => {
  it("registers the scroll listener with { passive: true }", () => {
    render(<BackToTopButton />)
    expect(window.addEventListener).toHaveBeenCalledWith(
      "scroll",
      expect.any(Function),
      expect.objectContaining({ passive: true }),
    )
  })
})

// ---------------------------------------------------------------------------
// Edge cases
// ---------------------------------------------------------------------------

describe("edge cases", () => {
  it("reflects scroll position already > 300 on initial mount (e.g. back navigation)", () => {
    setScrollY(800)
    render(<BackToTopButton />)
    const btn = screen.getByRole("button", { name: /back to top/i })
    expect(btn).toHaveStyle({ opacity: "1" })
  })

  it("does not throw when scrollY is exactly 301", () => {
    setScrollY(301)
    expect(() => render(<BackToTopButton />)).not.toThrow()
  })

  it("does not throw when scrollY is 0", () => {
    setScrollY(0)
    expect(() => render(<BackToTopButton />)).not.toThrow()
  })
})
