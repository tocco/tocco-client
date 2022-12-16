import {screen, render, fireEvent} from '@testing-library/react'
import {TestThemeProvider} from 'tocco-test-util'

import Typography from '../Typography'
import Panel from './'

describe('tocco-ui', () => {
  describe('Panel', () => {
    describe('Panel', () => {
      test('should render a open panel by default', () => {
        render(
          <TestThemeProvider>
            <Panel.Wrapper>
              <Panel.Header>
                <Typography.H4>Title</Typography.H4>
              </Panel.Header>
              <Panel.Body>
                <Typography.Span>Body</Typography.Span>
              </Panel.Body>
            </Panel.Wrapper>
          </TestThemeProvider>
        )

        jestExpect(screen.getByText('Body')).toBeVisible()
      })

      test('should regard isOpenInitial prop for state', () => {
        render(
          <TestThemeProvider>
            <Panel.Wrapper isOpenInitial={false}>
              <Panel.Header>
                <Typography.H4>Title</Typography.H4>
              </Panel.Header>
              <Panel.Body>
                <Typography.Span>Body</Typography.Span>
              </Panel.Body>
            </Panel.Wrapper>
          </TestThemeProvider>
        )

        jestExpect(screen.getByText('Body')).not.toBeVisible()
      })

      test('should open and close on click', () => {
        render(
          <TestThemeProvider>
            <Panel.Wrapper>
              <Panel.Header>
                <Typography.H4>Title</Typography.H4>
              </Panel.Header>
              <Panel.Body>
                <Typography.Span>Body</Typography.Span>
              </Panel.Body>
            </Panel.Wrapper>
          </TestThemeProvider>
        )

        fireEvent.click(screen.getByRole('heading'))
        jestExpect(screen.getByText('Body')).not.toBeVisible()
        fireEvent.click(screen.getByRole('heading'))
        jestExpect(screen.getByText('Body')).toBeVisible()
      })

      test('should open and close on click', () => {
        const onToggleSpy = sinon.spy()

        render(
          <TestThemeProvider>
            <Panel.Wrapper controlledIsOpen={false} onToggle={onToggleSpy}>
              <Panel.Header>
                <Typography.H4>Title</Typography.H4>
              </Panel.Header>
              <Panel.Body>
                <Typography.Span>Body</Typography.Span>
              </Panel.Body>
            </Panel.Wrapper>
          </TestThemeProvider>
        )

        jestExpect(screen.getByText('Body')).not.toBeVisible()
        fireEvent.click(screen.getByRole('heading'))
        expect(onToggleSpy).to.have.been.calledWith(true)
      })
    })
  })
})
