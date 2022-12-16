import {fireEvent, screen} from '@testing-library/react'
import {testingLibrary} from 'tocco-test-util'

import Action from './Action'

const EMPTY_FUNC = () => {}

describe('app-extensions', () => {
  describe('actions', () => {
    describe('components', () => {
      const baseProps = {onClick: EMPTY_FUNC, selection: {entityName: 'User', type: 'ID', ids: []}}
      describe('Action', () => {
        describe('render based on modes', () => {
          const definition = {
            componentType: 'action',
            actionType: 'simple',
            id: 'test'
          }

          test('should return action if mode fits', () => {
            testingLibrary.renderWithIntl(
              <Action {...baseProps} definition={{...definition, scopes: ['update']}} mode="update" />
            )
            expect(screen.queryByRole('button')).to.exist
          })

          test('should return null for if mode does not fit scopes', () => {
            testingLibrary.renderWithIntl(
              <Action {...baseProps} definition={{...definition, scopes: ['update']}} mode="create" />
            )
            expect(screen.queryByRole('button')).to.not.exist
          })

          test('should return action if mode and scope is not set explicitly', () => {
            testingLibrary.renderWithIntl(<Action {...baseProps} definition={{...definition}} />)
            expect(screen.queryByRole('button')).to.exist
          })

          test('should return action if mode is not set explicitly', () => {
            testingLibrary.renderWithIntl(<Action {...baseProps} definition={{...definition, scopes: ['update']}} />)
            expect(screen.queryByRole('button')).to.exist
          })

          test('should return action if scope is not set explicitly', () => {
            testingLibrary.renderWithIntl(<Action {...baseProps} definition={{...definition}} mode="update" />)
            expect(screen.queryByRole('button')).to.exist
          })
        })

        test('should render action group', () => {
          const definition = {
            componentType: 'action-group',
            label: 'Action Group',
            children: [
              {
                componentType: 'action',
                actionType: 'SIMPLE'
              }
            ]
          }

          testingLibrary.renderWithIntl(<Action {...baseProps} definition={definition} />)

          expect(screen.queryByRole('button', {name: 'Action Group'})).to.exist
        })

        test('should render groups with default action', () => {
          const definition = {
            componentType: 'action-group',
            label: 'Action Group',
            defaultAction: {
              componentType: 'action',
              actionType: 'simple',
              label: 'Main Action',
              id: 'main-action'
            },
            children: [
              {
                componentType: 'action',
                actionType: 'simple'
              }
            ]
          }
          const onClickHandler = sinon.spy()

          testingLibrary.renderWithIntl(<Action {...baseProps} onClick={onClickHandler} definition={definition} />)

          const defaultActionButton = screen.queryByRole('button', {name: 'Main Action'})
          fireEvent.click(defaultActionButton, {})

          expect(onClickHandler).to.have.been.calledWith({
            componentType: 'action',
            actionType: 'simple',
            id: 'main-action'
          })
        })

        test('should render an array of actions if wrapped inside an action-bar', () => {
          const definition = {
            componentType: 'action-bar',
            children: [
              {
                componentType: 'action',
                actionType: 'simple',
                label: 'Action 1'
              },
              {
                componentType: 'action',
                actionType: 'simple',
                label: 'Action 2'
              },
              {
                componentType: 'action-group',
                label: 'Action Group',
                defaultAction: {
                  componentType: 'action',
                  actionType: 'simple',
                  label: 'Action 3'
                },
                children: [
                  {
                    componentType: 'action',
                    actionType: 'simple',
                    label: 'Action 4'
                  }
                ]
              }
            ]
          }

          testingLibrary.renderWithIntl(<Action {...baseProps} definition={definition} />)

          expect(screen.queryByRole('button', {name: 'Action 1'})).to.exist
          expect(screen.queryByRole('button', {name: 'Action 2'})).to.exist
          expect(screen.queryByRole('button', {name: 'Action 3'})).to.exist
        })

        test('should render custom actions if provided', () => {
          const definition = {
            id: 'save',
            label: 'Speichern',
            componentType: 'action',
            children: [],
            actionType: 'custom',
            icon: null,
            minSelection: null,
            maxSelection: null,
            showConfirmMessage: false,
            confirmationMessageText: null,
            runInBackgroundTask: false,
            formDataEntityModel: null,
            formDataTitle: null,
            formDataMessage: null,
            endpoint: null,
            appId: null
          }
          const SaveButton = () => <button data-testid="custom-action">Save</button>
          const customActions = {
            save: () => <SaveButton />
          }

          testingLibrary.renderWithIntl(
            <Action {...baseProps} customRenderedActions={customActions} definition={definition} />
          )
          expect(screen.queryByTestId('custom-action')).to.exist
        })
      })
    })
  })
})
