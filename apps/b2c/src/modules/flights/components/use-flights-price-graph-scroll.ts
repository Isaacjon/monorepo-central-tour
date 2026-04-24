"use client"

import { useCallback, useLayoutEffect, useRef, useState } from "react"

import {
  PRICE_GRAPH_COLUMN_PX,
  PRICE_GRAPH_GAP_PX,
} from "./flights-search-price-graph.utils"

export function useFlightsPriceGraphScroll(todayDay: number) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  const syncScrollEdges = useCallback(() => {
    const el = scrollerRef.current
    if (!el) return
    const { scrollLeft, scrollWidth, clientWidth } = el
    const max = scrollWidth - clientWidth
    setCanScrollPrev(scrollLeft > 2)
    setCanScrollNext(scrollLeft < max - 2)
  }, [])

  useLayoutEffect(() => {
    const root = scrollerRef.current
    if (!root) return
    const dayEl = root.querySelector(
      `[data-price-graph-day="${todayDay}"]`
    ) as HTMLElement | null
    if (dayEl) {
      const x =
        dayEl.offsetLeft - root.clientWidth / 2 + dayEl.offsetWidth / 2
      root.scrollLeft = Math.max(0, Math.min(x, root.scrollWidth - root.clientWidth))
    }
    syncScrollEdges()
    const ro = new ResizeObserver(() => syncScrollEdges())
    ro.observe(root)
    return () => ro.disconnect()
  }, [syncScrollEdges, todayDay])

  const scrollMonthBy = useCallback((direction: -1 | 1) => {
    const el = scrollerRef.current
    if (!el) return
    const stride = PRICE_GRAPH_COLUMN_PX + PRICE_GRAPH_GAP_PX
    const cols = Math.max(1, Math.floor(el.clientWidth / stride))
    const step = Math.max(stride * cols, el.clientWidth * 0.4)
    el.scrollBy({ left: direction * step, behavior: "smooth" })
  }, [])

  return {
    scrollerRef,
    canScrollPrev,
    canScrollNext,
    scrollMonthBy,
    syncScrollEdges,
  }
}
