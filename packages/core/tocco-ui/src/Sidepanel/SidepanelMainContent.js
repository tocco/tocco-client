import PropTypes from 'prop-types'

import {StyledSidepanelMainContent} from './StyledComponents'

const SidepanelMainContent = ({children}) => <StyledSidepanelMainContent>{children}</StyledSidepanelMainContent>

SidepanelMainContent.propTypes = {
  children: PropTypes.any
}

export default SidepanelMainContent
