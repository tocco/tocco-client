import PropTypes from 'prop-types'
import {ButtonContextProvider} from 'tocco-ui'

import actions from '../actions'
import {StyledActionsWrapper} from './StyledFormBuilder'

const FormActions = ({entityName, entityKey, mode, customRenderedActions, action}) => (
  <ButtonContextProvider>
    {ref => (
      <StyledActionsWrapper ref={ref}>
        <actions.Action
          definition={action}
          selection={actions.getSingleEntitySelection(entityName, entityKey)}
          mode={mode}
          customRenderedActions={customRenderedActions}
        />
      </StyledActionsWrapper>
    )}
  </ButtonContextProvider>
)

FormActions.propTypes = {
  entityName: PropTypes.string,
  entityKey: PropTypes.string,
  action: PropTypes.object.isRequired,
  mode: PropTypes.string,
  customRenderedActions: PropTypes.objectOf(PropTypes.func)
}

export default FormActions
