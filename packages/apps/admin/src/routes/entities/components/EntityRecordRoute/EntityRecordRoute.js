import {Navigate, Route, Routes, useLocation} from 'react-router-dom'

import Action from '../../subroutes/action'
import Detail from '../../subroutes/detail'
import Edit from '../../subroutes/edit'
import Entity from '../../subroutes/entity'
import Relations from '../../subroutes/relations'

const EntityRecordRoute = () => {
  const location = useLocation()

  return (
    <Routes>
      <Route exact path="/" element={<Navigate to="detail" replace />} />
      <Route path="detail" element={<Detail location={location} />} />
      <Route path="edit" element={<Edit location={location} />} />
      <Route path="relations" element={<Relations location={location} />} />
      <Route path="action" element={<Action location={location} />} />
      <Route path=":relation/*" element={<Entity />} />
    </Routes>
  )
}

EntityRecordRoute.propTypes = {}

export default EntityRecordRoute
