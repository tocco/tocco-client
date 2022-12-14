import {screen} from '@testing-library/react'
import {MemoryRouter} from 'react-router-dom'
import {IntlStub, testingLibrary} from 'tocco-test-util'

import {States} from '../../states'
import EntityDetail from './EntityDetail'

const EMPTY_FUNC = () => {}

jest.mock('tocco-entity-detail/src/main', () => () => <div data-testid="entity-detail" />)

describe('entity-browser', () => {
  describe('components', () => {
    describe('EntityDetail', () => {
      const detailParams = {
        entityName: 'User',
        entityId: '1',
        formName: 'User',
        mode: 'update'
      }

      const routerMock = {
        match: {url: '/detail', history: {}}
      }

      const actionsMock = {
        loadDetailParams: EMPTY_FUNC,
        dispatchEmittedAction: EMPTY_FUNC,
        clearDetailParams: EMPTY_FUNC,
        setFormTouched: EMPTY_FUNC,
        fireStateChangeEvent: EMPTY_FUNC
      }

      test('should render App', () => {
        testingLibrary.renderWithIntl(
          <MemoryRouter>
            <EntityDetail router={routerMock} {...actionsMock} intl={IntlStub} detailParams={detailParams} />
          </MemoryRouter>
        )

        expect(screen.queryByTestId('entity-detail')).to.exist
      })

      test('should fire state change event for detail', () => {
        const fireStateChangeEvent = sinon.spy()

        testingLibrary.renderWithIntl(
          <MemoryRouter>
            <EntityDetail
              router={routerMock}
              {...actionsMock}
              fireStateChangeEvent={fireStateChangeEvent}
              intl={IntlStub}
              detailParams={detailParams}
            />
          </MemoryRouter>
        )

        expect(fireStateChangeEvent).to.have.been.calledWith([States.detail])
      })
    })
  })
})
