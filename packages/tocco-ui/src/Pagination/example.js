import React from 'react'
import Pagination from './'
// real-import:import {Pagination} from 'tocco-ui'

export default () => {
  return (
    <div>
      {/* start example */}
      <Pagination
        totalRecords={999}
        recordsPerPage={25}
        noInput={false}
        onPageChange={page => { console.log('Page Changed:', page) }}
        />
      {/* end example */}
    </div>
  )
}
