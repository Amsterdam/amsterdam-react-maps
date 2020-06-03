import {
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react'

/**
 * Sometimes we need to access the latest state from an event listener, so we need a mutable variable (ref)
 * This is because the listener belongs to the initial render and is not updated on subsequent re-renders
 * @param initialValue
 */
function useStateRef<T>(
  initialValue: T,
): [T, Dispatch<SetStateAction<T>>, RefObject<T>] {
  const [value, setValue] = useState<T>(initialValue)

  const ref = useRef(value)

  useEffect(() => {
    ref.current = value
  }, [value])

  return [value, setValue, ref]
}

export default useStateRef
