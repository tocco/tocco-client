/* eslint-disable react/prop-types */
import React from 'react'

import FormattedValue from './'
import {storybookHtmlMarkup} from '../util/storybookHtmlMarkup'
import {map} from './typeFormatterProvider'
export default {
  title: 'Tocco-UI/FormattedValue',
  component: FormattedValue,
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: Object.keys(map)
      }
    }
  }
}

export const Boolean = args => (
  <FormattedValue {...args} />
)

Boolean.argTypes = {value: {type: 'boolean', defaultValue: true}, type: {defaultValue: 'boolean'}}

export const DateTime = args => (
  <FormattedValue {...args} />
)

DateTime.argTypes = {
  value: {type: 'string', defaultValue: '2017-11-16T03:21:23.123Z'},
  type: {defaultValue: 'datetime'}
}

export const Description = ({mode, title, ...args}) => (
  <FormattedValue {...args} options={{mode, title}} />
)

Description.argTypes = {
  value: {control: 'text', defaultValue: 'This is a <b>strong</b> text'},
  options: {control: false},
  mode: {control: {type: 'radio', options: ['tooltip', 'text']}, defaultValue: 'tooltip'},
  title: {type: 'string', defaultValue: 'Title'},
  type: {defaultValue: 'description'}
}

export const Document = args => (
  <FormattedValue {...args} />
)

Document.argTypes = {
  value: {
    control: 'object',
    defaultValue: {
      alt: 'a classic car parked in nature',
      binaryLink: 'https://picsum.photos/1000/1000?image=1070',
      caption: 'car parked nature',
      fileName: 'nature_car.jpg',
      thumbnailLink: 'https://picsum.photos/400/400?image=1070'
    }
  },
  type: {defaultValue: 'document'}
}

export const DocumentCompact = args => (
  <FormattedValue {...args} />
)

DocumentCompact.argTypes = {
  value: {
    control: 'object',
    defaultValue: {
      alt: 'a classic car parked in nature',
      binaryLink: 'https://picsum.photos/1000/1000?image=1070',
      caption: 'car parked nature',
      fileName: 'nature_car.jpg',
      thumbnailLink: 'https://picsum.photos/400/400?image=1070'
    }
  },
  type: {defaultValue: 'document-compact'}
}
export const Duration = args => (
  <FormattedValue {...args} />
)

Duration.argTypes = {
  value: {control: 'number', defaultValue: 83456678, description: 'Duration in milliseconds'},
  type: {defaultValue: 'duration'}
}

export const Html = args => (
  <FormattedValue {...args} />
)

Html.argTypes = {value: {control: 'text', defaultValue: storybookHtmlMarkup}, type: {defaultValue: 'html'}}

export const Integer = args => (
  <FormattedValue {...args} />
)

Integer.argTypes = {value: {type: 'number', defaultValue: 87660000}, type: {defaultValue: 'integer'}}

export const Money = args => (
  <FormattedValue {...args} type="moneyamount" />
)

Money.argTypes = {value: {control: 'number', defaultValue: 1235.67}}

export const MultiRemote = args => (
  <FormattedValue {...args} options={{
    DetailLink: ({entityKey, children}) =>
      <a href={`/${entityKey}`} target="_blank" rel="noopener noreferrer">{children}</a>
  }} />
)

MultiRemote.argTypes = {
  value: {control: 'object', defaultValue: [{key: '1', display: 'apple'}, {key: '2', display: 'khaki'}]},
  type: {defaultValue: 'multi-remote'}
}

export const MultiSelect = args => (
  <FormattedValue {...args} />
)

MultiSelect.argTypes = {
  value: {
    control: 'object',
    defaultValue: [
      {key: '3', display: 'Matterhorn'},
      {key: '4', display: 'Jungfraujoch'},
      {key: '5', display: 'Rigi'}
    ]
  },
  type: {defaultValue: 'multi-select'}
}
export const Number = args => (
  <FormattedValue {...args} />
)

Number.argTypes = {value: {type: 'number', defaultValue: 876600.010}, type: {defaultValue: 'number'}}

export const Percent = args => (
  <FormattedValue {...args} />
)

Percent.argTypes = {value: {type: 'number', defaultValue: 65.89}, type: {defaultValue: 'percent'}}

export const Phone = args => (
  <FormattedValue {...args} />
)

Phone.argTypes = {value: {type: 'string', defaultValue: '+41761234567'}, type: {defaultValue: 'phone'}}

export const Remote = args => (
  <FormattedValue {...args} options={{
    DetailLink: ({entityKey, children}) =>
      <a href={`/${entityKey}`} target="_blank" rel="noopener noreferrer">{children}</a>
  }} />
)

Remote.argTypes = {
  value: {control: 'object', defaultValue: {key: '1', display: 'apple'}}, type: {defaultValue: 'remote'}
}

export const String = args => (
  <FormattedValue {...args} />
)

String.argTypes = {value: {type: 'string', defaultValue: 'Test String'}, type: {defaultValue: 'string'}}

export const Text = args => (
  <FormattedValue {...args} />
)

Text.argTypes = {value: {type: 'string', defaultValue: 'Line1 \nLine2'}, type: {defaultValue: 'text'}}

export const Time = args => (
  <FormattedValue {...args} />
)

Time.argTypes = {value: {type: 'string', defaultValue: '03:21:23.123Z'}, type: {defaultValue: 'time'}}

export const Url = args => (
  <FormattedValue {...args} />
)

Url.argTypes = {value: {type: 'string', defaultValue: 'https://www.tocco.ch'}, type: {defaultValue: 'url'}}
