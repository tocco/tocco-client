import {useState, useMemo} from 'react'
import _debounce from 'lodash/debounce'

const useDebounce = (initialValue, onChangeCb) => {
  const [value, setValue] = useState(initialValue)

  const debouncedCb = useMemo(() => _debounce(v => {
    onChangeCb(v)
  }, 200), [])

  const onChange = v => {
    setValue(v)
    if (onChangeCb && typeof onChangeCb === 'function') {
      debouncedCb(v)
    }
  }

  return [
    value,
    onChange
  ]
}

export default useDebounce
