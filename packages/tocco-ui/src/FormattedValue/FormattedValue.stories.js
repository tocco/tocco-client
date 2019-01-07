import React from 'react'
import {storiesOf} from '@storybook/react'
import {withKnobs, date, boolean} from '@storybook/addon-knobs'
import moment from 'moment'

import FormattedValue from './'

export function iso(value) {
  const knob = date('Value', moment(value).toDate())
  return moment(knob).format('YYYY-MM-DD')
}

storiesOf('FormattedValue', module)
  .addDecorator(withKnobs)
  .add(
    'Boolean',
    () => <FormattedValue key="2" type="boolean" value={boolean('Value', true)}/>

  )
  .add(
    'Birthdate',
    () => (
      <FormattedValue type="birthdate" value={iso('1988-11-14')}/>
    )
  ).add(
    'Date',
    () => (
      <FormattedValue type="date" value={iso('2001-1-1')}/>
    )
  )
