import {fireEvent, screen} from '@testing-library/react'
import {testingLibrary} from 'tocco-test-util'

import SubGrid from './SubGrid'

/* eslint-disable react/prop-types */
jest.mock('tocco-entity-list/src/main', () => props => (
  <div data-testid="entity-list">
    <div>entityName: {props.entityName}</div>
    <div>formName: {props.formName}</div>
    <div>limit: {props.limit}</div>

    <button
      onClick={() => {
        props.onRowClick({id: 'testId'})
      }}
    >
      row click
    </button>
  </div>
))
/* eslint-enable react/prop-types */

describe('entity-detail', () => {
  describe('components', () => {
    describe('SubGrid', () => {
      const testProps = {
        detailFormName: 'User',
        formField: {
          path: 'relFoo',
          targetEntity: 'Foo'
        },
        navigateToCreate: () => {},
        showSubGridsCreateButton: false,
        dispatchEmittedAction: () => {},
        entityName: 'User',
        emitAction: () => {}
      }

      test('should render', () => {
        testingLibrary.renderWithIntl(<SubGrid {...testProps} />)
        expect(screen.getByTestId('entity-list')).to.exist
      })

      test('should render with entityName', () => {
        testingLibrary.renderWithIntl(<SubGrid {...testProps} />)

        expect(screen.getByTestId('entity-list')).to.exist
        expect(screen.getByText('entityName: Foo')).to.exist
      })

      test('should render with formName', () => {
        testingLibrary.renderWithIntl(<SubGrid {...testProps} />)

        expect(screen.getByTestId('entity-list')).to.exist
        expect(screen.getByText('formName: User_relFoo')).to.exist
      })

      test('should render with default limit 5', () => {
        testingLibrary.renderWithIntl(<SubGrid {...testProps} />)

        expect(screen.getByTestId('entity-list')).to.exist
        expect(screen.getByText('limit: 5')).to.exist
      })

      test('should render with custom limit', () => {
        testingLibrary.renderWithIntl(<SubGrid {...testProps} limit={10} />)

        expect(screen.getByTestId('entity-list')).to.exist
        expect(screen.getByText('limit: 10')).to.exist
      })

      test('should render with rowClick', () => {
        const rowClickSpy = sinon.spy()
        testingLibrary.renderWithIntl(<SubGrid {...testProps} onRowClick={rowClickSpy} />)

        const buttonElement = screen.getByRole('button')
        fireEvent.click(buttonElement)

        expect(screen.getByTestId('entity-list')).to.exist
        expect(rowClickSpy).to.have.been.calledWith({
          id: 'testId',
          gridName: 'relFoo',
          relationName: 'relFoo'
        })
      })
    })
  })
})
