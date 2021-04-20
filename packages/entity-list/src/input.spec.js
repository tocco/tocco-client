import {expect} from 'chai'

import {getReloadOption, reloadOptions} from './input'

describe('entity-list', () => {
  describe('input', () => {
    describe('getReloadType', () => {
      test('should return reload ALL if one input hat reload setting ALL', () => {
        expect(getReloadOption({formName: 'NewForm', parent: {model: 'User', key: '3'}})).to.eql(reloadOptions.ALL)
      })
    })
    test('should return reload DATA if data input changed', () => {
      expect(getReloadOption({parent: {model: 'User', key: '3'}})).to.eql(reloadOptions.DATA)
    })
    
    test('should return NOTHING no relevant data input changed', () => {
      expect(getReloadOption({})).to.eql(reloadOptions.NOTHING)
    })
  })
})
