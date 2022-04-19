const allowNegative = formField =>
  !formField.validation
  || !formField.validation.numberRange
  || typeof formField.validation.numberRange.fromIncluding !== 'number'
  || formField.validation.numberRange.fromIncluding < 0

export default {
  getOptions: ({formField, formData}) => ({
    hoursLabel: formData.intl.formatMessage({id: 'client.component.duration.hoursLabel'}),
    minutesLabel: formData.intl.formatMessage({id: 'client.component.duration.minutesLabel'}),
    allowNegative: allowNegative(formField)
  })
}
