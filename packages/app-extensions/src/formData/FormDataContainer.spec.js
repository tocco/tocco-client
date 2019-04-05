import {mapStateToProps} from './FormDataContainer'

describe('app-extensions', () => {
  describe('formData', () => {
    describe('FormDataContainer', () => {
      test('should return mapStateToProps with formValues', () => {
        const state = {
          form: {detailForm: {values: {
            user_nr: 0,
            website: 'http://www.google.ch',
            zip_c: '1234',
            city_c: 'Test City'
          }}},
          formData: {
            relationEntities: {data: {}},
            tooltips: {},
            searchFilters: {},
            locations: {}
          }
        }

        const props = {children: {props: {
          formName: 'detailForm',
          formField: {locationMapping: {
            canton: 'canton_c',
            city: 'city_c',
            country: 'relCountry_c',
            district: 'district_c',
            street: 'address_c',
            zip: 'zip_c'
          }}
        }}}

        const result = {
          zip_c: '1234',
          city_c: 'Test City'
        }

        expect(mapStateToProps(state, props).formValues).to.eql(result)
      })
    })
  })
})
