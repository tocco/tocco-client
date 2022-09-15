import PropTypes from 'prop-types'
import {useState, useEffect} from 'react'
import {errorLogging} from 'tocco-app-extensions'

import {currentViewPropType} from '../../utils/propTypes'
import EditView from '../EditView'
import RelationsView from '../RelationsView'
import {StyledDetailViewContainer, StyledDetailViewLeft, StyledDetailViewRight} from './StyledComponents'

const DetailView = ({match, history, currentViewInfo, relationViewCollapsed, saveUserPreferences}) => {
  const [isRightPaneCollapsed, setIsRightPaneIsCollapsed] = useState(false)
  const getWindowWidth = () => window.innerWidth
  const [windowWidth, setWindowWidth] = useState(getWindowWidth())

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(getWindowWidth())
    }

    if (windowWidth < 768) {
      setIsRightPaneIsCollapsed(true)
    } else {
      setIsRightPaneIsCollapsed(relationViewCollapsed)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowWidth])
  /*
    We only want to trigger when windowWidth changes.
    Otherwise there is a double click needed to reopen the panel on screens smaller than 768px
  */

  const onSearchFormCollapsedChange = collapsed => {
    saveUserPreferences({'admin.detail.relationViewCollapsed': collapsed})
  }

  const toggleCollapse = () => {
    setIsRightPaneIsCollapsed(!isRightPaneCollapsed)
    onSearchFormCollapsedChange(!isRightPaneCollapsed)
  }

  return (
    <StyledDetailViewContainer>
      <StyledDetailViewLeft isRightPaneCollapsed={isRightPaneCollapsed} windowWidth={getWindowWidth()}>
        <errorLogging.ErrorBoundary>
          <EditView match={match} history={history} />
        </errorLogging.ErrorBoundary>
      </StyledDetailViewLeft>
      <StyledDetailViewRight isRightPaneCollapsed={isRightPaneCollapsed}>
        <errorLogging.ErrorBoundary>
          <RelationsView
            match={match}
            history={history}
            isRightPaneCollapsed={isRightPaneCollapsed}
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
