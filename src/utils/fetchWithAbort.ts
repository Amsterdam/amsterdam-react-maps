const fetchWithAbort = (
  input: RequestInfo,
  init?: RequestInit,
): [Promise<Response>, AbortController] => {
  const controller = new AbortController()
  const { signal } = controller

  return [fetch(input, { ...init, signal }), controller]
}

export default fetchWithAbort
