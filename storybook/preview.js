import {addDecorator} from '@storybook/react'
import {setIntlConfig, withIntl} from 'storybook-addon-intl'
import {withThemesProvider} from 'themeprovider-storybook'

import darkTheme from '../packages/core/tocco-theme/src/ToccoTheme/darkTheme.js'
import defaultTheme from '../packages/core/tocco-theme/src/ToccoTheme/defaultTheme.js'

const themes = [defaultTheme, darkTheme]
addDecorator(withThemesProvider(themes))

setIntlConfig({
  locales: ['de-CH', 'de', 'fr', 'it', 'en'],
  defaultLocale: 'de-CH',
  getMessages: locale =>
    new Proxy(
      {},
      {
        get: (target, prop, receiver) => prop
      }
    )
})

addDecorator(withIntl)
