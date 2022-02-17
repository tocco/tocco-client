import React, {useState} from 'react'
import {FormattedMessage} from 'react-intl'
import {all, put, takeLatest} from 'redux-saga/effects'
import {notification} from 'tocco-app-extensions'

import * as actions from './actions'
import {StyledButton} from './StyledComponents'

const LazyDocsBrowser = React.lazy(() => import('../../main'))

export default function* mainSagas() {
  yield all([takeLatest(actions.CHOOSE_DOCUMENT, chooseDocument)])
}

export function* chooseDocument({payload: {setDocument, formName, formFieldId}}) {
  yield put(
    notification.modal(
      'chooseDocument',
      'client.docs-browser.chooseDocument.title',
      null,
      ({close}) => {
        const [selection, setSelection] = useState([])
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

        const handleClick = () => {
          close()
          setDocument(formName, formFieldId, selection[0].replace('Resource/', ''))
        }
        const isDisabled = selection.length !== 1 || !selection[0].startsWith('Resource/')
        const listFormName = parent =>
          parent === null ? 'ChooseDocument_root_docs_list_item' : 'ChooseDocument_docs_list_item'

        return (
          <div>
            <LazyDocsBrowser
              routerType="routerless"
              listLimit={10}
              selectionStyle="none"
              searchFormType="none"
              disableViewPersistor={true}
              getListFormName={listFormName}
              getCustomLocation={getCustomLocation}
              navigationStrategy={{}}
              embedded={true}
              noLeftPadding={true}
              sortable={false}
              onSelectChange={setSelection}
              scrollBehaviour="none"
            />
            <StyledButton onClick={handleClick} look="raised" ink="primary" disabled={isDisabled}>
              <FormattedMessage id="client.docs-browser.chooseDocument.select" />
            </StyledButton>
          </div>
        )
      },
      true
    )
  )
}
