import '!style-loader!css-loader!react-datepicker/dist/react-datepicker.css'
import {parseISO} from 'date-fns'
import {registerLocale, setDefaultLocale} from 'react-datepicker'
import {date as dateUtils} from 'tocco-util'

const loadLocales = () => {
  registerLocale('en', dateUtils.getDateFnsLocale('en'))
  registerLocale('en-US', dateUtils.getDateFnsLocale('en'))

  registerLocale('de-CH', dateUtils.getDateFnsLocale('de-CH'))
  registerLocale('de', dateUtils.getDateFnsLocale('de'))

  registerLocale('fr', dateUtils.getDateFnsLocale('fr'))
  registerLocale('fr-CH', dateUtils.getDateFnsLocale('fr'))

  registerLocale('it', dateUtils.getDateFnsLocale('it'))
  registerLocale('it-CH', dateUtils.getDateFnsLocale('it'))

  setDefaultLocale('de')
}

const parseISOValue = val => {
  const date = parseISO(val)
  return isNaN(date) ? null : date
}

export {loadLocales, parseISOValue}
