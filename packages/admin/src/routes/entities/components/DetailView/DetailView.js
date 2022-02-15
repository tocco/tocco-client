import PropTypes from 'prop-types'
import React, {useState, useEffect} from 'react'
import {useLocation} from 'react-router-dom'

import {currentViewPropType} from '../../utils/propTypes'
import EditView from '../EditView'
import RelationsView from '../RelationsView'
import {StyledDetailViewContainer, StyledDetailViewLeft, StyledDetailViewRight} from './StyledComponents'

const DetailView = ({currentViewInfo, relationViewCollapsed, saveUserPreferences}) => {
  const location = useLocation()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
    onSearchFormCollapsedChange(!isCollapsed)
  }

  useEffect(() => {
    setIsCollapsed(relationViewCollapsed)
  }, [relationViewCollapsed])

  const onSearchFormCollapsedChange = collapsed => {
    saveUserPreferences({'admin.detail.relationViewCollapsed': collapsed})
  }

  return (
    <StyledDetailViewContainer>
      <StyledDetailViewLeft isCollapsed={isCollapsed}>
        <EditView location={location} />
      </StyledDetailViewLeft>
      <StyledDetailViewRight isCollapsed={isCollapsed}>
        <RelationsView location={location} isCollapsed={isCollapsed} toggleCollapse={toggleCollapse} />
      </StyledDetailViewRight>
    </StyledDetailViewContainer>
  )
}

DetailView.propTypes = {
  intl: PropTypes.object,
  currentViewInfo: currentViewPropType,
  relationViewCollapsed: PropTypes.bool,
  saveUserPreferences: PropTypes.func.isRequired
}

export default DetailView
