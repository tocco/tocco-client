const CHARACTER_TYPE_EXPRESSIONS = {
  'LowerCase': /[a-z]/g,
  'UpperCase': /[A-Z]/g,
  'Digit': /[0-9]/g
}

const VALIDATORS = {
  PASSWORD_NOT_CHANGED: (newPassword, oldPassword) => (
    typeof newPassword === 'string' && typeof oldPassword === 'string' && newPassword !== oldPassword
  ),
  LENGTH: (newPassword, oldPassword, rule) => (
    typeof newPassword === 'string'
    && (rule.params.min === undefined || rule.params.min === null || newPassword.length >= rule.params.min)
    && (rule.params.max === undefined || rule.params.max === null || newPassword.length <= rule.params.max)
  ),
  CHARACTER: (newPassword, oldPassword, rule) => {
    if (typeof newPassword !== 'string') {
      return false
    }

    const initialLength = newPassword.length;
    const lengthWithoutSpecificChars = newPassword.replace(CHARACTER_TYPE_EXPRESSIONS[rule.params.type], '').length;
    const specificCharsCount = initialLength - lengthWithoutSpecificChars;

    return (rule.params.min === undefined || rule.params.min === null || specificCharsCount >= rule.params.min)
      && (rule.params.max === undefined || rule.params.max === null || specificCharsCount <= rule.params.max)
  }
}

function validate(newPassword, oldPassword, validationRules) {
  const errors = {}

  if (validationRules) {
    validationRules.forEach(rule => {
      const validator = VALIDATORS[rule.name]
      if (validator) {
        const valid = validator(newPassword, oldPassword, rule)
        if (valid !== true) {
          errors[rule.id] = true
        }
      }
    })
  }

  return errors
}

export default validate
