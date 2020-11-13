import {Button, Popover, theme} from 'tocco-ui'
import React from 'react'
import {intlShape} from 'react-intl'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import modes from '../../util/modes'
import ErrorItems from '../ErrorItems'

const StyledButton = styled(Button)`
  ${({hasErrors}) => hasErrors && `
    background-color: ${theme.color('paper')};
  `};
`

const ConditionalWrap = ({condition, wrap, children}) => (
  condition ? wrap(children) : children
)

const SaveButton = ({submitting, mode, intl, hasErrors, formErrors}) => {
  const msg = id => (intl.formatMessage({id}))

  return <ConditionalWrap condition={hasErrors}
    wrap={children => (
      <Popover
        content={<ErrorItems formErrors={formErrors}/>}
        placement="bottom"
        spacer={10}
      >{children}
      </Popover>)
    }
  >
    <StyledButton
      data-cy="detail-form_submit-button"
      id="detail-save_button"
      disabled={submitting }
      ink="primary"
      label={msg(`client.entity-detail.${mode === modes.CREATE ? 'create' : 'save'}`)}
      look={hasErrors ? 'flat' : 'raised'}
      pending={submitting}
      type="submit"
      {...(hasErrors && {icon: 'exclamation'})}
      hasErrors={hasErrors}
    />
  </ConditionalWrap>
}

SaveButton.propTypes = {
  intl: intlShape.isRequired,
  submitting: PropTypes.bool,
  mode: PropTypes.oneOf(Object.values(modes)),
  hasErrors: PropTypes.bool,
  formErrors: PropTypes.object
}

export default SaveButton
