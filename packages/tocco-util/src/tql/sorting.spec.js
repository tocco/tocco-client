import {getSortingFromQuery} from './sorting'

describe('tocco-util', () => {
  describe('tql', () => {
    describe('sorting', () => {
      test('should return empty array without order by', () => {
        const sorting = getSortingFromQuery('find Entity_name where condition')
        expect(sorting).to.be.empty
      })
      test('should handle query with order by', () => {
        const sorting = getSortingFromQuery('find Entity_name where condition order by field asc')
        expect(sorting).to.have.length(1)
        expect(sorting).to.deep.contain({field: 'field', order: 'asc'})
      })
      test('should assume ascending order by default', () => {
        const sorting = getSortingFromQuery('find Entity_name where condition order by field')
        expect(sorting).to.have.length(1)
        expect(sorting[0]).to.have.property('order', 'asc')
      })
      test('should handle query with multiple fields in order by', () => {
        const sorting = getSortingFromQuery('find Entity_name where condition order by field asc, other desc')
        expect(sorting).to.have.length(2)
        expect(sorting).to.deep.contain.members([{field: 'field', order: 'asc'}, {field: 'other', order: 'desc'}])
      })
      test('should trim unnecessary whitespace from field', () => {
        const sorting = getSortingFromQuery('find Entity_name where condition order by field  asc,  other desc')
        expect(sorting).to.have.length(2)
        expect(sorting).to.deep.contain.members([{field: 'field', order: 'asc'}, {field: 'other', order: 'desc'}])
      })
      test('should trim unnecessary whitespace from order', () => {
        const sorting = getSortingFromQuery('find Entity_name where condition order by field asc , other  desc')
        expect(sorting).to.have.length(2)
        expect(sorting).to.deep.contain.members([{field: 'field', order: 'asc'}, {field: 'other', order: 'desc'}])
      })
      test('should handle query with only order by', () => {
        const sorting = getSortingFromQuery('order by single desc')
        expect(sorting).to.have.length(1)
        expect(sorting).to.deep.contain({field: 'single', order: 'desc'})
      })
    })
  })
})
