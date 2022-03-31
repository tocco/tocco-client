import {shallow} from 'enzyme'

import Select from '../../Select'
import BooleanSingleSelect from './BooleanSingleSelect'

describe('tocco-ui', () => {
  describe('EditableValue', () => {
    describe('typeEditors', () => {
      describe('BooleanSingleSelect ', () => {
        test('should render a Select component', () => {
          const wrapper = shallow(
            <BooleanSingleSelect
              value={true}
              onChange={() => {}}
              options={{
                trueLabel: 'true',
                falseLabel: 'false'
              }}
            />
          )
          expect(wrapper.find(Select)).to.have.length(1)
          const select = wrapper.find(Select)
          expect(select.props().options).to.eql([
            {key: true, display: 'true'},
            {key: false, display: 'false'}
          ])
          expect(select.props().value.key).to.be.true
        })
      })
    })
  })
})
