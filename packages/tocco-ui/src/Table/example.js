/* eslint no-console: 0 */
import React from 'react'
import Table from './'

// real-import:import Table from 'tocco-ui'

export default () => {
  const columnDefinitions = [
    {
      label: 'Firstname',
      values: [{name: 'firstname'}],
      order: 2
    },
    {
      label: 'Lastname',
      values: [{name: 'lastname'}],
      order: 1
    },
    {
      label: '#',
      values: [{name: 'user_nr'}],
      order: 0
    },
    {
      label: 'Full name',
      values: [{name: 'lastname'}, {name: 'firstname'}]
    }
  ]

  const records = [
    {
      id: 22,
      values: {
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
      }
    },
    {
      id: 33,
      values: {
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
    }
  ]

  const orderBy = {
    name: 'user_nr',
    direction: 'desc'
  }

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
        orderBy={orderBy}
        onOrderByChange={r => console.log('order-by change', r)}
        onRowClick={r => console.log('row clicked', r)}
      />
      {/* end example */}
    </div>
  )
}
