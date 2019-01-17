import React from 'react'
import {storiesOf} from '@storybook/react'
import {withKnobs, date, boolean, number, object, text} from '@storybook/addon-knobs'
import moment from 'moment'

import FormattedValue from './'
import excludeIntlInfo from '../util/excludeIntlInfo'
import {htmlMarkup} from '../util/htmlMarkup'

export function iso(value) {
  const knob = date('Value', moment(value).toDate())
  return moment(knob).format('YYYY-MM-DD')
}

const inputObject = {
  alt: text('alt', 'hundreds of juicy strawberries tempting to degustate'),
  binaryLink: text('binaryLink', 'https://picsum.photos/1000/1000?image=1070'),
  caption: text('caption', 'hundred juicy strawberries'),
  fileName: text('fileName', 'strawberry.jpg'),
  thumbnailLink: text('thumbnailLink', 'https://picsum.photos/400/400?image=1081')
}

storiesOf('Display Data/FormattedValue', module)
  .addDecorator(withKnobs({
    escapeHTML: false
  }))
  .add(
    'Boolean',
    () => <FormattedValue key="2" type="boolean" value={boolean('Value', true)}/>, excludeIntlInfo()

  )
  .add(
    'Birthdate',
    () => <FormattedValue type="birthdate" value={iso('1988-11-14')}/>, excludeIntlInfo()

  ).add(
    'Date',
    () => <FormattedValue type="date" value={iso('2001-1-1')}/>, excludeIntlInfo()
  )
  .add(
    'Char',
    () => <FormattedValue type="char" value={text('Characters', 'Simple string')}/>, excludeIntlInfo()
  )
  .add(
    'Counter',
    () => <FormattedValue type="counter" value={text('Counter', '23')}/>, excludeIntlInfo()
  )
  .add(
    'Createuser',
    () => <FormattedValue type="createuser" value={text('Createuser', 'User 1')}/>, excludeIntlInfo()
  )
  .add(
    'Email',
    () => <FormattedValue type="email" value={text('Email', 'test@test.com')}/>, excludeIntlInfo()
  )
  .add(
    'Identifier',
    () => <FormattedValue type="identifier" value={text('Identifier', 'IdentifierString')}/>, excludeIntlInfo()
  )
  .add(
    'Ipaddress',
    () => <FormattedValue type="ipaddress" value={text('IP Address', '216.3.128.12')}/>, excludeIntlInfo()
  )
  .add(
    'Postcode',
    () => <FormattedValue type="postcode" value={text('Postcode', '4321')}/>, excludeIntlInfo()
  )
  .add(
    'String',
    () => <FormattedValue type="string" value={text('String', 'Simple string')}/>, excludeIntlInfo()
  )
  .add(
    'Uuid',
    () => <FormattedValue type="uuid" value={text('Uuid', '814e1266-8123-40ce-9873-8a8c0aa59be7')}/>, excludeIntlInfo()
  )
  .add(
    'Createts',
    () => <FormattedValue type="createts" value={text('Createts', '2016-12-06T13:40:25.864Z')}/>, excludeIntlInfo()
  )
  .add(
    'Datetime',
    () => <FormattedValue type="datetime" value={text('Datetime', '2017-11-16T03:21:23.123Z')}/>, excludeIntlInfo()
  )
  .add(
    'Dataamount',
    () => <FormattedValue type="dataamount" value={number('Dataamount', 21)}/>, excludeIntlInfo()
  )
  .add(
    'Integer',
    () => <FormattedValue type="integer" value={number('Integer', 8766)}/>, excludeIntlInfo()
  )
  .add(
    'Long',
    () => <FormattedValue type="long" value={number('Long', 32324)}/>, excludeIntlInfo()
  )
  .add(
    'Number',
    () => <FormattedValue type="number" value={number('Number', 8473226)}/>, excludeIntlInfo()
  )
  .add(
    'Short',
    () => <FormattedValue type="short" value={number('Short', 7.34)}/>, excludeIntlInfo()
  )
  .add(
    'Sorting',
    () => <FormattedValue type="sorting" value={number('Sorting', 3.35)}/>, excludeIntlInfo()
  )
  .add(
    'Version',
    () => <FormattedValue type="version" value={number('Version', 4.723)}/>, excludeIntlInfo()
  )
  .add(
    'Decimal',
    () => <FormattedValue type="decimal" value={number('Decimal', 2334.567)}/>, excludeIntlInfo()
  )
  .add(
    'Double',
    () => <FormattedValue type="double" value={number('Double', 3434.723)}/>, excludeIntlInfo()
  )
  .add(
    'Document',
    () => <FormattedValue type="document" value={inputObject}/>, excludeIntlInfo()
  )
  .add(
    'Document Compact',
    () => <FormattedValue type="document-compact" value={inputObject}/>, excludeIntlInfo()
  )
  .add(
    'Duration',
    () => <FormattedValue type="duration" value={number('Duration in ms', 83456678)}/>, excludeIntlInfo()
  )
  .add(
    'HTML',
    () => <FormattedValue type="html" onChange={() => {}} value={text('HTML', htmlMarkup)}/>, excludeIntlInfo()
  )
  .add(
    'Login',
    () => <FormattedValue type="login" value={object('Login', {username: 'tocco_user'})}/>, excludeIntlInfo()
  )
  .add(
    'Longitude',
    () => <FormattedValue type="longitude" value={object('Longitude', {value: 45.976575})}/>, excludeIntlInfo()
  )
  .add(
    'Latitude',
    () => <FormattedValue type="latitude" value={object('Input Object', {value: 7.658452})}/>, excludeIntlInfo()
  )
  .add(
    'Money',
    () => <FormattedValue type="moneyamount" value={number('Money', 1235.67)}/>, excludeIntlInfo()
  )
  .add(
    'Multi Remote',
    () => <FormattedValue
      type="multi-remote"
      value={object(
        'Multi Remote',
        [{key: '1', display: 'apple'}, {key: '2', display: 'khaki'}]
      )}
    />, excludeIntlInfo()
  )
  .add(
    'Multi Select',
    () => <FormattedValue
      type="multi-select"
      value={object(
        'Multi Select',
        [
          {key: '3', display: 'Matterhorn'},
          {key: '4', display: 'Jungfraujoch'},
          {key: '5', display: 'Rigi'}
        ]
      )}
    />, excludeIntlInfo()
  )
  .add(
    'Percent',
    () => <FormattedValue type="percent" value={number('Percent', 65.89)}/>, excludeIntlInfo()
  )
  .add(
    'Phone',
    () => <FormattedValue type="phone" value={text('Phone', '+41761234567')}/>, excludeIntlInfo()
  )
