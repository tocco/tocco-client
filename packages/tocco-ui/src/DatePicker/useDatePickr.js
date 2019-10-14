import {useEffect, useState} from 'react'
import '!style-loader!css-loader!flatpickr/dist/themes/light.css'
import flatpickr from 'flatpickr'
import {German} from 'flatpickr/dist/l10n/de.js'
import {French} from 'flatpickr/dist/l10n/fr.js'
import {Italian} from 'flatpickr/dist/l10n/it.js'

const localeMap = {
  'de-CH': German,
  'de': German,
  'fr': French,
  'it': Italian
}

const handleOnChange = onChange => selectedDates => {
  if (selectedDates && selectedDates.length > 0) {
    onChange(selectedDates[0].toISOString())
  } else {
    onChange(null)
  }
}

const initializeFlatPickr = (element, {onChange, value, fontFamily, locale, flatpickrOptions}) => {
  const calendarLocale = localeMap[locale]

  const options = {
    ...(calendarLocale ? {locale: calendarLocale} : {}),
    wrap: true,
    onChange: handleOnChange(onChange),
    altInput: false,
    enableTime: false,
    defaultDate: value,
    appendTo: element.current,

    ...(localeMap[locale] && {locale: localeMap[locale]}),
    ...flatpickrOptions
  }

  const flatpickrInstance = flatpickr(element.current, options)

  if (fontFamily) {
    flatpickrInstance.calendarContainer.style.fontFamily = fontFamily
  }

  return flatpickrInstance
}

export const useDatePickr = (element, config) => {
  const [flatpickrInstance, setflatpickrInstance] = useState(null)
  useEffect(() => {
    if (element) {
      setflatpickrInstance(initializeFlatPickr(element, config))
    }

    return () => {
      if (flatpickrInstance) {
        flatpickrInstance.destroy()
      }
    }
  }, [element, config.locale, config.value])
}
