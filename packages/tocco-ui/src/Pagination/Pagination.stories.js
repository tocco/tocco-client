import React, {useState} from 'react'

import Pagination from './'

export default {
  title: 'Tocco-UI/Pagination',
  component: Pagination
}

export const Basic = () => {
  const [currentPage, setCurrentPage] = useState(1)
  return <Pagination
    onPageChange={setCurrentPage}
    currentPage={currentPage}
    recordsPerPage={20}
    totalCount={999}
  />
}
