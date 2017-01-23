import React from 'react'
import EditableValue from './'
// real-import:import {EditableValue} from 'tocco-ui'
import {addLocaleData} from 'react-intl'
import de from 'react-intl/locale-data/de'
import en from 'react-intl/locale-data/en'
import fr from 'react-intl/locale-data/fr'
import it from 'react-intl/locale-data/it'

export default () => {
  addLocaleData([...de, ...en, ...fr, ...it])
  return (
    <div>
      {/* start example */}
      <table className="table table-striped">
        <tbody>
          <tr>
            <td>String</td>
            <td>
              <EditableValue
                type="string"
                value="Test String"
                onChange={console.log}
              />
            </td>
          </tr>
          <tr>
            <td>Multi-Select</td>
            <td>
              <EditableValue
                type="multi-select"
                value={[2, 4]}
                onChange={console.log}
                options={{
                  possibleValues: [{value: 2, label: 'Two'}, {value: 3, label: 'Three'}, {value: 4, label: 'Four'}]
                }}
              />
            </td>
          </tr>
          <tr>
            <td>Date</td>
            <td>
              <EditableValue
                type="date"
                value="2015-12-18"
                onChange={console.log}
              />
            </td>
          </tr>
        </tbody>
      </table>
      {/* end example */}
    </div>
  )
}
