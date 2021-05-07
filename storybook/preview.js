import {addDecorator} from '@storybook/react'
import {withThemesProvider} from 'themeprovider-storybook'
import {setIntlConfig, withIntl} from 'storybook-addon-intl'
import {addLocaleData} from 'react-intl'
import enLocaleData from 'react-intl/locale-data/en'
import deLocaleData from 'react-intl/locale-data/de'
import frLocaleData from 'react-intl/locale-data/fr'
import itLocaleData from 'react-intl/locale-data/it'

import defaultTheme from '../packages/tocco-theme/src/ToccoTheme/defaultTheme'
import darkTheme from '../packages/tocco-theme/src/ToccoTheme/darkTheme'

const themes = [defaultTheme, darkTheme]
addDecorator(withThemesProvider(themes))

addLocaleData(enLocaleData)
addLocaleData(deLocaleData)
addLocaleData(frLocaleData)
addLocaleData(itLocaleData)

setIntlConfig({
  locales: ['de-CH', 'de', 'fr', 'it', 'en'],
  defaultLocale: 'de-CH',
  getMessages: locale => ({
    'client.component.pagination.text': '{start} to {to} from {total}'
  })
})

addDecorator(withIntl)
