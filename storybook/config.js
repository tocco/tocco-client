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
import CustomPropTable from './CustomPropTable'

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
  TableComponent: CustomPropTable,
  styles: defaultTheme => (
    {
      ...defaultTheme,
      button: {
        ...defaultTheme.button,
        base: {
          ...defaultTheme.button.base,
          backgroundColor: '#9E2124',
          border: 0
        }
      },
      header: {
        ...defaultTheme.header,
        body: {
          ...defaultTheme.header.body,
          borderBottom: 0
        },
        h2: {
          display: 'none'
        }
      },
      info: {
        ...defaultTheme.info,
        margin: 0,
        padding: '10px'
      },
      infoBody: {
        ...defaultTheme.infoBody,
        border: 0,
        margin: 0,
        padding: 0
      },
      propTableHead: {
        display: 'none'
      },
      source: {
        ...defaultTheme.source,
        h1: {
          ...defaultTheme.source.h1,
          borderBottom: 0
        }
      }
    }
  )
}))

addDecorator(withIntl)

addDecorator(withThemesProvider([
  {
    ...defaultTheme,
    name: 'Default'
  },
  {
    ...darkTheme,
    name: 'Dark'
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
