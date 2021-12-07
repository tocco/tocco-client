import PropTypes from 'prop-types'
import React, {useMemo} from 'react'
import {LoadMask} from 'tocco-ui'
import {js} from 'tocco-util'

import ActionContainer from '../../containers/ActionContainer'
import SelectionControllerContainer from '../../containers/SelectionControllerContainer'
import TableContainer from '../../containers/TableContainer'
import {getColumnDefinition, getTable, getActionBar} from '../../util/api/forms'
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
  sortable
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
        <StyledListWrapper searchFormPosition={searchFormPosition} key={`tableWrapper-${table.id}`}>
          <TableContainer key={`table-${table.id}`} columnDefinitions={columnsDefinitions} />
        </StyledListWrapper>
      )
    }
  }, [formDefinition, sorting, columnDisplayPreferences, preferencesLoaded])

  const ActionBar = useMemo(() => {
    if (formDefinition) {
      const actionBar = getActionBar(formDefinition)
      const content = [
        ...(showSelectionController ? [<SelectionControllerContainer key="selectionController" />] : []),
        ...(showActions !== false && actionBar
          ? [
              <ActionContainer
                key={`listAction-${actionBar.id}`}
                definition={actionBar}
                parent={parent}
                disabled={dataLoadingInProgress}
              />
            ]
          : [])
      ]

      if (content.length > 0 && actionBar) {
        return <StyledActionWrapper key={`listActionWrapper-${actionBar.id}`}>{content}</StyledActionWrapper>
      }
    }
  }, [dataLoadingInProgress, formDefinition])

  return (
    <LoadMask required={[formDefinition]} loadingText={msg('client.entity-list.loadingText')}>
      <StyledListView>
        {ActionBar}
        {List}
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
  preferencesLoaded: PropTypes.bool
}

const areEqual = (prevProps, nextProps) => {
  const diff = Object.keys(js.difference(prevProps, nextProps))
  return diff.length === 0
}

export default React.memo(ListView, areEqual)
