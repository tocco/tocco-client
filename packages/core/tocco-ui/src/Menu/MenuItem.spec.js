import {screen, render, fireEvent} from '@testing-library/react'

import MenuItem from './MenuItem'

describe('tocco-ui', () => {
  describe('Menu', () => {
    describe('MenuItem', () => {
      test('should handle clicks', () => {
        const onClick1 = sinon.spy()
        const onClick12 = sinon.spy()

        render(
          <MenuItem onClick={onClick1}>
            Group 1<MenuItem>Group 1 - 1</MenuItem>
            <MenuItem onClick={onClick12} id="g-1-2">
              Group 1 - 2
            </MenuItem>
          </MenuItem>
        )
        fireEvent.click(screen.getByText('Group 1 - 2'))
        expect(onClick12).to.be.calledOnce
        expect(onClick1).to.not.be.calledOnce
      })

      test('should close on click', () => {
        const onClose = sinon.spy()
        const onClick1 = sinon.spy()

        render(
          <MenuItem onClose={onClose} onClick={() => {}}>
            Group 1<MenuItem>Group 1 - 1</MenuItem>
            <MenuItem onClick={onClick1} id="g-1-2">
              Group 1 - 2
            </MenuItem>
          </MenuItem>
        )
        fireEvent.click(screen.getByText('Group 1 - 2'))
        expect(onClose).to.be.calledOnce
      })

      test('should not close on click if set to false', () => {
        const onClose = sinon.spy()
        const onClick1 = sinon.spy()

        render(
          <MenuItem closeOnClick={false} onClose={onClose} onClick={() => {}}>
            Group 1<MenuItem>Group 1 - 1</MenuItem>
            <MenuItem onClick={onClick1} id="g-1-2">
              Group 1 - 2
            </MenuItem>
          </MenuItem>
        )
        fireEvent.click(screen.getByText('Group 1 - 2'))
        expect(onClose).to.not.be.calledOnce
      })
    })
  })
})
