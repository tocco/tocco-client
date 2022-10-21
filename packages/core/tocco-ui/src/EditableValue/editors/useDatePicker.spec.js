import {renderHook, act} from '@testing-library/react-hooks'
import {date as dateUtil} from 'tocco-util'

import useDatePicker from './useDatePicker'

describe('tocco-ui', () => {
  describe('EditableValue', () => {
    describe('useDatePicker', () => {
      describe('reactDatePickerProps', () => {
        beforeEach(() => {
          jest.useFakeTimers()
        })

        afterEach(() => {
          jest.useRealTimers()
        })

        test('should parse value as date', () => {
          const value = '2022-10-28'
          const onChangeSpy = sinon.spy()
          const options = {}

          const {result} = renderHook(() => useDatePicker(value, onChangeSpy, options))

          expect(result.current.reactDatePickerProps.selected).to.eql(new Date(2022, 9, 28))
        })

        test('should parse value as datetime', () => {
          const value = '2022-01-01T07:51:00.000Z'
          const onChangeSpy = sinon.spy()
          const options = {}

          const {result} = renderHook(() => useDatePicker(value, onChangeSpy, options))

          expect(result.current.reactDatePickerProps.selected).to.eql(new Date(2022, 0, 1, 8, 51, 0, 0))
        })

        test('should set time and min/max dates as props', () => {
          const value = '2022-01-01T07:51:00.000Z'
          const onChangeSpy = sinon.spy()
          const options = {hasTime: true, minDate: '2022-01-01T10:00:00.000Z', maxDate: '2022-01-03T00:00:00.000Z'}

          const {result} = renderHook(() => useDatePicker(value, onChangeSpy, options))

          expect(result.current.reactDatePickerProps.showTimeInput).to.be.true
          expect(result.current.reactDatePickerProps.minDate).to.eql(new Date(2022, 0, 1, 11, 0, 0, 0))
          expect(result.current.reactDatePickerProps.maxDate).to.eql(new Date(2022, 0, 3, 1, 0, 0, 0))
        })

        test('should toggle modal on input click', () => {
          const value = '2022-01-01T07:51:00.000Z'
          const onChangeSpy = sinon.spy()
          const options = {}

          const {result} = renderHook(() => useDatePicker(value, onChangeSpy, options))
          expect(result.current.reactDatePickerProps.open).to.be.false

          act(() => {
            result.current.reactDatePickerProps.onInputClick()
          })

          expect(result.current.reactDatePickerProps.open).to.be.true

          act(() => {
            result.current.reactDatePickerProps.onInputClick()
          })

          expect(result.current.reactDatePickerProps.open).to.be.false
        })

        test('should close modal on click outside', () => {
          const value = '2022-01-01T07:51:00.000Z'
          const onChangeSpy = sinon.spy()
          const options = {}

          const {result} = renderHook(() => useDatePicker(value, onChangeSpy, options))

          act(() => {
            result.current.reactDatePickerProps.onInputClick()
          })

          expect(result.current.reactDatePickerProps.open).to.be.true

          act(() => {
            result.current.reactDatePickerProps.onClickOutside()
          })

          expect(result.current.reactDatePickerProps.open).to.be.false
        })

        test('should close modal on click outside', () => {
          const value = '2022-01-01T07:51:00.000Z'
          const onChangeSpy = sinon.spy()
          const options = {}

          const {result} = renderHook(() => useDatePicker(value, onChangeSpy, options))

          act(() => {
            result.current.reactDatePickerProps.onInputClick()
          })

          expect(result.current.reactDatePickerProps.open).to.be.true

          act(() => {
            const closed = result.current.reactDatePickerProps.closeOnScroll()
            expect(closed).to.be.true
          })

          expect(result.current.reactDatePickerProps.open).to.be.false
        })

        test('should not set time automatically when DatePicker has not time', () => {
          const value = null
          const onChangeSpy = sinon.spy()
          const options = {hasTime: false}

          const {result} = renderHook(() => useDatePicker(value, onChangeSpy, options))

          act(() => {
            result.current.reactDatePickerProps.onChange(new Date(2022, 0, 2))
          })

          expect(onChangeSpy).to.have.been.calledWith('2022-01-01T23:00:00.000Z')
        })

        test('should set time automatically for DateTimePicker', () => {
          const value = null
          const onChangeSpy = sinon.spy()
          const options = {hasTime: true}

          const {result} = renderHook(() => useDatePicker(value, onChangeSpy, options))

          const date = new Date(2022, 0, 2)
          act(() => {
            result.current.reactDatePickerProps.onChange(date)
          })

          const expectedDate = dateUtil.setCurrentTime(date)
          expect(onChangeSpy).to.have.been.calledWith(expectedDate.toISOString())
        })

        test('should not overwrite time when already set', () => {
          const value = new Date(2022, 0, 2, 13, 20, 0, 0)
          const onChangeSpy = sinon.spy()
          const options = {hasTime: true}

          const {result} = renderHook(() => useDatePicker(value, onChangeSpy, options))

          const date = new Date(2022, 0, 3, 13, 20, 0, 0)
          act(() => {
            result.current.reactDatePickerProps.onChange(date)
          })

          expect(onChangeSpy).to.have.been.calledWith(date.toISOString())
        })

        test('should close modal when tab on DatePicker when having focus on a day', () => {
          const value = new Date(2022, 0, 2, 13, 20, 0, 0)
          const onChangeSpy = sinon.spy()
          const options = {hasTime: false}

          const {result} = renderHook(() => useDatePicker(value, onChangeSpy, options))

          act(() => {
            result.current.reactDatePickerProps.onInputClick()
          })

          expect(result.current.reactDatePickerProps.open).to.be.true

          act(() => {
            result.current.reactDatePickerProps.onKeyDown({
              key: 'Tab',
              shiftKey: false,
              target: {classList: {contains: c => c === 'react-datepicker__day'}}
            })
          })

          expect(result.current.reactDatePickerProps.open).to.be.false
        })

        test('should focus time input on modal when tab on DateTimePicker when having focus on a day', () => {
          const value = new Date(2022, 0, 2, 13, 20, 0, 0)
          const onChangeSpy = sinon.spy()
          const options = {hasTime: true}

          const {result} = renderHook(() => useDatePicker(value, onChangeSpy, options))

          const focusSpy = sinon.spy()
          const datePickerRef = {
            calendar: {
              componentNode: {
                querySelector: () => ({
                  focus: focusSpy
                })
              }
            }
          }
          act(() => {
            result.current.reactDatePickerProps.onInputClick()
            result.current.reactDatePickerProps.ref.current = datePickerRef
          })

          expect(result.current.reactDatePickerProps.open).to.be.true

          act(() => {
            result.current.reactDatePickerProps.onKeyDown({
              key: 'Tab',
              shiftKey: false,
              target: {classList: {contains: c => c === 'react-datepicker__day'}}
            })
          })

          jest.runAllTimers()

          expect(result.current.reactDatePickerProps.open).to.be.true
          expect(focusSpy).to.have.been.calledOnce
        })

        test('should close modal when tab on DateTimePicker when having focus on time input on modal', () => {
          const value = new Date(2022, 0, 2, 13, 20, 0, 0)
          const onChangeSpy = sinon.spy()
          const options = {hasTime: true}

          const {result} = renderHook(() => useDatePicker(value, onChangeSpy, options))

          act(() => {
            result.current.reactDatePickerProps.onInputClick()
          })

          expect(result.current.reactDatePickerProps.open).to.be.true

          act(() => {
            result.current.reactDatePickerProps.onKeyDown({
              key: 'Tab',
              shiftKey: false,
              target: {classList: {contains: c => c === 'react-datepicker-time__input'}}
            })
          })

          expect(result.current.reactDatePickerProps.open).to.be.false
        })

        test('should close modal when shift + tab on DatePicker when having focus on input', () => {
          const value = new Date(2022, 0, 2, 13, 20, 0, 0)
          const onChangeSpy = sinon.spy()
          const options = {hasTime: false}

          const {result} = renderHook(() => useDatePicker(value, onChangeSpy, options))

          act(() => {
            result.current.reactDatePickerProps.onInputClick()
          })

          expect(result.current.reactDatePickerProps.open).to.be.true

          act(() => {
            result.current.reactDatePickerProps.onKeyDown({
              key: 'Tab',
              shiftKey: true,
              target: {classList: {contains: c => c === 'react-datepicker__input'}}
            })
          })

          expect(result.current.reactDatePickerProps.open).to.be.false
        })

        test('should close modal when shift + tab on DatePicker when having focus on day', () => {
          const value = new Date(2022, 0, 2, 13, 20, 0, 0)
          const onChangeSpy = sinon.spy()
          const options = {hasTime: false}

          const {result} = renderHook(() => useDatePicker(value, onChangeSpy, options))

          act(() => {
            result.current.reactDatePickerProps.onInputClick()
          })

          expect(result.current.reactDatePickerProps.open).to.be.true

          act(() => {
            result.current.reactDatePickerProps.onKeyDown({
              key: 'Tab',
              shiftKey: true,
              target: {classList: {contains: c => c === 'react-datepicker__day'}}
            })
          })

          expect(result.current.reactDatePickerProps.open).to.be.false
        })

        test('should focus day when shift + tab on DateTimePicker when having focus on time input', () => {
          const value = new Date(2022, 0, 2, 13, 20, 0, 0)
          const onChangeSpy = sinon.spy()
          const options = {hasTime: true}

          const {result} = renderHook(() => useDatePicker(value, onChangeSpy, options))

          const setPreSelectionSpy = sinon.spy()
          const datePickerRef = {setPreSelection: setPreSelectionSpy}
          act(() => {
            result.current.reactDatePickerProps.onInputClick()
            result.current.reactDatePickerProps.ref.current = datePickerRef
          })

          expect(result.current.reactDatePickerProps.open).to.be.true

          act(() => {
            result.current.reactDatePickerProps.onKeyDown({
              key: 'Tab',
              shiftKey: true,
              target: {classList: {contains: c => c === 'react-datepicker-time__input'}}
            })
          })

          expect(result.current.reactDatePickerProps.open).to.be.true
          expect(setPreSelectionSpy).to.have.been.calledOnce
        })

        test('should open modal on arrow down when having focus on input', () => {
          const value = new Date(2022, 0, 2, 13, 20, 0, 0)
          const onChangeSpy = sinon.spy()
          const options = {hasTime: false}

          const {result} = renderHook(() => useDatePicker(value, onChangeSpy, options))

          expect(result.current.reactDatePickerProps.open).to.be.false

          const event = {
            key: 'ArrowDown',
            target: {classList: {contains: () => false}}
          }
          act(() => {
            result.current.reactDatePickerProps.onKeyDown(event)
          })

          expect(result.current.reactDatePickerProps.open).to.be.true
          expect(event.key).to.not.be.eql('ArrowDown')
        })

        test('should use custom parsing functions', () => {
          const value = 'abc'
          const onChangeSpy = sinon.spy()
          const date = new Date(2022, 0, 1, 8, 51, 0, 0)
          const options = {
            valueToDate: sinon.spy(() => date),
            dateToValue: sinon.spy(() => 'def')
          }

          const {result} = renderHook(() => useDatePicker(value, onChangeSpy, options))

          expect(result.current.reactDatePickerProps.selected).to.eql(date)
          expect(options.valueToDate).has.been.calledWith('abc')

          const changedDate = new Date(2022, 0, 3, 13, 20, 0, 0)
          act(() => {
            result.current.reactDatePickerProps.onChange(changedDate)
          })

          expect(onChangeSpy).to.have.been.calledWith('def')
        })
      })

      describe('timeInputProps', () => {
        test('should set classname', () => {
          const value = new Date(2022, 0, 2, 13, 20, 0, 0)
          const onChangeSpy = sinon.spy()
          const options = {hasTime: true}

          const {result} = renderHook(() => useDatePicker(value, onChangeSpy, options))

          expect(result.current.timeInputProps.className).to.eql('react-datepicker-time__input')
        })
      })

      describe('clearButtonProps', () => {
        test('should clear value on clear button mouse down', () => {
          const value = new Date(2022, 0, 2, 13, 20, 0, 0)
          const onChangeSpy = sinon.spy()
          const options = {hasTime: false}

          const {result} = renderHook(() => useDatePicker(value, onChangeSpy, options))

          const event = {
            preventDefault: sinon.spy()
          }

          act(() => {
            result.current.clearButtonProps.onMouseDown(event)
          })

          expect(event.preventDefault).has.been.called
          expect(onChangeSpy).has.been.calledWith(null)
          expect(result.current.reactDatePickerProps.selected).to.be.null
        })
      })

      describe('calendarButtonProps', () => {
        test('should toggle modal on calendar click', () => {
          const value = new Date(2022, 0, 2, 13, 20, 0, 0)
          const onChangeSpy = sinon.spy()
          const options = {hasTime: false}

          const {result} = renderHook(() => useDatePicker(value, onChangeSpy, options))

          expect(result.current.reactDatePickerProps.open).to.be.false

          act(() => {
            result.current.calendarButtonProps.onClick()
          })

          expect(result.current.reactDatePickerProps.open).to.be.true

          act(() => {
            result.current.calendarButtonProps.onClick()
          })

          expect(result.current.reactDatePickerProps.open).to.be.false
        })

        test('should set ignore clickoutside class when datepicker is open', () => {
          const value = new Date(2022, 0, 2, 13, 20, 0, 0)
          const onChangeSpy = sinon.spy()
          const options = {hasTime: false}

          const {result} = renderHook(() => useDatePicker(value, onChangeSpy, options))

          expect(result.current.calendarButtonProps.className).to.eql('')

          act(() => {
            result.current.calendarButtonProps.onClick()
          })

          expect(result.current.calendarButtonProps.className).to.eql('react-datepicker-ignore-onclickoutside')

          act(() => {
            result.current.calendarButtonProps.onClick()
          })

          expect(result.current.calendarButtonProps.className).to.eql('')
        })
      })
    })
  })
})
