import React from 'react'
import {storiesOf} from '@storybook/react'
import {withKnobs, boolean, text} from '@storybook/addon-knobs'

import FormField from './FormField'
import excludeIntlInfo from '../util/excludeIntlInfo'

const getInput = id => <input type="text" className="form-control" id={id}/>

storiesOf('Edit Data', module)
  .addDecorator(withKnobs)
  .add(
    'FormField',
    () =>
      <FormField
        id="test2"
        label={text('Label', 'Label 1')}
        mandatory={boolean('Mandatory', false)}
        dirty={boolean('Dirty', true)}
        touched={boolean('Touched', true)}
        error={{
          error1: [<div key="1"><b>error1-1 line1</b><br/>error1-1 line2</div>],
          error2: ['error2-1', 'error2-2']
        }}
        className={text('className', 'row')}
      >
        {getInput('test2')}
      </FormField>, excludeIntlInfo()
  )
