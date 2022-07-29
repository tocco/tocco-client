import '!style-loader!css-loader!react-datepicker/dist/react-datepicker.css'
import {parseISO} from 'date-fns'
import {registerLocale, setDefaultLocale} from 'react-datepicker'
import {date} from 'tocco-util'

const loadLocales = () => {
  registerLocale('en', date.getDateFnsLocale('en'))
  registerLocale('en-US', date.getDateFnsLocale('en'))

  registerLocale('de-CH', date.getDateFnsLocale('de-CH'))
  registerLocale('de', date.getDateFnsLocale('de'))

  registerLocale('fr', date.getDateFnsLocale('fr'))
  registerLocale('fr-CH', date.getDateFnsLocale('fr'))

  registerLocale('it', date.getDateFnsLocale('it'))
  registerLocale('it-CH', date.getDateFnsLocale('it'))

  setDefaultLocale('de')
}

const parseISOValue = val => {
  const date = parseISO(val)
  return isNaN(date) ? null : date
}

export {loadLocales, parseISOValue}
