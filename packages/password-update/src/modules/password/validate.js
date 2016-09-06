
function validateCharacterRule(password, regex, min, max) {
  if (typeof password !== 'string') {
    return false
  }

  const initialLength = password.length;
  const lengthWithoutSpecificChars = password.replace(regex, '').length;
  const specificCharsCount = initialLength - lengthWithoutSpecificChars;

  return (min === undefined || min === null || specificCharsCount >= min)
    && (max === undefined || max === null || specificCharsCount <= max)
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
  CHARACTER_INSUFFICIENT_LOWERCASE: (newPassword, oldPassword, rule) => {
    return validateCharacterRule(newPassword, /[a-z]/g, rule.params.min, rule.params.max)
  },
  CHARACTER_INSUFFICIENT_UPPERCASE: (newPassword, oldPassword, rule) => {
    return validateCharacterRule(newPassword, /[A-Z]/g, rule.params.min, rule.params.max)
  },
  CHARACTER_INSUFFICIENT_DIGIT: (newPassword, oldPassword, rule) => {
    return validateCharacterRule(newPassword, /[0-9]/g, rule.params.min, rule.params.max)
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
          errors[rule.name] = true
        }
      }
    })
  }

  return errors
}

export default validate
