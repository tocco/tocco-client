import {renderHook, act} from '@testing-library/react-hooks'

import useTimeEdit from './useTimeEdit'

describe('tocco-ui', () => {
  describe('EditableValue', () => {
    describe('useTimeEdit', () => {
      test('should format value without seconds', () => {
        const value = '12:45:00'
        const onChangeSpy = sinon.spy()

        const {result} = renderHook(() => useTimeEdit(value, onChangeSpy))

        expect(result.current.inputProps.value).to.eql('12:45')
      })

      test('should handle null value', () => {
        const value = null
        const onChangeSpy = sinon.spy()

        const {result} = renderHook(() => useTimeEdit(value, onChangeSpy))

        expect(result.current.inputProps.value).to.eql('')
      })

      test('should update input value on value change', async () => {
        const onChangeSpy = sinon.spy()

        const {result, rerender} = renderHook(({value, onChange}) => useTimeEdit(value, onChange), {
          initialProps: {
            value: '12:45:00',
            onChange: onChangeSpy
          }
        })

        rerender({value: '13:56'})

        expect(result.current.inputProps.value).to.eql('13:56')
      })

      test('should change input value for valid intermediate inputs', () => {
        const value = null
        const onChangeSpy = sinon.spy()

        const {result} = renderHook(() => useTimeEdit(value, onChangeSpy))

        act(() => {
          result.current.inputProps.onChange({target: {value: '1'}})
        })

        expect(result.current.inputProps.value).to.eql('1')
      })

      test('should allow adjusting hours with valid minutes', () => {
        const value = '12:45'
        const onChangeSpy = sinon.spy()

        const {result} = renderHook(() => useTimeEdit(value, onChangeSpy))

        act(() => {
          result.current.inputProps.onChange({target: {value: '1:45'}})
        })

        expect(result.current.inputProps.value).to.eql('1:45')
      })

      test('should prevent invalid hours', () => {
        const value = null
        const onChangeSpy = sinon.spy()

        const {result} = renderHook(() => useTimeEdit(value, onChangeSpy))

        act(() => {
          result.current.inputProps.onChange({target: {value: '3'}})
          result.current.inputProps.onChange({target: {value: '33'}})
        })

        expect(result.current.inputProps.value).to.eql('3')
      })

      test('should prevent invalid minutes', () => {
        const value = null
        const onChangeSpy = sinon.spy()

        const {result} = renderHook(() => useTimeEdit(value, onChangeSpy))

        act(() => {
          result.current.inputProps.onChange({target: {value: '12:45'}})
          result.current.inputProps.onChange({target: {value: '12:98'}})
        })

        expect(result.current.inputProps.value).to.eql('12:45')
      })

      test('should prevent invalid characters', () => {
        const value = '12:45'
        const onChangeSpy = sinon.spy()

        const {result} = renderHook(() => useTimeEdit(value, onChangeSpy))

        act(() => {
          result.current.inputProps.onChange({target: {value: 'a'}})
        })

        expect(result.current.inputProps.value).to.eql('12:45')
      })

      test('should add `:` automatically when start typing the hours', () => {
        const value = null
        const onChangeSpy = sinon.spy()

        const {result} = renderHook(() => useTimeEdit(value, onChangeSpy))

        act(() => {
          result.current.inputProps.onChange({target: {value: '1'}})
          result.current.inputProps.onChange({target: {value: '12'}})
        })

        expect(result.current.inputProps.value).to.eql('12:')
      })

      test('should remove `:` automatically when removing minutes', () => {
        const value = '12:45'
        const onChangeSpy = sinon.spy()

        const {result} = renderHook(() => useTimeEdit(value, onChangeSpy))

        act(() => {
          result.current.inputProps.onChange({target: {value: '12:4'}})
          result.current.inputProps.onChange({target: {value: '12:'}})
          result.current.inputProps.onChange({target: {value: '12'}})
        })

        expect(result.current.inputProps.value).to.eql('1')
      })

      test('should remove `:` automatically when having only one hour digit', () => {
        const value = ''
        const onChangeSpy = sinon.spy()

        const {result} = renderHook(() => useTimeEdit(value, onChangeSpy))

        act(() => {
          result.current.inputProps.onChange({target: {value: '9:45'}})
          result.current.inputProps.onChange({target: {value: '9:4'}})
          result.current.inputProps.onChange({target: {value: '9:'}})
          result.current.inputProps.onChange({target: {value: '9'}})
        })

        expect(result.current.inputProps.value).to.eql('')
      })

      test('should not call onChange callback for intermediate values', () => {
        const value = ''
        const onChangeSpy = sinon.spy()

        const {result} = renderHook(() => useTimeEdit(value, onChangeSpy))

        act(() => {
          result.current.inputProps.onChange({target: {value: '13:'}})
        })

        expect(result.current.inputProps.value).to.eql('13:')
        expect(onChangeSpy).to.not.have.been.called
      })

      test('should call onChange callback with valid value', () => {
        const value = ''
        const onChangeSpy = sinon.spy()

        const {result} = renderHook(() => useTimeEdit(value, onChangeSpy))

        act(() => {
          result.current.inputProps.onChange({target: {value: '13:45'}})
        })

        expect(result.current.inputProps.value).to.eql('13:45')
        expect(onChangeSpy).to.have.been.calledWith('13:45')
      })

      test('should call onChange callback with empty value', () => {
        const value = '12:45'
        const onChangeSpy = sinon.spy()

        const {result} = renderHook(() => useTimeEdit(value, onChangeSpy))

        act(() => {
          result.current.inputProps.onChange({target: {value: ''}})
        })

        expect(result.current.inputProps.value).to.eql('')
        expect(onChangeSpy).to.have.been.calledWith('')
      })

      test('should interpret value on blur as valid time', () => {
        const value = '12:45'
        const onChangeSpy = sinon.spy()

        const {result} = renderHook(() => useTimeEdit(value, onChangeSpy))

        act(() => {
          result.current.inputProps.onChange({target: {value: '2'}})
        })

        expect(result.current.inputProps.value).to.eql('2')

        act(() => {
          result.current.inputProps.onBlur()
        })

        expect(result.current.inputProps.value).to.eql('02:00')
      })

      test('should clear input value and call onChange callback', () => {
        const value = '12:45'
        const onChangeSpy = sinon.spy()

        const {result} = renderHook(() => useTimeEdit(value, onChangeSpy))

        act(() => {
          result.current.clearButtonProps.onClick()
        })

        expect(result.current.inputProps.value).to.eql('')
        expect(onChangeSpy).to.have.been.calledWith('')
      })

      test('should select value on focus', () => {
        const value = '12:45'
        const onChangeSpy = sinon.spy()
        const focusEvent = {target: {select: sinon.spy()}}

        const {result} = renderHook(() => useTimeEdit(value, onChangeSpy))

        act(() => {
          result.current.inputProps.onFocus(focusEvent)
        })

        expect(focusEvent.target.select).to.have.been.called
      })
    })
  })
})
