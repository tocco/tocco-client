import PropTypes from 'prop-types'
import {useEffect} from 'react'
import {Prompt as RouterPrompt} from 'react-router'
import {saga} from 'tocco-util'

const Prompt = ({when, message}) => {
  useEffect(() => {
    if (when) {
      saga.activatePreventFromLeaving()
    }

    return () => {
      saga.deactivatePreventFromLeaving()
    }
  }, [when])

  return <RouterPrompt when={when} message={message} />
}

Prompt.propTypes = {
  when: PropTypes.bool.isRequired,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired
}

export default Prompt
