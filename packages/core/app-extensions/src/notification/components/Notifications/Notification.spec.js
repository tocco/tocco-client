import {shallow} from 'enzyme'

import BlockingDisplay from '../../modules/blocking/BlockingDisplay'
import ModalDisplay from '../../modules/modal/ModalDisplay'
import ToasterDisplay from '../../modules/toaster/ToasterDisplay'
import Notification from './Notification'

describe('app-extensions', () => {
  describe('notifier', () => {
    describe('Components', () => {
      describe('Notifier', () => {
        test('should render toastr and modal ', () => {
          const wrapper = shallow(<Notification />)

          expect(wrapper.find(ModalDisplay)).to.have.length(1)
          expect(wrapper.find(ToasterDisplay)).to.have.length(1)
          expect(wrapper.find(BlockingDisplay)).to.have.length(1)
        })
      })
    })
  })
})
