import PropTypes from 'prop-types'
import React from 'react'
import {intlShape} from 'react-intl'
import {actions, form} from 'tocco-app-extensions'
import {LoadMask, theme, scale} from 'tocco-ui'
import styled from 'styled-components'

import SelectionControllerContainer from '../../containers/SelectionControllerContainer'
import {getColumnDefinition} from '../../util/api/forms'
import TableContainer from '../../containers/TableContainer'
import ActionContainer from '../../containers/ActionContainer'

export const ListWrapper = styled.div`
  background-color: ${theme.color('paper')};
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: ${props => props.searchFormPosition === 'left' ? scale.space(-0.5) : '0'};
`

const ActionWrapper = styled.div`
  background-color: ${theme.color('paper')};
  margin-bottom: 3px;
  padding: 8px;
`

class ListView extends React.Component {
  constructor(props) {
    super(props)
    this.props.initialize()
  }

  msg = (id, values = {}) => (this.props.intl.formatMessage({id}, values))

  render() {
    const props = this.props
    return (
      <LoadMask
        required={[props.formDefinition]}
        loadingText={this.msg('client.entity-list.loadingText')}
      >
        {
          this.props.formDefinition && this.props.formDefinition.children.map(child => {
            if (child.componentType === form.componentTypes.TABLE) {
              return <ListWrapper searchFormPosition={this.props.searchFormPosition} key={`tableWrapper-${child.id}`}>
                <TableContainer key={`table-${child.id}`} columnDefinitions={getColumnDefinition(child)}/>
              </ListWrapper>
            } else if (actions.isAction(child.componentType)) {
              const content = [
                ...this.props.showSelectionController
                  ? [<SelectionControllerContainer key="selectionController"/>] : [],
                ...this.props.showActions !== false
                  ? [<ActionContainer
                    key={`listAction-${child.id}`}
                    definition={child}
                    parent={props.parent}
                    disabled={this.props.dataLoadingInProgress}
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
  showActions: PropTypes.bool
}

export default ListView
