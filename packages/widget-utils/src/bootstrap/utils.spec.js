import {buildInputFromDom, getBackendUrl} from './utils'

describe('widget-utils', () => {
  describe('bootstrap', () => {
    describe('getBackendUrl', () => {
      test('should derive backend url from script source url', () => {
        const document = {
          currentScript: {
            getAttribute: name =>
              name === 'src' ? 'https://customer.tocco.ch/js/tocco-widget-utils/dist/bootstrap.js' : undefined
          }
        }
        expect(getBackendUrl(document)).to.eql('https://customer.tocco.ch')
      })
    })

    describe('buildInputFromDom', () => {
        test('should build input object from DOM attributes', () => {
            const container = {
                attributes: [
                    {name: 'data-tocco-widget', value: 'entity-browser'},
                    {name: 'data-entity-name', value: 'User'},
                    {name: 'style', value: 'color: red;'},
                    {name: 'data-form-base', value: 'User'},
                    {name: 'data-memory-history', value: 'true'}
                ]
            }
            expect(buildInputFromDom(container)).to.eql({
                entityName: 'User',
                formBase: 'User',
                memoryHistory: true,

                // the following two aren't actually needed as input
                // but they also shouldn't do any harm either
                toccoWidget: 'entity-browser',
                style: 'color: red;'
            })
        })
    })
  })
})
