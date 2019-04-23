import React from 'react'
import PropTypes from 'prop-types'
import {storiesOf} from '@storybook/react'
import {withKnobs, number, text, boolean} from '@storybook/addon-knobs'
import {action} from '@storybook/addon-actions'

import EditableValue from './'
import {storybookHtmlMarkup} from '../util/storybookHtmlMarkup'
import {SelectStory} from '../Select/Select.stories'
import {UploadStory} from '../Upload/Upload.stories'
import StringEdit from './typeEditors/StringEdit'
import TextEdit from './typeEditors/TextEdit'
import UrlEdit from './typeEditors/UrlEdit'
import PhoneEdit from './typeEditors/PhoneEdit'
import NumberEdit from './typeEditors/NumberEdit'
import IntegerEdit from './typeEditors/IntegerEdit'
import MoneyEdit from './typeEditors/MoneyEdit'
import TimeEdit from './typeEditors/TimeEdit'

export class EditableValueStory extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: props.value || ''
    }
  }

  changeValue = value => {
    this.setState({...this.state, value})
    action('changed')(value)
  }

  render() {
    const ChildComponent = this.props.ChildComponent
    return (
      <span>
        <ChildComponent
          onChange={this.changeValue}
          options={{...this.props.options}}
          readOnly={this.props.readOnly}
          value={this.state.value}
        />
      </span>
    )
  }
}

EditableValueStory.propTypes = {
  ChildComponent: PropTypes.func,
  options: PropTypes.object,
  readOnly: PropTypes.bool,
  value: PropTypes.node
}

const EMPTY_FUNC = () => {}

storiesOf('EditableValue', module)
  .addDecorator(withKnobs)
  .addParameters({
    info: {propTables: [EditableValue], propTablesExclude: [EditableValueStory], source: false}
  }
  ).add(
    'String',
    () =>
      <EditableValueStory
        ChildComponent={StringEdit}
        readOnly={boolean('readOnly', false) || undefined}
        value={'Simple String'}
      />
  ).add(
    'Text',
    () =>
      <EditableValueStory
        ChildComponent={TextEdit}
        readOnly={boolean('readOnly', false) || undefined}
        value={'This is the first line.\nTo be continued...'}
      />
  ).add(
    'Url',
    () =>
      <EditableValueStory
        ChildComponent={UrlEdit}
        readOnly={boolean('readOnly', false) || undefined}
        value={'http://www.tocco.ch'}
      />
  ).add(
    'Phone',
    () =>
      <EditableValueStory
        ChildComponent={PhoneEdit}
        readOnly={boolean('readOnly', false) || undefined}
        value={'+41761234567'}
      />
  ).add(
    'Number',
    () =>
      <EditableValueStory
        ChildComponent={NumberEdit}
        options={{prePointDigits: number('prePointDigits', 8), postPointDigits: number('postPointDigits', 2)}}
        readOnly={boolean('readOnly', false) || undefined}
        value={12345}
      />
  ).add(
    'Decimal',
    () =>
      <EditableValueStory
        ChildComponent={NumberEdit}
        options={{prePointDigits: number('prePointDigits', 10), postPointDigits: number('postPointDigits', 3)}}
        readOnly={boolean('readOnly', false) || undefined}
        value={54321}
      />
  ).add(
    'Integer',
    () =>
      <EditableValueStory
        ChildComponent={IntegerEdit}
        options={{minValue: number('minValue', 0), maxValue: number('maxValue', 300)}}
        readOnly={boolean('readOnly', false) || undefined}
        value={200}
      />
  ).add(
    'MoneyAmount',
    () =>
      <EditableValueStory
        ChildComponent={MoneyEdit}
        options={{prePointDigits: number('prePointDigits', 8), postPointDigits: number('postPointDigits', 2)}}
        readOnly={boolean('readOnly', false) || undefined}
        value={1234.56}
      />
  ).add(
    'Single-Select',
    () =>
      <SelectStory
        delay={0}
        isMulti={false}
        readOnly={boolean('readOnly', false) || undefined}
      />
  ).add(
    'Multi-Select',
    () =>
      <SelectStory
        delay={0}
        isMulti
        readOnly={boolean('readOnly', false) || undefined}
      />
  ).add(
    'Remote',
    () =>
      <SelectStory
        delay={2000}
        isMulti={false}
        readOnly={boolean('readOnly', false) || undefined}
      />
  ).add(
    'Multi-Remote',
    () =>
      <SelectStory
        delay={2000}
        isMulti
        readOnly={boolean('readOnly', false) || undefined}
      />
  ).add(
    'Date',
    () =>
      <EditableValue
        onChange={EMPTY_FUNC}
        readOnly={boolean('readOnly', false) || undefined}
        type="date"
        value={text('Date', '2019-12-18')}
      />,
    {info: {source: true}}
  ).add(
    'Date-Range',
    () =>
      <EditableValue
        onChange={EMPTY_FUNC}
        readOnly={boolean('readOnly', false) || undefined}
        type="date-range"
        value={{from: '2019-12-21', to: '2019-12-23'}}
      />,
    {info: {source: true}}
  ).add(
    'Datetime',
    () =>
      <EditableValue
        onChange={EMPTY_FUNC}
        readOnly={boolean('readOnly', false) || undefined}
        type="datetime"
        value={text('Datetime', '2017-01-25T15:15:00.000Z')}
      />,
    {info: {source: true}}
  ).add(
    'Time',
    () =>
      <EditableValueStory
        ChildComponent={TimeEdit}
        readOnly={boolean('readOnly', false) || undefined}
        value={{
          hourOfDay: 8,
          minuteOfHour: 35,
          secondOfMinute: 0,
          millisOfSecond: 0
        }}
      />
  ).add(
    'Duration',
    () => <EditableValue
      type="duration"
      value={number('Duration', 3660000)}
      readOnly={boolean('readOnly', false)}
      onChange={EMPTY_FUNC}
    />,
    {info: {source: true}}
  ).add(
    'Document',
    () =>
      <UploadStory
        readOnly={boolean('readOnly', false) || undefined}
        textResources={{
          upload: text('upload', 'D`n`D or click'),
          uploading: text('uploading', 'uploading...'),
          download: text('download', 'DOWNLOAD'),
          delete: text('delete', 'DEL')
        }}
      />
  ).add(
    'HTML',
    () => {
      const minifiedMarkup = storybookHtmlMarkup.replace(/\n/g, '')
      return (
        <EditableValue
          onChange={EMPTY_FUNC}
          readOnly={boolean('readOnly', false) || undefined}
          type="html"
          value={minifiedMarkup}
        />)
    },
    {info: {source: true}}
  )
