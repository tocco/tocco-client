import moment from 'moment'

import {getTql} from './tqlBuilder'

describe('entity-list', () => {
  describe('util', () => {
    describe('api', () => {
      describe('tqlBuilder', () => {
        describe('getTql', () => {
          test('should return null if value is undefined', () => {
            const value = undefined
            const path = 'firstname'
            const fieldType = 'string'

            const result = getTql(path, value, fieldType)

            expect(result).to.be.null
          })

          test('should wrap string type in quotes', () => {
            const value = 'Homer'
            const path = 'firstname'
            const fieldType = 'string'

            const expectedResult = 'firstname == "Homer"'
            const result = getTql(path, value, fieldType)

            expect(result).to.deep.eql(expectedResult)
          })

          test('should use IN for multi-select type fields', () => {
            const value = [{key: '1'}, {key: '2'}]
            const path = 'relGender'
            const fieldType = 'multi-select-box'

            const expectedResult = 'IN(relGender.pk,1,2)'
            const result = getTql(path, value, fieldType)

            expect(result).to.deep.eql(expectedResult)
          })

          test('should use compare key for single-select type fields', () => {
            const value = {key: '33'}
            const path = 'relNationality'
            const fieldType = 'single-remote-field'

            const expectedResult = 'relNationality.pk == 33'
            const result = getTql(path, value, fieldType)

            expect(result).to.deep.eql(expectedResult)
          })

          test('should set datetime literal for datetimes', () => {
            const value = '2020-02-12T12:00:00.000Z'
            const path = 'start'
            const fieldType = 'datetime'

            const expectedResult = `start == datetime:"${moment(value).format('YYYY-MM-DD HH:mm')}"`
            const result = getTql(path, value, fieldType)

            expect(result).to.deep.eql(expectedResult)
          })

          test('should set date literal for dates', () => {
            const value = '2020-01-28'
            const path = 'birthdate'
            const fieldType = 'birthdate'

            const expectedResult = 'birthdate == date:"2020-01-28"'
            const result = getTql(path, value, fieldType)

            expect(result).to.deep.eql(expectedResult)
          })

          test('should compare any other types as raw value', () => {
            const value = 33
            const path = 'amount'
            const fieldType = 'number'

            const expectedResult = 'amount == 33'
            const result = getTql(path, value, fieldType)

            expect(result).to.deep.eql(expectedResult)
          })

          test('should handle fulltext fields', () => {
            const value = 'Test'
            const path = 'txtFulltext'
            const fieldType = 'fulltext-search'

            const expectedResult = 'fulltext("Test") or fulltext("Test*")'
            const result = getTql(path, value, fieldType)

            expect(result).to.deep.eql(expectedResult)
          })

          test('should handle fulltext fields of relations', () => {
            const value = 'Test'
            const path = 'relAddress'
            const fieldType = 'fulltext-search'

            const expectedResult = 'fulltext("Test", relAddress) or fulltext("Test*", relAddress)'
            const result = getTql(path, value, fieldType)

            expect(result).to.deep.eql(expectedResult)
          })

          test('should handle unknown form types and use fallback', () => {
            expect(getTql('relXY', {key: '23'})).to.deep.eql('relXY.pk == 23')
            expect(getTql('relXY', [{key: '23'}])).to.deep.eql('IN(relXY.pk,23)')
            expect(getTql('asd', 'test')).to.deep.eql('asd == "test"')
          })

          test('should handle range values', () => {
            const numberRange = getTql('age', {isRangeValue: true, from: 4, to: 20}, 'number')
            expect(numberRange).to.deep.eql('age >= 4 and age <= 20')

            const dateRange = getTql(
              'birthdate',
              {isRangeValue: true, from: '1988-01-01', to: '1988-12-31'},
              'birthdate'
            )
            expect(dateRange).to.deep.eql('birthdate >= date:"1988-01-01" and birthdate <= date:"1988-12-31"')
          })

          test('should handle one sided range values', () => {
            const numberRange = getTql('age', {isRangeValue: true, to: 20}, 'number')
            expect(numberRange).to.deep.eql('age <= 20')

            const dateRange = getTql('birthdate', {isRangeValue: true, from: '1988-01-01', to: null}, 'birthdate')
            expect(dateRange).to.deep.eql('birthdate >= date:"1988-01-01"')
          })
        })
      })
    })
  })
})
