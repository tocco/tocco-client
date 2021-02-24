import ExtendableError from 'es6-error'

class InformationError extends ExtendableError {
  constructor(message) {
    super()
    this.message = message
  }
}

export default InformationError
