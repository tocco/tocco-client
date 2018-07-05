import PropTypes from 'prop-types'
import React from 'react'
import {addLocaleData, IntlProvider} from 'react-intl'
import Navigation from './Navigation'
import LocaleSwitcher from './LocaleSwitcher'
import ShowCaseList from './ShowCaseList'
import Affix from './Affix'
import {ThemeProvider} from 'styled-components'

import de from 'react-intl/locale-data/de'
import en from 'react-intl/locale-data/en'
import fr from 'react-intl/locale-data/fr'
import it from 'react-intl/locale-data/it'

import {ToccoTheme} from 'tocco-theme'
import InjectFontRoboto from '../../../tocco-ui/src/Typography/Font'

export default class ShowCaseApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      locale: 'en'
    }

    addLocaleData([...de, ...en, ...fr, ...it])
  }

  static propTypes = {
    componentsTree: PropTypes.array.isRequired
  }

  localeChange(locale) {
    console.log('Change locale to: ', locale) // eslint-disable-line no-console
    this.setState({locale})
  }

  render() {
    return (
      <ThemeProvider theme={ToccoTheme}>
        <IntlProvider locale={this.state.locale}>
          <div className="show-case-app tocco-ui-theme">
            <InjectFontRoboto theme={ToccoTheme}/>
            <div className="col title">
              <span>Tocco UI</span>
            </div>
            <div className="col-md-10">
              <ShowCaseList componentsTree={this.props.componentsTree}/>
            </div>
            <div className="col-md-2 hidden-xs hidden-sm">
              <Affix className="navi-affix" offset={50}>
                <LocaleSwitcher onLocaleChange={this.localeChange.bind(this)}/>
                <Navigation componentsTree={this.props.componentsTree}/>
              </Affix>
            </div>
          </div>
        </IntlProvider>
      </ThemeProvider>
    )
  }
}
