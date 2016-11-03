import React from 'react'
import {IntlProvider} from 'react-intl'
import {mount, shallow} from 'enzyme'

export const mountWithIntlProvider = node => {
  return mount(
    <IntlProvider locale="en">
      {node}
    </IntlProvider>)
}

export const shallowWithIntlProvider = node => {
  return shallow(
    <IntlProvider locale="en">
      {node}
    </IntlProvider>)
}
