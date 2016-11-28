import React from 'react'
import sortBy from 'lodash/sortBy'
import classNames from 'classnames'

import './styles.scss'

/**
 * Table to list records easily.
 */
const Table = props => {
  const columnDefinitions = sortBy(props.columnDefinitions, v => v.order)

  const renderValue = (field, record) => {
    if (props.cellRenderer) {
      return props.cellRenderer(field, record)
    } else {
      return (
        <span>{field.value.toString()}</span>
      )
    }
  }

  const getLabel = c => (c.label || c.value)

  const handleOnClick = record => {
    if (props.onRowClick) {
      props.onRowClick(record)
    }
  }

  const tableClasses = classNames(
    'table',
    props.className,
    {
      'loading': props.loading
    }
  )
  return (
    <div className="tocco-table">
      <table className={tableClasses}>
        <thead>
          <tr>
            {
              columnDefinitions.map((c, idx) =>
                <th key={idx}>{getLabel(c)}</th>
              )
            }
          </tr>
        </thead>
        <tbody>
          {
          props.records.map((r, ridx) => {
            return (
              <tr key={ridx} onClick={() => handleOnClick(r)}>
                {
                  columnDefinitions.map((c, cidx) => {
                    const id = `${ridx}-${cidx}`
                    return (
                      <td key={id}>
                        {
                          renderValue(r[c.value], r)
                        }
                      </td>
                    )
                  })
                }
              </tr>
            )
          })
        }
        </tbody>
      </table>
    </div>
  )
}

Table.propTypes = {
  /**
   * Specifies the columns that are displayed. An array of objects containing an optional label, the value which
   * will be referenced on each record as well as an optional order number. Lower numbers are getting displayed first.
   */
  columnDefinitions: React.PropTypes.arrayOf(
    React.PropTypes.shape(
      {
        value: React.PropTypes.string.isRequired,
        label: React.PropTypes.string,
        order: React.PropTypes.int
      }
    )
  ).isRequired,
  /**
   * Records that get listed in the table.
   * A record should consist of attributes that contain a value and a type attribute.
   */
  records: React.PropTypes.arrayOf(
    React.PropTypes.shape
  ).isRequired,
  /**
   * A cell-renderer allows to render each cell content separately. Given the value as first argument and the whole
   * record as second, the cell renderer function can return any kind of valid component.
   */
  cellRenderer: React.PropTypes.func,
  /**
   * Callback of a row click. Gets clicked record as first argument.
   */
  onRowClick: React.PropTypes.func,
  /**
   * Extend the table with any css classes separated by a space.
   */
  className: React.PropTypes.string,
  /**
   * If true, a transparent layer is shown on tbody
   */
  loading: React.PropTypes.bool

}

export default Table
