import {useParams, useNavigate, useLocation} from 'react-router-dom'

import LazyAction from '../LazyAction'

const ActionView = props => {
  const params = useParams()
  const {appId} = params

  const navigate = useNavigate()
  const location = useLocation()

  const navigateBack = () => {
    const originUrl = location.state.originUrl || '/'
    navigate(originUrl)
  }

  return (
    <LazyAction
      appId={appId}
      onSuccess={navigateBack}
      onError={navigateBack}
      onCancel={navigateBack}
      {...props}
    />
  )
}

ActionView.propTypes = {}

export default ActionView
