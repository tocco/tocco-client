import {useState, useCallback} from 'react'

const removeAllTextSelections = () => {
  if (document.getSelection) {
    document.getSelection().removeAllRanges()
  }
}

export default (selection = [], currentKeys, onSelectChange) => {
  const [lastSelected, setLastSelected] = useState(null)

  const isSelected = useCallback(key => selection.includes(key), [selection])

  const selectionChange = useCallback(
    (key, value, shiftSelection) => {
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
    },
    [currentKeys, onSelectChange, isSelected, lastSelected]
  )

  return {
    isSelected,
    selectionChange
  }
}
