import PropTypes from 'prop-types'
import {useEffect} from 'react'
import {Prompt} from 'react-router-dom'
import EntityDetailApp from 'tocco-entity-detail/src/main'
import {Button} from 'tocco-ui'
import {queryString as queryStringUtil} from 'tocco-util'

import Action from '../LazyAction'
import {DetailLinkRelative} from './DetailLinkRelative'
import {StyledEntityDetailBackButton} from './StyledEntityDetail'

const EntityDetail = ({
  loadDetailParams,
  router,
  setFormTouched,
  clearDetailParams,
  detailParams,
  appId,
  intl,
  dispatchEmittedAction,
  formTouched,
  locale,
  modifyFormDefinition
}) => {
  useEffect(() => {
    loadDetailParams(router.match.url)
    setFormTouched(false)

    return () => {
      clearDetailParams()
    }
  }, [clearDetailParams, loadDetailParams, router.match.url, setFormTouched])

  const handleSubGridRowClick = ({id, gridName, relationName}) => {
    router.history.push(`${router.match.url}/${relationName}/${id}`)
  }

  const navigateToCreate = relationName => {
    if (relationName) {
      router.history.push(`${router.match.url}/${relationName}/`)
    } else {
      const url = router.match.url.replace(/\/$/, '')
      const a = url.substring(0, url.lastIndexOf('/') + 1)
      router.history.push(a)
    }
  }

  const handleEntityCreated = ({id}) => {
    setFormTouched(false)
    let url = router.match.url
    url = url.substr(-1) !== '/' ? (url += '/') : url
    router.history.push(`${url}${id}`)
  }

  const navigateToAction = (definition, selection) => {
    const search = queryStringUtil.toQueryString({
      selection,
      actionProperties: definition.properties
    })
    router.history.push({
      pathname: '/action/' + definition.appId,
      state: {definition, selection},
      search
    })
  }

  const handleTouchedChange = ({touched}) => {
    setFormTouched(touched)
  }

  const handleGoBack = () => {
    router.history.push(detailParams.parentUrl)
  }

  const getApp = ({entityName, entityId, formName, mode}) => (
    <EntityDetailApp
      id={`${appId}_detail_${formName}_${entityId}`}
      entityName={entityName}
      entityId={entityId}
      formName={formName}
      mode={mode}
      navigationStrategy={{
        DetailLinkRelative: props => <DetailLinkRelative {...props} currentKey={entityId} />,
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
      modifyFormDefinition={modifyFormDefinition}
      actionAppComponent={Action}
    />
  )

  const msg = id => intl.formatMessage({id})

  return (
    <>
      <Prompt when={formTouched} message={msg('client.entity-browser.detail.confirmTouchedFormLeave')} />
      {detailParams && (
        <>
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
          {getApp(detailParams)}
        </>
      )}
    </>
  )
}

EntityDetail.propTypes = {
  intl: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired,
  dispatchEmittedAction: PropTypes.func.isRequired,
  loadDetailParams: PropTypes.func.isRequired,
  clearDetailParams: PropTypes.func.isRequired,
  setFormTouched: PropTypes.func.isRequired,
  router: PropTypes.object.isRequired,
  detailParams: PropTypes.object,
  formTouched: PropTypes.bool,
  showSubGridsCreateButton: PropTypes.bool,
  appId: PropTypes.string,
  modifyFormDefinition: PropTypes.func
}

export default EntityDetail
