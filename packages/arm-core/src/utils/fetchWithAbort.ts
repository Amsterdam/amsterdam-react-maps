const fetchWithAbort = (
  input: RequestInfo,
  init?: RequestInit,
): { request: Promise<Response>; controller: AbortController } => {
  const controller = new AbortController()
  const { signal } = controller

  return { request: fetch(input, { ...init, signal }), controller }
}

export default fetchWithAbort
