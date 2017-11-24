import PropTypes from 'prop-types'
import React from 'react'
import {intlShape} from 'react-intl'
import LoadMask from 'tocco-ui/src/LoadMask/LoadMask'
import {getColumnDefinition} from '../../util/api/forms'
import TableContainer from '../../containers/TableContainer'
import {actions} from 'tocco-util'

const TABLE_TYPE = 'ch.tocco.nice2.model.form.components.table.Table'

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
            if (child.type === TABLE_TYPE) {
              return <TableContainer key={idx} columnDefinitions={getColumnDefinition(child)}/>
            } else if (actions.isAction(child.type)) {
              return actions.actionFactory(child, idx)
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
  })
}

export default ListView
