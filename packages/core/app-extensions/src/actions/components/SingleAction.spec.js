import {screen, fireEvent} from '@testing-library/react'
import {IntlStub, testingLibrary} from 'tocco-test-util'

import {SingleAction} from './SingleAction'

describe('app-extensions', () => {
  describe('actions', () => {
    describe('components', () => {
      describe('SingleAction', () => {
        test('should invoke onclick and stop propagation', () => {
          const definition = {}
          const clickSpy = sinon.spy()

          testingLibrary.renderWithIntl(<SingleAction definition={definition} onClick={clickSpy} intl={IntlStub} />)

          fireEvent.click(screen.getByRole('button'))

          expect(clickSpy).to.have.property('callCount', 1)
        })
      })
    })
  })
})
