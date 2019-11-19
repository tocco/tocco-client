import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {Icon, Typography} from 'tocco-ui'
import EntityListApp from 'tocco-entity-list/src/main'
import queryString from 'query-string'

import {RelationBox, RelationLabel, RelationLinks, StyledPreviewBox, StyledRelationBox} from './StyledComponents'
import {StyledLink} from '../../../../components/StyledLink'
import {goBack} from '../../../../utils/routing'

const RelationsView = ({history, match, currentViewInfo, relations, relationsCount}) => {
  const [selectedRelation, selectRelation] = useState(null)

  useEffect(
    () => {
      if (relations && relations.length > 0) {
        const queryRelation = queryString.parse(history.location.search).relation
        if (queryRelation) {
          selectRelation(relations.find(r => r.relationName === queryRelation))
        } else {
          selectRelation(relations[0])
        }
      } else {
        selectRelation(null)
      }
    },
    [relations]
  )

  const getRelationCountLabel = relationName => relationsCount[relationName]
    ? <RelationLabel>&nbsp;({relationsCount[relationName]})</RelationLabel> : null

  if (!relations || relations.length === 0 || !currentViewInfo) {
    return null
  }

  return (
    <div>
      <StyledRelationBox>
        {relations.map((relation, idx) => (
          <RelationBox
            key={idx}
            selected={selectedRelation && relation.relationName === selectedRelation.relationName}
            onClick={() => {
              selectRelation(relation)
              history.replace({
                search: '?relation=' + relation.relationName
              })
            }}
          >
            <RelationLabel title={relation.relationDisplay.label}>
              {relation.relationDisplay.label}</RelationLabel>{getRelationCountLabel(relation.relationName)}
            <RelationLinks>
              <StyledLink to={match.url.replace(/(relations|detail)$/, relation.relationName)}>
                <Icon icon="external-link-alt"/>
              </StyledLink>
              <StyledLink to={match.url.replace(/(relations|detail)$/, relation.relationName) + '/create'}>
                <Icon icon="plus"/>
              </StyledLink>
            </RelationLinks>
          </RelationBox>
        ))}
      </StyledRelationBox>

      {selectedRelation
      && <StyledPreviewBox>
        <Typography.H4>{selectedRelation.relationDisplay.label}</Typography.H4>
        <EntityListApp
          id={'preview' + selectedRelation.reverseRelationName + selectedRelation.targetEntity}
          key={selectedRelation.reverseRelationName + selectedRelation.targetEntity}
          entityName={selectedRelation.targetEntity}
          formBase={selectedRelation.targetEntity}
          parent={{
            key: currentViewInfo.key,
            reverseRelationName: selectedRelation.reverseRelationName,
            model: currentViewInfo.model.name
          }}
          showLink={true}
          linkFactory={{
            detail: (entity, relation, key, children) =>
              entity
                ? <StyledLink to={`/e/${entity}/${key}`} target="_blank">{children}</StyledLink>
                : <StyledLink to={selectedRelation.relationName + '/' + key}>{children}</StyledLink>
          }}
          onRowClick={({id}) => {
            const entityBaseUrl = match.url.replace(/detail$/, '')
            history.push(`${entityBaseUrl}${selectedRelation.relationName}/${id}`)
          }}
          onNavigateToCreate={() => {
            const entityBaseUrl = goBack(match.url)
            history.push(entityBaseUrl + '/' + selectedRelation.relationName + '/create')
          }}
          searchFormType="simple"
          selectionStyle="none"
        />
      </StyledPreviewBox>
      }
    </div>

  )
}

RelationsView.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  currentViewInfo: PropTypes.object,
  relations: PropTypes.array,
  relationsCount: PropTypes.object
}

export default RelationsView
