import PropTypes from 'prop-types'

import {currentViewPropType} from '../../utils/propTypes'
import DocsView from '../DocsView'

const DocsViewAdapter = ({currentViewInfo, initialLocation}) => (
  <DocsView
    noLeftPadding={false}
    entityName={currentViewInfo.parentModel.name}
    entityKey={currentViewInfo.parentKey}
    showActions={true}
    initialLocation={initialLocation}
  />
)

DocsViewAdapter.propTypes = {
  currentViewInfo: currentViewPropType,
  initialLocation: PropTypes.string
}

export default DocsViewAdapter
