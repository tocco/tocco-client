import * as load from './load'

const stubs = []

const packageName = 'package'
const appName = 'app'
const bundleName = `tocco-${appName}`

describe('tocco-util', () => {
  describe('bundle', () => {
    describe('load', () => {
      describe('loadBundle', () => {
        afterEach(() => {
          stubs.forEach(s => s.restore())
        })

        test('should fetch bundle', async () => {
          const expectedBundle = {
            test: 1
          }

          const srcTag = {}
          stubs.push(sinon.stub(document, 'createElement').returns(srcTag))
          stubs.push(sinon.stub(document, 'getElementsByTagName').returns([{parentNode: {insertBefore: sinon.spy()}}]))

          const promise = load.loadBundle(packageName, appName)

          window[bundleName] = expectedBundle
          srcTag.onload()

          const bundle = await promise

          expect(bundle).to.eql(expectedBundle)
        })

        test('should return bundle on window', async () => {
          const expectedBundle = {
            test: 1
          }
          window[bundleName] = expectedBundle

          const promise = load.loadBundle(packageName, appName)
          const bundle = await promise

          expect(bundle).to.eql(expectedBundle)
        })
      })
    })
  })
})
