import React, {useState, useRef} from 'react'
import PropTypes from 'prop-types'
import {intlShape, FormattedMessage} from 'react-intl'
import {js} from 'tocco-util'
import {Typography, LoadingSpinner, Pagination} from 'tocco-ui'
import useDeepCompareEffect from 'use-deep-compare-effect'

import useSelection from './useSelection'
import useResize from './useResize'
import ResizingController from './ResizingController'
import SortingState from './SortingState'
import columnEnhancers from './columnEnhancers'
import StaticCell from './StaticCell'
import {selectionStylePropType} from '../../util/selectionStyles'
import StyledTable, {
  StyledTableWrapper,
  StretchingTableContainer,
  PaginationContainer,
  StyledFullRowProgress,
  StyledFullRow,
  StyledTableHead,
  StyledTableHeaderCell,
  StyledTableBody,
  StyledTableRow
} from './StyledTable'

const rightAlignedTypes = ['counter', 'decimal', 'double', 'integer', 'latitude', 'long', 'longitude', 'moneyamount',
  'percent', 'serial', 'sorting', 'version']

const isRightAligned = column =>
  column.children && column.children.length === 1 && rightAlignedTypes.includes(column.children[0].dataType)

const Table = props => {
  const [columns, setColumns] = useState(props.columnDefinitions)
  const tableEl = useRef(null)

  const resizeCallback = (columnId, width) => {
    setColumns([...columns.map(c => c.id === columnId ? {
      ...c,
      width
    } : c)])
  }

  const {resizingColumn, startResize} = useResize(tableEl, resizeCallback)

  const {isSelected, singleSelectHandler, multiSelectHandler}
    = useSelection(props.selection, props.entities.map(e => e.__key), props.onSelectChange)

  useDeepCompareEffect(() => {
    const c = columnEnhancers.reduce(
      (acc, columnEnhancer) => columnEnhancer.shouldApply(props)
        ? columnEnhancer.apply(acc, {
          singleSelectHandler,
          multiSelectHandler,
          isSelected
        })
        : acc,
      props.columnDefinitions
    )
    setColumns(c)
  }, [props.columnDefinitions, props.tableSelectionStyle])

  const showPagination = props.entityCount - props.limit > 0

  const thOnClick = column => e => {
    if (!resizingColumn && column.sortable) {
      props.setSortingInteractive(column.id, e.shiftKey)
    }
  }

  const trOnClick = entity => e => {
    if (e.shiftKey) {
      singleSelectHandler(entity.__key, true, true)
    } else if (e.metaKey || e.ctrlKey) {
      singleSelectHandler(entity.__key)
    } else {
      props.onRowClick(entity.__key)
    }
  }

  const ThContent = ({column}) =>
    column.headerRender
      ? column.headerRender({
        ...props,
        singleSelectHandler,
        multiSelectHandler,
        isSelected
      })
      : <div dangerouslySetInnerHTML={{__html: column.label}}/> || null

  const InProgressRow = () => <StyledTableRow>
    <StyledFullRowProgress>
      <LoadingSpinner size="20"/>
      <Typography.P>
        <FormattedMessage id="client.entity-list.dataLoading"/>
      </Typography.P>
    </StyledFullRowProgress>
  </StyledTableRow>

  const NoDataRow = () => <StyledTableRow>
    <StyledFullRow>
      <Typography.Span>
        <FormattedMessage id="client.entity-list.noData"/>
      </Typography.Span>
    </StyledFullRow>
  </StyledTableRow>

  return <StyledTableWrapper>
    <StretchingTableContainer>
      <StyledTable ref={tableEl} columns={columns} resizingColumn={resizingColumn}>
        <StyledTableHead>
          <StyledTableRow>
            {columns.map(column =>
              <StyledTableHeaderCell
                id={`header-cell-${column.id}`}
                key={`header-cell-${column.id}`}
                data-cy={`header-cell-${column.id}`}
                onClick={thOnClick(column)}>
                <ThContent column={column}/>
                <SortingState column={column} sorting={props.sorting}/>
                {!column.widthFixed && <ResizingController column={column} startResize={startResize}/>}
              </StyledTableHeaderCell>
            )}
          </StyledTableRow>
        </StyledTableHead>
        <StyledTableBody>
          {
            props.inProgress
              ? <InProgressRow/>
              : props.entities.length > 0
                ? props.entities.map(entity =>
                  <StyledTableRow
                    key={`list-row-${entity.__key}`}
                    className={`selectableRow ${isSelected(entity.__key) && 'selected'}`}
                    onClick={trOnClick(entity)}
                    data-cy="list-row"
                  >
                    {
                      columns.map(column =>
                        <StaticCell
                          {...props}
                          key={`table-static-cell-${entity.__key}-${column.id}`}
                          singleSelectHandler={singleSelectHandler}
                          multiSelectHandler={multiSelectHandler}
                          isSelected={isSelected}
                          entity={entity}
                          column={column}
                          rightAligned={isRightAligned(column)}
                        />
                      )
                    }
                  </StyledTableRow>
                )
                : <NoDataRow/>
          }

        </StyledTableBody>
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
  sorting: PropTypes.arrayOf(PropTypes.shape({
    field: PropTypes.string,
    order: PropTypes.string
  })),
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
