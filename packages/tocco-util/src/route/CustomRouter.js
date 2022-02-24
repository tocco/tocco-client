import PropTypes from 'prop-types'
import {useLayoutEffect, useState} from 'react'
import {Router} from 'react-router-dom'

const CustomRouter = ({basename, children, history}) => {
  const [state, setState] = useState({
    action: history.action,
    location: history.location
  })

  useLayoutEffect(() => history.listen(setState), [history])

  return (
    <Router basename={basename} location={state.location} navigationType={state.action} navigator={history}>
      {children}
    </Router>
  )
}

CustomRouter.propTypes = {
  basename: PropTypes.string,
  children: PropTypes.any,
  history: PropTypes.object
}

export default CustomRouter
