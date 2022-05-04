export default {
  getOptions: ({formField}) => ({
    mode: formField.mode,
    title: formField.title
  }),
  getValue: ({formField}) => formField.text
}
