// TODO: This dependency can be removed once https://github.com/microsoft/TypeScript-DOM-lib-generator/pull/948 is released.
/// <reference types="resize-observer-browser" />
import { RefObject, useLayoutEffect, useMemo, useState } from 'react'

export default function useObserveSize<T extends Element>(
  ref: T | RefObject<T> | null,
): ResizeObserverSize | null {
  const [size, setSize] = useState<ResizeObserverSize | null>(null)
  const resizeObserver = useMemo(
    () =>
      // eslint-disable-next-line no-undef
      new ResizeObserver((entries) => {
        entries.forEach((entry) => {
          const borderBoxSize: ResizeObserverSize | undefined = Array.isArray(
            entry.borderBoxSize,
          )
            ? entry.borderBoxSize[0]
            : entry.borderBoxSize

          if (borderBoxSize) {
            setSize(borderBoxSize)
          }
        })
      }),
    [],
  )

  useLayoutEffect(() => {
    if (!ref) {
      return
    }

    const element = ref instanceof Element ? ref : ref.current

    if (!element) {
      return
    }

    resizeObserver.observe(element)

    return () => resizeObserver.unobserve(element)
  }, [ref])

  return size
}
