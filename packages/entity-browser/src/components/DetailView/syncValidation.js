import _forOwn from 'lodash/forOwn'

export default entityModel => {
  return values => {
    const errors = {}
    const isMandatoryField = fieldName => (
      entityModel[fieldName]
      && entityModel[fieldName].validate
      && entityModel[fieldName].validate.mandatory
    )

    _forOwn(values, (value, key) => {
      if (isMandatoryField(key)) {
        if (!values[key]) {
          errors[key] = {mandatory: 'Requires!', other:'other Error'}
        }
      }
    })

    return errors
  }
}
