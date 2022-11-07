import {FormattedMessage} from 'react-intl'

import ToccoSlogan from '../../assets/tocco_white.svg'
import LoginForm from '../Login'
import {
  StyledLogin,
  StyledMobileSloganImg,
  StyledSloganImg,
  StyledLoginWrapper,
  StyledHeadingLogin,
  GlobalBodyStyle
} from './StyledComponents'

const LoginScreen = () => (
  <>
    <GlobalBodyStyle />
    <StyledLogin>
      <StyledMobileSloganImg src={ToccoSlogan} alt="Tocco Slogan" height="42.3" width="460" />
      <StyledSloganImg src={ToccoSlogan} alt="Tocco Slogan" height="42.3" width="460" />
      <StyledLoginWrapper>
        <StyledHeadingLogin>
          <FormattedMessage id="client.admin.welcomeTitle" />
        </StyledHeadingLogin>
        <LoginForm />
      </StyledLoginWrapper>
    </StyledLogin>
  </>
)

export default LoginScreen
