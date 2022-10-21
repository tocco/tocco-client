export default {
  getOptions: ({entityField}) => {
    if (entityField?.type === 'long') {
      return {
        datePickerOptions: {
          valueToDate: val => {
            const date = val ? new Date(val) : null
            return isNaN(date) ? null : date
          },
          dateToValue: date => (date ? date.getTime() : null)
        }
      }
    }
    return undefined
  }
}
