import React from 'react'
import FormattedValue from './'
import {addLocaleData, IntlProvider} from 'react-intl'
// real-import:import {FormattedValue} from 'tocco-ui'

import de from 'react-intl/locale-data/de'
import en from 'react-intl/locale-data/en'
import fr from 'react-intl/locale-data/fr'
import it from 'react-intl/locale-data/it'

class Example extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      locale: 'de-CH'
    }

    addLocaleData([...de, ...en, ...fr, ...it])
  }

  timeValue = {
    value: {
      hourOfDay: 23,
      minuteOfHour: 15,
      secondOfMinute: 0,
      millisOfSecond: 0
    }
  }

  changeLocale(locale) {
    this.setState({locale})
    console.log('ok')
  }

  render() {
    const locales = ['de-CH', 'de-DE', 'en', 'it', 'fr']

    return (
      <div>

        <div style={{fontWeight: 'bold', cursor: 'pointer'}}>
          {
            locales.map((locale, idx) => {
              return (
                <span key={idx} style={this.state.locale === locale ? {textDecoration: 'underline'} : {}}
                  onClick={() => this.changeLocale(locale)}>[{locale}]</span>
              )
            })
          }
        </div>
        {/* start example */}
        <IntlProvider locale={this.state.locale}>
          <div>
            <table className="table table-striped">
              <tbody>
                <tr>
                  <td>String</td>
                  <td><FormattedValue type="string" value="Simple string"/></td>
                </tr>
                <tr>
                  <td>Text</td>
                  <td><FormattedValue type="text" value="Line 1\nLine 2"/></td>
                </tr>
                <tr>
                  <td>Url</td>
                  <td><FormattedValue type="url" value="http://www.this-is-a.url"/></td>
                </tr>
                <tr>
                  <td>DateTime</td>
                  <td><FormattedValue type="datetime" value="2016-12-06T13:40:25.864Z"/></td>
                </tr>
                <tr>
                  <td>Date</td>
                  <td><FormattedValue type="date" value="2016-12-06"/></td>
                </tr>
                <tr>
                  <td>Time</td>
                  <td><FormattedValue type="time" value={this.timeValue}/></td>
                </tr>
                <tr>
                  <td>Duration</td>
                  <td><FormattedValue type="duration" value={3020000}/></td>
                </tr>
                <tr>
                  <td>Money</td>
                  <td><FormattedValue type="moneyamount" value={1245.6}/></td>
                </tr>
                <tr>
                  <td>Boolean</td>
                  <td>
                    <FormattedValue type="boolean" value/>
                    <FormattedValue type="boolean" value={false}/><br/>
                  </td>
                </tr>
                <tr>
                  <td>Decimal</td>
                  <td><FormattedValue type="decimal" value={3333.3}/></td>
                </tr>
                <tr>
                  <td>Integer</td>
                  <td><FormattedValue type="integer" value={1337}/></td>
                </tr>
                <tr>
                  <td>Long/Langitude</td>
                  <td>
                    <FormattedValue type="longitude" value={{value: 0.82710405122667465}}/>
                  </td>
                </tr>
                <tr>
                  <td>Login</td>
                  <td>
                    <FormattedValue type="login" value={{username: 'dake'}}/>
                  </td>
                </tr>
              </tbody>

            </table>
          </div>
        </IntlProvider>
        {/* end example */}
      </div>
    )
  }
}

export default () => <Example/>
