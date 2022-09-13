import {useEffect} from 'react'

/**
 * options may contain:
 * - selectFulltextFields, tries to find a search field with and id ending with txtFulltext first
 */
const useAutofocus = (reference, options = {}, dependencies = []) =>
  useEffect(() => {
    if (reference.current) {
      if (options.selectFulltextFields) {
        const firstFulltextInput = reference.current.querySelector('input[id$="txtFulltext"]:not([disabled])')
        if (firstFulltextInput) {
          firstFulltextInput.focus()
          return
        }
      }

      const firstTextInput = reference.current.querySelector(
        [
          ':not(.react-datepicker-wrapper) input[type = "text"]:not([disabled])',
          ':not(.react-datepicker-wrapper) textarea:not([disabled])'
        ].join(',')
      )
      if (firstTextInput) {
        firstTextInput.focus()
      }
    }
  }, dependencies) // eslint-disable-line react-hooks/exhaustive-deps

export default useAutofocus
