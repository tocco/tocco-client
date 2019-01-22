import React from 'react'
import {storiesOf} from '@storybook/react'
import {withKnobs, number, text, boolean} from '@storybook/addon-knobs'
import PropTypes from 'prop-types'

import EditableValue from './'
import {storybookHtmlMarkup} from '../util/storybookHtmlMarkup'
import {SelectStory} from '../Select/Select.stories'
import {UploadStory} from '../Upload/Upload.stories'
import {Upload} from '../Upload/Upload'
import StringEdit from './typeEditors/StringEdit'
import TextEdit from './typeEditors/TextEdit'
import UrlEdit from './typeEditors/UrlEdit'
import PhoneEdit from './typeEditors/PhoneEdit'
import NumberEdit from './typeEditors/NumberEdit'
import IntegerEdit from './typeEditors/IntegerEdit'
import MoneyEdit from './typeEditors/MoneyEdit'
import TimeEdit from './typeEditors/TimeEdit'
import SingleSelect from './typeEditors/SingleSelect'
import MultiSelect from './typeEditors/MultiSelect'
import RemoteSelect from './typeEditors/RemoteSelect'
import MultiRemoteSelect from './typeEditors/MultiRemoteSelect'
import {DateEdit} from './typeEditors/DateEdit'
import {DateRangeEdit} from './typeEditors/DateRangeEdit'
import {DateTimeEdit} from './typeEditors/DateTimeEdit'
import DurationEdit from './typeEditors/DurationEdit'
import HtmlEdit from './typeEditors/HtmlEdit'

export class EditableValueStory extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: props.value || ''
    }
  }

  changeValue = value => {
    this.setState({...this.state, value})
  }

  render() {
    const ChildComponent = this.props.ChildComponent
    return (
      <span>
        <ChildComponent
          onChange={this.changeValue}
          value={this.state.value}
          options={{...this.props.options}}
        />
      </span>
    )
  }
}

EditableValueStory.propTypes = {
  ChildComponent: PropTypes.func,
  options: PropTypes.object,
  value: PropTypes.node
}

const EMPTY_FUNC = () => {}

storiesOf('EditableValue', module)
  .addDecorator(withKnobs)
  .add(
    'String',
    () =>
      <EditableValueStory ChildComponent={StringEdit} value={'Simple String'} />,
    {info: {propTables: [StringEdit], propTablesExclude: [EditableValueStory], source: false}}
  )
  .add(
    'Text',
    () => <EditableValueStory ChildComponent={TextEdit} value={'This is the first line.\nTo be continued...'} />,
    {info: {propTables: [TextEdit], propTablesExclude: [EditableValueStory], source: false}}
  )
  .add(
    'Url',
    () => <EditableValueStory ChildComponent={UrlEdit} value={'http://www.tocco.ch'} />,
    {info: {propTables: [UrlEdit], propTablesExclude: [EditableValueStory], source: false}}
  )
  .add(
    'Phone',
    () => <EditableValueStory ChildComponent={PhoneEdit} value={'+41761234567'} />,
    {info: {propTables: [PhoneEdit], propTablesExclude: [EditableValueStory], source: false}}
  )
  .add(
    'Number',
    () => <EditableValueStory
      ChildComponent={NumberEdit}
      value={12345}
      options={{prePointDigits: number('prePointDigits', 8), postPointDigits: number('postPointDigits', 2)}}
    />,
    {info: {propTables: [NumberEdit], propTablesExclude: [EditableValueStory], source: false}}
  )
  .add(
    'Decimal',
    () => <EditableValueStory
      ChildComponent={NumberEdit}
      value={54321}
      options={{prePointDigits: number('prePointDigits', 10), postPointDigits: number('postPointDigits', 3)}}
    />,
    {info: {propTables: [NumberEdit], propTablesExclude: [EditableValueStory], source: false}}
  )
  .add(
    'Integer',
    () => <EditableValueStory
      ChildComponent={IntegerEdit}
      value={200}
      options={{minValue: number('minValue', 0), maxValue: number('maxValue', 300)}}
    />,
    {info: {propTables: [IntegerEdit], propTablesExclude: [EditableValueStory], source: false}}
  )
  .add(
    'MoneyAmount',
    () => <EditableValueStory
      ChildComponent={MoneyEdit}
      value={1234.56}
      options={{prePointDigits: number('prePointDigits', 8), postPointDigits: number('postPointDigits', 2)}}
    />,
    {info: {propTables: [MoneyEdit], propTablesExclude: [EditableValueStory], source: false}}
  )
  .add(
    'Single-Select',
    () => <SelectStory
      isMulti={false}
      delay={0}
    />,
    {info: {propTables: [SingleSelect], propTablesExclude: [SelectStory], source: false}}
  )
  .add(
    'Multi-Select',
    () => <SelectStory
      isMulti
      delay={0}
    />,
    {info: {propTables: [MultiSelect], propTablesExclude: [SelectStory], source: false}}
  )
  .add(
    'Remote',
    () => <SelectStory
      isMulti={false}
      delay={2000}
    />,
    {info: {propTables: [RemoteSelect], propTablesExclude: [SelectStory], source: false}}
  )
  .add(
    'Multi-Remote',
    () => <SelectStory
      isMulti
      delay={2000}
    />,
    {info: {propTables: [MultiRemoteSelect], propTablesExclude: [SelectStory], source: false}}
  )
  .add(
    'Date',
    () => <EditableValue type="date" value={text('Date', '2019-12-18')} onChange={EMPTY_FUNC}/>,
    {info: {propTables: [DateEdit], propTablesExclude: [EditableValue], source: false}}
  )
  .add(
    'Date-Range',
    () => <EditableValue
      type="date-range"
      value={{from: '2019-12-21', to: '2019-12-23'}}
      onChange={EMPTY_FUNC}
    />,
    {info: {propTables: [DateRangeEdit], propTablesExclude: [EditableValue], source: false}}
  )
  .add(
    'Datetime',
    () => <EditableValue type="datetime" value={text('Datetime', '2017-01-25T15:15:00.000Z')} onChange={EMPTY_FUNC}/>,
    {info: {propTables: [DateTimeEdit], propTablesExclude: [EditableValue], source: false}}
  )
  .add(
    'Time',
    () => <EditableValueStory
      ChildComponent={TimeEdit}
      value={
        {
          hourOfDay: 8,
          minuteOfHour: 35,
          secondOfMinute: 0,
          millisOfSecond: 0
        }
      }
    />,
    {info: {propTables: [TimeEdit], propTablesExclude: [EditableValueStory], source: false}}
  )
  .add(
    'Duration',
    () => <EditableValue type="duration" value={number('Duration', 3660000)} onChange={EMPTY_FUNC}/>,
    {info: {propTables: [DurationEdit], propTablesExclude: [EditableValue], source: false}}
  )
  .add(
    'Document',
    () => <UploadStory
      readOnly={boolean('readOnly', false)}
      textResources={{
        upload: text('upload', 'D`n`D or click'),
        uploading: text('uploading', 'uploading...'),
        download: text('download', 'DOWNLOAD'),
        delete: text('delete', 'DEL')
      }}
    />, {info: {propTables: [Upload], propTablesExclude: [UploadStory], source: false}}
  )
  .add(
    'HTML',
    () => {
      const minifiedMarkup = storybookHtmlMarkup.replace(/\n/g, '')
      return (<EditableValue type="html" value={minifiedMarkup} onChange={EMPTY_FUNC}/>)
    },
    {info: {propTables: [HtmlEdit], propTablesExclude: [EditableValue], source: false}}
  )
