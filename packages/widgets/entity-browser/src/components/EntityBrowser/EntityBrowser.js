import {Route, Routes, useLocation} from 'react-router-dom'
import {notification} from 'tocco-app-extensions'

import ActionView from '../ActionView'
import EntityDetail from '../EntityDetail'
import ListView from '../ListView'
import StyledEntityBrowser from './StyledEntityBrowser'

const EntityDetailRoutes = () => {
  return (
    <Routes>
      <Route path="/" exact element={<EntityDetail key="create" />} />
      <Route path=":entityId/*" element={<EntityDetail key="edit" />} />
    </Routes>
  )
}

// TODO: @isbo check this usecase https://github.com/tocco/tocco-client/commit/a9fb75813e551d4d0df2af2fe8c90de024d09f44
const EntityBrowser = () => {
  const location = useLocation()
  return (
    <StyledEntityBrowser>
      <notification.Notifications />
      <Routes>
        <Route path="/" exact element={<ListView location={location} />} />
        <Route path="detail/*" element={<EntityDetailRoutes />} />
        <Route path="action/:appId/*" element={<ActionView location={location} />} />
      </Routes>
    </StyledEntityBrowser>
  )
}

EntityBrowser.propTypes = {}

export default EntityBrowser
