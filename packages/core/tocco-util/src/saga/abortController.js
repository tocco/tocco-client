export const abortController = new AbortController()

let preventFromLeaving = false

export const activatePreventFromLeaving = () => {
  preventFromLeaving = true
}

export const deactivatePreventFromLeaving = () => {
  preventFromLeaving = false
}

/**
 * Handled use cases:
 * - Do not show error toaster for aborted requests (TOCDEV-3557)
 * - Show user confirmation prompt when leaving page with unsaved changes (TOCDEV-6281)
 *
 * TOCDEV-3557
 * - `visisbilitychange` event for visisbilityState = hidden is too late, already some requests failed
 * - `pagehide` event is too late, already some requests failed
 * - `beforeunload` event seems to be the right event to abort requests
 * Sources: https://developer.chrome.com/blog/page-lifecycle-api/
 *
 * TOCDEV-6281
 * - page unload can be interrupted when `beforeunload` gets cancelled by showing user confirmation prompt
 *
 * Problem:
 * - no indication if `beforeunload` is cancelled
 * - follow up events such as `visibilitychange` and `pagehide` events only in case when page get's reloaded
 * - abortController should only abort signal when `beforeunload` is not cancelled
 *   - however there is no indication for this
 *
 * Workaround:
 * - use one `beforeunload` listener for both usecases
 * - only abort signal when no prompt is shown
 * - latest abort signal on `pagehide` event
 *   - there is still a small timeframe where aborted requests could fire error toaster
 *     before the `pagehide` event has triggered
 *   - but these situations are quite rare
 */
window.addEventListener('beforeunload', event => {
  if (preventFromLeaving) {
    event.preventDefault()
    event.returnValue = ''
  } else {
    abortController.abort()
  }
})

window.addEventListener('pagehide', () => {
  if (!abortController.signal.aborted) {
    abortController.abort()
  }
})
