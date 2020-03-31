import {useState} from 'react'

const removeAllTextSelections = () => {
  if (document.getSelection) {
    document.getSelection().removeAllRanges()
  }
}

export default (selection, currentKeys, onSelectChange) => {
  const [lastSelected, setLastSelected] = useState(null)

  const isSelected = key => selection.includes(key)

  const singleSelectHandler = (key, value, shiftSelection) => {
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

  const multiSelectHandler = (keys, value) => {
    onSelectChange(keys, value)
    setLastSelected(null)
  }

  return {
    isSelected,
    singleSelectHandler,
    multiSelectHandler
  }
}
