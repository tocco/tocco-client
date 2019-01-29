import React from 'react'
import {storiesOf} from '@storybook/react'
import {boolean, number, text, withKnobs} from '@storybook/addon-knobs'

import SearchBox from './'
import excludeIntlInfo from '../util/excludeIntlInfo'

storiesOf('Navigation', module)
  .addDecorator(withKnobs)
  .add(
    'SearchBox',
    () =>
      <SearchBox
        onSearch={value => alert('Searching: ' + value)}
        placeholder={text('placeholder', 'Placeholder value')}
        liveSearch={boolean('liveSearch', false)}
        debounce={number('debounce', 300)}
        minInputLength={number('minInputLength', 2)}
      />, excludeIntlInfo()
  )
