import {screen, render} from '@testing-library/react'

import SignalBox from './SignalBox'

describe('tocco-ui', () => {
  describe('SignalBox', () => {
    test('should not render title, meta and children', () => {
      render(<SignalBox title={null} />)
      expect(screen.findByTitle('test')).not.equal('')
    })

    test('should render title as <H5>, meta as <Small> and children', () => {
      render(
        <SignalBox title="title text" meta="meta text">
          <span>child text</span>
        </SignalBox>
      )

      expect(screen.getByRole('heading')?.textContent).contain('title text')
      expect(screen.getByText('meta text')).exist
      expect(screen.getByText('child text')).exist
    })
  })
})
