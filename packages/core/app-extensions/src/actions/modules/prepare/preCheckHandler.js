export default function* preCheckHandler(preparationResponse, params, definition, selection, config) {
  if (preparationResponse.preCheck && preparationResponse.preCheck.success === false) {
    return {
      abort: true,
      abortMessage: preparationResponse.preCheck.message || 'client.component.actions.errorText'
    }
  }

  return {
    abort: false
  }
}
