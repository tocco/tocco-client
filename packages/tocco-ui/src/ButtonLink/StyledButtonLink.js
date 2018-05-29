import {StyledButton} from '../Button'

const StyledButtonLink = StyledButton.withComponent('a').extend`
  && {
    :hover,
    :focus {
      text-decoration: none;
    }
  }
`

export default StyledButtonLink
