import {EditableValue} from 'tocco-ui'
import {mount} from 'enzyme'

import editableValueFactory from './editableValueFactory'

describe('app-extensions', () => {
  describe('formField', () => {
    describe('editableValueFactory', () => {
      test('should return simple editableValue', () => {
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

      test('should return an advanced editableValue', () => {
        const factory = editableValueFactory('remote')

        const util = {
          intl: {
            formatMessage: v => (v.id)
          }
        }

        const editableValue = factory({}, {}, {}, {}, util)

        const wrapper = mount(editableValue)

        expect(wrapper).to.have.type(EditableValue)
        expect(wrapper.props.options).to.not.be.null

        const options = wrapper.prop('options')

        expect(options.isLoading).to.be.false
        expect(options.searchPromptText).to.eql('client.component.remoteselect.searchPromptText')
      })

      test('should merge events', () => {
        const factory = editableValueFactory('single-select')

        const focusSpy = sinon.spy()
        const events = {
          onFocus: focusSpy
        }

        const loadUtilSpy = sinon.spy()
        const util = {
          loadRelationEntities: loadUtilSpy,
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

      test('should load search filters', () => {
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
      test('should should format message to hours and minutes label', () => {
        const factory = editableValueFactory('duration')
        const util = {
          intl: {
            formatMessage: v => (v.id)
          }
        }

        const editableValue = factory({}, {}, {}, {}, util)

        const wrapper = mount(editableValue)

        const options = wrapper.prop('options')

        expect(wrapper).to.have.type(EditableValue)
        expect(options.hoursLabel).to.eql('client.component.duration.hoursLabel')
        expect(options.minutesLabel).to.eql('client.component.duration.minutesLabel')
      })
    })
  })
})
