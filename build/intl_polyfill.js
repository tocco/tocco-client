/* eslint-disable no-extend-native */
import {addLocaleData} from 'react-intl'
import Intl from 'intl'

export default () => {
  require('intl/locale-data/jsonp/en.js')
  require('intl/locale-data/jsonp/de.js')
  require('intl/locale-data/jsonp/fr.js')
  require('intl/locale-data/jsonp/de-CH.js')
  const en = require('react-intl/locale-data/en')
  const de = require('react-intl/locale-data/de')
  const fr = require('react-intl/locale-data/fr')
  addLocaleData([...en, ...de, ...fr])
  const IntlPolyfill = require('intl')
  global.Intl = IntlPolyfill

  Intl.NumberFormat = IntlPolyfill.NumberFormat
  Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat

  Number.prototype.toLocaleString = IntlPolyfill.__localeSensitiveProtos.Number.toLocaleString
  Date.prototype.toLocaleString = IntlPolyfill.__localeSensitiveProtos.Date.toLocaleString
}
