/* eslint-disable react/prop-types */
import {mount, shallow} from 'enzyme'
import {IntlProvider} from 'react-intl'
import {ThemeProvider} from 'styled-components'
import {ToccoTheme} from 'tocco-theme'

const WrappingComponent = ({locale, defaultLocale, children}) => (
  <IntlProvider locale="en" defaultLocale="en">
    <ThemeProvider theme={ToccoTheme}>{children}</ThemeProvider>
  </IntlProvider>
)

export function mountEmbedded(node) {
  return mount(node, {
    wrappingComponent: WrappingComponent
  })
}

export function shallowEmbedded(node) {
  return shallow(node, {
    wrappingComponent: WrappingComponent
  })
}
