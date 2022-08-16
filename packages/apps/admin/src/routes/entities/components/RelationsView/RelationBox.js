import PropTypes from 'prop-types'
import {AdminLink as StyledLink, Icon} from 'tocco-ui'

import {setRelation} from '../../utils/relationPersistor'
import {StyledRelationBox, StyledCountLabel, StyledRelationLabel, StyledRelationLinks} from './StyledComponents'

const RelationBox = ({relation, history, match, relationsInfo, selectRelation, selectedRelation, intl, entityName}) => {
  const {relationName, targetEntity, relationDisplay} = relation

  const msg = id => intl.formatMessage({id})
  const hasCreateRights = () => relationsInfo[relationName]?.createPermission

  const getRelationCountLabel = () =>
    relationsInfo[relationName]?.count > 0 ? (
      <StyledCountLabel>&nbsp;({relationsInfo[relationName].count})</StyledCountLabel>
    ) : null

  const handleBoxClick = () => {
    selectRelation(relation)
    history.replace({
      search: `?relation=${relationName}`
    })
    setRelation(entityName, relationName)
  }

  const viewLink = match.url.replace(/(relations|detail)$/, relationName)
  const createLink = match.url.replace(/(relations|detail)$/, relationName) + '/create'

  return (
    <StyledRelationBox selected={selectedRelation?.relationName === relationName} onClick={handleBoxClick}>
      <StyledRelationLabel title={relationDisplay.label}>{relationDisplay.label}</StyledRelationLabel>
      {getRelationCountLabel()}
      <StyledRelationLinks>
        <StyledLink aria-label={msg('client.admin.entities.relationsView.relationLinkView')} to={viewLink}>
          <Icon icon="arrow-right" />
        </StyledLink>
        {hasCreateRights() && targetEntity !== 'Resource' && (
          <StyledLink aria-label={msg('client.admin.entities.relationsView.relationLinkCreate')} to={createLink}>
            <Icon icon="plus" />
          </StyledLink>
        )}
      </StyledRelationLinks>
    </StyledRelationBox>
  )
}

RelationBox.propTypes = {
  relation: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  relationsInfo: PropTypes.objectOf(
    PropTypes.shape({
      count: PropTypes.number,
      createPermission: PropTypes.bool
    })
  ),
  intl: PropTypes.object.isRequired,
  selectRelation: PropTypes.func.isRequired,
  selectedRelation: PropTypes.object,
  entityName: PropTypes.string
}

export default RelationBox
