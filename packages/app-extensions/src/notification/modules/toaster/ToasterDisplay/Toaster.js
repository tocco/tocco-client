import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {Typography, Icon} from 'tocco-ui'
import {react as reactUtil} from 'tocco-util'

import Content from '../../../components/Content'
import {ToasterPropType} from '../toaster'
import {
  StyledToaster,
  StyledCloseButton,
  StyledIconTitleWrapper,
  StyledTitleWrapper,
  StyledIconWrapper,
  StyledContentWrapper
} from './StyledComponents'

const Toaster = ({toaster, closeToaster, navigationStrategy}) => {
  const [setDuration, abort] = reactUtil.useUserActive(() => {
    closeToaster(toaster.key, false)
  })

  useEffect(() => {
    setDuration(toaster.duration)
  }, [toaster.duration])

  const handleToasterClick = () => {
    abort()
  }

  return (
    <StyledToaster onClick={handleToasterClick} type={toaster.type} key={toaster.key}>
      <StyledCloseButton icon="times" onClick={() => {
        closeToaster(toaster.key, true)
      }}/>
      <StyledIconTitleWrapper>
        {toaster.icon
        && <StyledIconWrapper>
          <Icon icon={toaster.icon}/>
        </StyledIconWrapper>
        }
        {toaster.title && <Typography.H1>
          <StyledTitleWrapper><Content>{toaster.title}</Content></StyledTitleWrapper>
        </Typography.H1>
        }
      </StyledIconTitleWrapper>
      {toaster.body
      && <StyledContentWrapper>
        <Content>
          {
            typeof toaster.body === 'function'
              ? <toaster.body navigationStrategy={navigationStrategy}/>
              : toaster.body
          }
        </Content>
      </StyledContentWrapper>
      }
    </StyledToaster>
  )
}

Toaster.propTypes = {
  toaster: ToasterPropType,
  closeToaster: PropTypes.func.isRequired,
  navigationStrategy: PropTypes.object
}

export default Toaster
