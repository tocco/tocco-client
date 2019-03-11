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

const suggestions = [
  {
    city: `Zurich`,
    zip: '8006',
    canton: 'ZH',
    district: 'Zurich',
    country: 'CH'
  },
  {
    city: 'Bern',
    zip: '3000',
    canton: 'BE',
    district: 'Bern',
    country: 'CH'
  }
]

const locationOptions = {
  suggestions,
  fetchSuggestions: EMPTY_FUNC,
  noSuggestionsText: text('noSuggestionsText', 'Keine Werte'),
  isLoading: boolean('isLoading', false)
}

storiesOf('EditableValue', module)
  .addDecorator(withKnobs)
  .addParameters({
    info: {propTables: [EditableValue], propTablesExclude: [EditableValueStory], source: false}
  })
  .add(
    'String',
    () =>
      <EditableValueStory ChildComponent={StringEdit} value={'Simple String'} />
  )
  .add(
    'Text',
    () => <EditableValueStory ChildComponent={TextEdit} value={'This is the first line.\nTo be continued...'} />
  )
  .add(
    'Url',
    () => <EditableValueStory ChildComponent={UrlEdit} value={'http://www.tocco.ch'} />
  )
  .add(
    'Phone',
    () => <EditableValueStory ChildComponent={PhoneEdit} value={'+41761234567'} />
  )
  .add(
    'Number',
    () => <EditableValueStory
      ChildComponent={NumberEdit}
      value={12345}
      options={{prePointDigits: number('prePointDigits', 8), postPointDigits: number('postPointDigits', 2)}}
    />
  )
  .add(
    'Decimal',
    () => <EditableValueStory
      ChildComponent={NumberEdit}
      value={54321}
      options={{prePointDigits: number('prePointDigits', 10), postPointDigits: number('postPointDigits', 3)}}
    />
  )
  .add(
    'Integer',
    () => <EditableValueStory
      ChildComponent={IntegerEdit}
      value={200}
      options={{minValue: number('minValue', 0), maxValue: number('maxValue', 300)}}
    />
  )
  .add(
    'MoneyAmount',
    () => <EditableValueStory
      ChildComponent={MoneyEdit}
      value={1234.56}
      options={{prePointDigits: number('prePointDigits', 8), postPointDigits: number('postPointDigits', 2)}}
    />
  )
  .add(
    'Single-Select',
    () => <SelectStory
      isMulti={false}
      delay={0}
    />
  )
  .add(
    'Multi-Select',
    () => <SelectStory
      isMulti
      delay={0}
    />
  )
  .add(
    'Remote',
    () => <SelectStory
      isMulti={false}
      delay={2000}
    />
  )
  .add(
    'Multi-Remote',
    () => <SelectStory
      isMulti
      delay={2000}
    />
  )
  .add(
    'Date',
    () => <EditableValue type="date" value={text('Date', '2019-12-18')} onChange={EMPTY_FUNC}/>,
    {info: {source: true}}
  )
  .add(
    'Date-Range',
    () => <EditableValue
      type="date-range"
      value={{from: '2019-12-21', to: '2019-12-23'}}
      onChange={EMPTY_FUNC}
    />,
    {info: {source: true}}
  )
  .add(
    'Datetime',
    () => <EditableValue type="datetime" value={text('Datetime', '2017-01-25T15:15:00.000Z')} onChange={EMPTY_FUNC}/>,
    {info: {source: true}}
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
    />
  )
  .add(
    'Duration',
    () => <EditableValue type="duration" value={number('Duration', 3660000)} onChange={EMPTY_FUNC}/>,
    {info: {source: true}}
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
    />
  )
  .add(
    'HTML',
    () => {
      const minifiedMarkup = storybookHtmlMarkup.replace(/\n/g, '')
      return (<EditableValue type="html" value={minifiedMarkup} onChange={EMPTY_FUNC}/>)
    },
    {info: {source: true}}
  )
  .add(
    'Location',
    () => <EditableValue
      type="location"
      options={locationOptions}
      readOnly={boolean('readOnly', false)}
      createLabel={text('createLabel', 'Wert löschen')}
      value={{
        zip: text('zip', '8000') || undefined,
        city: text('city', 'Zürich') || undefined,
        address: text('address', 'Strasse 123') || undefined,
        canton: text('canton', 'ZH') || undefined,
        district: text('district', 'ZH') || undefined,
        country: text('country', 'CH') || undefined
      }}
      onChange={EMPTY_FUNC}/>,
    {info: {source: true}}
  )
