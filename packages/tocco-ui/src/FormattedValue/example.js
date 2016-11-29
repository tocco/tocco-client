import React from 'react'
import FormattedValue from './'
import {addLocaleData, IntlProvider} from 'react-intl'
// real-import:import {FormattedValue} from 'tocco-ui'

import de from 'react-intl/locale-data/de'
import en from 'react-intl/locale-data/en'
import fr from 'react-intl/locale-data/fr'
import it from 'react-intl/locale-data/it'

export default () => {
  addLocaleData([...de, ...en, ...fr, ...it])
  return (
    <div>
      {/* start example */}
      <IntlProvider locale="de-CH">
        <div>
          <FormattedValue type="string" value="This is a string"/><br/>
          <FormattedValue type="url" value="http://www.this-is.url"/><br/>
          <FormattedValue type="date" value="1976-03-16T12:00:00.000Z"/><br/>
          <FormattedValue type="moneyamount" value={1245.6}/><br/>
          <FormattedValue type="boolean" value/>
          <FormattedValue type="boolean" value={false}/><br/>
        </div>
      </IntlProvider>
      {/* end example */}
    </div>
  )
}
