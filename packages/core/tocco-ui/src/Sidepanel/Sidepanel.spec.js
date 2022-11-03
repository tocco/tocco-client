import {screen, fireEvent} from '@testing-library/react'
import {testingLibrary} from 'tocco-test-util'

import {SidepanelContainer, Sidepanel, SidepanelHeader, SidepanelMainContent} from './'

const TestSidepanel = props => (
  <SidepanelContainer {...props}>
    <Sidepanel>
      <SidepanelHeader>
        <div data-testid="header">Header</div>
      </SidepanelHeader>
      <div data-testid="sidepanel">Sidepanel</div>
    </Sidepanel>
    <SidepanelMainContent>
      <div data-testid="content">Content</div>
    </SidepanelMainContent>
  </SidepanelContainer>
)

describe('tocco-ui', () => {
  describe('Sidepanel', () => {
    test('should render sidepanel on left with collapse button', () => {
      const sidepanelPosition = 'left'
      const setSidepanelCollapsed = sinon.spy()

      testingLibrary.renderWithIntl(
        <TestSidepanel sidepanelPosition={sidepanelPosition} setSidepanelCollapsed={setSidepanelCollapsed} />
      )

      expect(screen.queryAllByRole('button')).to.have.length(1)
      expect(screen.queryByTestId('header')).to.exist
      expect(screen.queryByTestId('sidepanel')).to.exist
      expect(screen.queryByTestId('content')).to.exist
    })

    test('should render sidepanel on top with no collapse button', () => {
      const sidepanelPosition = 'top'
      const setSidepanelCollapsed = sinon.spy()

      testingLibrary.renderWithIntl(
        <TestSidepanel sidepanelPosition={sidepanelPosition} setSidepanelCollapsed={setSidepanelCollapsed} />
      )

      expect(screen.queryAllByRole('button')).to.have.length(0)
      expect(screen.queryByTestId('header')).to.not.exist
      expect(screen.queryByTestId('sidepanel')).to.exist
      expect(screen.queryByTestId('content')).to.exist
    })

    test('should collapse sidepanel on left', () => {
      const sidepanelPosition = 'left'
      const setSidepanelCollapsed = sinon.spy()

      testingLibrary.renderWithIntl(
        <TestSidepanel sidepanelPosition={sidepanelPosition} setSidepanelCollapsed={setSidepanelCollapsed} />
      )

      fireEvent.click(screen.getByRole('button'))

      expect(setSidepanelCollapsed).to.have.been.calledWith(true)
    })

    test('should expand sidepanel on left', () => {
      const sidepanelPosition = 'left'
      const setSidepanelCollapsed = sinon.spy()

      testingLibrary.renderWithIntl(
        <TestSidepanel
          sidepanelPosition={sidepanelPosition}
          sidepanelCollapsed
          setSidepanelCollapsed={setSidepanelCollapsed}
        />
      )

      fireEvent.click(screen.getByRole('button'))

      expect(setSidepanelCollapsed).to.have.been.calledWith(false)
    })
  })
})
