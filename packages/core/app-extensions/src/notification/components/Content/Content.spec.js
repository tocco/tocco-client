import {screen} from '@testing-library/react'
import {testingLibrary} from 'tocco-test-util'

import Content from './Content'

describe('app-extensions', () => {
  describe('notification', () => {
    describe('Components', () => {
      describe('Content', () => {
        test('should render string content', () => {
          testingLibrary.renderWithIntl(<Content>Test</Content>)

          expect(screen.queryByText('Test')).to.exist
        })

        test('should render html content', () => {
          testingLibrary.renderWithIntl(<Content>{'<b data-testid="content">Test</b>'}</Content>)

          expect(screen.queryByTestId('content')).to.exist
          expect(screen.queryByText('Test')).to.exist
        })

        test('should render text resources', () => {
          testingLibrary.renderWithIntl(<Content>{'client.example.title'}</Content>, {
            intlMessages: {'client.example.title': 'Das ist ein Test'}
          })

          expect(screen.queryByText('Das ist ein Test')).to.exist
        })

        test('should render component content', () => {
          const Compo = () => <span data-testid="content">TEST</span>
          testingLibrary.renderWithIntl(
            <Content>
              <Compo />
            </Content>
          )

          expect(screen.queryByTestId('content')).to.exist
          expect(screen.queryByText('TEST')).to.exist
        })
      })
    })
  })
})
