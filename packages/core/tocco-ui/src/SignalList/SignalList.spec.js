import {screen, render} from '@testing-library/react'

import SignalList from './'

describe('tocco-ui', () => {
  describe('SignalList', () => {
    test('should render children', () => {
      render(
        <SignalList.List>
          <span>SpanItem</span>
          <span>SpanItem</span>
        </SignalList.List>
      )
      expect(screen.queryAllByText('SpanItem')).to.have.length(2)
    })
  })
})
