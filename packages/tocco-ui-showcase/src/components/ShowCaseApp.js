import React from 'react'
import {addLocaleData, IntlProvider} from 'react-intl'
import Navigation from './Navigation'
import LocaleSwitcher from './LocaleSwitcher'
import ShowCaseList from './ShowCaseList'
import Affix from './Affix'

import de from 'react-intl/locale-data/de'
import en from 'react-intl/locale-data/en'
import fr from 'react-intl/locale-data/fr'
import it from 'react-intl/locale-data/it'

export default class ShowCaseApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      locale: 'en'
    }

    addLocaleData([...de, ...en, ...fr, ...it])
  }

  static propTypes = {
    componentsTree: React.PropTypes.array.isRequired
  }

  localeChange(locale) {
    console.log('Change locale to: ', locale) // eslint-disable-line no-console
    this.setState({locale})
  }

  render() {
    return (
      <IntlProvider locale={this.state.locale}>
        <div className="show-case-app tocco-ui-theme">
          <div className="col title">
            <span>Tocco UI</span>
          </div>
          <div className="col-md-9">
            <ShowCaseList componentsTree={this.props.componentsTree}/>
          </div>
          <div className="col-md-2 hidden-xs hidden-sm">
            <Affix className="navi-affix" offset={80}>
              <LocaleSwitcher onLocaleChange={this.localeChange.bind(this)}/>
              <Navigation componentsTree={this.props.componentsTree}/>
            </Affix>
          </div>
        </div>
      </IntlProvider>
    )
  }
}
