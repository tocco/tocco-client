import {useState} from 'react'

const removeAllTextSelections = () => {
  if (document.getSelection) {
    document.getSelection().removeAllRanges()
  }
}

export default (selection = [], currentKeys, onSelectChange) => {
  const [lastSelected, setLastSelected] = useState(null)

  const isSelected = key => selection.includes(key)

  const selectionChange = (key, value, shiftSelection) => {
    if (Array.isArray(key)) {
      onSelectChange(key, value)
      setLastSelected(null)
    } else {
      if (shiftSelection) {
        removeAllTextSelections()

        const idxLastSelection = lastSelected ? currentKeys.findIndex(k => k === lastSelected) : 0
        const idxSelection = currentKeys.findIndex(k => k === key)
        onSelectChange(
          currentKeys.slice(Math.min(idxLastSelection, idxSelection), Math.max(idxLastSelection, idxSelection) + 1),
          value
        )
      } else {
        onSelectChange([key], value || !isSelected(key))
        setLastSelected(key)
      }
    }
  }

  return {
    isSelected,
    selectionChange
  }
}
