import {mount} from 'enzyme'

import ModalContent from './ModalContent'

describe('app-extensions', () => {
  describe('notification', () => {
    describe('modules', () => {
      describe('modalComponents', () => {
        describe('ModalContent', () => {
          test('should render component with close function', () => {
            const closeSpy = sinon.spy()
            const id = Date.now()
            const component = () => (
              <div>
                TEST<button onClick={() => closeSpy()}>close</button>
              </div>
            )
            const wrapper = mount(<ModalContent id={id} component={component} onClose={closeSpy} />)
            expect(wrapper.find(component)).to.have.length(1)
            wrapper.find('button').simulate('click')
            expect(closeSpy).to.have.been.calledOnce
          })

          test('should invoke cancel callback on close button', () => {
            const closeSpy = sinon.spy()
            const cancelSpy = sinon.spy()
            const id = Date.now()
            const component = () => <div>TEST</div>
            const wrapper = mount(
              <ModalContent id={id} component={component} onClose={closeSpy} cancelable onCancel={cancelSpy} />
            )
            expect(wrapper.find(component)).to.have.length(1)
            wrapper.find('button').simulate('click')
            expect(cancelSpy).to.have.been.calledOnce
          })
        })
      })
    })
  })
})
