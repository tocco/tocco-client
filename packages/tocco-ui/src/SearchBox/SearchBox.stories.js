import React, {useRef} from 'react'

import SearchBox from './'

export default {
  title: 'Tocco-UI/SearchBox',
  component: SearchBox,
  argTypes: {
    onSearch: {action: 'search'},
    placeholder: {type: 'string', defaultValue: 'Placeholder value'},
    minInputLength: {type: 'number', defaultValue: 2}
  }
}

export const Basic = args => {
  const inputEl = useRef(null)

  return <div>
    <button onClick={() => {
      if (inputEl && inputEl.current) {
        inputEl.current.focus()
      }
    }}>Focus</button>
    <SearchBox
      {...args}
      ref={inputEl}
    />
  </div>
}
