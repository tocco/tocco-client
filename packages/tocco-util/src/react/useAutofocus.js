import {useEffect} from 'react'

const useAutofocus = (reference, dependencies = []) =>
  useEffect(() => {
    if (reference.current) {
      const firstInput = reference.current.querySelector(
        'input[type = "text"]:not([disabled]), textarea:not([disabled])'
      )
      if (firstInput) {
        firstInput.focus()
      }
    }
  }, dependencies) // eslint-disable-line react-hooks/exhaustive-deps

export default useAutofocus
