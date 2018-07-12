import * as formData from './formData'

describe('tocco-util', () => {
  describe('formData', () => {
    describe('formData', () => {
      describe('relationEntitiesSelector', () => {
        it('should return data of field', () => {
          const relationEntities = {relUser: {data: []}}
          const store = {formData: {relationEntities}}
          expect(formData.relationEntitiesSelector(store)).to.eql(relationEntities)
        })
      })
    })
  })
})
