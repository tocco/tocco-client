import React, {useState} from 'react'
import {FormattedMessage} from 'react-intl'
import {takeLatest, all, put} from 'redux-saga/effects'
import {notification} from 'tocco-app-extensions'
import {Button} from 'tocco-ui'

import * as actions from './actions'

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

        return (
          <>
            <LazyDocsBrowser
              memoryHistory={true}
              listLimit={10}
              selectionStyle="none"
              searchFormType="none"
              disableViewPersistor={true}
              getListFormName={parent =>
                parent === null ? 'ChooseDocument_root_docs_list_item' : 'ChooseDocument_docs_list_item'
              }
              getCustomLocation={getCustomLocation}
              navigationStrategy={{}}
              embedded={true}
              noLeftPadding={true}
              sortable={false}
              onSelectChange={setSelection}
            />
            <Button
              onClick={() => {
                close()
                setDocument(formName, formFieldId, selection[0].replace('Resource/', ''))
              }}
              look="raised"
              ink="primary"
              disabled={selection.length !== 1 || !selection[0].startsWith('Resource/')}
            >
              <FormattedMessage id="client.docs-browser.chooseDocument.select" />
            </Button>
          </>
        )
      },
      true
    )
  )
}
