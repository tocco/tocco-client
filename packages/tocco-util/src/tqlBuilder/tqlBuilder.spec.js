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

            const expectedResult = 'firstname ~= "*Homer*"'
            const result = getTql(path, value, fieldType)

            expect(result).to.deep.eql(expectedResult)
          })

          test('should use IN for multi-select type fields', () => {
            const value = [{key: '1'}, {key: '2'}]
            const path = 'relGender'
            const fieldType = 'multi-select-box'

            const expectedResult = 'KEYS("relGender",1,2)'
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
            const value = '2021-06-15T09:12:00.000Z'
            const path = 'start'
            const fieldType = 'datetime'
            const expectedValue = moment(value).utc().format('YYYY-MM-DD HH:mm')

            const expectedResult = `start == datetime:"${expectedValue}"`
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

          test('should set time literal for time', () => {
            const value = '13:32'
            const path = 'time_limit'
            const fieldType = 'time'

            const expectedResult = 'time_limit == time:"13:32:00.000"'
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

            const expectedResult = 'fulltext("(Test) OR (Test*)")'
            const result = getTql(path, value, fieldType)

            expect(result).to.deep.eql(expectedResult)
          })

          test('should handle fulltext fields of relations', () => {
            const value = 'Test'
            const path = 'relAddress'
            const fieldType = 'fulltext-search'

            const expectedResult = 'fulltext("(Test) OR (Test*)", relAddress)'
            const result = getTql(path, value, fieldType)

            expect(result).to.deep.eql(expectedResult)
          })

          test('should handle boolean with true value', () => {
            const value = true
            const path = 'active'
            const fieldType = 'boolean'

            const expectedResult = 'active == true'
            const result = getTql(path, value, fieldType)

            expect(result).to.deep.eql(expectedResult)
          })

          test('should return null for false boolean value', () => {
            const value = false
            const path = 'active'
            const fieldType = 'boolean'

            const result = getTql(path, value, fieldType)

            expect(result).to.be.null
          })

          test('should handle unknown form types and use fallback', () => {
            expect(getTql('relXY', {key: '23'})).to.deep.eql('relXY.pk == 23')
            expect(getTql('relXY', [{key: '23'}])).to.deep.eql('KEYS("relXY",23)')
            expect(getTql('asd', 'test')).to.deep.eql('asd ~= "*test*"')
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

          test('should not handle falsy range values expect of 0', () => {
            const numberRange = getTql('age', {isRangeValue: true, from: '', to: null}, 'number')
            expect(numberRange).to.eql('')

            const numberRange2 = getTql('age', {isRangeValue: true, from: 0, to: undefined}, 'number')
            expect(numberRange2).to.eql('age >= 0')
          })

          test('should adapt date value to datetime range', () => {
            const value = '2021-06-16'
            const tql = getTql('date_from', value, 'datetime')

            const expectedFrom = moment(value).utc().format('YYYY-MM-DD HH:mm')
            const expectedTo = moment(value).utc().add(1, 'd').format('YYYY-MM-DD HH:mm')

            const expected = `date_from >= datetime:"${expectedFrom}" and date_from < datetime:"${expectedTo}"`
            expect(tql).to.eql(expected)
          })

          test('should not adapt datetime value to range', () => {
            const value = '2020-04-29 00:00'
            const tql = getTql('datefield', value, 'datetime')
            const expectedValue = moment(value).utc().format('YYYY-MM-DD HH:mm')
            const expected = 'datefield == datetime:"' + expectedValue + '"'
            expect(tql).to.eql(expected)
          })

          test('should not adapt empty to datetime range', () => {
            const tql = getTql('datefield', '', 'datetime')
            expect(tql).to.be.null
          })

          test('should handle checked marking field', () => {
            const tql = getTql('relMark', true, 'marking')
            expect(tql).to.eql('exists(relMark)')
          })

          test('should handle unchecked marking field', () => {
            const tql = getTql('relMark', false, 'marking')
            expect(tql).to.be.null
          })
        })
      })
    })
  })
})
