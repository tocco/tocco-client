import {screen, render} from '@testing-library/react'

import SignalList from './'

describe('tocco-ui', () => {
  describe('SignalListItem', () => {
    test('should have 1 defaultProps', () => {
      render(<SignalList.Item label="Lorem ipsum" />)

      const listItems = screen.getAllByRole('listitem')

      expect(listItems).to.have.length(1)
      expect(screen.getByText('Lorem ipsum')).exist
    })

    test('should render label, icon and children', () => {
      render(
        <SignalList.Item label="Lorem ipsum">
          <span>spanText</span>
          <span>spanText</span>
        </SignalList.Item>
      )

      const listItems = screen.getAllByRole('listitem')
      const spanItems = screen.getAllByText('spanText')

      expect(listItems).to.have.length(1)
      expect(spanItems).to.have.length(2)
      expect(screen.getByText('Lorem ipsum')).exist
    })
  })
})
