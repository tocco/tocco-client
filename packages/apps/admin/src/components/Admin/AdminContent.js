import PropTypes from 'prop-types'
import {Navigate, Route, Routes, useLocation} from 'react-router-dom'
import {errorLogging} from 'tocco-app-extensions'
import {BurgerButton} from 'tocco-ui'
import {viewPersistor} from 'tocco-util'

import DashboardRoute from '../../routes/dashboard'
import DocsRoute from '../../routes/docs'
import EntitiesRoute from '../../routes/entities'
import Settings from '../../routes/settings'
import Navigation from '../Navigation'
import {burgerMenuStyles, StyledContent, StyledMenu} from './StyledComponents'

const NavigateToDashboard = () => {
  return <Navigate to="/dashboard" replace />
}

const AdminContent = ({setMenuOpen, menuOpen}) => {
  const location = useLocation()

  const isMenuOpen = state => {
    if (state.isOpen !== menuOpen) {
      setMenuOpen(state.isOpen)
    }
  }

  const handleClick = () => {
    setMenuOpen(false)
    viewPersistor.clearPersistedViews()
  }

  return (
    <>
      <StyledMenu
        isOpen={menuOpen}
        onStateChange={isMenuOpen}
        customCrossIcon={false}
        customBurgerIcon={<BurgerButton isOpen={menuOpen} />}
        styles={burgerMenuStyles}
      >
        <errorLogging.ErrorBoundary>
          <Navigation onClick={handleClick} />
        </errorLogging.ErrorBoundary>
      </StyledMenu>
      <StyledContent>
        <errorLogging.ErrorBoundary>
          <Routes>
            <Route exact path="/" element={<NavigateToDashboard />} />
            <Route exact path="dashboard/reload" element={<NavigateToDashboard />} />
            <Route exact path="dashboard" element={<DashboardRoute />} />
            <Route path="e/*" element={<EntitiesRoute location={location} />} />
            <Route path="s" element={<Settings />} />
            <Route path="docs/*" element={<DocsRoute />} />
            <Route element={<NavigateToDashboard />} />
          </Routes>
        </errorLogging.ErrorBoundary>
      </StyledContent>
    </>
  )
}

AdminContent.propTypes = {
  menuOpen: PropTypes.bool,
  setMenuOpen: PropTypes.func.isRequired
}

export default AdminContent
