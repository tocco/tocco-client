import {screen, fireEvent} from '@testing-library/react'
import {testingLibrary} from 'tocco-test-util'

import EntitiesResult from './EntitiesResult'

const dummyNavigationStrategy = {
  DetailLink: () => null,
  /* eslint-disable react/prop-types */
  ListOrDetailLink: ({entityName, entityKeys}) => (
    <div>
      <span data-testid="entityName">{entityName}</span>
      <span data-testid="entityKeys">{entityKeys.join(',')}</span>
    </div>
  )
  /* eslint-enable react/prop-types */
}

describe('app-extensions', () => {
  describe('notification', () => {
    describe('components', () => {
      describe('NotificationBody', () => {
        describe('results', () => {
          describe('EntitiesResult', () => {
            test('should group created entities by model', () => {
              const notification = {
                result: {
                  type: 'ENTITIES',
                  content: [
                    {
                      key: 1,
                      model: 'Todo',
                      modelName: 'Aufgabe'
                    },
                    {
                      key: 2,
                      model: 'Todo',
                      modelName: 'Aufgabe'
                    },
                    {
                      key: 10,
                      model: 'User',
                      modelName: 'Person'
                    },
                    {
                      key: 3,
                      model: 'Todo',
                      modelName: 'Aufgabe'
                    },
                    {
                      key: 11,
                      model: 'User',
                      modelName: 'Person'
                    }
                  ]
                }
              }

              testingLibrary.renderWithIntl(
                <EntitiesResult notification={notification} navigationStrategy={dummyNavigationStrategy} />
              )

              expect(screen.queryByText('Todo')).to.exist
              expect(screen.queryByText('1,2,3')).to.exist
              expect(screen.queryByText('User')).to.exist
              expect(screen.queryByText('10,11')).to.exist
            })

            test('should show tooltip for too many records', () => {
              const notification = {
                result: {
                  type: 'ENTITIES',
                  content: [...Array(120).keys()].map(key => ({
                    key,
                    model: 'Todo',
                    modelName: 'Aufgabe'
                  }))
                }
              }

              testingLibrary.renderWithIntl(
                <EntitiesResult notification={notification} navigationStrategy={dummyNavigationStrategy} />
              )

              fireEvent.mouseEnter(screen.getByText('Todo'))

              expect(screen.queryByText('client.common.notification.tooManyRecords')).to.exist
            })

            test('should only create link for first 100 records', () => {
              const content = [...Array(120).keys()].map(key => ({
                key,
                model: 'Todo',
                modelName: 'Aufgabe'
              }))

              const notification = {
                result: {
                  type: 'ENTITIES',
                  content
                }
              }

              testingLibrary.renderWithIntl(
                <EntitiesResult notification={notification} navigationStrategy={dummyNavigationStrategy} />
              )

              fireEvent.mouseEnter(screen.getByText('Todo'))

              const expectedKeys = content
                .slice(0, 100)
                .map(record => record.key)
                .join(',')
              expect(screen.queryByText(expectedKeys)).to.exist
            })
          })
        })
      })
    })
  })
})
