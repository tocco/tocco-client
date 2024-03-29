import {mount, shallow} from 'enzyme'
import {IntlProvider} from 'react-intl'

// Create the IntlProvider to retrieve context for wrapping around.

const defaultLocale = 'en'
const locale = defaultLocale

export function mountWithIntl(node) {
  return mount(node, {
    wrappingComponent: IntlProvider,
    wrappingComponentProps: {
      locale,
      defaultLocale
    }
  })
}

export function shallowWithIntl(node) {
  return shallow(node, {
    wrappingComponent: IntlProvider,
    wrappingComponentProps: {
      locale,
      defaultLocale
    }
  })
}
