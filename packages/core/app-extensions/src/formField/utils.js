const multiTypes = ['multi-select-box', 'multi-remote-field', 'search-filter']

export const isMultipleFields = (value, dataType) => Array.isArray(value) && !multiTypes.includes(dataType)
