import {useEffect} from 'react'

const useAutofocus = reference =>
  useEffect(() => {
    if (reference.current) {
      const firstInput = reference.current
        .querySelector('input[type = "text"]:not([disabled]), textarea:not([disabled])')
      if (firstInput) {
        firstInput.focus()
      }
    }
  }, [])

export default useAutofocus
