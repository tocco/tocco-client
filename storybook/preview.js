import {addDecorator} from '@storybook/react'
import {setIntlConfig, withIntl} from 'storybook-addon-intl'
import {withThemesProvider} from 'themeprovider-storybook'

import darkTheme from '../packages/core/tocco-theme/src/ToccoTheme/darkTheme'
import defaultTheme from '../packages/core/tocco-theme/src/ToccoTheme/defaultTheme'

const themes = [defaultTheme, darkTheme]
addDecorator(withThemesProvider(themes))

const intlMessageProxy = new Proxy(
  {},
  {
    get: (target, prop, receiver) => prop,
    getOwnPropertyDescriptor: (target, prop) => ({configurable: true, enumerable: true, value: prop})
  }
)
setIntlConfig({
  locales: ['de-CH', 'de', 'fr', 'it', 'en'],
  defaultLocale: 'de-CH',
  getMessages: () => intlMessageProxy
})

addDecorator(withIntl)

export const argTypes = {intl: {table: {disable: true}}}
