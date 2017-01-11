import React from 'react'
import EditableValue from './'
// real-import:import {EditableValue} from 'tocco-ui'

export default () => {
  const log = value => {
    console.log(value)
  }

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
                onChange={log}
              />
            </td>
          </tr>
          <tr>
            <td>Single-Select</td>
            <td>
              <EditableValue
                type="single-select"
                value="1"
                options={{
                  store: [
                    {value: '1', label: 'One'},
                    {value: '2', label: 'Two'},
                    {value: '3', label: 'Three'}
                  ]
                }}
                onChange={log}
            />
            </td>
          </tr>
          <tr>
            <td>Multi-Select</td>
            <td>
              <EditableValue
                type="multi-select"
                value={[2, 4]}
                onChange={log}
                options={{
                  possibleValues: [{value: 2, label: 'Two'}, {value: 3, label: 'Three'}, {value: 4, label: 'Four'}]
                }}
            />
            </td>
          </tr>
        </tbody>
      </table>
      {/* end example */}
    </div>
  )
}
