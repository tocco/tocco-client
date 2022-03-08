export const abortController = new AbortController()
window.addEventListener('beforeunload', () => abortController.abort())
