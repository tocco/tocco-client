import React from 'react'
import Table from './Table'
import {shallow} from 'enzyme'

describe('tocco-ui', function() {
  describe('Table', function() {
    it('should render a html table', () => {
      const wrapper = shallow(
        <Table records={[]} columnDefinitions={[]}/>
      )
      expect(wrapper.find('table')).to.have.length(1)
    })

    it('should render the right amount of records', () => {
      const recordsAmount = 100
      const records = []
      for (let i = 0; i < recordsAmount; i++) {
        records.push({a: {value: i.toString()}})
      }

      const wrapper = shallow(
        <Table records={records} columnDefinitions={[{value: 'a'}]}/>
      )
      expect(wrapper.find('tr')).to.have.length(recordsAmount + 1) // +1 for header row
    })

    it('should show a label if provided and default value if not', () => {
      const records = [
        {
          a: {value: 'a1'},
          b: {value: 'b1'},
          c: {value: 'c1'}
        }
      ]

      const columnDefinitions = [
        {
          value: 'a'
        },
        {
          value: 'c',
          label: 'CLabel',
          order: 1
        }
      ]

      const wrapper = shallow(
        <Table records={records} columnDefinitions={columnDefinitions}/>
      )

      expect(wrapper.find('th').last().text()).to.equal('a')
      expect(wrapper.find('th').first().text()).to.equal('CLabel')
    })

    it('should render the right amount of columns and order them ', () => {
      const records = [
        {
          a: {value: 'a1'},
          b: {value: 'b1'},
          c: {value: 'c1'}
        },
        {
          a: {value: 'a2'},
          b: {value: 'b2'},
          c: {value: 'c2'}
        },
        {
          a: {value: 'a3'},
          b: {value: 'b3'},
          c: {value: 'c3'}
        }
      ]

      const columnDefinitions = [
        {
          value: 'a',
          label: 'ALabel',
          order: 30
        },
        {
          value: 'c',
          label: 'CLabel',
          order: 1
        }
      ]

      const wrapper = shallow(
        <Table records={records} columnDefinitions={columnDefinitions}/>
      )

      expect(wrapper.find('th').first().text()).to.equal('CLabel')
      expect(wrapper.find('th').last().text()).to.equal('ALabel')

      expect(wrapper.contains(<th>BLabel</th>)).to.be.false

      expect(wrapper.contains('a1')).to.be.true
      expect(wrapper.contains('a2')).to.be.true
      expect(wrapper.contains('a3')).to.be.true

      expect(wrapper.contains('b1')).to.be.false
      expect(wrapper.contains('b2')).to.be.false
      expect(wrapper.contains('b3')).to.be.false

      expect(wrapper.contains('c1')).to.be.true
      expect(wrapper.contains('c2')).to.be.true
      expect(wrapper.contains('c3')).to.be.true
    })

    it('should join multiple cell values', () => {
      const record = {a: {value: 'a'}, b: {value: 'b'}}

      const wrapper = shallow(
        <Table records={[record]} columnDefinitions={[{value: ['a', 'b']}]}/>
      )

      expect(wrapper.contains('a, b')).to.be.true
    })

    it('should ignore unknown column', () => {
      const record = {a: {value: 'a'}}

      const wrapper = shallow(
        <Table records={[record]} columnDefinitions={[{value: 'unknown'}]}/>
      )

      expect(wrapper.find('td')).to.have.text('')
    })

    it('should add class attribute to table', () => {
      const wrapper = shallow(
        <Table className="table-striped abc" records={[]} columnDefinitions={[]}/>
      )
      expect(wrapper.find('table.table-striped.abc')).to.have.length(1)
    })

    it('should add a order-by-change click handler', () => {
      const record = {a: {value: 'a'}, b: {value: 'b'}}

      const onClick = sinon.spy()
      const wrapper = shallow(
        <Table
          onOrderByChange={onClick}
          records={[record]}
          columnDefinitions={[{value: 'a'}, {value: 'b'}]}
        />
      )

      wrapper.find('tr').first().find('th').first().simulate('click')

      expect(onClick).to.have.calledOnce
      expect(onClick).to.have.been.calledWith({name: 'a', direction: 'desc'})

      wrapper.find('tr').first().find('th').first().simulate('click')

      expect(onClick).to.have.calledTwice
      expect(onClick).to.have.been.calledWith({name: 'a', direction: 'asc'})

      wrapper.find('tr').first().find('th').last().simulate('click')

      expect(onClick).to.have.calledThrice
      expect(onClick).to.have.been.calledWith({name: 'b', direction: 'desc'})
    })

    it('should add a order-by-change click handler with default ordering', () => {
      const record = {a: {value: 'a'}, b: {value: 'b'}}
      const orderBy = {
        name: 'a',
        direction: 'desc'
      }

      const onClick = sinon.spy()
      const wrapper = shallow(
        <Table
          onOrderByChange={onClick}
          orderBy={orderBy}
          records={[record]}
          columnDefinitions={[{value: 'a'}, {value: 'b'}]}
        />
      )

      wrapper.find('tr').first().find('th').first().simulate('click')

      expect(onClick).to.have.calledOnce
      expect(onClick).to.have.been.calledWith({name: 'a', direction: 'asc'})
    })

    it('should add a row click handler', () => {
      const record = {a: {value: 'a'}}

      const onClick = sinon.spy()
      const wrapper = shallow(
        <Table onRowClick={onClick} records={[record]} columnDefinitions={[{value: 'a'}]}/>
      )

      wrapper.find('tr').last().simulate('click')

      expect(onClick).to.have.calledOnce
      expect(onClick).to.have.been.calledWith(record)
    })

    it('should use the cell renderer', () => {
      const record = {a: {value: 'a'}, b: {value: 'b'}}

      const cellRenderer = sinon.spy()
      shallow(
        <Table cellRenderer={cellRenderer} records={[record]} columnDefinitions={[{value: 'a'}, {value: 'b'}]}/>
      )

      expect(cellRenderer).to.have.calledTwice
      expect(cellRenderer).to.have.been.calledWith([record.a], record)
      expect(cellRenderer).to.have.been.calledWith([record.b], record)
    })
  })
})
