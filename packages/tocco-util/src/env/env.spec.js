import {getBackendUrl, getBusinessUnit, NULL_BUSINESS_UNIT, setBackendUrl, setBusinessUnit} from './env'

describe('tocco-util', () => {
  describe('env', () => {
    describe('backendUrl', () => {
      test('should return __BACKEND_URL__ as initial backend url', () => {
        expect(getBackendUrl()).to.equal(__BACKEND_URL__)
      })

      test('should return set backend url', () => {
        setBackendUrl('test')
        expect(getBackendUrl()).to.equal('test')
      })
    })

    describe('businessUnit', () => {
      test('should return undefined as initial business unit', () => {
        expect(getBusinessUnit()).to.be.undefined
      })

      test('should return set business unit', () => {
        setBusinessUnit('test')
        expect(getBusinessUnit()).to.equal('test')
      })

      test('should have NULL_BUSINESS_UNIT', () => {
        setBusinessUnit(NULL_BUSINESS_UNIT)
        expect(getBusinessUnit()).to.equal('__n-u-l-l__')
      })
    })
  })
})
