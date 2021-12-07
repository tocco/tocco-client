import '!style-loader!css-loader!flatpickr/dist/themes/light.css'
import flatpickr from 'flatpickr'
import {German} from 'flatpickr/dist/l10n/de.js'
import {French} from 'flatpickr/dist/l10n/fr.js'
import {Italian} from 'flatpickr/dist/l10n/it.js'
import {useEffect, useRef} from 'react'
import {react, js} from 'tocco-util'

const localeMap = {
  'de-CH': German,
  de: German,
  fr: French,
  it: Italian
}

const handleOnChange = onChange => selectedDates => {
  if (selectedDates && selectedDates.length > 0) {
    onChange(selectedDates[0].toISOString())
  } else {
    onChange(null)
  }
}

const initializeFlatPickr = (element, {shouldAppend, onChange, value, fontFamily, locale, flatpickrOptions}) => {
  const calendarLocale = localeMap[locale]

  const options = {
    wrap: true,
    onChange: handleOnChange(onChange),
    altInput: false,
    enableTime: false,
    defaultDate: value,

    ...(shouldAppend ? {appendTo: element.current} : {}),
    ...(calendarLocale ? {locale: calendarLocale} : {}),
    ...flatpickrOptions
  }

  const flatpickrInstance = flatpickr(element.current, options)

  if (fontFamily) {
    flatpickrInstance.calendarContainer.style.fontFamily = fontFamily
  }

  return flatpickrInstance
}

export const useDatePickr = (element, config) => {
  const {value, locale, flatpickrOptions} = config
  const flatpickr = useRef(null)

  const prevFlatpickrOptions = react.usePrevious(flatpickrOptions)

  const init = () => {
    flatpickr.current = initializeFlatPickr(element, config)
    return flatpickr.current
  }

  useEffect(() => {
    return () => {
      if (flatpickr.current) {
        flatpickr.current.destroy()
      }
    }
  }, []) // only on unmount

  useEffect(() => {
    if (flatpickr.current) {
      flatpickr.current.setDate(value, false)
      flatpickr.current.redraw()
    }
  }, [JSON.stringify(value)]) // only trigger useEffect when value array changed (deep comparison workaround)

  useEffect(() => {
    const calendarLocale = localeMap[locale] || flatpickr.current?.l10ns?.en // fallback to english
    if (flatpickr.current && calendarLocale) {
      flatpickr.current.localize(calendarLocale)
      flatpickr.current.set('locale', calendarLocale)
      flatpickr.current.redraw()
    }
  }, [locale])

  useEffect(() => {
    if (flatpickr.current) {
      const optionsDiff = js.difference(flatpickrOptions, prevFlatpickrOptions)
      if (Object.keys(optionsDiff).length > 0) {
        Object.entries(optionsDiff).forEach(([key, value]) => {
          flatpickr.current.set(key, value)
        })
        flatpickr.current.redraw()
      }
    }
  }, [flatpickrOptions])

  return init
}
