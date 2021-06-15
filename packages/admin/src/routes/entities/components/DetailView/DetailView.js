import React, {useState} from 'react'
import PropTypes from 'prop-types'

import RelationsView from '../RelationsView'
import EditView from '../EditView'
import {currentViewPropType} from '../../utils/propTypes'
import ErrorView from '../../../../components/ErrorView'
import {StyledDetailViewContainer, StyledDetailViewLeft, StyledDetailViewRight} from './StyledComponents'

const DetailView = ({match, history, currentViewInfo}) => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }
  if (currentViewInfo && currentViewInfo.error) {
    return <ErrorView message="client.admin.entity.detailError" technicalReason={currentViewInfo.error.message}/>
  }

  return (
    <StyledDetailViewContainer>
      <StyledDetailViewLeft isCollapsed={isCollapsed}>
        <EditView match={match} history={history}/>
      </StyledDetailViewLeft>
      <StyledDetailViewRight isCollapsed={isCollapsed}>
        <RelationsView match={match} history={history} isCollapsed={isCollapsed} toggleCollapse={toggleCollapse}/>
      </StyledDetailViewRight>
    </StyledDetailViewContainer>
  )
}

DetailView.propTypes = {
  intl: PropTypes.object,
  match: PropTypes.object,
  history: PropTypes.object,
  currentViewInfo: currentViewPropType
}

export default DetailView
