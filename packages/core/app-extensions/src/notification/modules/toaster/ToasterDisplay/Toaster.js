import PropTypes from 'prop-types'
import {useCallback, useEffect} from 'react'
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

const Toaster = ({toaster, closeToaster, cancelTask, navigationStrategy}) => {
  const userActivityCallback = useCallback(() => {
    closeToaster(toaster.key, false)
  }, [toaster.key, closeToaster])
  const [setDuration, abort, start] = reactUtil.useUserActive(userActivityCallback)

  useEffect(() => {
    setDuration(toaster.duration)
  }, [toaster.duration, setDuration])

  const handleMouseOver = () => {
    abort()
  }

  const handleMouseLeave = () => {
    start()
  }

  const handleCloseButtonClick = () => {
    closeToaster(toaster.key, true)
  }

  return (
    <StyledToaster onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave} type={toaster.type} key={toaster.key}>
      <StyledCloseButton icon="times" onClick={handleCloseButtonClick} />
      <StyledIconTitleWrapper>
        {toaster.icon && (
          <StyledIconWrapper>
            <Icon icon={toaster.icon} hasFixedWidth={false} />
          </StyledIconWrapper>
        )}
        {toaster.title && (
          <Typography.H1>
            <StyledTitleWrapper>
              <Content>{toaster.title}</Content>
            </StyledTitleWrapper>
          </Typography.H1>
        )}
      </StyledIconTitleWrapper>
      {toaster.body && (
        <StyledContentWrapper>
          <Content>
            {typeof toaster.body === 'function' ? (
              <toaster.body navigationStrategy={navigationStrategy} cancelTask={cancelTask} />
            ) : (
              toaster.body
            )}
          </Content>
        </StyledContentWrapper>
      )}
    </StyledToaster>
  )
}

Toaster.propTypes = {
  toaster: ToasterPropType,
  closeToaster: PropTypes.func.isRequired,
  cancelTask: PropTypes.func.isRequired,
  navigationStrategy: PropTypes.object
}

export default Toaster
