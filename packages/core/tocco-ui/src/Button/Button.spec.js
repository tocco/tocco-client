import {screen, fireEvent, waitFor} from '@testing-library/react'
import {MemoryRouter} from 'react-router'
import {testingLibrary} from 'tocco-test-util'

import Button from './Button'
import RouterLinkButton from './RouterLinkButton'

describe('tocco-ui', () => {
  describe('Button', () => {
    test('should handle click events', () => {
      const onButtonClick = sinon.spy()
      testingLibrary.renderWithIntl(<Button onClick={onButtonClick} />)
      fireEvent.click(screen.getByRole('button'))
      expect(onButtonClick).to.have.been.calledOnce
    })

    test('should show label', () => {
      testingLibrary.renderWithIntl(<Button label="test" />)
      expect(screen.getByText('test')).exist
    })

    test('should show children if no label is provided', () => {
      const child = 'test123'
      testingLibrary.renderWithIntl(<Button>{child}</Button>)
      expect(screen.getByText(child)).exist
    })

    test('should not be disabled initially', () => {
      testingLibrary.renderWithIntl(<Button />)
      jestExpect(screen.getByRole('button')).not.toBeDisabled()
    })

    test('should apply disabled attribute with value', () => {
      testingLibrary.renderWithIntl(<Button disabled={false} />)
      jestExpect(screen.getByRole('button')).not.toBeDisabled()
    })

    test('should apply disabled attribute', () => {
      testingLibrary.renderWithIntl(<Button disabled />)
      jestExpect(screen.getByRole('button')).toBeDisabled()
    })

    test('should not show pending spinner if pending is not set', async () => {
      testingLibrary.renderWithIntl(<Button />)
      const pendingIcon = await waitFor(() => screen.queryByTestId('icon-circle-notch'))
      expect(pendingIcon).to.not.exist
    })

    test('should not show pending spinner if pending is set to false', async () => {
      testingLibrary.renderWithIntl(<Button pending={false} />)
      const pendingIcon = await waitFor(() => screen.queryByTestId('icon-circle-notch'))
      expect(pendingIcon).to.not.exist
    })

    test('should show pending spinner if pending is set', async () => {
      testingLibrary.renderWithIntl(<Button pending />)
      const pendingIcon = await waitFor(() => screen.getByTestId('icon-circle-notch'))
      expect(pendingIcon).to.exist
    })

    test('should show icon', async () => {
      testingLibrary.renderWithIntl(<Button icon="cog" />)
      const cogIcon = await waitFor(() => screen.getByTestId('icon-cog'))
      expect(cogIcon).to.exist
    })

    test('should set default type to button', () => {
      testingLibrary.renderWithIntl(<Button />)
      expect(screen.getByRole('button').getAttribute('type')).match(/button/)
    })

    test('should set type', () => {
      testingLibrary.renderWithIntl(<Button type="submit" />)
      expect(screen.getByRole('button').getAttribute('type')).match(/submit/)
    })

    describe('RouterLinkButton', () => {
      test('should show label', () => {
        testingLibrary.renderWithIntl(
          <MemoryRouter>
            <RouterLinkButton label="test" />
          </MemoryRouter>
        )
        screen.getByRole('link', {name: 'test'})
      })

      test('should show children if no label is provided', () => {
        const child = 'test123'

        testingLibrary.renderWithIntl(
          <MemoryRouter>
            <RouterLinkButton>{child}</RouterLinkButton>
          </MemoryRouter>
        )
        expect(screen.getByText(child)).exist
      })

      test('should show icon', async () => {
        testingLibrary.renderWithIntl(
          <MemoryRouter>
            <RouterLinkButton icon="cog" />
          </MemoryRouter>
        )

        const cogIcon = await waitFor(() => screen.getByTestId('icon-cog'))
        expect(cogIcon).to.exist
      })
    })
  })
})
