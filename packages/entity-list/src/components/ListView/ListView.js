import PropTypes from 'prop-types'
import React from 'react'
import {intlShape} from 'react-intl'
import {actions, form} from 'tocco-app-extensions'
import {LoadMask, theme} from 'tocco-ui'
import styled from 'styled-components'

import SelectionControllerContainer from '../../containers/SelectionControllerContainer'
import {getColumnDefinition} from '../../util/api/forms'
import TableContainer from '../../containers/TableContainer'
import ActionContainer from '../../containers/ActionContainer'

export const ListWrapper = styled.div`
  grid-row-start: table-start;
  /* safari only fix to ensure proper height in modal */
  ${({searchFormPosition}) => searchFormPosition !== 'left' && `
    @media not all and (min-resolution: .001dpcm)
    { @supports (-webkit-appearance:none) and (stroke-color: transparent) {
      height: -webkit-fit-content;
      }
    }
  `
  }
`

const ActionWrapper = styled.div`
  display: flex;
  background-color: ${theme.color('paper')};
  margin-bottom: 3px;
  padding: 0 8px 8px;
  grid-row-start: action-start;
  flex-wrap: wrap;

  & > * {
    margin-top: 8px;
  }
`

const StyledListView = styled.div`
  display: grid;
  grid-template-rows: [action-start] auto [table-start] minmax(200px, 1fr);
  height: 100%;
`

class ListView extends React.Component {
  constructor(props) {
    super(props)
    this.props.initialize()
  }

  msg = (id, values = {}) => (this.props.intl.formatMessage({id}, values))

  render() {
    const {
      dataLoadingInProgress,
      formDefinition,
      intl,
      parent,
      searchFormPosition,
      showActions,
      showSelectionController,
      sorting,
      columnDisplayPreferences
    } = this.props

    return (
      <LoadMask
        required={[formDefinition]}
        loadingText={this.msg('client.entity-list.loadingText')}
      >
        <StyledListView>
          {
            formDefinition && formDefinition.children.map(child => {
              if (child.componentType === form.componentTypes.TABLE) {
                return <ListWrapper searchFormPosition={searchFormPosition} key={`tableWrapper-${child.id}`}>
                  <TableContainer
                    key={`table-${child.id}`}
                    columnDefinitions={
                      getColumnDefinition(child, sorting, parent, intl, columnDisplayPreferences)
                    }
                  />
                </ListWrapper>
              } else if (actions.isAction(child.componentType)) {
                const content = [
                  ...showSelectionController
                    ? [<SelectionControllerContainer key="selectionController"/>] : [],
                  ...showActions !== false
                    ? [<ActionContainer
                      key={`listAction-${child.id}`}
                      definition={child}
                      parent={parent}
                      disabled={dataLoadingInProgress}
                    />] : []
                ]

                if (content.length > 0) {
                  return <ActionWrapper key={`listActionWrapper-${child.id}`}>
                    {content}
                  </ActionWrapper>
                }
              }
            })
          }
        </StyledListView>
      </LoadMask>
    )
  }
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

export default ListView
