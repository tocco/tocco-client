import _isEqual from 'lodash/isEqual'
import PropTypes from 'prop-types'
import React, {useEffect, useState} from 'react'
import {FormattedMessage} from 'react-intl'
import styled from 'styled-components'
import {selection} from 'tocco-app-extensions'
import {Button, LoadMask, StyledButton} from 'tocco-ui'

import DocsBrowser from '../../../main'
import getNode from '../../../utils/getNode'

const StyledButtonsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;

  ${StyledButton} {
    margin-right: 0;
  }
`

/* for being able to scroll whole modal content on smaller screens */
const StyledLoadMask = styled(LoadMask)`
  height: auto;
`

export const MoveAction = ({
  selection,
  onSuccess,
  onError,
  path,
  initialize,
  moveElements,
  isWaiting,
  domainTypes,
  rootNodes,
  businessUnit,
  locale,
  emitAction
}) => {
  const initialNode = getNode(path)
  const initialParent = {model: 'Docs_list_item', key: `${initialNode.model}/${initialNode.key}`}
  const [parent, setParent] = useState(initialParent)

  // call only on mount
  useEffect(() => {
    initialize(selection, onSuccess, onError)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

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

  return (
    <StyledLoadMask required={[!isWaiting]}>
      <DocsBrowser
        routerType="routerless"
        initialLocation={getInitialLocation()}
        listLimit={10}
        selectionStyle="none"
        searchFormType="none"
        disableViewPersistor={true}
        getListFormName={parent => (parent === null ? 'Move_root_docs_list_item' : 'Move_docs_list_item')}
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
        scrollBehaviour="none"
        locale={locale}
      />
      <StyledButtonsWrapper>
        <Button
          onClick={() => moveElements(parent.key, selection.ids)}
          look="raised"
          ink="primary"
          disabled={parent === null || _isEqual(parent, initialParent)}
        >
          <FormattedMessage id="client.actions.dms-move.button" />
        </Button>
      </StyledButtonsWrapper>
    </StyledLoadMask>
  )
}

MoveAction.propTypes = {
  selection: selection.propType,
  onSuccess: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  initialize: PropTypes.func.isRequired,
  moveElements: PropTypes.func.isRequired,
  isWaiting: PropTypes.bool.isRequired,
  domainTypes: PropTypes.arrayOf(PropTypes.string),
  rootNodes: PropTypes.arrayOf(
    PropTypes.shape({
      entityName: PropTypes.string,
      key: PropTypes.string
    })
  ),
  businessUnit: PropTypes.string,
  locale: PropTypes.string,
  emitAction: PropTypes.func.isRequired
}
