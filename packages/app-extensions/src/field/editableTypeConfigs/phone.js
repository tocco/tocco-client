export default {
  getOptions: ({modelField}) => ({
    customPhoneRegex: modelField.customPhoneRegex,
    defaultCountry: modelField.defaultCountry
  })
}
