import styled from 'styled-components'
import {scale, theme} from 'tocco-ui'

export const StyledSummarySuccessWrapper = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: ${scale.font(10)} 1fr;
  grid-column-gap: ${scale.space(-0.5)};
  margin-bottom: ${scale.space(-0.7)};
`

export const StyledMessageWrapper = styled.div`
  margin-bottom: ${scale.space(-0.7)};

  && {
    p {
      margin-bottom: 0;
    }
  }
`

export const StyledResultsWrapper = styled.div`
  padding: ${scale.space(-1)} 0 0 ${scale.space(0)};
`

export const StyledIconWrapper = styled.span`
  display: flex;
  align-items: center;
  color: ${theme.color('signal.success.text')};
  font-size: ${scale.font(10)};
`
