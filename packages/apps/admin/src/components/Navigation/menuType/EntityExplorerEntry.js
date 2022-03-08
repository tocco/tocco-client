import PropTypes from 'prop-types'
import React from 'react'
import {Icon} from 'tocco-ui'

import {StyledIconLink, StyledMenuLink, StyledMenuLinkWrapper} from './StyledComponents'

const EntityExplorerEntry = ({onClick, item}) => {
  const entityNameDisplay = item.matchingAttribute === 'entity' ? <> ({item.entity})</> : ''

  return (
    <StyledMenuLinkWrapper>
      <StyledMenuLink data-quick-navigation={true} onClick={onClick} to={`/e/${item.entity}`}>
        {item.label}
        {entityNameDisplay}
      </StyledMenuLink>
      <StyledIconLink to={`/e/${item.entity}`} target="_blank" rel="noreferrer">
        <Icon icon="external-link" />
      </StyledIconLink>
    </StyledMenuLinkWrapper>
  )
}

EntityExplorerEntry.propTypes = {
  item: PropTypes.shape({
    entity: PropTypes.string,
    label: PropTypes.string,
    matchingAttribute: PropTypes.string
  }),
  onClick: PropTypes.func
}

export default EntityExplorerEntry
