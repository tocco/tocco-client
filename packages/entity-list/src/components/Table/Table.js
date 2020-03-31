import React, {useState, useRef} from 'react'
import PropTypes from 'prop-types'
import {intlShape, FormattedMessage} from 'react-intl'
import {js} from 'tocco-util'
import {Typography, LoadingSpinner, Pagination, Icon} from 'tocco-ui'
import useDeepCompareEffect from 'use-deep-compare-effect'

import useResize from './useResize'
import columnEnhancers from './columnEnhancers'
import StaticCell from './StaticCell'
import {selectionStylePropType} from '../../util/selectionStyles'
import StyledTable, {StyledTableWrapper, StretchingTableContainer, PaginationContainer} from './StyledTable'

const rightAlignedTypes = ['moneyamount', 'counter', 'integer', 'long']

const isRightAligned = column =>
  column.children && column.children.length === 1 && rightAlignedTypes.includes(column.children[0].dataType)

const Table = props => {
  const [columns, setColumns] = useState([])

  const tableEl = useRef(null)

  const resizeCallback = (columnId, width) => {
    setColumns([...columns.map(c => c.id === columnId ? {...c, width} : c)])
  }

  const {startResize, resizingColumn} = useResize(tableEl, resizeCallback)

  useDeepCompareEffect(() => {
    const c = columnEnhancers.reduce(
      (acc, columnEnhancer) => columnEnhancer.shouldApply(props) ? columnEnhancer.apply(acc) : acc,
      props.columnDefinitions
    )
    setColumns(c)
  }, [props.columnDefinitions, props.tableSelectionStyle])

  const showPagination = props.entityCount - props.limit > 0

  const isSortedBy = field => {
    let result = null
    props.sorting.forEach((s, idx) => {
      if (s.field === field) {
        result = {order: s.order, icon: s.order === 'asc' ? 'up' : 'down', rank: idx + 1}
      }
    })
    return result
  }

  return <StyledTableWrapper>
    <StretchingTableContainer>
      <StyledTable ref={tableEl} columns={columns} resizingColumn={resizingColumn}>
        <thead>
          <tr>
            {columns.map(column => {
              const sortedBy = isSortedBy(column.id)
              return <th
                id={column.id}
                key={`table-header-${column.id}`}
                onClick={e => {
                  if (!resizingColumn && column.sortable) {
                    props.setSortingInteractive(column.id, e.shiftKey)
                  }
                }}>
                {
                  column.headerRender
                    ? column.headerRender(props)
                    : column.label
                }
                {sortedBy
                && <span className="sorting">
                  <Icon icon={`sort-${sortedBy.icon}`}/>
                  {sortedBy.rank > 1 && <sup className={sortedBy.icon}>{sortedBy.rank}</sup>
                  }</span>
                }
                {column.resizable !== false && <span onMouseDown={startResize(column)} className="resizeHandle"/>}
              </th>
            }
            )}
          </tr>
        </thead>
        <tbody>
          {

            props.inProgress
              ? <tr><td className="fullRow progress">
                <LoadingSpinner size="20"/>
                <Typography.P>
                  <FormattedMessage id="client.entity-list.dataLoading"/>
                </Typography.P>
              </td></tr>
              : props.entities.length > 0
                ? props.entities.map(entity =>
                  <tr key={`table-row-${entity.__key}`}
                    className={`selectableRow ${props.selection.includes(entity.__key) && 'selected'}`}
                    onClick={e => {
                      props.onRowClick(entity.__key)
                    }}
                  >
                    {
                      columns.map(column =>
                        <StaticCell
                          {...props}
                          entity={entity}
                          column={column}
                          rightAligned={isRightAligned(column)}
                          key={`table-selection-cell-${entity.__key}-${column.id}`}
                        />
                      )
                    }
                  </tr>
                )
                : <tr><td className="fullRow">
                  <Typography.Span>
                    <FormattedMessage id="client.entity-list.noData"/>
                  </Typography.Span>
                </td></tr>

          }

        </tbody>
      </StyledTable>

    </StretchingTableContainer>

    {showPagination && <PaginationContainer>
      <Pagination
        onPageChange={props.changePage}
        currentPage={props.currentPage}
        totalCount={props.entityCount}
        recordsPerPage={props.limit}
      />
    </PaginationContainer>}
  </StyledTableWrapper>
}

Table.propTypes = {
  intl: intlShape.isRequired,
  columnDefinitions: PropTypes.arrayOf(
    PropTypes.shape({
      values: PropTypes.arrayOf(PropTypes.shape({name: PropTypes.string})),
      label: PropTypes.string,
      order: PropTypes.int,
      sortable: PropTypes.bool
    })
  ).isRequired,
  entities: PropTypes.array.isRequired,
  entityCount: PropTypes.number,
  inProgress: PropTypes.bool,
  sorting: PropTypes.arrayOf(PropTypes.shape({field: PropTypes.string, order: PropTypes.string})),
  currentPage: PropTypes.number,
  limit: PropTypes.number,
  onRowClick: PropTypes.func,
  setSortingInteractive: PropTypes.func,
  changePage: PropTypes.func.isRequired,
  tableSelectionStyle: selectionStylePropType,
  onSelectChange: PropTypes.func,
  refresh: PropTypes.func,
  selection: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  parent: PropTypes.shape({
    key: PropTypes.string.isRequired,
    model: PropTypes.string.isRequired,
    reverseRelationName: PropTypes.string
  }),
  showLink: PropTypes.bool,
  linkFactory: PropTypes.objectOf(PropTypes.func)
}

const areEqual = (prevProps, nextProps) => {
  const diff = js.difference(prevProps, nextProps)
  return Object.keys(diff).length === 0
}

export default React.memo(Table, areEqual)
