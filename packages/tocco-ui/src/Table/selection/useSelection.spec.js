
import {renderHook, act} from '@testing-library/react-hooks'

import useSelection from './useSelection'

const EMPTY_FUNC = () => {}

describe('tocco-ui', () => {
  describe('Table', () => {
    describe('selection', () => {
      describe('useSelection', () => {
        test('should return valid isSelected', () => {
          const selection = ['1', '3', '100']
          const allKeys = ['1', '2', '3', '4', '5']
          const onSelectChange = EMPTY_FUNC

          const {result} = renderHook(() => useSelection(selection, allKeys, onSelectChange))
          expect(result.current.isSelected('1')).to.be.true
          expect(result.current.isSelected('2')).to.be.false
          expect(result.current.isSelected('3')).to.be.true
          expect(result.current.isSelected('e')).to.be.false
          expect(result.current.isSelected('99')).to.be.false
          expect(result.current.isSelected('100')).to.be.true
          expect(result.current.isSelected()).to.be.false
        })
      })

      test('should call onSelectChange on singleSelectHandler without value', () => {
        const selection = ['1', '3', '100']
        const allKeys = ['1', '2', '3', '4', '5']
        const onSelectChange = sinon.spy()

        const {result} = renderHook(() => useSelection(selection, allKeys, onSelectChange))

        act(() => {
          result.current.selectionChange('1')
          result.current.selectionChange('2')
        })
        expect(onSelectChange).to.be.calledWith(['1'], false)
        expect(onSelectChange).to.be.calledWith(['2'], true)
      })

      test('should call onSelectChange on singleSelectHandler with value', () => {
        const selection = ['1', '3', '100']
        const allKeys = ['1', '2', '3', '4', '5']
        const onSelectChange = sinon.spy()

        const {result} = renderHook(() => useSelection(selection, allKeys, onSelectChange))

        act(() => {
          result.current.selectionChange('1', true)
          result.current.selectionChange('2', true)
        })

        expect(onSelectChange).to.be.calledWith(['1'], true)
        expect(onSelectChange).to.be.calledWith(['2'], true)
      })

      test('should select a range from last selection if shift is pressed', () => {
        const allKeys = ['1', '2', '3', '4', '5']
        const onSelectChange = sinon.spy()

        const {result} = renderHook(() => useSelection([], allKeys, onSelectChange))

        const shiftPressed = true
        act(() => {
          result.current.selectionChange('2', true)
        })

        act(() => {
          result.current.selectionChange('5', true, shiftPressed)
        })

        expect(onSelectChange).to.be.calledWith(['2', '3', '4', '5'], true)
      })

      test('should select a range from last selection if selected above', () => {
        const allKeys = ['1', '2', '3', '4', '5']
        const onSelectChange = sinon.spy()

        const {result} = renderHook(() => useSelection([], allKeys, onSelectChange))

        const shiftPressed = true
        act(() => {
          result.current.selectionChange('5', true)
        })

        act(() => {
          result.current.selectionChange('2', true, shiftPressed)
        })

        expect(onSelectChange).to.be.calledWith(['2', '3', '4', '5'], true)
      })

      test('should select a range from beginning selection if shift is pressed without last selection', () => {
        const allKeys = ['1', '2', '3', '4', '5']
        const onSelectChange = sinon.spy()

        const {result} = renderHook(() => useSelection([], allKeys, onSelectChange))

        const shiftPressed = true

        act(() => {
          result.current.selectionChange('4', true, shiftPressed)
        })

        expect(onSelectChange).to.be.calledWith(['1', '2', '3', '4'], true)
      })

      test('should call onSelect change on multi select change', () => {
        const allKeys = ['1', '2', '3', '4', '5']
        const onSelectChange = sinon.spy()

        const {result} = renderHook(() => useSelection([], allKeys, onSelectChange))

        act(() => {
          result.current.selectionChange(['4', '2'], false)
        })

        expect(onSelectChange).to.be.calledWith(['4', '2'], false)
      })
    })
  })
})
