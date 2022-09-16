import {screen} from '@testing-library/react'
import {appFactory} from 'tocco-app-extensions'
import {IntlStub, testingLibrary} from 'tocco-test-util'

import {dialogInfo} from '../../dev/dialogInfoExample'
import {setDeleteDialogInfo} from '../../modules/delete/actions'
import reducers, {sagas} from '../../modules/reducers'
import Delete from './Delete'

describe('delete', () => {
  describe('components', () => {
    describe('Delete', () => {
      it('should render', () => {
        const loadSpy = sinon.spy()

        testingLibrary.renderWithIntl(<Delete intl={IntlStub} dialogInfo={null} loadDialogInfo={loadSpy} />)

        expect(screen.getAllByText('client.delete.loadingText')).to.have.length(1)
      })

      it('should render Dialog if dialogInfo is set', () => {
        const store = appFactory.createStore(reducers, sagas, {navigationStrategy: {}})
        store.dispatch(setDeleteDialogInfo(dialogInfo))
        testingLibrary.renderWithStore(<Delete intl={IntlStub} dialogInfo={dialogInfo} loadDialogInfo={() => {}} />, {
          store
        })

        expect(screen.queryAllByText('client.delete.loadingText')).to.have.length(0)
        expect(screen.getAllByText('client.delete.confirmText')).to.have.length(1)
      })
    })
  })
})
