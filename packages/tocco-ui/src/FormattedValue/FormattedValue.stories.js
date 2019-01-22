import React from 'react'
import {storiesOf} from '@storybook/react'
import {withKnobs, date, boolean, number, object, text} from '@storybook/addon-knobs'
import moment from 'moment'

import FormattedValue from './'
import {storybookHtmlMarkup} from '../util/storybookHtmlMarkup'
import {DateTimeFormatter} from '../FormattedValue/typeFormatters/DateTimeFormatter'
import {DateFormatter} from '../FormattedValue/typeFormatters/DateFormatter'
import BooleanFormatter from '../FormattedValue/typeFormatters/BooleanFormatter'
import StringFormatter from './typeFormatters/StringFormatter'
import NumberFormatter from './typeFormatters/NumberFormatter'
import DocumentFormatter from './typeFormatters/DocumentFormatter'
import DocumentCompactFormatter from './typeFormatters/DocumentCompactFormatter'
import DurationFormatter from './typeFormatters/DurationFormatter'
import HtmlFormatter from './typeFormatters/HtmlFormatter'
import LoginFormatter from './typeFormatters/LoginFormatter'
import LongitudeFormatter from './typeFormatters/LongitudeFormatter'
import MoneyFormatter from './typeFormatters/MoneyFormatter'
import MultiSelectFormatter from './typeFormatters/MultiSelectFormatter'
import PercentFormatter from './typeFormatters/PercentFormatter'
import PhoneFormatter from './typeFormatters/PhoneFormatter'

export function iso(value) {
  const knob = date('Value', moment(value).toDate())
  return moment(knob).format('YYYY-MM-DD')
}

storiesOf('FormattedValue', module)
  .addDecorator(withKnobs({
    escapeHTML: false
  }))
  .add(
    'Boolean',
    () => <FormattedValue key="2" type="boolean" value={boolean('Value', true)}/>,
    {info: {propTables: [BooleanFormatter], propTablesExclude: [FormattedValue], source: false}}

  )
  .add(
    'Birthdate',
    () => <FormattedValue type="birthdate" value={iso('1988-11-14')}/>,
    {info: {propTables: [DateFormatter], propTablesExclude: [FormattedValue], source: false}}

  ).add(
    'Date',
    () => <FormattedValue type="date" value={iso('2001-1-1')}/>,
    {info: {propTables: [DateFormatter], propTablesExclude: [FormattedValue], source: false}}
  )
  .add(
    'Char',
    () => <FormattedValue type="char" value={text('Characters', 'Simple string')}/>,
    {info: {propTables: [StringFormatter], propTablesExclude: [FormattedValue], source: false}}
  )
  .add(
    'Counter',
    () => <FormattedValue type="counter" value={text('Counter', '23')}/>,
    {info: {propTables: [StringFormatter], propTablesExclude: [FormattedValue], source: false}}
  )
  .add(
    'Createuser',
    () => <FormattedValue type="createuser" value={text('Createuser', 'User 1')}/>,
    {info: {propTables: [StringFormatter], propTablesExclude: [FormattedValue], source: false}}
  )
  .add(
    'Email',
    () => <FormattedValue type="email" value={text('Email', 'test@test.com')}/>,
    {info: {propTables: [StringFormatter], propTablesExclude: [FormattedValue], source: false}}
  )
  .add(
    'Identifier',
    () => <FormattedValue type="identifier" value={text('Identifier', 'IdentifierString')}/>,
    {info: {propTables: [StringFormatter], propTablesExclude: [FormattedValue], source: false}}
  )
  .add(
    'Ipaddress',
    () => <FormattedValue type="ipaddress" value={text('IP Address', '216.3.128.12')}/>,
    {info: {propTables: [StringFormatter], propTablesExclude: [FormattedValue], source: false}}
  )
  .add(
    'Postcode',
    () => <FormattedValue type="postcode" value={text('Postcode', '4321')}/>,
    {info: {propTables: [StringFormatter], propTablesExclude: [FormattedValue], source: false}}
  )
  .add(
    'String',
    () => <FormattedValue type="string" value={text('String', 'Simple string')}/>,
    {info: {propTables: [StringFormatter], propTablesExclude: [FormattedValue], source: false}}
  )
  .add(
    'Uuid',
    () => <FormattedValue type="uuid" value={text('Uuid', '814e1266-8123-40ce-9873-8a8c0aa59be7')}/>,
    {info: {propTables: [StringFormatter], propTablesExclude: [FormattedValue], source: false}}
  )
  .add(
    'Createts',
    () => <FormattedValue type="createts" value={text('Createts', '2016-12-06T13:40:25.864Z')}/>,
    {info: {propTables: [BooleanFormatter], propTablesExclude: [FormattedValue], source: false}}
  )
  .add(
    'Datetime',
    () => <FormattedValue type="datetime" value={text('Datetime', '2017-11-16T03:21:23.123Z')}/>,
    {info: {propTables: [DateTimeFormatter], propTablesExclude: [FormattedValue], source: false}}
  )
  .add(
    'Dataamount',
    () => <FormattedValue type="dataamount" value={number('Dataamount', 21)}/>,
    {info: {propTables: [NumberFormatter], propTablesExclude: [FormattedValue], source: false}}
  )
  .add(
    'Integer',
    () => <FormattedValue type="integer" value={number('Integer', 8766)}/>,
    {info: {propTables: [NumberFormatter], propTablesExclude: [FormattedValue], source: false}}
  )
  .add(
    'Long',
    () => <FormattedValue type="long" value={number('Long', 32324)}/>,
    {info: {propTables: [StringFormatter], propTablesExclude: [FormattedValue], source: false}}
  )
  .add(
    'Number',
    () => <FormattedValue type="number" value={number('Number', 8473226)}/>,
    {info: {propTables: [NumberFormatter], propTablesExclude: [FormattedValue], source: false}}
  )
  .add(
    'Short',
    () => <FormattedValue type="short" value={number('Short', 7.34)}/>,
    {info: {propTables: [NumberFormatter], propTablesExclude: [FormattedValue], source: false}}
  )
  .add(
    'Sorting',
    () => <FormattedValue type="sorting" value={number('Sorting', 3.35)}/>,
    {info: {propTables: [NumberFormatter], propTablesExclude: [FormattedValue], source: false}}
  )
  .add(
    'Version',
    () => <FormattedValue type="version" value={number('Version', 4.723)}/>,
    {info: {propTables: [NumberFormatter], propTablesExclude: [FormattedValue], source: false}}
  )
  .add(
    'Decimal',
    () => <FormattedValue type="decimal" value={number('Decimal', 2334.567)}/>,
    {info: {propTables: [NumberFormatter], propTablesExclude: [FormattedValue], source: false}}
  )
  .add(
    'Double',
    () => <FormattedValue type="double" value={number('Double', 3434.723)}/>,
    {info: {propTables: [NumberFormatter], propTablesExclude: [FormattedValue], source: false}}
  )
  .add(
    'Document',
    () => <FormattedValue type="document" value={{
      alt: text('alt', 'a classic car parked in nature'),
      binaryLink: text('binaryLink', 'https://picsum.photos/1000/1000?image=1070'),
      caption: text('caption', 'car parked nature'),
      fileName: text('fileName', 'nature_car.jpg'),
      thumbnailLink: text('thumbnailLink', 'https://picsum.photos/400/400?image=1070')}}/>,
    {info: {propTables: [DocumentFormatter], propTablesExclude: [FormattedValue], source: false}}
  )
  .add(
    'Document Compact',
    () => <FormattedValue type="document-compact" value={{
      alt: text('alt', 'modern building captured from frog view'),
      binaryLink: text('binaryLink', 'https://picsum.photos/1000/1000?image=1081'),
      caption: text('caption', 'modern skyscraper'),
      fileName: text('fileName', 'modern_skyscraper.jpg'),
      thumbnailLink: text('thumbnailLink', 'https://picsum.photos/400/400?image=1081')
    }}/>,
    {info: {propTables: [DocumentCompactFormatter], propTablesExclude: [FormattedValue], source: false}}
  )
  .add(
    'Duration',
    () => <FormattedValue type="duration" value={number('Duration in ms', 83456678)}/>,
    {info: {propTables: [DurationFormatter], propTablesExclude: [FormattedValue], source: false}}
  )
  .add(
    'HTML',
    () => <FormattedValue type="html" onChange={() => {}} value={text('HTML', storybookHtmlMarkup)}/>,
    {info: {propTables: [HtmlFormatter], propTablesExclude: [FormattedValue], source: false}}
  )
  .add(
    'Login',
    () => <FormattedValue type="login" value={{username: text('username', 'tocco_user')}}/>,
    {info: {propTables: [LoginFormatter], propTablesExclude: [FormattedValue], source: false}}
  )
  .add(
    'Longitude',
    () => <FormattedValue type="longitude" value={{value: number('Longitude', 45.976575)}}/>,
    {info: {propTables: [LongitudeFormatter], propTablesExclude: [FormattedValue], source: false}}
  )
  .add(
    'Latitude',
    () => <FormattedValue type="latitude" value={{value: number('Latitude', 7.658452)}}/>,
    {info: {propTables: [LongitudeFormatter], propTablesExclude: [FormattedValue], source: false}}
  )
  .add(
    'Money',
    () => <FormattedValue type="moneyamount" value={number('Money', 1235.67)}/>,
    {info: {propTables: [MoneyFormatter], propTablesExclude: [FormattedValue], source: false}}
  )
  .add(
    'Multi Remote',
    () => <FormattedValue
      type="multi-remote"
      value={object(
        'Multi Remote',
        [{key: '1', display: 'apple'}, {key: '2', display: 'khaki'}]
      )}
    />,
    {info: {propTables: [MultiSelectFormatter], propTablesExclude: [FormattedValue], source: false}}
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
    />,
    {info: {propTables: [MultiSelectFormatter], propTablesExclude: [FormattedValue], source: false}}
  )
  .add(
    'Percent',
    () => <FormattedValue type="percent" value={number('Percent', 65.89)}/>,
    {info: {propTables: [PercentFormatter], propTablesExclude: [FormattedValue], source: false}}
  )
  .add(
    'Phone',
    () => <FormattedValue type="phone" value={text('Phone', '+41761234567')}/>,
    {info: {propTables: [PhoneFormatter], propTablesExclude: [FormattedValue], source: false}}
  )
