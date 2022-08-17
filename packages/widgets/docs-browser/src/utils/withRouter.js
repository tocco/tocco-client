import {connect} from 'react-redux'
import {useHistory, useLocation, useParams} from 'react-router-dom'

import {navigate} from '../modules/routing/actions'

const listenHistory = () => () => {}

const mapActionCreators = {
  navigate,
  listenHistory
}

const mapStateToProps = state => ({
  path: state.docs.routing.path,
  params: state.docs.routing.params
})

export const withInternalRouter = connect(mapStateToProps, mapActionCreators)

export const withReactRouter = WrappedComponent => props => {
  const location = useLocation()
  const history = useHistory()
  const params = useParams()

  return (
    <WrappedComponent
      {...props}
      path={location.pathname}
      navigate={history.push}
      params={params}
      listenHistory={history.listen}
    />
  )
}
