import PropTypes from 'prop-types'
import {injectIntl} from 'react-intl'
import EntityListApp from 'tocco-entity-list/src/main'
import {AdminLink as StyledLink} from 'tocco-ui'

import {StyledInfoBoxContentWrapper} from './StyledComponents'

const DetailLinkRelativeWithoutIntl = ({entityKey, entityModel, children, intl}) => {
  const msg = id => intl.formatMessage({id})

  return (
    <StyledLink
      aria-label={msg('client.component.navigationStrategy.detailLinkRelative')}
      to={`/e/${entityModel}/${entityKey}`}
    >
      {children}
    </StyledLink>
  )
}

const DetailLinkRelative = injectIntl(DetailLinkRelativeWithoutIntl)

DetailLinkRelativeWithoutIntl.propTypes = {
  entityKey: PropTypes.string.isRequired,
  entityModel: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
  intl: PropTypes.object.isRequired
}

const getSorting = orderBy => {
  if (orderBy) {
    return orderBy
      .split(',')
      .map(sortingField => sortingField.trim())
      .map(sortingField => sortingField.split(/\s+/))
      .map(sortingField => {
        const field = sortingField[0]
        const order = sortingField[1] || 'asc'
        return {field, order}
      })
  }
  return []
}

const InfoBoxSearchFilterContent = ({id, content, navigationStrategy, emitAction}) => {
  const {searchFilterUniqueId, entityName, scope, limit, orderBy} = content

  const handleRowClick = ({id: rowEntityId}) => {
    navigationStrategy.openDetail(entityName, rowEntityId, false)
  }

  return (
    <StyledInfoBoxContentWrapper scrollable>
      <EntityListApp
        id={id}
        limit={limit}
        entityName={entityName}
        formName={entityName}
        searchFilters={[searchFilterUniqueId]}
        scope={scope}
        showActions={false}
        onRowClick={handleRowClick}
        searchFormType="fulltext"
        searchFormPosition="top"
        selectionStyle="none"
        sortable
        disableSelectionController
        emitAction={emitAction}
        navigationStrategy={{...navigationStrategy, DetailLinkRelative}}
        showLink={true}
        sorting={getSorting(orderBy)}
        scrollBehaviour="inline"
        tableMinHeight="240px"
      />
    </StyledInfoBoxContentWrapper>
  )
}

InfoBoxSearchFilterContent.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.object.isRequired,
  emitAction: PropTypes.func.isRequired,
  navigationStrategy: PropTypes.object
}

export default InfoBoxSearchFilterContent
