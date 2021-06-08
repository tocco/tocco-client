import {addDecorator} from '@storybook/react'
import {withThemesProvider} from 'themeprovider-storybook'
import {setIntlConfig, withIntl} from 'storybook-addon-intl'

import defaultTheme from '../packages/tocco-theme/src/ToccoTheme/defaultTheme'
import darkTheme from '../packages/tocco-theme/src/ToccoTheme/darkTheme'

const themes = [defaultTheme, darkTheme]
addDecorator(withThemesProvider(themes))

setIntlConfig({
  locales: ['de-CH', 'de', 'fr', 'it', 'en'],
  defaultLocale: 'de-CH',
  getMessages: locale => new Proxy({}, {
    get: (target, prop, receiver) => prop
  })
})

addDecorator(withIntl)
