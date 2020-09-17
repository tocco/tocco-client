import {
  getPositions,
  changePosition,
  getPositionsPreferencesToSave,
  getPositionsFromColumns,
  getSorting,
  getSortingPreferencesToSave,
  getAdditionalSortingPreferencesToSave,
  getColumnPreferencesToSave,
  getColumns
} from './preferences'

describe('entity-list', () => {
  describe('util', () => {
    describe('preferences', () => {
      describe('getPositions', () => {
        test('should return object with positions', () => {
          const preferences = {
            'User_list.firstname.position': '0',
            'User_list.lastname.position': '1',
            'User_list.relGender.position': '2',
            'User_list.relGender.hidden': 'false'
          }

          const expectedResult = {
            firstname: 0,
            lastname: 1,
            relGender: 2
          }

          expect(getPositions(preferences)).to.eql(expectedResult)
        })
      })

      describe('getPositionsFromColumns', () => {
        test('should return object with positions', () => {
          const columns = [
            {
              fixedPosition: true,
              id: 'selection'
            },
            {
              id: 'firstname'
            },
            {
              id: 'lastname'
            },
            {
              id: 'relGender'
            }
          ]

          const expectedResult = {
            firstname: 0,
            lastname: 1,
            relGender: 2
          }

          expect(getPositionsFromColumns(columns)).to.eql(expectedResult)
        })
      })

      describe('changePositions', () => {
        test('should set new order to positions', () => {
          const positions = {
            firstname: 0,
            lastname: 1,
            relGender: 2,
            email: 3
          }

          const expectedResult = {
            firstname: 0,
            relGender: 1,
            lastname: 2,
            email: 3
          }

          expect(changePosition(positions, 'lastname', 'relGender')).to.eql(expectedResult)
        })
      })

      describe('getPositionsPreferencesToSave', () => {
        test('should return a key value object with full path as key', () => {
          const positions = {
            firstname: 0,
            lastname: 1,
            relGender: 2,
            email: 3
          }

          const expectedResult = {
            'User_list.firstname.position': '0',
            'User_list.lastname.position': '1',
            'User_list.relGender.position': '2',
            'User_list.email.position': '3'
          }

          expect(getPositionsPreferencesToSave('User_list', positions)).to.eql(expectedResult)
        })
      })

      describe('getSorting', () => {
        test('should transform preferences to sorting', () => {
          const preferences = {
            'User_list.firstname.position': '5',
            'Principal_list.sortingField': 'first_field',
            'Principal_list.sortingDirection': 'asc',
            'Principal_list.sortingField.1': 'second_field',
            'Principal_list.sortingDirection.1': 'desc'
          }

          const expectedSorting = [
            {
              field: 'first_field',
              order: 'asc'
            },
            {
              field: 'second_field',
              order: 'desc'
            }
          ]

          expect(getSorting(preferences)).to.deep.equal(expectedSorting)
        })
      })

      describe('getSortingPreferencesToSave', () => {
        test('should transform sorting to preference', () => {
          const sorting = {
            field: 'field',
            order: 'asc'
          }
          const expectedPreference = {
            'User_list.sortingField': 'field',
            'User_list.sortingDirection': 'asc'
          }
          expect(getSortingPreferencesToSave('User_list', sorting)).to.deep.equal(expectedPreference)
        })
      })

      describe('getAdditionalSortingPreferencesToSave', () => {
        test('should transform sorting to preference', () => {
          const sorting = {
            field: 'field',
            order: 'asc'
          }
          const expectedPreference = {
            'User_list.sortingField.1': 'field',
            'User_list.sortingDirection.1': 'asc'
          }
          expect(getAdditionalSortingPreferencesToSave('User_list', sorting, 1)).to.deep.equal(expectedPreference)
        })
      })

      describe('getColumns', () => {
        test('should transform preferences to columns', () => {
          const preferences = {
            'User_list.firstname.position': '5',
            'Principal_list.sortingField': 'first_field',
            'Principal_list.sortingDirection': 'asc',
            'User_list.first_field.hidden': 'true',
            'User_list.second_field.hidden': 'false',
            'User_list.third_field.with.multiple.paths.hidden': 'false'
          }

          const expectedColumns = {
            'first_field': false,
            'second_field': true,
            'third_field.with.multiple.paths': true
          }

          expect(getColumns(preferences)).to.deep.equal(expectedColumns)
        })
      })

      describe('getColumnPreferencesToSave', () => {
        test('should transform columns to preference', () => {
          const columns = {
            first_field: true,
            second_field: false
          }
          const expectedPreference = {
            'User_list.first_field.hidden': 'false',
            'User_list.second_field.hidden': 'true'
          }
          expect(getColumnPreferencesToSave('User_list', columns)).to.deep.equal(expectedPreference)
        })
      })
    })
  })
})
