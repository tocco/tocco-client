/* eslint no-console: 0 */
import React from 'react'
import FormField from './FormField'
// real-import:import {FormField} from 'tocco-ui'

export default () => {
  const getInput = id => <input type="text" className="form-control" id={id}/>
  return (
    <div className="form-group" style={{height: '150px'}}>
      <form>
          {/* start example */}
          <FormField
            id="test"
            label="Label"
            mandatory
            dirty={false}
            className="row"
          >
            {getInput('test')}
          </FormField>
          <FormField
            id="test2"
            label="Label 2"
            mandatory={false}
            dirty
            touched
            error={{
              error1: ['error1-1'],
              error2: ['error2-1', 'error2-2']
            }}
            className="row"
          >
            {getInput('test2')}
          </FormField>
      </form>
      {/* end example */}
    </div>
  )
}
