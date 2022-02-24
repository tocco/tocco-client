import {connect} from 'react-redux'
import {useLocation, useNavigate, useParams} from 'react-router-dom'

import {navigate as navigateAction} from '../modules/routing/actions'

const listenHistory = () => () => {}

const mapActionCreators = {
  navigate: navigateAction,
  listenHistory
}

const mapStateToProps = state => ({
  path: state.docs.routing.path,
  params: state.docs.routing.params
})

export const withInternalRouter = connect(mapStateToProps, mapActionCreators)

export const withReactRouter = WrappedComponent => props => {
  const location = useLocation()
  const navigate = useNavigate()
  const params = useParams()

  return (
    <WrappedComponent
      {...props}
      path={location.pathname}
      navigate={navigate}
      params={params}
      listenHistory={listenHistory} // TODO: @isbo implement history listen
    />
  )
}
