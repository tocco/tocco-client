import React from 'react'
import Table from './'

// real-import:import {Table} from 'tocco-ui'

export default () => {
  const columnDefinitions = [
    {
      label: 'Firstname',
      value: 'firstname',
      order: 2
    },
    {
      label: 'Lastname',
      value: 'lastname',
      order: 1
    },
    {
      label: '#',
      value: 'user_nr',
      order: 0
    },
    {
      label: 'Full name',
      value: ['lastname', 'firstname']
    }
  ]

  const records = [
    {
      firstname: {
        value: 'Homer',
        type: 'string'
      },
      lastname: {
        value: 'Simpson',
        type: 'string'
      },
      user_nr: {
        value: 1,
        type: 'counter'
      }
    },
    {
      firstname: {
        value: 'Peter',
        type: 'string'
      },
      lastname: {
        value: 'Griffin',
        type: 'string'
      },
      user_nr: {
        value: 33,
        type: 'counter'
      }
    }
  ]

  const cellRenderer = fields => {
    const valueElements = fields.map((field, index) =>
      field.type === 'counter'
       ? <div key={index} style={{fontWeight: 'bold'}}>{field.value}</div>
       : <div key={index}>{field.value}</div>)
    return <div>{valueElements}</div>
  }

  return (
    <div>
      {/* start example */}
      <Table
        columnDefinitions={columnDefinitions}
        cellRenderer={cellRenderer}
        records={records}
        className="table-striped"
        onRowClick={r => console.log('row clicked', r)}
      />
      {/* end example */}
    </div>
  )
}
