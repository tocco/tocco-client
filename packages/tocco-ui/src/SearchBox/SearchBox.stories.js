import React, {useRef} from 'react'
import {storiesOf} from '@storybook/react'
import {number, text, withKnobs} from '@storybook/addon-knobs'

import SearchBox from './'

storiesOf('Tocco-UI | SearchBox', module)
  .addDecorator(withKnobs)
  .add(
    'SearchBox',
    () => {
      const inputEl = useRef(null)

      return <div>
        <button onClick={() => {
          if (inputEl && inputEl.current) {
            inputEl.current.focus()
          }
        }}>Focus</button>
        <SearchBox
          ref={inputEl}
          onSearch={value => alert('Searching: ' + value)}
          placeholder={text('placeholder', 'Placeholder value')}
          minInputLength={number('minInputLength', 2)}
        />
      </div>
    }

  )
