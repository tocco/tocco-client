import '!style-loader!css-loader!react-datepicker/dist/react-datepicker.css'
import {parseISO} from 'date-fns'
import de from 'date-fns/locale/de'
import en from 'date-fns/locale/en-US'
import fr from 'date-fns/locale/fr-CH'
import it from 'date-fns/locale/it'
import {registerLocale, setDefaultLocale} from 'react-datepicker'

const loadLocales = () => {
  registerLocale('de-CH', de)
  registerLocale('de', de)
  registerLocale('en', en)
  registerLocale('fr', fr)
  registerLocale('it', it)

  setDefaultLocale('de')
}

const parseISOValue = val => {
  const date = parseISO(val)
  return isNaN(date) ? null : date
}

export {loadLocales, parseISOValue}
