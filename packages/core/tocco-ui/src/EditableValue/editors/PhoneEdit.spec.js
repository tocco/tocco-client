import {mount} from 'enzyme'

import PhoneEdit from './PhoneEdit'

describe('tocco-ui', () => {
  describe('EditableValue', () => {
    describe('editors', () => {
      describe('PhoneEdit ', () => {
        test('should call on change with phone number in e.164 format', done => {
          const onChangeSpy = sinon.spy()

          const executeChange = () => {
            wrapper.find('input').simulate('change', {target: {value: '0793456789'}})
            expect(onChangeSpy).to.have.been.calledWith('+41793456789')
            done()
          }

          const wrapper = mount(<PhoneEdit value="0792345678" onChange={onChangeSpy} onLibLoaded={executeChange} />)
        })
      })
    })
  })
})
