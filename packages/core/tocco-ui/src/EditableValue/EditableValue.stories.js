import GlobalStyles from '../GlobalStyles'
import EditableValue from './'

export default {
  title: 'Tocco-UI/EditableValue',
  component: EditableValue,
  decorators: [
    Story => (
      <div
        style={{
          border: '1px solid #7e7e7e',
          padding: '2px',
          maxWidth: '250px',
          borderRadius: '3px'
        }}
      >
        {Story()}
      </div>
    )
  ],
  argTypes: {
    type: {control: {type: 'text'}},
    events: {defaultValue: {onChange: () => {}}}
  }
}

const EditableValueStory = args => <EditableValue {...args} />

export const Boolean = EditableValueStory.bind({})
Boolean.args = {value: true, type: 'boolean'}
Boolean.argTypes = {value: {type: 'boolean'}}

export const Date = EditableValueStory.bind({})
Date.args = {value: '2019-12-18', type: 'date'}
Date.argTypes = {value: {type: 'string'}}
Date.decorators = [
  Story => (
    <>
      <GlobalStyles />
      {Story()}
    </>
  )
]

export const DateTime = EditableValueStory.bind({})
DateTime.args = {value: '2017-01-25T15:15:00.000Z', type: 'datetime'}
DateTime.decorators = [
  Story => (
    <>
      <GlobalStyles />
      {Story()}
    </>
  )
]

export const Document = EditableValueStory.bind({})
Document.args = {
  value: {
    mimeType: 'image/png',
    fileExtension: 'png',
    sizeInBytes: 3336,
    fileName: 'Blue-Square.png',
    binaryLink: 'http://link.to/my/image.png',
    thumbnailLink:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgAQMAAADYVuV7AAAACXBIWXMAAA7' +
      'EAAAOxAGVKw4bAAAABlBMVEUCd72z5fwcX0uLAAAAHElEQVQ4y2NgwAns/8PBn1HOKGeUM8oZrBycAAD' +
      'OggXZNnQmgAAAAABJRU5ErkJggg=='
  },
  type: 'document',
  options: {
    upload: () => {},
    uploadText: 'upload Text',
    uploadingText: 'uploading Text',
    deleteText: 'delete Text',
    downloadText: 'download Text'
  }
}
Document.argTypes = {value: {type: 'object'}, upload: {action: 'upload'}}

export const Duration = EditableValueStory.bind({})
Duration.args = {value: 83456678, type: 'duration'}
Duration.argTypes = {value: {type: 'number'}}

export const Html = EditableValueStory.bind({})
Html.args = {value: '<h1>Test</h1> TEst <span>TEST</span>', type: 'html'}
Html.argTypes = {value: {type: 'string'}}

export const Integer = EditableValueStory.bind({})
Integer.args = {
  value: 1001,
  type: 'integer',
  options: {
    maxValue: 300000,
    minValue: 1000
  }
}
Integer.argTypes = {value: {type: 'number'}}

export const Location = EditableValueStory.bind({})
Location.args = {
  value: {city: 'Zürich', country: 'CH', postcode: '8000', state: 'ZH', street: 'Bahnhofstrasse 1'},
  type: 'location',
  options: {
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
    fetchSuggestions: () => {},
    isLoading: false,
    mapButtonTitle: 'map Button Title',
    locationValues: {city: 'Zürich', country: 'CH', postcode: '8000', state: 'ZH', street: 'Bahnhofstrasse 1'}
  }
}
Location.argTypes = {value: {type: 'object'}, fetchSuggestions: {action: 'fetchSuggestions'}}

export const MultiSelect = args => (
  <EditableValue
    {...args}
    options={{...args.options, loadTooltip: args.loadTooltip, fetchOptions: args.fetchOptions}}
  />
)
MultiSelect.args = {
  value: [
    {key: 2, display: 'V: 2'},
    {key: 3, display: 'V: 3'}
  ],
  type: 'multi-select',
  options: {
    options: Array.from(Array(100).keys()).map(v => ({key: v, display: `V: ${v}`})),
    noResultsText: 'no results found',
    isLoading: false,
    tooltips: {2: 'Tooltip for Two'},
    loadTooltip: () => {},
    fetchOptions: () => {}
  }
}
MultiSelect.argTypes = {
  value: {type: 'object'},
  fetchOptions: {action: 'fetchOptions', table: {disable: true}},
  loadTooltip: {action: 'loadTooltip', table: {disable: true}}
}

export const MultiRemote = args => (
  <EditableValue
    {...args}
    options={{
      ...args.options,
      loadTooltip: args.loadTooltip,
      fetchOptions: args.fetchOptions,
      searchOptions: args.searchOptions,
      openAdvancedSearch: args.openAdvancedSearch
    }}
  />
)
MultiRemote.args = {
  value: [{key: 2, display: 'Two v'}],
  type: 'multi-remote',
  options: {
    options: [
      {key: 1, display: 'One'},
      {key: 2, display: 'Two'},
      {key: 3, display: 'Three'}
    ],
    isLoading: false,
    tooltips: {2: 'Tooltip for Two'},
    clearValueText: 'clear Value Text',
    searchPromptText: 'search Prompt Text',
    noResultsText: 'no results found',
    moreOptionsAvailable: true,
    moreOptionsAvailableText: 'more Options Available Text',
    loadTooltip: () => {},
    fetchOptions: () => {},
    searchOptions: () => {},
    openAdvancedSearch: () => {}
  }
}

MultiRemote.argTypes = {
  value: {type: 'object'},
  fetchOptions: {action: 'fetchOptions'},
  loadTooltip: {action: 'loadTooltip'},
  openAdvancedSearch: {action: 'openAdvancedSearch'},
  searchOptions: {action: 'searchOptions'}
}

export const Number = EditableValueStory.bind({})
Number.args = {
  value: 123.45,
  type: 'number',
  options: {
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
Number.argTypes = {
  value: {type: 'number'}
}

export const Phone = EditableValueStory.bind({})
Phone.args = {value: '+41761234567', type: 'phone'}
Phone.argTypes = {value: {type: 'string'}}

export const Remote = args => (
  <EditableValue
    {...args}
    options={{
      ...args.options,
      loadTooltip: args.loadTooltip,
      fetchOptions: args.fetchOptions,
      searchOptions: args.searchOptions,
      openAdvancedSearch: args.openAdvancedSearch
    }}
  />
)
Remote.args = {
  value: {key: 2, display: 'Two v'},
  type: 'remote',
  options: {
    options: [
      {key: 1, display: 'One'},
      {key: 2, display: 'Two'},
      {key: 3, display: 'Three'}
    ],
    isLoading: false,
    tooltips: {2: 'Tooltip for Two'},
    clearValueText: 'clear Value Text',
    searchPromptText: 'search Prompt Text',
    noResultsText: 'no results found',
    moreOptionsAvailable: true,
    moreOptionsAvailableText: 'more Options Available Text',
    loadTooltip: () => {},
    fetchOptions: () => {},
    searchOptions: () => {},
    openAdvancedSearch: () => {}
  }
}
Remote.argTypes = {
  value: {type: 'object'},
  fetchOptions: {action: 'fetchOptions'},
  loadTooltip: {action: 'loadTooltip'},
  openAdvancedSearch: {action: 'openAdvancedSearch'},
  searchOptions: {action: 'searchOptions'}
}

export const SingleSelect = args => (
  <EditableValue
    {...args}
    options={{
      ...args.options,
      loadTooltip: args.loadTooltip,
      fetchOptions: args.fetchOptions
    }}
  />
)
SingleSelect.args = {
  value: {key: 2, display: 'Two v'},
  type: 'single-select',
  options: {
    options: [
      {key: 1, display: 'One'},
      {key: 2, display: 'Two'},
      {key: 3, display: 'Three'}
    ],
    noResultsText: 'no results found',
    isLoading: false,
    tooltips: {2: 'Tooltip for Two'},
    loadTooltip: () => {},
    fetchOptions: () => {}
  }
}
SingleSelect.argTypes = {
  value: {type: 'object'},
  fetchOptions: {action: 'fetchOptions'},
  loadTooltip: {action: 'loadTooltip'}
}

export const String = EditableValueStory.bind({})
String.args = {value: 'Test', type: 'string'}
String.argTypes = {value: {type: 'string'}}

export const Text = EditableValueStory.bind({})
Text.args = {value: 'This is the first line.\nTo be continued...', type: 'text'}
Text.argTypes = {value: {type: 'string'}}

export const Time = EditableValueStory.bind({})
Time.args = {value: '18:30', type: 'time'}
Time.argTypes = {value: {type: 'string'}}

export const Url = EditableValueStory.bind({})
Url.args = {value: 'http://www.tooco.ch', type: 'url'}
Url.argTypes = {value: {type: 'string'}}
