/* eslint-disable react/prop-types */
import React, {useState} from 'react'
import {storiesOf} from '@storybook/react'
import faker from 'faker'
import _difference from 'lodash/difference'
import {action} from '@storybook/addon-actions'

import Table from './'
import {Typography, Icon} from '../'

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
      return <span>{column.label} <Icon icon="id-badge"/></span>
    },
    CellRenderer: ({rowData, column, props}) => {
      return <Typography.Span>{rowData[column.id]} <Icon icon="id-badge"/></Typography.Span>
    }
  }
]

const data = [...Array(100).keys()].map(k => {
  return {
    __key: k,
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    number: faker.random.number()
  }
})

storiesOf('Tocco-UI | Table', module)
  .add(
    'Table',
    () => {
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

        setColumns(columns.reduce((acc, c, idx) => {
          return [
            ...acc,
            ...(idx !== from ? [c] : []),
            ...(idx === to ? [columns[from]] : [])
          ]
        }, []))
      }

      const onSelectionChange = (keys, selected) => {
        if (selected) {
          setSelection([...selection, ...keys])
        } else {
          setSelection([..._difference(selection, keys)])
        }
      }

      return <div style={{width: '1000px', height: '500px', backgroundColor: 'red'}}>
        <Table
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
          onRowClick={action('row clicked')}
          onSortingChange={action('sorting changed')}
        />
        Selection: {JSON.stringify(selection)}
      </div>
    }
  )
