import React from 'react'
import PropTypes from 'prop-types'
import {storiesOf} from '@storybook/react'
import {withKnobs, number, text, boolean, object} from '@storybook/addon-knobs'
import {action} from '@storybook/addon-actions'

import EditableValue from './'

export class EditableValueStory extends React.Component {
  state = {
    value: this.props.defaultValue || ''
  }

  changeValue = value => {
    this.setState({...this.state, value})
    action('changed')(value)
  }

  render() {
    return (
      <div style={{width: '33%'}}>
        <EditableValue
          type={this.props.type}
          events={{onChange: this.changeValue}}
          options={{...this.props.options}}
          readOnly={boolean('readOnly', false)}
          value={this.props.knobType('value', this.state.value)}
        />
      </div>
    )
  }
}

EditableValueStory.propTypes = {
  type: PropTypes.string.isRequired,
  options: PropTypes.object,
  knobType: PropTypes.func,
  defaultValue: PropTypes.any
}

const loadTooltip = (...args) => action('options.loadTooltip called with')(...args)
const fetchOptions = (...args) => action('options.fetchOptions called with')(...args)
const searchOptions = (...args) => action('options.searchOptions called with')(...args)
const openAdvancedSearch = (...args) => action('options.openAdvancedSearch called with')(...args)
const upload = (...args) => action('options.upload called with')(...args)
const fetchSuggestions = (...args) => action('options.fetchSuggestions called with')(...args)

storiesOf('Tocco-UI | EditableValue', module)
  .addDecorator(withKnobs)
  .addParameters({
    info: {propTables: [EditableValue], propTablesExclude: [EditableValueStory], source: true}
  }
  ).add(
    'Boolean',
    () =>
      <EditableValueStory
        type="boolean"
        knobType={boolean}
        defaultValue={true}
      />
  ).add(
    'Date',
    () =>
      <EditableValueStory
        type="date"
        knobType={text}
        defaultValue={'2019-12-18'}
      />
  ).add(
    'Date-Range',
    () =>
      <EditableValueStory
        type="date-range"
        knobType={object}
        defaultValue={{from: '2019-12-21', to: '2019-12-23'}}
      />
  ).add(
    'Datetime',
    () =>
      <EditableValueStory
        type="datetime"
        knobType={text}
        defaultValue="2017-01-25T15:15:00.000Z"
      />
  ).add(
    'Document',
    () =>
      <EditableValueStory
        type="document"
        knobType={object}
        defaultValue={{
          mimeType: 'image/png',
          fileExtension: 'png',
          sizeInBytes: 3336,
          fileName: 'Blue-Square.png',
          binaryLink: 'http://link.to/my/image.png',
          thumbnailLink: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgAQMAAADYVuV7AAAACXBIWXMAAA7'
          + 'EAAAOxAGVKw4bAAAABlBMVEUCd72z5fwcX0uLAAAAHElEQVQ4y2NgwAns/8PBn1HOKGeUM8oZrBycAAD'
          + 'OggXZNnQmgAAAAABJRU5ErkJggg=='
        }}
        options={object('options',
          {
            upload,
            uploadText: 'upload Text',
            uploadingText: 'uploading Text',
            deleteText: 'delete Text',
            downloadText: 'download Text'
          })}
      />
  ).add(
    'Duration',
    () =>
      <EditableValueStory
        type="duration"
        knobType={number}
        defaultValue={3700350000}
        options={object('options',
          {
            hoursLabel: 'hrs',
            minutesLabel: 'min'
          })}
      />
  ).add(
    'HTML',
    () =>
      <EditableValueStory
        type="html"
        knobType={text}
        defaultValue={'<h1>Test</h1>'}
      />,
    {knobs: {escapeHTML: false}}
  )
  .add(
    'Location',
    () =>
      <EditableValueStory
        type="location"
        knobType={object}
        defaultValue={{
          city: 'Zürich',
          country: 'CH',
          postcode: '8000',
          state: 'ZH',
          street: 'Bahnhofstrasse 1'
        }}
        options={object('options',
          {
            suggestions: [
              {
                address: 'Bundeshaus',
                city: 'Bern',
                country: {display: 'CH'},
                district: 'Ostermundigen',
                postcode: '1234',
                state: 'BE'
              },
              {
                address: 'Rue 123',
                city: 'Lausanne',
                country: {display: 'CH'},
                district: 'District de Lausanne',
                postcode: '5678',
                state: 'VD'
              }
            ],
            fetchSuggestions,
            isLoading: false,
            mapButtonTitle: 'map Button Title'
          })}
      />
  ).add(
    'Multi-Select',
    () =>
      <EditableValueStory
        type="multi-select"
        knobType={object}
        options={object('options', {
          options: [{key: 1, display: 'One'}, {key: 2, display: 'Two'}, {key: 3, display: 'Three'}],
          noResultsText: 'no results found',
          isLoading: false,
          tooltips: {2: 'Tooltip for Two'},
          loadTooltip,
          fetchOptions
        })}
        defaultValue={[{key: 2, display: 'Two v'}, {key: 3, display: 'Three v'}]}
      />
  ).add(
    'Multi-Remote',
    () =>
      <EditableValueStory
        type="multi-remote"
        knobType={object}
        options={object('options', {
          options: [{key: 1, display: 'One'}, {key: 2, display: 'Two'}, {key: 3, display: 'Three'}],
          isLoading: false,
          tooltips: {2: 'Tooltip for Two'},
          clearValueText: 'clear Value Text',
          searchPromptText: 'search Prompt Text',
          noResultsText: 'no results found',
          moreOptionsAvailable: true,
          moreOptionsAvailableText: 'more Options Available Text',
          loadTooltip,
          fetchOptions,
          searchOptions,
          openAdvancedSearch
        })}
        defaultValue={[{key: 2, display: 'Two v'}]}
      />
  ).add(
    'Number',
    () =>
      <EditableValueStory
        type="number"
        knobType={number}
        options={object('options', {
          prePointDigits: 8,
          postPointDigits: 2,
          minValue: -30000,
          maxValue: 30000,
          decimalScale: 5,
          allowNegative: true,
          fixedDecimalScale: true,
          prefix: '#',
          suffix: '%'
        })}
        defaultValue={123.45}
      />
  ).add(
    'Phone',
    () =>
      <EditableValueStory
        type="phone"
        knobType={text}
        defaultValue="+41761234567"
      />
  ).add(
    'Remote',
    () =>
      <EditableValueStory
        type="remote"
        knobType={object}
        options={object('options', {
          options: [{key: 1, display: 'One'}, {key: 2, display: 'Two'}, {key: 3, display: 'Three'}],
          isLoading: false,
          tooltips: {2: 'Tooltip for Two'},
          clearValueText: 'clear Value Text',
          searchPromptText: 'search Prompt Text',
          noResultsText: 'no results found',
          moreOptionsAvailable: true,
          moreOptionsAvailableText: 'more Options Available Text',
          loadTooltip,
          fetchOptions,
          searchOptions,
          openAdvancedSearch
        })}
        defaultValue={{key: 2, display: 'Two v'}}
      />
  ).add(
    'Single-Select',
    () =>
      <EditableValueStory
        type="single-select"
        knobType={object}
        options={object('options', {
          options: [{key: 1, display: 'One'}, {key: 2, display: 'Two'}, {key: 3, display: 'Three'}],
          noResultsText: 'no results found',
          isLoading: false,
          tooltips: {2: 'Tooltip for Two'},
          loadTooltip,
          fetchOptions
        })}
        defaultValue={{key: 2, display: 'Two v'}}
      />

  ).add(
    'String',
    () =>
      <EditableValueStory
        type="string"
        knobType={text}
        defaultValue="Simple String"
      />
  ).add(
    'Text',
    () =>
      <EditableValueStory
        type="text"
        knobType={text}
        defaultValue={'This is the first line.\nTo be continued...'}
      />
  ).add(
    'Time',
    () =>
      <EditableValueStory
        type="time"
        knobType={object}
        defaultValue={{
          hourOfDay: 8,
          minuteOfHour: 35,
          secondOfMinute: 0,
          millisOfSecond: 0
        }}
      />
  ).add(
    'Url',
    () =>
      <EditableValueStory
        type="url"
        knobType={text}
        defaultValue="http://www.tooco.ch"
      />

  )
