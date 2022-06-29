import PropTypes from 'prop-types'
import {useState, useEffect} from 'react'
import {errorLogging} from 'tocco-app-extensions'

import {currentViewPropType} from '../../utils/propTypes'
import EditView from '../EditView'
import RelationsView from '../RelationsView'
import {StyledDetailViewContainer, StyledDetailViewLeft, StyledDetailViewRight} from './StyledComponents'

const DetailView = ({match, history, currentViewInfo, relationViewCollapsed, saveUserPreferences}) => {
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
        <errorLogging.ErrorBoundary>
          <EditView match={match} history={history} />
        </errorLogging.ErrorBoundary>
      </StyledDetailViewLeft>
      <StyledDetailViewRight isCollapsed={isCollapsed}>
        <errorLogging.ErrorBoundary>
          <RelationsView match={match} history={history} isCollapsed={isCollapsed} toggleCollapse={toggleCollapse} />
        </errorLogging.ErrorBoundary>
      </StyledDetailViewRight>
    </StyledDetailViewContainer>
  )
}

DetailView.propTypes = {
  intl: PropTypes.object,
  match: PropTypes.object,
  history: PropTypes.object,
  currentViewInfo: currentViewPropType,
  relationViewCollapsed: PropTypes.bool,
  saveUserPreferences: PropTypes.func.isRequired
}

export default DetailView
