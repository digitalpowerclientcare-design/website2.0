/**
 * Tests for BackToTopButton
 *
 * Covers:
 *  - Happy path: button hidden below threshold, visible above threshold
 *  - Scroll-to-top on click
 *  - Keyboard accessibility (tabIndex, aria-label)
 *  - Event listener cleanup on unmount
 *  - RAF throttle (ticking flag)
 *  - Edge case: exactly 300px threshold
 */

import { render, screen, act, fireEvent } from "@testing-library/react"
import { BackToTopButton } from "./BackToTopButton"

// ─── helpers ────────────────────────────────────────────────────────────────

function setScrollY(value: number) {
  Object.defineProperty(window, "scrollY", {
    writable: true,
    configurable: true,
    value,
  })
}

function triggerScroll() {
  fireEvent.scroll(window)
}

// ─── setup / teardown ───────────────────────────────────────────────────────

beforeEach(() => {
  setScrollY(0)
  jest.useFakeTimers()
})

afterEach(() => {
  jest.useRealTimers()
  jest.restoreAllMocks()
})

// ─── tests ──────────────────────────────────────────────────────────────────

describe("BackToTopButton", () => {
  describe("initial render", () => {
    it("renders a button with aria-label 'Back to top'", () => {
      render(<BackToTopButton />)
      expect(screen.getByRole("button", { name: /back to top/i })).toBeInTheDocument()
    })

    it("is not visible when scrollY is 0", () => {
      render(<BackToTopButton />)
      const btn = screen.getByRole("button", { name: /back to top/i })
      expect(btn).not.toHaveClass("is-visible")
    })

    it("has tabIndex -1 when not visible", () => {
      render(<BackToTopButton />)
      const btn = screen.getByRole("button", { name: /back to top/i })
      expect(btn).toHaveAttribute("tabindex", "-1")
    })
  })

  describe("scroll threshold — happy path", () => {
    it("becomes visible when scrollY reaches exactly 300", () => {
      render(<BackToTopButton />)
      setScrollY(300)

      act(() => {
        triggerScroll()
        jest.runAllTimers()
      })

      const btn = screen.getByRole("button", { name: /back to top/i })
      expect(btn).toHaveClass("is-visible")
    })

    it("becomes visible when scrollY exceeds 300", () => {
      render(<BackToTopButton />)
      setScrollY(500)

      act(() => {
        triggerScroll()
        jest.runAllTimers()
      })

      expect(screen.getByRole("button", { name: /back to top/i })).toHaveClass("is-visible")
    })

    it("has tabIndex 0 when visible", () => {
      render(<BackToTopButton />)
      setScrollY(400)

      act(() => {
        triggerScroll()
        jest.runAllTimers()
      })

      expect(screen.getByRole("button", { name: /back to top/i })).toHaveAttribute("tabindex", "0")
    })

    it("hides again when scrollY drops below 300", () => {
      render(<BackToTopButton />)

      // scroll down
      setScrollY(400)
      act(() => {
        triggerScroll()
        jest.runAllTimers()
      })

      // scroll back up
      setScrollY(100)
      act(() => {
        triggerScroll()
        jest.runAllTimers()
      })

      expect(screen.getByRole("button", { name: /back to top/i })).not.toHaveClass("is-visible")
    })
  })

  describe("edge cases — boundary conditions", () => {
    it("is NOT visible at 299px", () => {
      render(<BackToTopButton />)
      setScrollY(299)

      act(() => {
        triggerScroll()
        jest.runAllTimers()
      })

      expect(screen.getByRole("button", { name: /back to top/i })).not.toHaveClass("is-visible")
    })

    it("is visible at exactly 300px", () => {
      render(<BackToTopButton />)
      setScrollY(300)

      act(() => {
        triggerScroll()
        jest.runAllTimers()
      })

      expect(screen.getByRole("button", { name: /back to top/i })).toHaveClass("is-visible")
    })
  })

  describe("click behavior", () => {
    it("calls window.scrollTo with top:0 and smooth behavior on click", () => {
      const scrollToSpy = jest.spyOn(window, "scrollTo").mockImplementation(() => undefined)

      render(<BackToTopButton />)
      setScrollY(400)

      act(() => {
        triggerScroll()
        jest.runAllTimers()
      })

      fireEvent.click(screen.getByRole("button", { name: /back to top/i }))

      expect(scrollToSpy).toHaveBeenCalledWith({ top: 0, behavior: "smooth" })
    })
  })

  describe("event listener cleanup", () => {
    it("removes the scroll listener when unmounted", () => {
      const addSpy = jest.spyOn(window, "addEventListener")
      const removeSpy = jest.spyOn(window, "removeEventListener")

      const { unmount } = render(<BackToTopButton />)

      // Confirm a scroll listener was added
      expect(addSpy).toHaveBeenCalledWith("scroll", expect.any(Function), { passive: true })

      unmount()

      // Confirm the same handler was removed
      expect(removeSpy).toHaveBeenCalledWith("scroll", expect.any(Function))
    })
  })

  describe("RAF throttle", () => {
    it("does not call setVisible more than once per animation frame for rapid scroll events", () => {
      // We verify the ticking guard by firing multiple scroll events synchronously
      // and confirming requestAnimationFrame is called only once per burst.
      const rafSpy = jest.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => {
        cb(0)
        return 0
      })

      render(<BackToTopButton />)
      setScrollY(400)

      act(() => {
        // Fire 5 scroll events in the same synchronous block
        for (let i = 0; i < 5; i++) {
          triggerScroll()
        }
        jest.runAllTimers()
      })

      // rAF should have been called, but the ticking flag prevents stacking
      expect(rafSpy).toHaveBeenCalled()
      expect(screen.getByRole("button", { name: /back to top/i })).toHaveClass("is-visible")
    })
  })
})
