const useFetchWithAbort = () => {
  const controller = new AbortController()
  const { signal } = controller
  return [url => fetch(url, { signal }), controller] as [
    (url: string) => Promise<Response>,
    AbortController,
  ]
}

export default useFetchWithAbort
