import 'babel-polyfill'
import {themes as storyBookThemes} from '@storybook/components'
import {configure, addDecorator} from '@storybook/react'
import {withThemesProvider} from 'storybook-addon-styled-component-theme'
import {withInfo} from '@storybook/addon-info'
import {withOptions} from '@storybook/addon-options'
import {withBackgrounds} from '@storybook/addon-backgrounds'
import {setIntlConfig, withIntl} from 'storybook-addon-intl'
import {addLocaleData} from 'react-intl'
import enLocaleData from 'react-intl/locale-data/en'
import deLocaleData from 'react-intl/locale-data/de'

import darkTheme from '../packages/tocco-theme/src/ToccoTheme/darkTheme'
import defaultTheme from '../packages/tocco-theme/src/ToccoTheme/defaultTheme'

addLocaleData(enLocaleData)
addLocaleData(deLocaleData)

setIntlConfig({
  locales: ['en', 'de'],
  defaultLocale: 'en',
  getMessages: () => {}
})

addDecorator(
  withOptions({
    name: 'Toccos STORYBOOK',
    url: 'https://github.com/tocco/tocco-client',
    theme: {
      ...storyBookThemes.normal,
      brand: {
        background: 'url("tocco.png")',
        backgroundSize: '16px 16px',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '6px 6px'
      },
      brandLink: {
        paddingLeft: '18px',
        textTransform: 'none'
      }
    }
  })
)

addDecorator(withInfo({
  styles: defaultTheme => (
    {
      ...defaultTheme,
      header: {
        ...defaultTheme.header,
        h2: {fontSize: '12px'}
      },
      button: {
        ...defaultTheme.button,
        base: {
          ...defaultTheme.button.base,
          backgroundColor: '#9E2124',
          border: '1px solid white'
        }
      }
    }
  )
}))

addDecorator(withIntl)

addDecorator(withThemesProvider([
  {
    ...defaultTheme,
    name: 'Default',
    fontSize: {
      ...defaultTheme.fontSize,
      base: 1
    }
  },
  {
    ...darkTheme,
    name: 'Dark',
    fontSize: {
      ...darkTheme.fontSize,
      base: 1
    }
  }
]))

addDecorator(
  withBackgrounds([
    {name: 'White', value: '#fff', default: true},
    {name: 'Dark', value: '#707070'},
    {name: 'Tocco', value: '#9E2124'}
  ])
)

const req = require.context('../packages/tocco-ui/src/', true, /\.stories\.js$/)
const req2 = require.context('../packages/app-extensions/src/', true, /\.stories\.js$/)

function loadStories() {
  req.keys().forEach(filename => req(filename))
  req2.keys().forEach(filename => req2(filename))
}

configure(loadStories, module)
