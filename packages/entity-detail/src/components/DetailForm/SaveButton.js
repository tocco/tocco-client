import {Popover} from 'tocco-ui'
import React from 'react'
import PropTypes from 'prop-types'

import modes from '../../util/modes'
import ErrorItems from '../ErrorItems'
import {StyledButton} from './StyledComponents'

const SaveButton = ({submitting, mode, intl, hasErrors, formErrors, icon}) => {
  const msg = id => (intl.formatMessage({id}))

  return <Popover
    content={hasErrors ? <ErrorItems formErrors={formErrors}/> : null}
    placement="bottom">
    <StyledButton
      data-cy="detail-form_submit-button"
      id="detail-save_button"
      disabled={submitting}
      ink="primary"
      label={msg(`client.entity-detail.${mode === modes.CREATE ? 'create' : 'save'}`)}
      look={hasErrors ? 'flat' : 'raised'}
      pending={submitting}
      type="submit"
      {...(hasErrors && {icon: 'exclamation'})}
      hasErrors={hasErrors}
      icon={icon}
    />
  </Popover>
}

SaveButton.propTypes = {
  intl: PropTypes.object.isRequired,
  submitting: PropTypes.bool,
  mode: PropTypes.oneOf(Object.values(modes)),
  hasErrors: PropTypes.bool,
  formErrors: PropTypes.object,
  icon: PropTypes.string
}

export default SaveButton
