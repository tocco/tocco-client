import PropTypes from 'prop-types'
import React from 'react'
import {useNavigate} from 'react-router-dom'

import {currentViewPropType} from '../../utils/propTypes'
import DocsView from '../DocsView'

const DocsViewAdapter = ({currentViewInfo, selectedRelation}) => {
  const navigate = useNavigate()

  return (
    <DocsView
      entityName={currentViewInfo.model.name}
      entityKey={currentViewInfo.key}
      showActions={false}
      noLeftPadding={true}
      openResource={location => {
        navigate(`${selectedRelation.relationName}/list#${location}`)
      }}
    />
  )
}

DocsViewAdapter.propTypes = {
  selectedRelation: PropTypes.shape({
    relationName: PropTypes.string.isRequired
  }).isRequired,
  currentViewInfo: currentViewPropType
}

export default DocsViewAdapter
