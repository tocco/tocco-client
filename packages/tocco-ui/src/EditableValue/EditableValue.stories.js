/* eslint-disable react/prop-types */
import React, {useState} from 'react'
import styled from 'styled-components'

import EditableValue from './'

const StyledDecorator = styled.div`
  border: 1px solid  #7e7e7e;
  padding: 2px;
  max-width: 250px;
  border-radius: 3px;
`

export default {
  title: 'Tocco-UI/EditableValue',
  component: EditableValue,
  decorators: [Story => <StyledDecorator><Story /></StyledDecorator>],
  argTypes: {
    type: {control: false},
    events: {control: false}
  }
}

export const Boolean = () => {
  const [value, setValue] = useState(true)
  return <EditableValue
    type="boolean"
    value={value}
    events={{onChange: setValue}}
  />
}

export const Date = () => {
  const [value, setValue] = useState('2019-12-18')
  return <EditableValue
    type="date"
    value={value}
    events={{onChange: setValue}}
  />
}

export const DateTime = () => {
  const [value, setValue] = useState('2017-01-25T15:15:00.000Z')
  return <EditableValue
    type="datetime"
    value={value}
    events={{onChange: setValue}}
  />
}

export const Document = ({upload, ...args}) => {
  const [value, setValue] = useState({
    mimeType: 'image/png',
    fileExtension: 'png',
    sizeInBytes: 3336,
    fileName: 'Blue-Square.png',
    binaryLink: 'http://link.to/my/image.png',
    thumbnailLink: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgAQMAAADYVuV7AAAACXBIWXMAAA7'
      + 'EAAAOxAGVKw4bAAAABlBMVEUCd72z5fwcX0uLAAAAHElEQVQ4y2NgwAns/8PBn1HOKGeUM8oZrBycAAD'
      + 'OggXZNnQmgAAAAABJRU5ErkJggg=='
  })
  return <EditableValue
    type="document"
    value={value}
    events={{onChange: setValue}}
    options={{
      upload,
      uploadText: 'upload Text',
      uploadingText: 'uploading Text',
      deleteText: 'delete Text',
      downloadText: 'download Text'
    }}
  />
}

Document.argTypes = {upload: {action: 'upload'}}

export const Duration = () => {
  const [value, setValue] = useState(83456678)
  return <EditableValue
    type="duration"
    value={value}
    events={{onChange: setValue}}
  />
}

export const Html = () => {
  const [value, setValue] = useState('<h1>Test</h1> TEst <span>TEST</span>')
  return <EditableValue
    type="html"
    value={value}
    events={{onChange: setValue}}
  />
}

export const Integer = () => {
  const [value, setValue] = useState(1001)
  return <EditableValue
    type="integer"
    value={value}
    events={{onChange: setValue}}
    options={{
      maxValue: 300000,
      minValue: 1000
    }}
  />
}

export const Location = ({fetchSuggestions}) => {
  const [value, setValue] = useState({
    city: 'Zürich',
    country: 'CH',
    postcode: '8000',
    state: 'ZH',
    street: 'Bahnhofstrasse 1'
  })
  return <EditableValue
    type="location"
    value={value}
    events={{onChange: setValue}}
    options={{
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
    }}
  />
}

Location.argTypes = {fetchSuggestions: {action: 'fetchSuggestions'}}

export const MultiSelect = ({loadTooltip, fetchOptions}) => {
  const [value, setValue] = useState([{key: 2, display: 'V: 2'}, {key: 3, display: 'V: 3'}])
  return <EditableValue
    type="multi-select"
    value={value}
    events={{onChange: setValue}}
    options={{
      options: Array.from(Array(100).keys()).map(v => ({key: v, display: `V: ${v}`})),
      noResultsText: 'no results found',
      isLoading: false,
      tooltips: {2: 'Tooltip for Two'},
      loadTooltip,
      fetchOptions
    }}
  />
}

MultiSelect.argTypes = {fetchOptions: {action: 'fetchOptions'}, loadTooltip: {action: 'loadTooltip'}}

export const MultiRemote = ({loadTooltip, fetchOptions, searchOptions, openAdvancedSearch}) => {
  const [value, setValue] = useState([{key: 2, display: 'Two v'}])
  return <EditableValue
    type="multi-remote"
    value={value}
    events={{onChange: setValue}}
    options={{
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
    }}
  />
}

MultiRemote.argTypes = {
  fetchOptions: {action: 'fetchOptions'},
  loadTooltip: {action: 'loadTooltip'},
  openAdvancedSearch: {action: 'openAdvancedSearch'},
  searchOptions: {action: 'searchOptions'}
}

export const Number = args => {
  const [value, setValue] = useState(null)
  return <EditableValue
    type="number"
    value={value}
    events={{onChange: setValue}}
    {...args}
  />
}

Number.argTypes = {
  value: {type: 'number', defaultValue: 123.45},
  options: {
    type: 'object',
    defaultValue: {
      prePointDigits: 8,
      postPointDigits: 2,
      minValue: -30000,
      maxValue: 30000,
      decimalScale: 5,
      allowNegative: true,
      fixedDecimalScale: true,
      prefix: '#',
      suffix: '%'
    }
  }
}

export const Phone = () => {
  const [value, setValue] = useState('+41761234567')
  return <EditableValue
    type="phone"
    value={value}
    events={{onChange: setValue}}
  />
}

export const Remote = ({loadTooltip, fetchOptions, searchOptions, openAdvancedSearch}) => {
  const [value, setValue] = useState({key: 2, display: 'Two v'})
  return <EditableValue
    type="remote"
    value={value}
    events={{onChange: setValue}}
    options={{
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
    }}
  />
}

Remote.argTypes = {
  fetchOptions: {action: 'fetchOptions'},
  loadTooltip: {action: 'loadTooltip'},
  openAdvancedSearch: {action: 'openAdvancedSearch'},
  searchOptions: {action: 'searchOptions'}
}

export const SingleSelect = ({loadTooltip, fetchOptions}) => {
  const [value, setValue] = useState({key: 2, display: 'Two v'})
  return <EditableValue
    type="single-select"
    value={value}
    event
    s={{onChange: setValue}}
    options={{
      options: [{key: 1, display: 'One'}, {key: 2, display: 'Two'}, {key: 3, display: 'Three'}],
      noResultsText: 'no results found',
      isLoading: false,
      tooltips: {2: 'Tooltip for Two'},
      loadTooltip,
      fetchOptions
    }}
  />
}

SingleSelect.argTypes = {fetchOptions: {action: 'fetchOptions'}, loadTooltip: {action: 'loadTooltip'}}

export const String = () => {
  const [value, setValue] = useState('Test')
  return <EditableValue
    type="string"
    value={value}
    events={{onChange: setValue}}
  />
}

export const Text = () => {
  const [value, setValue] = useState('This is the first line.\nTo be continued...')
  return <EditableValue
    type="text"
    value={value}
    events={{onChange: setValue}}
  />
}

export const Time = () => {
  const [value, setValue] = useState('18:30')
  return <EditableValue
    type="time"
    value={value}
    events={{onChange: setValue}}
  />
}

export const Url = () => {
  const [value, setValue] = useState('http://www.tooco.ch')
  return <EditableValue
    type="url"
    value={value}
    events={{onChange: setValue}}
  />
}
