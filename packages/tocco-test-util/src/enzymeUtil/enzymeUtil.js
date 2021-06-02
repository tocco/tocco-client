/* eslint-disable react/prop-types */
import React from 'react'
import {mount, shallow} from 'enzyme'
import {ThemeProvider} from 'styled-components'
import {ToccoTheme} from 'tocco-theme'
import {IntlProvider} from 'react-intl'

const WrappingComponent = ({locale, defaultLocale, children}) => (
  <IntlProvider locale="en" defaultLocale="en">
    <ThemeProvider theme={ToccoTheme}>
      {children}
    </ThemeProvider>
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
