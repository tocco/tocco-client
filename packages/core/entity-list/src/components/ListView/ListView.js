import PropTypes from 'prop-types'
import React, {useMemo} from 'react'
import {errorLogging} from 'tocco-app-extensions'
import {ButtonContextProvider, LoadMask} from 'tocco-ui'
import {js, env} from 'tocco-util'

import TableContainer from '../../containers/TableContainer'
import {getColumnDefinition, getTable} from '../../util/api/forms'
import {getActionBarContent} from './getActionBarContent'
import {StyledListWrapper, StyledActionWrapper, StyledListView} from './StyledComponents'

const ListView = ({
  dataLoadingInProgress,
  formDefinition,
  parent,
  searchFormPosition,
  showActions,
  showSelectionController,
  sorting,
  columnDisplayPreferences,
  cellRenderers,
  preferencesLoaded,
  intl,
  sortable,
  tableMinHeight
}) => {
  const msg = (id, values = {}) => intl.formatMessage({id}, values)

  const List = useMemo(() => {
    if (formDefinition && preferencesLoaded) {
      const table = getTable(formDefinition)
      const columnsDefinitions = getColumnDefinition({
        table,
        sorting,
        sortable,
        parent,
        intl,
        columnDisplayPreferences,
        cellRenderers
      })

      return (
        <StyledListWrapper
          searchFormPosition={searchFormPosition}
          tableMinHeight={tableMinHeight}
          key={`tableWrapper-${table.id}`}
        >
          <TableContainer key={`table-${table.id}`} columnDefinitions={columnsDefinitions} />
        </StyledListWrapper>
      )
    }
  }, [
    formDefinition,
    sorting,
    columnDisplayPreferences,
    preferencesLoaded,
    sortable,
    parent,
    intl,
    cellRenderers,
    searchFormPosition,
    tableMinHeight
  ])

  const ActionBar = useMemo(() => {
    if (formDefinition) {
      const {content, actionBar} =
        getActionBarContent({formDefinition, parent, dataLoadingInProgress, showSelectionController, showActions}) || {}

      if (content.length > 0 && actionBar) {
        return (
          <ButtonContextProvider key={`listActionWrapper-${actionBar.id}`}>
            {ref => (
              <StyledActionWrapper ref={ref} env={env.getEmbedType()}>
                {content}
              </StyledActionWrapper>
            )}
          </ButtonContextProvider>
        )
      }
    }
  }, [dataLoadingInProgress, formDefinition, parent, showSelectionController, showActions])

  return (
    <LoadMask required={[formDefinition]} loadingText={msg('client.entity-list.loadingText')}>
      <StyledListView>
        <errorLogging.ErrorBoundary>{ActionBar}</errorLogging.ErrorBoundary>
        <errorLogging.ErrorBoundary>{List}</errorLogging.ErrorBoundary>
      </StyledListView>
    </LoadMask>
  )
}

ListView.propTypes = {
  intl: PropTypes.object.isRequired,
  formDefinition: PropTypes.shape({
    children: PropTypes.array
  }),
  selection: PropTypes.arrayOf(PropTypes.string),
  currentPageIds: PropTypes.arrayOf(PropTypes.string),
  parent: PropTypes.shape({
    key: PropTypes.string.isRequired,
    model: PropTypes.string.isRequired,
    reverseRelationName: PropTypes.string
  }),
  dataLoadingInProgress: PropTypes.bool,
  showSelectionController: PropTypes.bool,
  entityName: PropTypes.string,
  searchFormPosition: PropTypes.oneOf(['top', 'left']),
  showActions: PropTypes.bool,
  sorting: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string,
      order: PropTypes.string
    })
  ),
  sortable: PropTypes.bool,
  columnDisplayPreferences: PropTypes.objectOf(PropTypes.bool),
  cellRenderers: PropTypes.objectOf(PropTypes.func),
  preferencesLoaded: PropTypes.bool,
  tableMinHeight: PropTypes.string
}

const areEqual = (prevProps, nextProps) => {
  const diff = Object.keys(js.difference(prevProps, nextProps))
  return diff.length === 0
}

export default React.memo(ListView, areEqual)
