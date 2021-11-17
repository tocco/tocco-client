import {getMatchingConfig} from './utils'

describe('app-extensions', () => {
  describe('keyDown', () => {
    describe('utils', () => {
      describe('getMatchingConfig', () => {
        test('should match config with code', () => {
          const configs = [
            {
              ctrl: true,
              alt: true,
              code: 'KeyM',
              key: 'foo',
              global: false
            }
          ]
          const event = {
            code: 'KeyM',
            key: 'm',
            ctrlKey: true,
            metaKey: false,
            altKey: true
          }
          const global = false

          const expectedConfig = configs[0]

          const matchingConfig = getMatchingConfig(configs, event, global)

          expect(matchingConfig).to.deep.equal(expectedConfig)
        })

        test('should match config with key', () => {
          const configs = [
            {
              ctrl: true,
              alt: true,
              code: 'foo',
              key: 'm',
              global: false
            }
          ]
          const event = {
            code: 'KeyM',
            key: 'm',
            ctrlKey: true,
            metaKey: false,
            altKey: true
          }
          const global = false

          const expectedConfig = configs[0]

          const matchingConfig = getMatchingConfig(configs, event, global)

          expect(matchingConfig).to.deep.equal(expectedConfig)
        })

        test('should match config with meta key (CMD on OSX)', () => {
          const configs = [
            {
              ctrl: true,
              alt: true,
              code: 'KeyM',
              key: 'm',
              global: false
            }
          ]
          const event = {
            code: 'KeyM',
            key: 'm',
            ctrlKey: false,
            metaKey: true,
            altKey: true
          }
          const global = false

          const expectedConfig = configs[0]

          const matchingConfig = getMatchingConfig(configs, event, global)

          expect(matchingConfig).to.deep.equal(expectedConfig)
        })

        test('should match config without any ctrl, alt, meta keys', () => {
          const configs = [
            {
              ctrl: false,
              alt: false,
              code: 'KeyM',
              key: 'm',
              global: false
            }
          ]
          const event = {
            code: 'KeyM',
            key: 'm',
            ctrlKey: false,
            metaKey: false,
            altKey: false
          }
          const global = false

          const expectedConfig = configs[0]

          const matchingConfig = getMatchingConfig(configs, event, global)

          expect(matchingConfig).to.deep.equal(expectedConfig)
        })

        test('should match config with global', () => {
          const configs = [
            {
              ctrl: false,
              alt: false,
              code: 'KeyM',
              key: 'm',
              global: true
            }
          ]
          const event = {
            code: 'KeyM',
            key: 'm',
            ctrlKey: false,
            metaKey: false,
            altKey: false
          }
          const global = true

          const expectedConfig = configs[0]

          const matchingConfig = getMatchingConfig(configs, event, global)

          expect(matchingConfig).to.deep.equal(expectedConfig)
        })

        test('should not match config with unequal global', () => {
          const configs = [
            {
              ctrl: false,
              alt: false,
              code: 'KeyM',
              key: 'm',
              global: true
            }
          ]
          const event = {
            code: 'KeyM',
            key: 'm',
            ctrlKey: false,
            metaKey: false,
            altKey: false
          }
          const global = false

          const matchingConfig = getMatchingConfig(configs, event, global)

          expect(matchingConfig).to.be.undefined
        })

        test('should not match config with unequal alt key', () => {
          const configs = [
            {
              ctrl: false,
              alt: false,
              code: 'KeyM',
              key: 'm',
              global: true
            }
          ]
          const event = {
            code: 'KeyM',
            key: 'm',
            ctrlKey: false,
            metaKey: false,
            altKey: true
          }
          const global = true

          const matchingConfig = getMatchingConfig(configs, event, global)

          expect(matchingConfig).to.be.undefined
        })

        test('should not match config with unequal ctrl key', () => {
          const configs = [
            {
              ctrl: false,
              alt: false,
              code: 'KeyM',
              key: 'm',
              global: true
            }
          ]
          const event = {
            code: 'KeyM',
            key: 'm',
            ctrlKey: true,
            metaKey: false,
            altKey: false
          }
          const global = true

          const matchingConfig = getMatchingConfig(configs, event, global)

          expect(matchingConfig).to.be.undefined
        })

        test('should not match config with unequal meta key', () => {
          const configs = [
            {
              ctrl: false,
              alt: false,
              code: 'KeyM',
              key: 'm',
              global: true
            }
          ]
          const event = {
            code: 'KeyM',
            key: 'm',
            ctrlKey: false,
            metaKey: true,
            altKey: false
          }
          const global = true

          const matchingConfig = getMatchingConfig(configs, event, global)

          expect(matchingConfig).to.be.undefined
        })

        test('should not match config with unequal alt key', () => {
          const configs = [
            {
              ctrl: true,
              alt: true,
              code: 'KeyM',
              key: 'm',
              global: true
            }
          ]

          const event = {
            code: 'KeyM',
            key: 'm',
            ctrlKey: false,
            metaKey: true,
            altKey: false
          }
          const global = true

          const matchingConfig = getMatchingConfig(configs, event, global)

          expect(matchingConfig).to.be.undefined
        })
      })
    })
  })
})
