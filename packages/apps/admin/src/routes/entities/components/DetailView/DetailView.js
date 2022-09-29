import PropTypes from 'prop-types'
import {errorLogging} from 'tocco-app-extensions'
import {useCollapseOnMobile} from 'tocco-ui'

import {currentViewPropType} from '../../utils/propTypes'
import EditView from '../EditView'
import RelationsView from '../RelationsView'
import {StyledDetailViewContainer, StyledDetailViewLeft, StyledDetailViewRight} from './StyledComponents'

const DetailView = ({match, history, currentViewInfo, relationViewCollapsed, saveUserPreferences}) => {
  const onSearchFormCollapsedChange = collapsed => {
    saveUserPreferences({'admin.detail.relationViewCollapsed': collapsed})
  }
  const [isCollapsed, toggleCollapse] = useCollapseOnMobile(relationViewCollapsed, onSearchFormCollapsedChange)
  const getWindowWidth = () => window.innerWidth

  return (
    <StyledDetailViewContainer>
      <StyledDetailViewLeft isRightPaneCollapsed={isCollapsed} windowWidth={getWindowWidth()}>
        <errorLogging.ErrorBoundary>
          <EditView match={match} history={history} />
        </errorLogging.ErrorBoundary>
      </StyledDetailViewLeft>
      <StyledDetailViewRight isRightPaneCollapsed={isCollapsed}>
        <errorLogging.ErrorBoundary>
          <RelationsView
            match={match}
            history={history}
            isRightPaneCollapsed={isCollapsed}
            toggleCollapse={toggleCollapse}
          />
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
