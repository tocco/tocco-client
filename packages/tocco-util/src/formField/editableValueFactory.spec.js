import editableValueFactory from './editableValueFactory'
import {EditableValue} from 'tocco-ui'
import {mount} from 'enzyme'

describe('tocco-util', () => {
  describe('fomField', () => {
    describe('editableValueFactory', () => {
      it('should return simple editableValue', () => {
        const factory = editableValueFactory('string')

        const props = {
          value: 'test'
        }

        const events = {
          onClick: () => {
          }
        }

        const editableValue = factory({}, {}, props, events, {})

        const wrapper = mount(editableValue)

        expect(wrapper).to.have.type(EditableValue)
        expect(wrapper).to.have.prop('value', 'test')
        expect(wrapper).to.have.prop('events', events)
      })

      /*
        TODO: Fix to work with enzyme 3
      it('should return an advanced editableValue', () => {
        const factory = editableValueFactory('remote')

        const util = {
          intl: {
            formatMessage: v => (v.id)
          }
        }

        const editableValue = factory({}, {}, {}, {}, util)

        const wrapper = mount(editableValue)

        expect(wrapper).to.have.type(EditableValue)
        expect(wrapper).to.have.prop('options')

        const options = wrapper.prop('options')

        expect(options.isLoading).to.be.false
        expect(options.searchPromptText).to.eql('client.component.remoteselect.searchPromptText')
      })
      */

      it('should merge events', () => {
        const factory = editableValueFactory('remote')

        const focusSpy = sinon.spy()
        const events = {
          onFocus: focusSpy
        }

        const loadUtilSpy = sinon.spy()
        const util = {
          loadRemoteEntity: loadUtilSpy,
          intl: {
            formatMessage: v => (v.id)
          }
        }

        const editableValue = factory({}, {}, {}, events, util)

        const wrapper = mount(editableValue)

        wrapper.find('input').first().simulate('focus')

        expect(focusSpy).to.have.calledOnce
        expect(loadUtilSpy).to.have.calledOnce
      })

      it('should load search filters', () => {
        const factory = editableValueFactory('search-filter')

        const focusSpy = sinon.spy()
        const events = {
          onFocus: focusSpy
        }

        const loadSearchFiltersSpy = sinon.spy()
        const util = {
          loadSearchFilters: loadSearchFiltersSpy,
          intl: {
            formatMessage: v => (v.id)
          }
        }

        const props = {onChange: () => {}}
        const editableValue = factory({}, {}, props, events, util)

        const wrapper = mount(editableValue)

        wrapper.find('input').first().simulate('focus')

        expect(focusSpy).to.have.calledOnce
        expect(loadSearchFiltersSpy).to.have.calledOnce
      })
    })
  })
})
