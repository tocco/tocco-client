/* eslint-disable react/prop-types */
import React from 'react'
import {mount, shallow} from 'enzyme'
import {ThemeProvider} from 'styled-components'
import {ToccoTheme} from 'tocco-theme'
import {IntlProvider, intlShape} from 'react-intl'

const intlProvider = new IntlProvider({locale: 'en'}, {})
const {intl} = intlProvider.getChildContext()
const nodeWithIntlProp = node => React.cloneElement(node, {intl})

// Enzymes shallow wrapped with a ThemeProvider and Intl Context
export const shallowEmbedded = (child, {context} = {}) => (
  shallow(
    nodeWithIntlProp(child),
    {
      context: Object.assign({}, context, {intl}),
      wrappingComponent: ({children}) => <ThemeProvider theme={ToccoTheme}>{children}</ThemeProvider>
    }
  )
)

// Enzymes mount wrapped with a ThemeProvider and Intl Context
export const mountEmbedded = (child, {context, childContextTypes} = {}) => (
  mount(
    nodeWithIntlProp(child),
    {
      context: Object.assign({}, context, {intl}),
      childContextTypes: Object.assign({}, {intl: intlShape}, childContextTypes),
      wrappingComponent: ({children}) => <ThemeProvider theme={ToccoTheme}>{children}</ThemeProvider>
    }
  )
)
