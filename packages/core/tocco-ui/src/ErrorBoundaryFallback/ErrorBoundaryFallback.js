import {FormattedMessage} from 'react-intl'

import {StyledWrapper} from './StyledComponents'

const ErrorBoundaryFallback = () => (
  <StyledWrapper>
    <FormattedMessage id="client.component.errorBoundary.text" />
  </StyledWrapper>
)

ErrorBoundaryFallback.propTypes = {}

export default ErrorBoundaryFallback
