/* eslint-disable react/prop-types */
import {action} from '@storybook/addon-actions'
import faker from 'faker'
import _difference from 'lodash/difference'
import {useState} from 'react'

import {Icon, Typography} from '../'
import Table from './'
import {ScrollBehaviour} from './scrollBehaviour'

const columnsT = [
  {
    id: 'number',
    label: 'Number',
    sorting: {
      sortable: true,
      sortRank: 1,
      order: 'asc'
    },
    resizable: true,
    rightAligned: true,
    width: 60
  },
  {
    id: 'firstname',
    label: 'Firstname',
    sorting: {
      sortable: true,
      sortRank: 2,
      order: 'asc'
    },
    resizable: true
  },
  {
    id: 'lastname',
    label: 'Lastname',
    sorting: {
      sortable: true
    },
    resizable: true,
    HeaderRenderer: ({column, data}) => {
      return (
        <span>
          {column.label} <Icon icon="id-badge" />
        </span>
      )
    },
    CellRenderer: ({rowData, column, props}) => {
      return (
        <Typography.Span>
          {rowData[column.id]} <Icon icon="id-badge" />
        </Typography.Span>
      )
    }
  }
]

const data = [...Array(100).keys()].map(k => {
  return {
    __key: k,
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    number: faker.datatype.number()
  }
})

export default {
  title: 'Tocco-UI/Table',
  component: Table,
  argTypes: {
    scrollBehaviour: {options: Object.values(ScrollBehaviour), defaultValue: ScrollBehaviour.INLINE}
  }
}

export const Basic = args => {
  const recordsPerPage = 30
  const [columns, setColumns] = useState(columnsT)
  const [selection, setSelection] = useState([2])

  const [currentPage, setCurrentPage] = useState(1)
  const onPageChange = newPage => {
    setCurrentPage(newPage)
  }

  const onColumnPositionChange = (columnId, columnIdPosition) => {
    const from = columns.findIndex(c => c.id === columnId)
    const to = columns.findIndex(c => c.id === columnIdPosition)

    setColumns(
      columns.reduce((acc, c, idx) => {
        return [...acc, ...(idx !== from ? [c] : []), ...(idx === to ? [columns[from]] : [])]
      }, [])
    )
  }

  const onSelectionChange = (keys, selected) => {
    if (selected) {
      setSelection([...selection, ...keys])
    } else {
      setSelection([..._difference(selection, keys)])
    }
  }

  return (
    <div style={{width: '1000px', height: '300px', backgroundColor: 'red'}}>
      <Table
        {...args}
        columns={columns}
        data={data.slice(currentPage * recordsPerPage, currentPage * recordsPerPage + recordsPerPage)}
        selection={selection}
        selectionStyle="multi"
        onSelectionChange={onSelectionChange}
        paginationInfo={{
          totalCount: data.length,
          currentPage: currentPage,
          recordsPerPage: recordsPerPage
        }}
        onPageChange={onPageChange}
        onColumnPositionChange={onColumnPositionChange}
        onPageRefresh={action('page refreshed')}
        onRowClick={action('row clicked')}
        onSortingChange={action('sorting changed')}
      />
      Selection: {JSON.stringify(selection)}
    </div>
  )
}
