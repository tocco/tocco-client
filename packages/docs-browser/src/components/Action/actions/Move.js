import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {FormattedMessage} from 'react-intl'
import {selection} from 'tocco-util'
import {Button, LoadMask, StyledButton} from 'tocco-ui'
import styled from 'styled-components'
import _isEqual from 'lodash/isEqual'

import DocsBrowser from '../../../main'
import getNode from '../../../utils/getNode'

const StyledButtonsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;

  ${StyledButton} {
    margin-right: 0;
  }
`

export const MoveAction = ({
  selection,
  onSuccess,
  onError,
  context,
  initialize,
  moveElements,
  isWaiting,
  domainTypes,
  rootNodes,
  businessUnit,
  locale,
  emitAction
}) => {
  const initialNode = getNode(context.history.location.pathname)
  const initialParent = {model: 'Docs_list_item', key: `${initialNode.model}/${initialNode.key}`}
  const [parent, setParent] = useState(initialParent)

  useEffect(() => {
    initialize(selection, onSuccess, onError)
  }, [])

  const getCustomLocation = (model, key) => {
    switch (model) {
      case 'Domain':
        return `/docs/domain/${key}/list`
      case 'Folder':
        return `/docs/folder/${key}/list`
      case 'Resource':
        return
      default:
        throw new Error(`Unexpected model: ${model}`)
    }
  }

  const getInitialLocation = () => {
    if (parent === null) {
      return null
    }
    const [model, key] = parent.key.split('/')
    return getCustomLocation(model, key)
  }

  return <LoadMask required={[!isWaiting]}>
    <DocsBrowser
      memoryHistory={true}
      initialLocation={getInitialLocation()}
      listLimit={10}
      selectionStyle="none"
      searchFormType="none"
      disableViewPersistor={true}
      getListFormName={parent => parent === null ? 'Move_root_docs_list_item' : 'Move_docs_list_item'}
      onListParentChange={parent => setParent(parent)}
      getCustomLocation={getCustomLocation}
      navigationStrategy={{}}
      embedded={true}
      emitAction={emitAction}
      noLeftPadding={true}
      domainTypes={domainTypes}
      rootNodes={rootNodes}
      businessUnit={businessUnit}
      sortable={false}
      locale={locale}
    />
    <StyledButtonsWrapper>
      <Button
        onClick={() => moveElements(parent.key, selection.ids)}
        look="raised"
        ink="primary"
        disabled={parent === null || _isEqual(parent, initialParent)}
      >
        <FormattedMessage id="client.actions.dms-move.button"/>
      </Button>
    </StyledButtonsWrapper>
  </LoadMask>
}

MoveAction.propTypes = {
  selection: selection.propType,
  onSuccess: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  context: PropTypes.shape({
    history: PropTypes.shape({
      location: PropTypes.shape({
        pathname: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  }).isRequired,
  initialize: PropTypes.func.isRequired,
  moveElements: PropTypes.func.isRequired,
  isWaiting: PropTypes.bool.isRequired,
  domainTypes: PropTypes.arrayOf(PropTypes.string),
  rootNodes: PropTypes.arrayOf(PropTypes.shape({
    entityName: PropTypes.string,
    key: PropTypes.string
  })),
  businessUnit: PropTypes.string,
  locale: PropTypes.string,
  emitAction: PropTypes.func.isRequired
}
