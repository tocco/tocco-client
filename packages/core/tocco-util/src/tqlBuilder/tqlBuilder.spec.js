import {getTql} from './tqlBuilder'

describe('tocco-util', () => {
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

        const expectedFrom = '2021-06-14 22:00'
        const expectedTo = '2021-06-15 22:00'
        const expectedResult = `start >= datetime:"${expectedFrom}" and start < datetime:"${expectedTo}"`
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

      test('should escape double quotes on fulltext fields', () => {
        const value = '"Test Value"'
        const path = 'txtFulltext'
        const fieldType = 'fulltext-search'

        const expectedResult = 'fulltext("(\\"Test Value\\") OR (\\"Test Value\\"*)")'
        const result = getTql(path, value, fieldType)

        expect(result).to.deep.eql(expectedResult)
      })

      test('should escape backslashes on fulltext fields', () => {
        const value = 'Test \\ Value'
        const path = 'txtFulltext'
        const fieldType = 'fulltext-search'

        const expectedResult = 'fulltext("(Test \\\\ Value) OR (Test \\\\ Value*)")'
        const result = getTql(path, value, fieldType)

        expect(result).to.deep.eql(expectedResult)
      })

      test('should escape all in one on fulltext fields', () => {
        const value = '"Test \\ Value"'
        const path = 'txtFulltext'
        const fieldType = 'fulltext-search'

        const expectedResult = 'fulltext("(\\"Test \\\\ Value\\") OR (\\"Test \\\\ Value\\"*)")'
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

      test('should handle boolean with false value', () => {
        const value = false
        const path = 'active'
        const fieldType = 'boolean'

        const result = getTql(path, value, fieldType)

        const expectedResult = 'active == false'
        expect(result).to.deep.eql(expectedResult)
      })

      test('should handle unknown form types and use fallback', () => {
        expect(getTql('relXY', {key: '23'})).to.deep.eql('relXY.pk == 23')
        expect(getTql('relXY', [{key: '23'}])).to.deep.eql('KEYS("relXY",23)')
        expect(getTql('asd', 'test')).to.deep.eql('asd ~= "*test*"')
      })

      test('should handle range values', () => {
        const numberRange = getTql('age', {isRangeValue: true, from: 4, to: 20}, 'number')
        expect(numberRange).to.deep.eql('age >= 4 and age <= 20')

        const dateRange = getTql('birthdate', {isRangeValue: true, from: '1988-01-01', to: '1988-12-31'}, 'birthdate')
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

        const expectedFrom = '2021-06-15 22:00'
        const expectedTo = '2021-06-16 22:00'
        const expected = `date_from >= datetime:"${expectedFrom}" and date_from < datetime:"${expectedTo}"`
        expect(tql).to.eql(expected)
      })

      test('should adapt datetime value to datetime range for whole day', () => {
        const value = '2020-04-29T14:00:00.000+02:00'
        const tql = getTql('datefield', value, 'datetime')

        const expectedFrom = '2020-04-28 22:00'
        const expectedTo = '2020-04-29 22:00'
        const expected = `datefield >= datetime:"${expectedFrom}" and datefield < datetime:"${expectedTo}"`
        expect(tql).to.eql(expected)
      })

      test('consider timezone when creating datetime ranges', () => {
        const value = '2020-01-28T23:00:00.000+01:00'
        const tql = getTql('datefield', value, 'datetime')

        const expectedFrom = '2020-01-27 23:00'
        const expectedTo = '2020-01-28 23:00'
        const expected = `datefield >= datetime:"${expectedFrom}" and datefield < datetime:"${expectedTo}"`
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
        expect(tql).to.eql('not exists(relMark)')
      })
    })
  })
})
