import {Navigate, Route, Routes, useLocation} from 'react-router-dom'

import Action from '../../subroutes/action'
import Create from '../../subroutes/create'
import List from '../../subroutes/list'
import Record from '../../subroutes/record'

const EntityRoute = () => {
  const location = useLocation()
  return (
    <Routes>
      <Route exact path="/" element={<Navigate to="list" replace />} />
      <Route path="action/:id" element={<Action />} />
      <Route path="list" element={<List location={location} />} />
      <Route path="create" element={<Create location={location} />} />
      <Route path=":key/*" element={<Record />} />
    </Routes>
  )
}

EntityRoute.propTypes = {}

export default EntityRoute
