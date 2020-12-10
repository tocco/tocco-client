import PropTypes from 'prop-types'
import React, {useEffect, useMemo} from 'react'
import {intlShape} from 'react-intl'
import {LoadMask} from 'tocco-ui'
import {js} from 'tocco-util'

import SelectionControllerContainer from '../../containers/SelectionControllerContainer'
import {getColumnDefinition, getTable, getActionBar} from '../../util/api/forms'
import TableContainer from '../../containers/TableContainer'
import ActionContainer from '../../containers/ActionContainer'
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
  initialize,
  intl
}) => {
  useEffect(() => {
    initialize()
  }, [])

  const msg = (id, values = {}) => intl.formatMessage({id}, values)

  const List = useMemo(() => {
    if (formDefinition) {
      const table = getTable(formDefinition)
      const columnsDefinitions = getColumnDefinition(table, sorting, parent, intl, columnDisplayPreferences)

      return <StyledListWrapper searchFormPosition={searchFormPosition} key={`tableWrapper-${table.id}`}>
        <TableContainer
          key={`table-${table.id}`}
          columnDefinitions={columnsDefinitions}
        />
      </StyledListWrapper>
    }
  }, [formDefinition, sorting, columnDisplayPreferences])

  const ActionBar = useMemo(() => {
    if (formDefinition) {
      const actionBar = getActionBar(formDefinition)
      const content = [
        ...showSelectionController
          ? [<SelectionControllerContainer key="selectionController"/>] : [],
        ...showActions !== false && actionBar
          ? [<ActionContainer
            key={`listAction-${actionBar.id}`}
            definition={actionBar}
            parent={parent}
            disabled={dataLoadingInProgress}
          />] : []
      ]

      if (content.length > 0 && actionBar) {
        return <StyledActionWrapper key={`listActionWrapper-${actionBar.id}`}>
          {content}
        </StyledActionWrapper>
      }
    }
  }, [dataLoadingInProgress, formDefinition])

  return (
    <LoadMask
      required={[formDefinition]}
      loadingText={msg('client.entity-list.loadingText')}
    >
      <StyledListView>
        {ActionBar}
        {List}
      </StyledListView>
    </LoadMask>
  )
}

ListView.propTypes = {
  intl: intlShape.isRequired,
  initialize: PropTypes.func.isRequired,
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
  sorting: PropTypes.arrayOf(PropTypes.shape({
    field: PropTypes.string,
    order: PropTypes.string
  })),
  columnDisplayPreferences: PropTypes.objectOf(PropTypes.bool)
}

const areEqual = (prevProps, nextProps) => {
  const diff = Object.keys(js.difference(prevProps, nextProps))
  return diff.length === 0
}

export default React.memo(ListView, areEqual)
