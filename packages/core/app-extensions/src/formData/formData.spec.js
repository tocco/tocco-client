import * as formData from './formData'

describe('app-extensions', () => {
  describe('formData', () => {
    describe('formData', () => {
      describe('relationEntitiesSelector', () => {
        test('should return data of field', () => {
          const relationEntities = {relUser: {data: []}}
          const store = {formData: {relationEntities: {data: relationEntities}}}
          expect(formData.relationEntitiesSelector(store)).to.eql(relationEntities)
        })
      })

      describe('tooltipSelector', () => {
        test('should return data', () => {
          const tooltip = {User: {1: 'Test'}}
          const store = {formData: {tooltips: {data: tooltip}}}
          expect(formData.tooltipSelector(store)).to.eql(tooltip)
        })
      })
    })
  })
})
