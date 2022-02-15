import PropTypes from 'prop-types'
import React, {useEffect} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
// import {Prompt} from 'react-router-dom'
import EntityDetailApp from 'tocco-entity-detail/src/main'
import {Button, RouterLink} from 'tocco-ui'
import {queryString as queryStringUtil} from 'tocco-util'

import {StyledEntityDetailBackButton} from './StyledEntityDetail'

const DetailLinkRelative = ({currentKey, entityKey, children, relation}) => (
  <RouterLink to={`${currentKey}/${relation}/${entityKey}`}>{children}</RouterLink>
)

DetailLinkRelative.propTypes = {
  currentKey: PropTypes.string.isRequired,
  entityKey: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  relation: PropTypes.string.isRequired
}

const EntityDetail = ({
  loadDetailParams,
  setFormTouched,
  clearDetailParams,
  locale,
  intl,
  // formTouched,
  detailParams,
  dispatchEmittedAction,
  appId
}) => {
  // TODO: @isbo: check if match.url can be replaces with location here

  const location = useLocation()
  const navigate = useNavigate()

  const {pathname} = location

  // only on mount / unmount
  useEffect(() => {
    loadDetailParams(pathname)
    setFormTouched(false)

    return () => {
      clearDetailParams()
    }
  }, [pathname]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubGridRowClick = ({id, relationName}) => {
    navigate(`${relationName}/${id}`)
  }

  // TODO: @isbo cannot create new => entity detail is not re-loading correctly
  const navigateToCreate = relationName => {
    if (relationName) {
      navigate(relationName)
    } else {
      navigate('..')
    }
  }

  const handleEntityCreated = ({id}) => {
    setFormTouched(false)
    navigate(id)
  }

  const navigateToAction = (definition, selection) => {
    const search = queryStringUtil.toQueryString({
      selection,
      actionProperties: definition.properties
    })
    navigate({
      pathname: 'action/' + definition.appId,
      state: {definition, selection},
      search
    })
  }

  const handleTouchedChange = ({touched}) => {
    setFormTouched(touched)
  }

  const handleGoBack = () => {
    navigate(detailParams.parentUrl)
  }

  const msg = id => intl.formatMessage({id})

  return (
    <React.Fragment>
      {/* <Prompt
        when={formTouched}
        message={msg('client.entity-browser.detail.confirmTouchedFormLeave')}
      /> */}
      {detailParams && (
        <React.Fragment>
          {detailParams.showBackButton && (
            <StyledEntityDetailBackButton>
              <Button
                data-cy="entity-detail_back-button"
                icon="chevron-left"
                label={msg('client.entity-browser.back')}
                look="raised"
                onClick={handleGoBack}
              />
            </StyledEntityDetailBackButton>
          )}
          <EntityDetailApp
            id={`${appId}_detail_${detailParams.formName}_${detailParams.entityId}`}
            entityName={detailParams.entityName}
            entityId={detailParams.entityId}
            formName={detailParams.formName}
            mode={detailParams.mode}
            navigationStrategy={{
              DetailLinkRelative: props => <DetailLinkRelative {...props} currentKey={detailParams.entityId} />,
              navigateToCreateRelative: navigateToCreate,
              navigateToActionRelative: navigateToAction
            }}
            onSubGridRowClick={handleSubGridRowClick}
            onEntityCreated={handleEntityCreated}
            onEntityDeleted={handleGoBack}
            onTouchedChange={handleTouchedChange}
            emitAction={action => {
              dispatchEmittedAction(action)
            }}
            theme={{}}
            locale={locale}
          />
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

EntityDetail.propTypes = {
  intl: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired,
  dispatchEmittedAction: PropTypes.func.isRequired,
  loadDetailParams: PropTypes.func.isRequired,
  clearDetailParams: PropTypes.func.isRequired,
  setFormTouched: PropTypes.func.isRequired,
  detailParams: PropTypes.object,
  formTouched: PropTypes.bool,
  showSubGridsCreateButton: PropTypes.bool,
  appId: PropTypes.string
}

export default EntityDetail
