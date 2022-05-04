import MultipleFieldsSeparator from './MultipleFieldsSeparator'

const multiTypes = ['multi-select-box', 'multi-remote-field', 'search-filter']

export const isMultipleFields = (value, dataType) => Array.isArray(value) && !multiTypes.includes(dataType)

export const enhanceMultipleFieldsWithSeparators = fields =>
  fields.reduce(
    (acc, curr, idx) => [...acc, ...(acc.length > 0 ? [<MultipleFieldsSeparator key={`sep${idx}`} />] : []), curr],
    []
  )
