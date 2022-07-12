import PropTypes from 'prop-types'

import {currentViewPropType} from '../../utils/propTypes'
import DocsView from '../DocsView'

const DocsViewAdapter = ({currentViewInfo, history, selectedRelation, sortable}) => (
  <DocsView
    entityName={currentViewInfo.model.name}
    entityKey={currentViewInfo.key}
    showActions={false}
    noLeftPadding={true}
    history={history}
    openResource={location => {
      history.push(`${selectedRelation.relationName}/list#${location}`)
    }}
    sortable={sortable}
  />
)

DocsViewAdapter.propTypes = {
  history: PropTypes.object.isRequired,
  selectedRelation: PropTypes.shape({
    relationName: PropTypes.string.isRequired
  }).isRequired,
  currentViewInfo: currentViewPropType,
  sortable: PropTypes.bool
}

export default DocsViewAdapter
