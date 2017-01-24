import React from 'react'
import EditableValue from './'
// real-import:import {EditableValue} from 'tocco-ui'

class Example extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      readonly: false
    }
  }

  toggleReadOnly() {
    this.setState({readonly: !this.state.readonly})
  }

  render() {
    return (
      <div>
        <input type="checkbox" checked={this.state.readonly} onClick={this.toggleReadOnly.bind(this)}/> readonly
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
                  readonly={this.state.readonly}
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
                  onChange={console.log}
                  readonly={this.state.readonly}
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
                    store: [{value: 2, label: 'Two'}, {value: 3, label: 'Three'}, {value: 4, label: 'Four'}]
                  }}
                  readonly={this.state.readonly}
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
                  readonly={this.state.readonly}
              />
              </td>
            </tr>
            <tr>
              <td>Date Time</td>
              <td>
                <EditableValue
                  type="datetime"
                  value="2017-01-25T15:15:00.000Z"
                  onChange={console.log}
                  readonly={this.state.readonly}
              />
              </td>
            </tr>
          </tbody>
        </table>
        {/* end example */}
      </div>
    )
  }
}

export default () => <Example/>
