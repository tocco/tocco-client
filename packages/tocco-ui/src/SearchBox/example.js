/* eslint no-console: 0 */
import React from 'react'
import SearchBox from './'
// real-import:import SearchBox from 'tocco-ui'

export default () => {
  return (
    <div>
      {/* start example */}
      <SearchBox
        placeholder="Live search..."
        onSearch={value => console.log('Searching: ' + value)}
        liveSearch
        debounce={300}
        minInputLength={2}
      />
      <SearchBox
        placeholder="Search..."
        onSearch={value => console.log('Searching: ' + value)}
      />
      {/* end example */}
    </div>
  )
}
