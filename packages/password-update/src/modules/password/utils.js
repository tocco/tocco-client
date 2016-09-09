export function isEmptyObject(object) {
  // http://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object
  return Object.keys(object).length === 0 && object.constructor === Object
}

export function validationMessagesToErrorMap(messages) {
  const errors = {}
  messages.forEach(message => {
    errors[message.ruleName] = message.message
  })
  return errors
}
