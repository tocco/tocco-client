import React from 'react'
import PropTypes from 'prop-types'

import DocsView from '../DocsView'
import {currentViewPropType} from '../../utils/propTypes'

const DocsViewAdapter = ({currentViewInfo, history, selectedRelation}) =>
  <DocsView
    entityName={currentViewInfo.model.name}
    entityKey={currentViewInfo.key}
    showActions={false}
    noLeftPadding={true}
    history={history}
    openResource={location => {
      history.push(`${selectedRelation.relationName}/list#${location}`)
    }}
  />

DocsViewAdapter.propTypes = {
  history: PropTypes.object.isRequired,
  selectedRelation: PropTypes.shape({
    relationName: PropTypes.string.isRequired
  }).isRequired,
  currentViewInfo: currentViewPropType
}

export default DocsViewAdapter
