import subGridFactory from './subGrid'
import {shallow} from 'enzyme'

describe('entity-browser', () => {
  describe('components', () => {
    describe('FormField', () => {
      describe('fieldTypeFactories', () => {
        describe('subGrid', () => {
          it('should return a component', () => {
            const factory = subGridFactory()
            const editableValue = factory({children: [], name: 'relFoo'}, {}, {}, {}, {})
            const wrapper = shallow(editableValue)
            expect(wrapper).to.not.be.blank()
          })
        })
      })
    })
  })
})
