/* eslint no-console: 0 */
import React from 'react'
import FormField from './FormField'
// real-import:import {FormField} from 'tocco-ui'

export default () => {
  const input = <input type="text" className="form-control" id="usr"/>
  return (
    <div style={{height: '150px'}}>
      {/* start example */}
      <FormField
        id="test"
        label="Label"
        mandatory
        dirty={false}
      >
        {input}
      </FormField>
      <FormField
        id="test"
        label="Label 2"
        mandatory={false}
        dirty
        touched
        error={{
          error1: ['error1-1'],
          error2: ['error2-1', 'error2-2']
        }}
      >
        {input}
      </FormField>
      {/* end example */}
    </div>
  )
}
