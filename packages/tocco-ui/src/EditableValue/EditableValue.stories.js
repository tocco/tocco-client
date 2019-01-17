/* eslint-disable no-console */
import React from 'react'
import {storiesOf} from '@storybook/react'
import {withKnobs, number, text, boolean} from '@storybook/addon-knobs'
import {IntlProvider} from 'react-intl'

import EditableValue from './'
import excludeIntlInfo from '../util/excludeIntlInfo'
import {htmlMarkup} from '../util/htmlMarkup'
import {SelectStory} from '../Select/Select.stories'
import {UploadStory} from '../Upload/Upload.stories'
import {Upload as Raw} from '../Upload/Upload'

const EMPTY_FUNC = () => {}

storiesOf('Edit Data/EditableValue', module)
  .addDecorator(withKnobs)
  .add(
    'String',
    () => <EditableValue type="string" value={text('String', 'This is a simple string.')} onChange={EMPTY_FUNC}/>,
    excludeIntlInfo()
  )
  .add(
    'Text',
    () => <EditableValue
      type="text"
      value={text('Text', 'This is the first line.\nTo be continued...')}
      onChange={EMPTY_FUNC}
    />, excludeIntlInfo()
  )
  .add(
    'Url',
    () => <EditableValue type="url" value={text('Url', 'http://www.tocco.ch')} onChange={EMPTY_FUNC}/>,
    excludeIntlInfo()
  )
  .add(
    'Phone',
    () => <EditableValue type="phone" value={text('Phone', '+41761234567')} onChange={EMPTY_FUNC}/>,
    excludeIntlInfo()
  )
  .add(
    'Number',
    () =>
      <EditableValue
        type="number"
        value={number('Number', 543)}
        options={{
          prePointDigits: 8,
          postPointDigits: 2
        }}
        onChange={EMPTY_FUNC}
      />, excludeIntlInfo()
  )
  .add(
    'Decimal',
    () => <EditableValue
      type="decimal"
      value={number('Decimal', 123456.78)}
      options={{
        prePointDigits: 8,
        postPointDigits: 2
      }}
      onChange={EMPTY_FUNC}
    />, excludeIntlInfo()
  )
  .add(
    'Integer',
    () => <EditableValue
      type="integer"
      value={number('Integer', 200)}
      options={{
        minValue: 0,
        maxValue: 300
      }}
      onChange={EMPTY_FUNC}
    />, excludeIntlInfo()
  )
  .add(
    'Money Amount',
    () => <EditableValue
      type="moneyamount"
      value={number('Money Amount', 1234.56)}
      options={{
        prePointDigits: 8,
        postPointDigits: 2
      }}
      onChange={EMPTY_FUNC}
    />, excludeIntlInfo()
  )
  .add(
    'Single-Select',
    () => <SelectStory
      isMulti={false}
      delay={0}
    />, excludeIntlInfo()
  )
  .add(
    'Multi-Select',
    () => <SelectStory
      isMulti
      delay={0}
    />, excludeIntlInfo()
  )
  .add(
    'Remote',
    () => <SelectStory
      isMulti={false}
      delay={2000}
    />, excludeIntlInfo()
  )
  .add(
    'Multi-Remote',
    () => <SelectStory
      isMulti
      delay={2000}
    />, excludeIntlInfo()
  )
  .add(
    'Date',
    () => <EditableValue type="date" value={text('Date', '2019-12-18')} onChange={EMPTY_FUNC}/>, excludeIntlInfo()
  )
  .add(
    'Date-Range',
    () => <EditableValue
      type="date-range"
      value={{from: '2019-12-21', to: '2019-12-23'}}
      onChange={EMPTY_FUNC}
    />, excludeIntlInfo()
  )
  .add(
    'Datetime',
    () => <EditableValue type="datetime" value={text('Datetime', '2017-01-25T15:15:00.000Z')} onChange={EMPTY_FUNC}/>,
    excludeIntlInfo()
  )
  .add(
    'Time',
    () => <EditableValue type="time" value={
      {
        hourOfDay: number('Hour', 8),
        minuteOfHour: number('Minute', 35),
        secondOfMinute: 0,
        millisOfSecond: 0
      }
    }
    onChange={EMPTY_FUNC}
    />, excludeIntlInfo()
  )
  .add(
    'Duration',
    () => <EditableValue type="duration" value={number('Duration', 3660000)} onChange={EMPTY_FUNC}/>,
    excludeIntlInfo()
  )
  .add(
    'Document',
    () => <UploadStory
      readOnly={boolean('readonly', false)}
      textResources={{
        upload: text('upload', 'D`n`D or click'),
        uploading: text('uploading', 'uploading...'),
        download: text('download', 'DOWNLOAD'),
        delete: text('delete', 'DEL')
      }}
    />, {info: {propTables: [Raw], propTablesExclude: [UploadStory, IntlProvider], source: false}}
  )
  .add(
    'HTML',
    () => {
      const minifiedMarkup = htmlMarkup.replace(/\n/g, '')
      return (<EditableValue type="html" value={minifiedMarkup} onChange={EMPTY_FUNC}/>)
    }, excludeIntlInfo()
  )
