import _get from 'lodash/get'
import {IntlStub} from 'tocco-test-util'

import {getGroupedValues, getFormDefinition, transformValues} from './report'
describe('app-extensions', () => {
  describe('actions', () => {
    describe('utils', () => {
      describe('report', () => {
        describe('getGroupedValues', () => {
          test('should return values by group name', () => {
            const settingsDefinition = {generalSettings: [{id: 'a'}, {id: 'c'}], customSettings: [{id: 'b'}]}
            const values = {a: 1, b: 2, c: 3}

            const result = getGroupedValues(settingsDefinition, values)
            expect(result).to.eql({generalSettings: {a: 1, c: 3}, recipientSettings: {}})
          })

          test('should handle a empty group', () => {
            const settingsDefinition = {generalSettings: null}
            const values = {a: 1}

            const result = getGroupedValues(settingsDefinition, values)
            expect(result).to.eql({generalSettings: {}, recipientSettings: {}})
          })
        })

        describe('getFormDefinition', () => {
          test('should return a form definition with the fields wrapped by a vertical box', () => {
            const settingsDefinition = {
              generalSettings: [
                {id: 'someString', type: 'string', label: 'Some String'}
              ],
              recipientSettings: [
                {id: 'someInt', type: 'integer', label: 'Some Int'}
              ]
            }

            const formDefinition = getFormDefinition(settingsDefinition, IntlStub)

            expect(formDefinition).to.have.property('componentType', 'form')
            expect(_get(formDefinition, 'children[0].layoutType')).to.eql('vertical-box')
            expect(_get(formDefinition, 'children[0].children[0].label')).to.eql('Some String')
            expect(_get(formDefinition, 'children[1].children[0].label')).to.eql('Some Int')
          })
        })

        describe('transformValues', () => {
          test('should transform select/remote fields to key only and copy others', () => {
            const values = {
              recipient1: {key: '1', display: 'User1'},
              recipient2: [{key: '1', display: 'User1'}, {key: '33', display: 'User33'}],
              someString: 'test'
            }

            const transformedValues = transformValues(values)

            const expectedResult = {
              recipient1: '1',
              recipient2: ['1', '33'],
              someString: 'test'
            }

            expect(transformedValues).to.eql(expectedResult)
          })
        })
      })
    })
  })
})
