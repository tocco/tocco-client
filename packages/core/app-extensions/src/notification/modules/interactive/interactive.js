import PropTypes from 'prop-types'
import {useEffect} from 'react'
import {v4 as uuid} from 'uuid'

import {modal} from '../modal/actions'
import ModalButtons from '../modal/ModalDisplay/ModalButtons'

export function getConfirmationAction({title, message, okText, cancelText, onOk, onCancel, defaultAction = 'submit'}) {
  const id = uuid()

  const Content = ({close}) => {
    const handleKeyDown = event => {
      if (event.key === 'Enter') {
        event.preventDefault()
        if (defaultAction === 'submit') {
          onOk()
        } else if (defaultAction === 'cancel') {
          onCancel()
        }
        close()
      } else if (event.key === 'Escape') {
        onCancel()
        close()
      }
    }

    // only on mount
    useEffect(() => {
      document.addEventListener('keydown', handleKeyDown)

      return () => {
        document.removeEventListener('keydown', handleKeyDown)
      }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const buttons = [
      {
        label: okText,
        primary: defaultAction === 'submit',
        callback: () => {
          onOk()
          close()
        }
      },
      {
        label: cancelText,
        primary: defaultAction === 'cancel',
        callback: () => {
          onCancel()
          close()
        }
      }
    ]
    return <ModalButtons buttons={buttons} />
  }

  Content.propTypes = {close: PropTypes.func.isRequired}

  return modal(id, title, message, Content, false)
}

export function getYesNoAction({title, message, yesText, noText, cancelText, onYes, onNo, onCancel}) {
  const id = uuid()

  const Content = ({close}) => {
    const buttons = [
      {
        label: yesText,
        primary: true,
        callback: () => {
          onYes()
          close()
        }
      },
      {
        label: noText,
        callback: () => {
          onNo()
          close()
        }
      },
      {
        label: cancelText,
        callback: () => {
          onCancel()
          close()
        }
      }
    ]

    Content.propTypes = {close: PropTypes.func.isRequired}

    return <ModalButtons buttons={buttons} />
  }

  return modal(id, title, message, Content, false)
}
