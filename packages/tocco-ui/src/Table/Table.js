import React from 'react'
import sortBy from 'lodash/sortBy'
import classNames from 'classnames'

import './styles.scss'

/**
 * Table to list records easily.
 */
class Table extends React.Component {

  constructor(props) {
    super(props)
    this.state = {orderBy: props.orderBy}
  }

  render() {
    const columnDefinitions = sortBy(this.props.columnDefinitions, v => v.order)

    const renderValue = (fields, record) => {
      if (this.props.cellRenderer) {
        return this.props.cellRenderer(fields, record)
      } else {
        return (
          <span>{fields.map(field => field.value).join(', ')}</span>
        )
      }
    }

    const getLabel = c => (c.label || c.value)

    const handleOnClick = record => {
      if (this.props.onRowClick) {
        this.props.onRowClick(record)
      }
    }

    const handleOrderByClick = columnName => {
      const newState = {
        orderBy: {
          name: columnName
        }
      }
      if (this.state.orderBy && this.state.orderBy.name === columnName && this.state.orderBy.direction === 'desc') {
        newState.orderBy.direction = 'asc'
      } else {
        newState.orderBy.direction = 'desc'
      }
      this.setState(newState)

      if (this.props.onOrderByChange) {
        this.props.onOrderByChange(newState.orderBy)
      }
    }

    const tableClasses = classNames(
      'table',
      this.props.className,
      {
        'loading': this.props.loading
      }
    )
    return (
      <div className="tocco-table">
        <table className={tableClasses}>
          <thead>
            <tr>
              {
                columnDefinitions.map((c, idx) => {
                  return (
                    <th
                      key={idx}
                      onClick={() => handleOrderByClick(c.value)}
                    >
                      {getLabel(c)}
                      {(this.state.orderBy && this.state.orderBy.name === c.value
                        && this.state.orderBy.direction === 'asc') && ' ▲'}
                      {(this.state.orderBy && this.state.orderBy.name === c.value
                        && this.state.orderBy.direction === 'desc') && ' ▼'}
                    </th>
                  )
                })
              }
            </tr>
          </thead>
          <tbody>
            {
              this.props.records.map((r, ridx) => {
                return (
                  <tr key={ridx} onClick={() => handleOnClick(r)}>
                    {
                      columnDefinitions.map((c, cidx) => {
                        const id = `${ridx}-${cidx}`
                        const valueNames = Array.isArray(c.value) ? c.value : [c.value]
                        const fields = valueNames.map(value => r[value])
                        return (
                          <td key={id}>
                            {
                              renderValue(fields, r)
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
}

Table.propTypes = {
  /**
   * Specifies the columns that are displayed. An array of objects containing an optional label, the value which
   * will be referenced (single string or array of strings) on each record as well as an optional order number.
   * Lower numbers are getting displayed first.
   */
  columnDefinitions: React.PropTypes.arrayOf(
    React.PropTypes.shape(
      {
        value: React.PropTypes.oneOfType([
          React.PropTypes.string,
          React.PropTypes.arrayOf(React.PropTypes.string)
        ]).isRequired,
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
   * A cell-renderer allows to render each cell content separately. Given the field values as first argument
   * and the whole record as second, the cell renderer function can return any kind of valid component.
   */
  cellRenderer: React.PropTypes.func,
  /**
   * Callback of a row click. Gets clicked record as first argument.
   */
  onRowClick: React.PropTypes.func,

  /**
   * Initial ordering.
   */
  orderBy: React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    direction: React.PropTypes.string.isRequired
  }),
  /**
   * Callback on header click. Order-object consisting of properties 'name' and 'direction'
   * is passed as argument ({name: 'firstname', direction: 'asc'}).
   */
  onOrderByChange: React.PropTypes.func,
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
