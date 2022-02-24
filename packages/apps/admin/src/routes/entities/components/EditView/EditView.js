import PropTypes from 'prop-types'
import queryString from 'query-string'
import {useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
// import {Prompt} from 'react-router'
import styled from 'styled-components'
import EntityDetailApp from 'tocco-entity-detail/src/main'
import {scale, theme} from 'tocco-ui'

import navigationStrategy from '../../utils/navigationStrategy'
import {currentViewPropType} from '../../utils/propTypes'
import Action from '../Action'

export const StyledEntityDetailAppWrapper = styled.div`
  margin: 0;
  background-color: ${theme.color('paper')};
  padding: 0 0 0 ${scale.space(0)};
  overflow: hidden;
  height: 100%;
`

// TODO: @isbo fix prompt
const EditView = props => {
  const {currentViewInfo, /* intl, */ chooseDocument, emitAction, propagateRefresh, invalidateLastBreadcrumb} = props

  const location = useLocation()
  const navigate = useNavigate()

  // eslint-disable-next-line no-unused-vars
  const [touched, setTouched] = useState(false)
  const mode = 'update'

  if (!currentViewInfo || currentViewInfo.pathname !== location.pathname) {
    return null
  }

  const queryFormName = queryString.parse(location.search).formName

  const handleToucheChanged = ({touched: changedTouched}) => setTouched(changedTouched)

  const navigateToCreateRelative = (relationName, state) => {
    if (relationName) {
      navigate({
        pathname: `../${relationName}/create`,
        state
      })
    } else {
      navigate({
        pathname: `../../create`,
        state
      })
    }
  }

  const handleEntityDeleted = () => {
    navigate('../../')
  }

  const handleEntityUpdated = () => {
    invalidateLastBreadcrumb(location)
  }

  const handleRefresh = () => {
    propagateRefresh(location)
  }

  const handleSubGridRowClick = ({id, relationName}) => {
    navigate(`../${relationName}/${id}`)
  }

  const entityName = currentViewInfo.model.name
  // const msg = id => intl.formatMessage({id})

  return (
    <StyledEntityDetailAppWrapper>
      {/* <Prompt
        when={touched}
        message={loc => {
          if (location.pathname !== loc.pathname) {
            return msg('client.entity-browser.detail.confirmTouchedFormLeave')
          }

          return false
        }}
      /> */}
      <EntityDetailApp
        entityName={entityName}
        entityId={currentViewInfo.key}
        formName={queryFormName || entityName}
        mode={mode}
        emitAction={emitAction}
        onTouchedChange={handleToucheChanged}
        navigationStrategy={{...navigationStrategy(navigate), navigateToCreateRelative}}
        chooseDocument={chooseDocument}
        onEntityDeleted={handleEntityDeleted}
        onEntityUpdated={handleEntityUpdated}
        onRefresh={handleRefresh}
        actionAppComponent={Action}
        onSubGridRowClick={handleSubGridRowClick}
      />
    </StyledEntityDetailAppWrapper>
  )
}

EditView.propTypes = {
  intl: PropTypes.object,
  currentViewInfo: currentViewPropType,
  chooseDocument: PropTypes.func.isRequired,
  emitAction: PropTypes.func.isRequired,
  propagateRefresh: PropTypes.func.isRequired,
  invalidateLastBreadcrumb: PropTypes.func.isRequired
}

export default EditView
