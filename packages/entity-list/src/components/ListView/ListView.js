import PropTypes from 'prop-types'
import React from 'react'
import {intlShape} from 'react-intl'
import {actions, form} from 'tocco-app-extensions'
import {LoadMask} from 'tocco-ui'

import {getColumnDefinition} from '../../util/api/forms'
import TableContainer from '../../containers/TableContainer'
import ActionContainer from '../../containers/ActionContainer'

class ListView extends React.Component {
  componentWillMount = () => {
    this.props.initialize()
  }

  msg = (id, values = {}) => (this.props.intl.formatMessage({id}, values))

  render() {
    const props = this.props
    return (
      <div className="list-view">
        <LoadMask
          required={[props.formDefinition]}
          loadingText={this.msg('client.entity-list.loadingText')}
        >
          {
            this.props.formDefinition && this.props.formDefinition.children.map((child, idx) => {
              if (child.componentType === form.componentTypes.TABLE) {
                return <TableContainer key={idx} columnDefinitions={getColumnDefinition(child)}/>
              } else if (actions.isAction(child.componentType)) {
                return <ActionContainer
                  key={`listAction${idx}`}
                  definition={child}
                  entity={props.entityName}
                  parent={props.parent}
                />
              }
            })
          }
        </LoadMask>
      </div>
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
  })
}

export default ListView
