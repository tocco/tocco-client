import PropTypes from 'prop-types'
import {actions} from 'tocco-app-extensions'
import {Icon} from 'tocco-ui'

import {StyledIconLink, StyledMenuLink, StyledMenuLinkWrapper, StyledMenuText} from './StyledComponents'

const ActionEntry = ({onClick, item}) => {
  if (!isCustomAction(item)) {
    return <></>
  }

  return (
    <StyledMenuLinkWrapper>
      {item.fullscreen && (
        <>
          <StyledMenuLink data-quick-navigation={true} onClick={onClick} to={`/e/action/${item.name}`}>
            {item.label}
          </StyledMenuLink>
          <StyledIconLink to={`/e/action/${item.name}`} target="_blank" rel="noreferrer">
            <Icon icon="external-link" />
          </StyledIconLink>
        </>
      )}
      {!item.fullscreen && (
        <StyledMenuText data-quick-navigation={true}>
          <actions.Action
            definition={{
              id: item.name,
              label: item.label,
              actionType: actions.actionTypes.CUSTOM,
              buttonType: 'TEXT',
              appId: item.name
            }}
            selection={{}}
          />
        </StyledMenuText>
      )}
    </StyledMenuLinkWrapper>
  )
}

const isCustomAction = item => item.name && !item.path

ActionEntry.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    fullscreen: PropTypes.bool,
    path: PropTypes.string
  }).isRequired,
  onClick: PropTypes.func
}

export default ActionEntry
