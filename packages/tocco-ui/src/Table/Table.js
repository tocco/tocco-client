import React from 'react'
import _pick from 'lodash/pick'
import _sortBy from 'lodash/sortBy'
import classNames from 'classnames'

/**
 * Table to list records easily.
 */
class Table extends React.Component {
  constructor(props) {
    super(props)

    if (props.orderBy && props.orderBy.name) {
      this.state = {
        orderBy: {...props.orderBy, idx: this.getColumnIdxByFieldName(props.columnDefinitions, props.orderBy.name)}
      }
    } else {
      this.state = {orderBy: {idx: -1}}
    }
  }

  getColumnIdxByFieldName = (columnDefinitions, name) => {
    let result = -1
    columnDefinitions = this.orderColumnDefinitions(columnDefinitions)
    columnDefinitions.forEach((columnDefinition, idx) => {
      columnDefinition.values.forEach(value => {
        if (value.name === name) result = idx
      })
    })
    return result
  }

  orderColumnDefinitions = columnDefinitions => _sortBy(columnDefinitions, ['order'])

  render() {
    const columnDefinitions = this.orderColumnDefinitions(this.props.columnDefinitions)

    const renderValue = (fields, record) => {
      if (this.props.cellRenderer) {
        return this.props.cellRenderer(fields, record)
      } else {
        return (
          <span>{fields.map(field => field.value).join(', ')}</span>
        )
      }
    }

    const getLabel = columnDefinition => (columnDefinition.label || columnDefinition.values[0].name)

    const handleOnClick = record => {
      if (this.props.onRowClick) {
        this.props.onRowClick(record.id, record)
      }
    }

    const handleOrderByClick = (columnDefinition, idx) => {
      const field = columnDefinition.values[0].name
      const newState = {
        orderBy: {
          name: field,
          idx
        }
      }
      if (this.state.orderBy && this.state.orderBy.idx === idx && this.state.orderBy.direction === 'desc') {
        newState.orderBy.direction = 'asc'
      } else {
        newState.orderBy.direction = 'desc'
      }
      this.setState(newState)

      if (this.props.onOrderByChange) {
        this.props.onOrderByChange(_pick(newState.orderBy, ['name', 'direction']))
      }
    }

    const tableClasses = classNames(
      'table',
      this.props.className,
      {
        'loading': this.props.loading
      }
    )

    const orderSymbol = (columnDefinition, idx) => {
      if (this.state.orderBy && this.state.orderBy.idx === idx) {
        if (this.state.orderBy.direction === 'asc') {
          return <span>&nbsp;▲</span>
        } else if (this.state.orderBy.direction === 'desc') {
          return <span>&nbsp;▼</span>
        }
      }
    }

    return (
      <div className="tocco-table">
        <table className={tableClasses}>
          <thead>
            <tr>
              {
                columnDefinitions.map((columnDefinition, idx) => {
                  return (
                    <th
                      key={idx}
                      onClick={() => handleOrderByClick(columnDefinition, idx)}
                    >
                      {getLabel(columnDefinition)}
                      {orderSymbol(columnDefinition, idx)}
                    </th>
                  )
                })
              }
            </tr>
          </thead>
          <tbody>
            {
              this.props.records.map((record, ridx) => {
                return (
                  <tr key={ridx} onClick={() => handleOnClick(record)}>
                    {
                      columnDefinitions.map((c, cidx) => {
                        const id = `${ridx}-${cidx}`
                        const fields = c.values.map(value => record.values[value.name])
                          .filter(field => field !== undefined && field !== null)
                        return (
                          <td key={id}>
                            {
                              renderValue(fields, record)
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
        values: React.PropTypes.oneOfType([
          React.PropTypes.arrayOf(React.PropTypes.shape({
            name: React.PropTypes.string,
            type: React.PropTypes.string
          }))
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
    React.PropTypes.shape({
      id: React.PropTypes.any,
      values: React.PropTypes.objectOf(
        React.PropTypes.shape({
          value: React.PropTypes.any,
          type: React.PropTypes.string.isRequired
        })).isRequired
    })
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
