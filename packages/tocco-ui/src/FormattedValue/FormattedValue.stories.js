import React from 'react'
import {storiesOf} from '@storybook/react'
import {withKnobs, date, boolean, number, object, text} from '@storybook/addon-knobs'
import moment from 'moment'

import FormattedValue from './'
import {storybookHtmlMarkup} from '../util/storybookHtmlMarkup'

export function iso(value) {
  const knob = date('Value', moment(value).toDate())
  return moment(knob).format('YYYY-MM-DD')
}

storiesOf('Tocco-UI | FormattedValue', module)
  .addDecorator(withKnobs({
    escapeHTML: false
  }))
  .add(
    'Boolean',
    () => <FormattedValue key="2" type="boolean" value={boolean('Value', true)}/>
  )
  .add(
    'Birthdate',
    () => <FormattedValue type="birthdate" value={iso('1988-11-14')}/>

  ).add(
    'Date',
    () => <FormattedValue type="date" value={iso('2001-1-1')}/>
  )
  .add(
    'Char',
    () => <FormattedValue type="char" value={text('Characters', 'Simple string')}/>
  )
  .add(
    'Counter',
    () => <FormattedValue type="counter" value={text('Counter', '23')}/>
  )
  .add(
    'Createuser',
    () => <FormattedValue type="createuser" value={text('Createuser', 'User 1')}/>
  )
  .add(
    'Email',
    () => <FormattedValue type="email" value={text('Email', 'test@test.com')}/>
  )
  .add(
    'Identifier',
    () => <FormattedValue type="identifier" value={text('Identifier', 'IdentifierString')}/>
  )
  .add(
    'Ipaddress',
    () => <FormattedValue type="ipaddress" value={text('IP Address', '216.3.128.12')}/>
  )
  .add(
    'Postcode',
    () => <FormattedValue type="postcode" value={text('Postcode', '4321')}/>
  )
  .add(
    'String',
    () => <FormattedValue type="string" value={text('String', 'Simple string')}/>
  )
  .add(
    'Uuid',
    () => <FormattedValue type="uuid" value={text('Uuid', '814e1266-8123-40ce-9873-8a8c0aa59be7')}/>
  )
  .add(
    'Createts',
    () => <FormattedValue type="createts" value={text('Createts', '2016-12-06T13:40:25.864Z')}/>
  )
  .add(
    'Datetime',
    () => <FormattedValue type="datetime" value={text('Datetime', '2017-11-16T03:21:23.123Z')}/>
  )
  .add(
    'Integer',
    () => <FormattedValue type="integer" value={number('Integer', 8766)}/>
  )
  .add(
    'Long',
    () => <FormattedValue type="long" value={number('Long', 32324)}/>
  )
  .add(
    'Number',
    () => <FormattedValue type="number" value={number('Number', 8473226)}/>
  )
  .add(
    'Sorting',
    () => <FormattedValue type="sorting" value={number('Sorting', 3.35)}/>
  )
  .add(
    'Version',
    () => <FormattedValue type="version" value={number('Version', 4.723)}/>
  )
  .add(
    'Decimal',
    () => <FormattedValue type="decimal" value={number('Decimal', 2334.567)}/>
  )
  .add(
    'Double',
    () => <FormattedValue type="double" value={number('Double', 3434.723)}/>
  )
  .add(
    'Document',
    () => <FormattedValue type="document" value={{
      alt: text('alt', 'a classic car parked in nature'),
      binaryLink: text('binaryLink', 'https://picsum.photos/1000/1000?image=1070'),
      caption: text('caption', 'car parked nature'),
      fileName: text('fileName', 'nature_car.jpg'),
      thumbnailLink: text('thumbnailLink', 'https://picsum.photos/400/400?image=1070')
    }}/>
  )
  .add(
    'Document Compact',
    () => <FormattedValue type="document-compact" value={{
      alt: text('alt', 'modern building captured from frog view'),
      binaryLink: text('binaryLink', 'https://picsum.photos/1000/1000?image=1081'),
      caption: text('caption', 'modern skyscraper'),
      fileName: text('fileName', 'modern_skyscraper.jpg'),
      thumbnailLink: text('thumbnailLink', 'https://picsum.photos/400/400?image=1081')
    }}/>
  )
  .add(
    'Duration',
    () => <FormattedValue type="duration" value={number('Duration in ms', 83456678)}/>
  )
  .add(
    'HTML',
    () => <FormattedValue type="html" onChange={() => {}} value={text('HTML', storybookHtmlMarkup)}/>
  )
  .add(
    'Login',
    () => <FormattedValue type="login" value={{username: text('username', 'tocco_user')}}/>
  )
  .add(
    'Longitude',
    () => <FormattedValue type="longitude" value={{value: number('Longitude', 45.976575)}}/>
  )
  .add(
    'Latitude',
    () => <FormattedValue type="latitude" value={{value: number('Latitude', 7.658452)}}/>
  )
  .add(
    'Money',
    () => <FormattedValue type="moneyamount" value={number('Money', 1235.67)}/>
  )
  .add(
    'Remote',
    () => <FormattedValue
      type="remote"
      value={object(
        'Remote',
        {key: '1', display: 'apple'}
      )}
      options={{
        linkFactory: (key, children) => <a href={`/${key}`} target="_blank" rel="noopener noreferrer">{children}</a>
      }}
    />
  )
  .add(
    'Multi Remote',
    () => <FormattedValue
      type="multi-remote"
      value={object(
        'Multi Remote',
        [{key: '1', display: 'apple'}, {key: '2', display: 'khaki'}]
      )}
      options={{
        linkFactory: (key, children) => <a href={`/${key}`} target="_blank" rel="noopener noreferrer">{children}</a>
      }}
    />
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
    />
  )
  .add(
    'Percent',
    () => <FormattedValue type="percent" value={number('Percent', 65.89)}/>
  )
  .add(
    'Phone',
    () => <FormattedValue type="phone" value={text('Phone', '+41761234567')}/>
  )
