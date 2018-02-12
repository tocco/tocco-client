export const isValidSelection = (selectedCount, {minSelection, maxSelection}) =>
  !(notEnough(selectedCount, minSelection) || tooMany(selectedCount, maxSelection))

export const selectionText = (selectedCount, {minSelection, maxSelection}, intl) => {
  if (notEnough(selectedCount, minSelection)) {
    return intl.formatMessage({id: 'client.component.actions.notEnoughSelected'}, {minSelection})
  }

  if (tooMany(selectedCount, maxSelection)) {
    return intl.formatMessage({id: 'client.component.actions.tooManySelected'}, {maxSelection})
  }

  return null
}

const notEnough = (selectedCount, minSelection) => minSelection && selectedCount < minSelection
const tooMany = (selectedCount, maxSelection) => maxSelection && selectedCount > maxSelection
