import React from 'react'
import EditableValue from './'
// real-import:import {EditableValue} from 'tocco-ui'

export default () => {
  return (
    <div>
      {/* start example */}
      <table className="table table-striped">
        <tbody>
          <tr>
            <td>String</td>
            <td><EditableValue type="string" value="Test String" onChange={v => console.log(v)}/></td>
          </tr>
          <tr>
            <td>Multi-Select</td>
            <td>
              <EditableValue
                type="multi-select"
                value={[2, 4]}
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
