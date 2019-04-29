import React from 'react'
import {storiesOf} from '@storybook/react'
import {withKnobs, boolean, text} from '@storybook/addon-knobs'

import FormField from './FormField'

const getInput = id => <input type="text" className="form-control" id={id}/>

storiesOf('Tocco-UI | FormField', module)
  .addDecorator(withKnobs)
  .add(
    'FormField',
    () =>
      <FormField
        id="test2"
        className="row"
        label={text('Label', 'Label 1')}
        mandatory={boolean('Mandatory', false)}
        dirty={boolean('Dirty', true)}
        touched={boolean('Touched', true)}
        error={{
          error1: [<div key="1"><b>error1-1 line1</b><br/>error1-1 line2</div>],
          error2: ['error2-1', 'error2-2']
        }}
      >
        {getInput('test2')}
      </FormField>
  )
